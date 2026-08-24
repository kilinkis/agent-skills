# 🤖 Agent Skills: Production-Grade Toolkits for AI Coding Assistants

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript: 5.7+](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![React: 19+](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)

A curated, open-source collection of **deterministic agent skills** designed to turn AI coding assistants (Google Antigravity, Claude Code, Cursor, Codex) into disciplined, specialized engineering experts.

Rather than relying on fuzzy "vibe prompts", these skills combine **deterministic AST (Abstract Syntax Tree) scripts**, **automated verification hooks**, and **authoritative domain references**.

---

## 📚 Skill Catalog

| Skill Name | Domain | Primary Focus | Status |
| :--- | :--- | :--- | :--- |
| **`react-a11y-ast-refactorer`** *(Coming Soon)* | ♿ Accessibility & WCAG 2.2 | In-place TSX AST scanning, focus traps, APG keyboard patterns, and axe-core test generation. | ⚪ Planned |
| **`aeo-search-architect`** *(Coming Soon)* | 🤖 AEO & Generative Search | Entity schema graphs, direct-answer synthesis, and CMS structured data pipelines for Perplexity & ChatGPT. | ⚪ Planned |
| **`cwv-inp-doctor`** *(Coming Soon)* | ⚡ Core Web Vitals | Main-thread blocking de-risking, `startTransition`, CLS layout shift prevention, and LCP preloading. | ⚪ Planned |

---

## 🛠️ How to Install Skills

### For Google Antigravity & Codex
Copy the desired skill directory into your user or project skills folder:
```bash
# Global installation:
cp -r skills/<skill-name> ~/.gemini/config/skills/

# Or local project installation:
cp -r skills/<skill-name> .gemini/skills/
```

### For Claude Code
```bash
# Copy into your Claude Code skills directory:
cp -r skills/<skill-name> ~/.claude/skills/
```

### For Cursor
Add the rules from `SKILL.md` directly into your `.cursorrules` or `.cursor/rules/`.

---

## 📄 License
MIT © [kilinkis](https://github.com/kilinkis)
