/**
 * @file generate-a11y-test.ts
 * @description Automated accessibility test generator.
 * 
 * Generates ready-to-run Vitest + React Testing Library + jest-axe
 * test suites for any React component.
 * 
 * Usage:
 *   pnpm exec tsx skills/react-a11y-ast-refactorer/scripts/generate-a11y-test.ts --component Modal --path src/components/Modal.tsx
 */

import path from 'node:path';
import process from 'node:process';

export function generateA11yTestTemplate(componentName: string, importPath: string): string {
  return `import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { describe, it, expect } from 'vitest';
import { ${componentName} } from '${importPath}';

expect.extend(toHaveNoViolations);

describe('${componentName} Accessibility Suite (WCAG 2.2)', () => {
  it('should have zero axe-core accessibility violations', async () => {
    const { container } = render(
      <${componentName}
        isOpen={true}
        onClose={() => {}}
        title="Test ${componentName}"
      >
        <p>Accessible content body</p>
      </${componentName}>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should expose the correct accessible name and dialog role', () => {
    const { getByRole } = render(
      <${componentName}
        isOpen={true}
        onClose={() => {}}
        title="Test ${componentName}"
      >
        <p>Content</p>
      </${componentName}>
    );

    const dialog = getByRole('dialog', { name: /Test ${componentName}/i });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });
});
`;
}

// CLI Execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const compIndex = args.indexOf('--component');
  const pathIndex = args.indexOf('--path');

  const componentName = compIndex !== -1 && args[compIndex + 1] ? args[compIndex + 1] : 'AccessibleModal';
  const targetPath = pathIndex !== -1 && args[pathIndex + 1] ? args[pathIndex + 1] : './AccessibleModal';

  const testCode = generateA11yTestTemplate(componentName, targetPath);
  console.log(`\nGenerated Accessibility Test Spec for <${componentName} />:\n`);
  console.log(testCode);
}
