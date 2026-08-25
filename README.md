# 🤖 Agent Skills

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript: 7.0+](https://img.shields.io/badge/TypeScript-7.0+-blue.svg)](https://www.typescriptlang.org/)
[![React: 19+](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)

A collection of custom agent skills for AI coding assistants (Google Antigravity, Claude Code, Cursor, Codex) designed for building and optimizing modern web applications and digital products.

Instead of relying on generic prompts, each skill packages focused workflows and domain guidance. Where objective checks add value, skills also include **deterministic AST analysis (`ts-morph`)** and **automated verification hooks**.

---

## 📚 Skill Catalog

| Skill Name | Domain | Focus |
| :--- | :--- | :--- |
| [**`react-a11y-ast-refactorer`**](./skills/react-a11y-ast-refactorer) | ♿ Accessibility | WCAG 2.2 AA/AAA compliance, focus traps, and APG keyboard patterns |
| [**`aeo-search-architect`**](./skills/aeo-search-architect) | 🤖 Generative Search & AEO | Schema.org entity graphs, BLUF direct-answer summaries, and citation hooks |
| [**`cwv-inp-doctor`**](./skills/cwv-inp-doctor) | ⚡ Performance & CWV | INP optimization, React 19 concurrency, CLS elimination, and LCP preloading |
| [**`playful-web-animations`**](./skills/playful-web-animations) | ✨ Web Animation | Purposeful motion, tasteful UI animation audits, playfulness, reduced motion, and interruption-safe implementation |

---

## 📦 Available Skills

* ♿ **[`react-a11y-ast-refactorer`](./skills/react-a11y-ast-refactorer)**
  * Scans JSX/TSX ASTs for non-interactive click handlers, missing ARIA dialog roles, and unlabelled inputs.
  * Injects accessible focus traps, `Escape` key listeners, and unique `useId()` label bindings.
  * Generates automated axe-core test specifications.

* 🤖 **[`aeo-search-architect`](./skills/aeo-search-architect)**
  * Injects connected Schema.org `@graph` JSON-LD payloads (`TechArticle`, `SoftwareApplication`, `FAQPage`).
  * Creates BLUF (Bottom Line Up Front) direct-answer summary cards prioritized by Perplexity and ChatGPT Search.
  * Enforces `SpeakableSpecification` DOM targeting and high Information Gain tables/definition lists.

* ⚡ **[`cwv-inp-doctor`](./skills/cwv-inp-doctor)**
  * De-risks main-thread blocking by applying React 19 concurrency (`startTransition`, `useDeferredValue`).
  * Eliminates Cumulative Layout Shift (CLS) by enforcing explicit media dimensions and aspect ratios.
  * Optimizes Largest Contentful Paint (LCP) with priority hints (`fetchPriority="high"`) and eager loading.

* ✨ **[`playful-web-animations`](./skills/playful-web-animations)**
  * Classifies motion as tangible, informative, attention-focusing, or joyful before implementation.
  * Keeps animation in mind while building new interfaces and identifies restrained motion opportunities in existing projects.
  * Verifies rapid reversal, reduced-motion behavior, accessibility, cleanup, and rendering performance.

---

## 🛠️ How to Install Skills

### For Google Antigravity & Codex
Copy the desired skill directory into your user or project skills folder:
```bash
# Global installation:
cp -r skills/<skill-name> ~/.gemini/config/skills/

# Local project installation:
cp -r skills/<skill-name> .gemini/skills/
```

### For Claude Code
```bash
cp -r skills/<skill-name> ~/.claude/skills/
```

### For Cursor
Add the instructions from any skill's `SKILL.md` directly into your `.cursorrules` or `.cursor/rules/`.

---

## 🧪 Running the Local Deterministic Auditors

```bash
# Install dependencies:
pnpm install

# Run the Accessibility AST Scanner:
pnpm audit:a11y --path src/components/

# Run the AEO Schema & Information Gain Validator:
pnpm audit:aeo --path src/app/

# Run the Core Web Vitals Performance Auditor:
pnpm audit:cwv --path src/components/
```

---

## 📄 License
MIT © [kilinkis](https://github.com/kilinkis)
