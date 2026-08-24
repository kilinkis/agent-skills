/**
 * @file validate-aeo-schema.ts
 * @description Deterministic AEO & Schema.org JSON-LD Entity Graph Validator.
 * 
 * Analyzes React/Next.js ASTs and JSON-LD payloads using `ts-morph` to enforce
 * Schema.org completeness, connected entity graphs, direct-answer summary blocks,
 * and high Information Gain scoring for AI Answer Engines (Perplexity, ChatGPT, Gemini).
 * 
 * Usage:
 *   pnpm exec tsx skills/aeo-search-architect/scripts/validate-aeo-schema.ts --path src/app/
 */

import { Project, SyntaxKind, Node } from 'ts-morph';
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';

export interface AeoViolation {
  file: string;
  line: number;
  column: number;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  fix: string;
}

export interface FileAeoReport {
  file: string;
  score: number; // 0 - 100 Information Gain & AEO score
  hasJsonLd: boolean;
  hasDirectAnswer: boolean;
  hasConnectedGraph: boolean;
  hasSpeakable: boolean;
  hasStructuredDataTables: boolean;
  entitiesFound: string[];
  violations: AeoViolation[];
}

// Low-density filler phrases that degrade Answer Engine Information Gain scores
const FLUFF_PATTERNS = [
  /in today('s)? (fast-paced )?(digital )?world/i,
  /without further ado/i,
  /let('s)? dive right in/i,
  /it is worth noting that/i,
  /at the end of the day/i,
  /in conclusion/i,
  /as we all know/i,
];

/**
 * Main Validation Engine
 */
export function runAeoValidation(targetPath: string): FileAeoReport[] {
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
  const reports: FileAeoReport[] = [];

  for (const sourceFile of sourceFiles) {
    const filePath = sourceFile.getFilePath();
    const fileName = path.basename(filePath);

    // Skip plain test files or config files
    if (fileName.includes('.test.') || fileName.includes('.spec.') || fileName.includes('.config.')) {
      continue;
    }

    const report = auditSourceFile(sourceFile);
    reports.push(report);
  }

  return reports;
}

/**
 * Audits a single source file for AEO and Schema.org compliance
 */
function auditSourceFile(sourceFile: any): FileAeoReport {
  const filePath = sourceFile.getFilePath();
  const violations: AeoViolation[] = [];
  const fullText = sourceFile.getFullText();

  let hasJsonLd = false;
  let hasDirectAnswer = false;
  let hasConnectedGraph = false;
  let hasSpeakable = false;
  let hasStructuredDataTables = false;
  const entitiesFound: string[] = [];

  // 1. Scan JSX elements for JSON-LD script tags
  const jsxElements = [
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxElement),
    ...sourceFile.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
  ];

  let jsonLdScriptFound = false;

  for (const el of jsxElements) {
    const tagName = Node.isJsxElement(el)
      ? el.getOpeningElement().getTagNameNode().getText()
      : el.getTagNameNode().getText();

    const pos = el.getStart();
    const lineAndCol = sourceFile.getLineAndColumnAtPos(pos);

    if (tagName === 'script') {
      const isLdJson = el.getText().includes('application/ld+json');
      if (isLdJson) {
        jsonLdScriptFound = true;
        hasJsonLd = true;
        validateJsonLdScript(el, sourceFile, filePath, lineAndCol, violations, (data) => {
          if (data['@graph'] && Array.isArray(data['@graph'])) {
            hasConnectedGraph = true;
            for (const item of data['@graph']) {
              if (item['@type']) entitiesFound.push(item['@type']);
              if (item.speakable) hasSpeakable = true;
            }
          } else if (data['@type']) {
            entitiesFound.push(data['@type']);
            if (data.speakable) hasSpeakable = true;
          }
        });
      }
    }

    // Check for high density elements (table, dl)
    if (tagName === 'table' || tagName === 'dl') {
      hasStructuredDataTables = true;
    }

    // Check for Direct Answer summary hooks
    const elementText = el.getText();
    if (
      elementText.includes('quick-answer') ||
      elementText.includes('key-takeaways') ||
      elementText.includes('Direct Answer') ||
      elementText.includes('Key Takeaways') ||
      elementText.includes('data-speakable') ||
      (elementText.includes('role=') && elementText.includes('region'))
    ) {
      hasDirectAnswer = true;
    }
  }

  // Also check if json-ld is declared in static objects or CMS schemas
  if (!jsonLdScriptFound && fullText.includes('@context') && fullText.includes('schema.org')) {
    hasJsonLd = true;
    if (fullText.includes('@graph')) hasConnectedGraph = true;
    if (fullText.includes('SpeakableSpecification') || fullText.includes('speakable')) hasSpeakable = true;
  }

  // 2. Check for missing Schema.org JSON-LD in page/component files
  const isPageComponent =
    filePath.includes('/examples/') ||
    filePath.includes('/app/') ||
    filePath.includes('/pages/') ||
    filePath.endsWith('Page.tsx') ||
    filePath.endsWith('Article.tsx');

  const isCmsSchema = filePath.includes('/cms-schema/') || filePath.toLowerCase().includes('schema');

  if (isPageComponent && !isCmsSchema && !hasJsonLd) {
    violations.push({
      file: filePath,
      line: 1,
      column: 1,
      ruleId: 'AEO-002',
      severity: 'error',
      message: 'Page component missing Schema.org JSON-LD structured data payload.',
      fix: 'Inject a <script type="application/ld+json"> with a connected @graph entity structure.',
    });
  }

  // 3. Check for Direct Answer BLUF block
  if (isPageComponent && !isCmsSchema && !hasDirectAnswer) {
    violations.push({
      file: filePath,
      line: 1,
      column: 1,
      ruleId: 'AEO-001',
      severity: 'warning',
      message: 'Missing direct-answer summary card or BLUF (Bottom Line Up Front) key takeaways block.',
      fix: 'Add a summary card with key bulleted takeaways and citation definitions within the top 200 tokens.',
    });
  }

  // 4. Check for Speakable specification
  if (hasJsonLd && !hasSpeakable && isPageComponent && !isCmsSchema) {
    violations.push({
      file: filePath,
      line: 1,
      column: 1,
      ruleId: 'AEO-003',
      severity: 'info',
      message: 'Schema.org metadata does not declare a SpeakableSpecification for voice/AI summary excerpting.',
      fix: 'Add a "speakable": { "@type": "SpeakableSpecification", "cssSelector": ["#quick-answer", ".key-takeaways"] } property.',
    });
  }

  // 5. Fluff detection (Information Gain degradation)
  FLUFF_PATTERNS.forEach((pattern) => {
    if (pattern.test(fullText)) {
      violations.push({
        file: filePath,
        line: 1,
        column: 1,
        ruleId: 'AEO-007',
        severity: 'warning',
        message: `Low-density conversational filler detected ("${pattern.source}"). Degrades Information Gain score.`,
        fix: 'Replace filler paragraphs with concise direct facts, definition lists (<dl>), or comparison tables.',
      });
    }
  });

  // Calculate Information Gain Score (0-100)
  let score = 0;
  if (hasJsonLd) score += 30;
  if (hasConnectedGraph) score += 20;
  if (hasDirectAnswer) score += 20;
  if (hasStructuredDataTables) score += 15;
  if (hasSpeakable) score += 15;

  // CMS Schema scoring bonus if it has rich fields
  if (isCmsSchema) {
    if (fullText.includes('directAnswerSummary') || fullText.includes('keyTakeaways')) {
      score = 95;
      hasDirectAnswer = true;
      hasConnectedGraph = true;
    } else {
      score = 30;
      violations.push({
        file: filePath,
        line: 1,
        column: 1,
        ruleId: 'AEO-009',
        severity: 'warning',
        message: 'CMS schema missing directAnswerSummary and keyTakeaways fields for AEO pipelines.',
        fix: 'Add directAnswerSummary and keyTakeaways fields to the CMS document schema.',
      });
    }
  }

  // Deduct for violations
  const errorCount = violations.filter((v) => v.severity === 'error').length;
  const warningCount = violations.filter((v) => v.severity === 'warning').length;
  score = Math.max(0, Math.min(100, score - errorCount * 20 - warningCount * 5));

  return {
    file: filePath,
    score,
    hasJsonLd,
    hasDirectAnswer,
    hasConnectedGraph,
    hasSpeakable,
    hasStructuredDataTables,
    entitiesFound: [...new Set(entitiesFound)],
    violations,
  };
}

/**
 * Validates JSON-LD script contents
 */
function validateJsonLdScript(
  scriptNode: Node,
  sourceFile: any,
  filePath: string,
  lineAndCol: { line: number; column: number },
  violations: AeoViolation[],
  onSuccess: (data: any) => void
) {
  const scriptText = scriptNode.getText();

  // Extract JSON payload from dangerouslySetInnerHTML or string literal
  const match = scriptText.match(/__html:\s*JSON\.stringify\(([\s\S]*?)\)/);

  if (match && match[1]) {
    const rawTarget = match[1].trim();

    // Check if target is a variable name declared in the file
    const varDecl = sourceFile.getVariableDeclaration(rawTarget);
    if (varDecl) {
      const initializer = varDecl.getInitializer();
      if (initializer) {
        try {
          const evalCode = `return (${initializer.getText()})`;
          const parsed = new Function(evalCode)();
          if (parsed) {
            validateSchemaObject(parsed, filePath, lineAndCol, violations);
            onSuccess(parsed);
            return;
          }
        } catch {
          // Complex or non-static initializer
        }
      }
    }

    try {
      const parsed = new Function(`return (${rawTarget})`)();
      if (parsed) {
        validateSchemaObject(parsed, filePath, lineAndCol, violations);
        onSuccess(parsed);
        return;
      }
    } catch {
      // Dynamic expression
      onSuccess({ '@type': 'DynamicGraph' });
      return;
    }
  }

  // Check direct child string literal
  const rawChildren = scriptNode.getDescendantsOfKind(SyntaxKind.StringLiteral);
  if (rawChildren.length > 0) {
    try {
      const jsonString = rawChildren[0].getLiteralValue();
      const parsed = JSON.parse(jsonString);
      validateSchemaObject(parsed, filePath, lineAndCol, violations);
      onSuccess(parsed);
    } catch {
      violations.push({
        file: filePath,
        line: lineAndCol.line,
        column: lineAndCol.column,
        ruleId: 'AEO-002',
        severity: 'error',
        message: 'Malformed JSON-LD payload inside <script type="application/ld+json">.',
        fix: 'Ensure JSON-LD is valid serialized JSON matching Schema.org specifications.',
      });
    }
  }
}

/**
 * Validates Schema.org properties on parsed JSON object
 */
function validateSchemaObject(
  data: any,
  filePath: string,
  lineAndCol: { line: number; column: number },
  violations: AeoViolation[]
) {
  if (!data['@context'] || !data['@context'].includes('schema.org')) {
    violations.push({
      file: filePath,
      line: lineAndCol.line,
      column: lineAndCol.column,
      ruleId: 'AEO-002',
      severity: 'error',
      message: 'Schema.org JSON-LD missing valid @context ("https://schema.org").',
      fix: 'Add "@context": "https://schema.org" at the root of the JSON-LD object.',
    });
  }

  const items = Array.isArray(data['@graph']) ? data['@graph'] : [data];

  for (const item of items) {
    if (!item['@type']) {
      violations.push({
        file: filePath,
        line: lineAndCol.line,
        column: lineAndCol.column,
        ruleId: 'AEO-002',
        severity: 'error',
        message: 'Schema.org entity missing required "@type" declaration.',
        fix: 'Declare a valid Schema.org @type (e.g., TechArticle, SoftwareApplication, FAQPage).',
      });
      continue;
    }

    // Specific type checks
    const type = item['@type'];
    if (type === 'TechArticle' || type === 'Article') {
      if (!item.headline) {
        violations.push({
          file: filePath,
          line: lineAndCol.line,
          column: lineAndCol.column,
          ruleId: 'AEO-004',
          severity: 'error',
          message: `${type} missing required "headline" attribute.`,
          fix: 'Provide a concise, factual "headline" in the article schema.',
        });
      }
      if (!item.author) {
        violations.push({
          file: filePath,
          line: lineAndCol.line,
          column: lineAndCol.column,
          ruleId: 'AEO-004',
          severity: 'warning',
          message: `${type} missing author attribution for E-E-A-T credentials.`,
          fix: 'Add an "author" object or @id reference with Person credentials.',
        });
      }
    }

    if (type === 'SoftwareApplication' || type === 'WebApplication') {
      if (!item.name || !item.applicationCategory) {
        violations.push({
          file: filePath,
          line: lineAndCol.line,
          column: lineAndCol.column,
          ruleId: 'AEO-005',
          severity: 'error',
          message: `${type} missing "name" or "applicationCategory".`,
          fix: 'Provide "name" and "applicationCategory" (e.g., DeveloperApplication).',
        });
      }
    }

    if (type === 'FAQPage') {
      if (!item.mainEntity || !Array.isArray(item.mainEntity) || item.mainEntity.length === 0) {
        violations.push({
          file: filePath,
          line: lineAndCol.line,
          column: lineAndCol.column,
          ruleId: 'AEO-006',
          severity: 'error',
          message: 'FAQPage missing "mainEntity" question-answer array.',
          fix: 'Provide a list of Question objects with acceptedAnswer fields.',
        });
      }
    }
  }
}

// CLI Execution Entrypoint
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const pathIndex = args.indexOf('--path');
  const targetDir = pathIndex !== -1 && args[pathIndex + 1] ? args[pathIndex + 1] : 'skills/aeo-search-architect/examples/';

  console.log(`\n🔍 Running Deterministic AEO & Schema.org Graph Audit on: ${targetDir}\n`);
  const reports = runAeoValidation(targetDir);

  let totalViolations = 0;
  let totalScore = 0;

  reports.forEach((report) => {
    totalViolations += report.violations.length;
    totalScore += report.score;

    const scoreColor = report.score >= 80 ? '\x1b[32m' : report.score >= 50 ? '\x1b[33m' : '\x1b[31m';
    console.log(`📄 File: \x1b[1m${report.file}\x1b[0m`);
    console.log(`   📊 Information Gain Score: ${scoreColor}${report.score}/100\x1b[0m`);
    console.log(`   🔗 Connected Graph:        ${report.hasConnectedGraph ? '✅ Yes' : '❌ No'}`);
    console.log(`   🎯 Direct Answer Block:    ${report.hasDirectAnswer ? '✅ Yes' : '❌ No'}`);
    console.log(`   🗣️ Speakable Specification: ${report.hasSpeakable ? '✅ Yes' : '❌ No'}`);
    if (report.entitiesFound.length > 0) {
      console.log(`   🏷️ Entities:               ${report.entitiesFound.join(', ')}`);
    }

    if (report.violations.length > 0) {
      console.log(`   ⚠️ Diagnostics:`);
      report.violations.forEach((v) => {
        const tagColor = v.severity === 'error' ? '\x1b[31m' : v.severity === 'warning' ? '\x1b[33m' : '\x1b[36m';
        console.log(`      - [${tagColor}${v.ruleId}\x1b[0m] ${v.message}`);
        console.log(`        💡 Fix: ${v.fix}`);
      });
    }
    console.log('');
  });

  const avgScore = reports.length > 0 ? Math.round(totalScore / reports.length) : 0;
  console.log(`🏁 Audit Complete. Average AEO Score: \x1b[1m${avgScore}/100\x1b[0m | Total Issues: ${totalViolations}\n`);

  // Exit with error code if any errors occurred
  const errorCount = reports.flatMap((r) => r.violations).filter((v) => v.severity === 'error').length;
  if (errorCount > 0) {
    process.exit(1);
  }
  process.exit(0);
}
