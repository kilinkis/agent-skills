/**
 * @file audit-cwv-ast.ts
 * @description Deterministic Core Web Vitals (INP, LCP, CLS) AST Auditor for React & TypeScript.
 * 
 * Uses `ts-morph` to mathematically identify main-thread blocking operations,
 * unprioritized LCP assets, layout-shifting media tags, and missing React 19 concurrency primitives.
 * 
 * Usage:
 *   pnpm exec tsx skills/cwv-inp-doctor/scripts/audit-cwv-ast.ts --path src/components/
 */

import { Project, SyntaxKind, Node, JsxElement, JsxSelfClosingElement } from 'ts-morph';
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';

export interface CwvViolation {
  file: string;
  line: number;
  column: number;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  element: string;
  message: string;
  fix: string;
}

export interface CwvFileReport {
  file: string;
  score: number; // 0 - 100
  violations: CwvViolation[];
}

/**
 * Main AST Auditor Engine
 */
export function runCwvAstAudit(targetPath: string): CwvFileReport[] {
  const project = new Project({
    compilerOptions: {
      jsx: 1, // Preserve / React JSX
      allowJs: true,
    },
  });

  const resolvedPath = path.resolve(process.cwd(), targetPath);
  const isFile = fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile();

  if (isFile) {
    project.addSourceFileAtPath(resolvedPath);
  } else {
    project.addSourceFilesAtPaths([
      `${resolvedPath}/**/*.{tsx,jsx,ts,js}`,
      `!${resolvedPath}/**/node_modules/**`,
    ]);
  }

  const sourceFiles = project.getSourceFiles();
  const reports: CwvFileReport[] = [];

  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    const fileName = path.basename(filePath);

    if (fileName.includes('.test.') || fileName.includes('.spec.') || fileName.includes('.config.')) {
      continue;
    }

    const report = auditSourceFile(sourceFile);
    reports.push(report);
  }

  return reports;
}

/**
 * Audits a single source file for CWV performance issues
 */
function auditSourceFile(sourceFile: any): CwvFileReport {
  const filePath = sourceFile.getFilePath();
  const fullText = sourceFile.getFullText();
  const violations: CwvViolation[] = [];

  const isHeroOrBanner =
    filePath.toLowerCase().includes('hero') ||
    filePath.toLowerCase().includes('banner') ||
    fullText.toLowerCase().includes('herobanner');

  // 1. Scan JSX elements
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  for (const el of jsxElements) {
    const tagName = Node.isJsxElement(el)
      ? el.getOpeningElement().getTagNameNode().getText()
      : el.getTagNameNode().getText();

    const attributes = Node.isJsxElement(el)
      ? getAttributesMap(el.getOpeningElement().getAttributes())
      : getAttributesMap((el as JsxSelfClosingElement).getAttributes());

    const pos = el.getStart();
    const lineAndCol = sourceFile.getLineAndColumnAtPos(pos);

    // --- Rule CWV-002: Missing width & height on img / video (CLS) ---
    if (tagName === 'img') {
      const hasWidth = attributes.has('width');
      const hasHeight = attributes.has('height');
      const className = attributes.get('className') || '';
      const hasAspectRatioClass = className.includes('aspect-') || className.includes('aspect[');

      if ((!hasWidth || !hasHeight) && !hasAspectRatioClass) {
        violations.push({
          file: filePath,
          line: lineAndCol.line,
          column: lineAndCol.column,
          ruleId: 'CWV-002',
          severity: 'error',
          element: `<img />`,
          message: 'Image tag missing explicit width/height dimensions or aspect-ratio class (causes Cumulative Layout Shift).',
          fix: 'Add explicit width={...} height={...} or Tailwind aspect-[w/h] container class.',
        });
      }

      // --- Rule CWV-003: LCP Hero Asset Prioritization ---
      if (isHeroOrBanner) {
        const loading = attributes.get('loading');
        const fetchPriority = attributes.get('fetchPriority') || attributes.get('fetchpriority');

        if (loading === '"lazy"') {
          violations.push({
            file: filePath,
            line: lineAndCol.line,
            column: lineAndCol.column,
            ruleId: 'CWV-003',
            severity: 'error',
            element: `<img loading="lazy" />`,
            message: 'Above-the-fold Hero banner image uses loading="lazy", degrading Largest Contentful Paint (LCP).',
            fix: 'Remove loading="lazy" and add fetchPriority="high" on critical hero assets.',
          });
        } else if (!fetchPriority || fetchPriority !== '"high"') {
          violations.push({
            file: filePath,
            line: lineAndCol.line,
            column: lineAndCol.column,
            ruleId: 'CWV-003',
            severity: 'warning',
            element: `<img />`,
            message: 'Hero image missing fetchPriority="high" priority hint for optimal LCP.',
            fix: 'Add fetchPriority="high" and decoding="async" to prioritize the main hero image.',
          });
        }
      }
    }
  }

  // --- Rule CWV-001: Heavy compute in event handlers without startTransition / useDeferredValue ---
  if (!fullText.includes('startTransition') && !fullText.includes('useDeferredValue')) {
    const functions = [
      ...sourceFile.getDescendantsOfKind(SyntaxKind.FunctionDeclaration),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.ArrowFunction),
      ...sourceFile.getDescendantsOfKind(SyntaxKind.FunctionExpression),
    ];

    for (const fn of functions) {
      const fnText = fn.getText();
      const hasFilterOrSort = fnText.includes('.filter(') || fnText.includes('.sort(');
      const hasStateSetter = /set[A-Z]\w*\s*\(/.test(fnText);

      if (hasFilterOrSort && hasStateSetter) {
        const pos = fn.getStart();
        const lineAndCol = sourceFile.getLineAndColumnAtPos(pos);
        violations.push({
          file: filePath,
          line: lineAndCol.line,
          column: lineAndCol.column,
          ruleId: 'CWV-001',
          severity: 'error',
          element: 'EventHandler',
          message: 'Synchronous array filtering/sorting combined with state updates blocks the main thread (degrades INP).',
          fix: 'Use React 19 useDeferredValue(query) or wrap state setter in startTransition(() => ...).',
        });
        break;
      }
    }
  }

  // --- Rule CWV-004: Non-passive scroll listeners in useEffect ---
  const callExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression);
  for (const call of callExpressions) {
    const text = call.getText();
    if (
      (text.includes("addEventListener('scroll'") || text.includes('addEventListener("scroll"') ||
       text.includes("addEventListener('touchstart'") || text.includes('addEventListener("touchstart"')) &&
      !text.includes('passive: true')
    ) {
      const pos = call.getStart();
      const lineAndCol = sourceFile.getLineAndColumnAtPos(pos);
      violations.push({
        file: filePath,
        line: lineAndCol.line,
        column: lineAndCol.column,
        ruleId: 'CWV-004',
        severity: 'warning',
        element: 'addEventListener',
        message: 'Scroll/touch event listener added without { passive: true } (causes scroll latency and INP jank).',
        fix: 'Pass { passive: true } as the third argument to addEventListener.',
      });
    }
  }

  // Calculate Performance Readiness Score (0-100)
  const errorCount = violations.filter((v) => v.severity === 'error').length;
  const warningCount = violations.filter((v) => v.severity === 'warning').length;
  const score = Math.max(0, 100 - errorCount * 25 - warningCount * 10);

  return {
    file: filePath,
    score,
    violations,
  };
}

/**
 * Utility: Extract JSX attributes map
 */
function getAttributesMap(attributesNode: Node[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const attr of attributesNode) {
    if (Node.isJsxAttribute(attr)) {
      const name = attr.getNameNode().getText();
      const initializer = attr.getInitializer();
      map.set(name, initializer ? initializer.getText() : 'true');
    }
  }
  return map;
}

// CLI Execution Entrypoint
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const pathIndex = args.indexOf('--path');
  const targetDir = pathIndex !== -1 && args[pathIndex + 1] ? args[pathIndex + 1] : 'skills/cwv-inp-doctor/examples/';

  console.log(`\n⚡ Running Deterministic Core Web Vitals (INP/LCP/CLS) Audit on: ${targetDir}\n`);
  const reports = runCwvAstAudit(targetDir);

  let totalViolations = 0;
  let totalScore = 0;

  reports.forEach((report) => {
    totalViolations += report.violations.length;
    totalScore += report.score;

    const scoreColor = report.score >= 80 ? '\x1b[32m' : report.score >= 50 ? '\x1b[33m' : '\x1b[31m';
    console.log(`📄 File: \x1b[1m${report.file}\x1b[0m`);
    console.log(`   📊 Performance Readiness Score: ${scoreColor}${report.score}/100\x1b[0m`);

    if (report.violations.length > 0) {
      console.log(`   ⚠️ Diagnostics:`);
      report.violations.forEach((v) => {
        const tagColor = v.severity === 'error' ? '\x1b[31m' : '\x1b[33m';
        console.log(`      - [${tagColor}${v.ruleId}\x1b[0m] ${v.message}`);
        console.log(`        📍 Location: line ${v.line}:${v.column}`);
        console.log(`        💡 Fix: ${v.fix}`);
      });
    }
    console.log('');
  });

  const avgScore = reports.length > 0 ? Math.round(totalScore / reports.length) : 0;
  console.log(`🏁 CWV Audit Complete. Average Score: \x1b[1m${avgScore}/100\x1b[0m | Total Issues: ${totalViolations}\n`);

  const errorCount = reports.flatMap((r) => r.violations).filter((v) => v.severity === 'error').length;
  if (errorCount > 0) {
    process.exit(1);
  }
  process.exit(0);
}
