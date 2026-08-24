# 🤖 Agent Skills: Production-Grade Toolkits for AI Coding Assistants

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript: 5.7+](https://img.shields.io/badge/TypeScript-5.7+-blue.svg)](https://www.typescriptlang.org/)
[![React: 19+](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![WCAG: 2.2 Compliant](https://img.shields.io/badge/WCAG-2.2%20AA%2FAAA-brightgreen.svg)](https://www.w3.org/WAI/standards-guidelines/wcag/)

A curated, open-source collection of **deterministic agent skills** designed to turn AI coding assistants (Google Antigravity, Claude Code, Cursor, Codex) into disciplined, specialized engineering experts.

Rather than relying on fuzzy "vibe prompts", these skills combine **deterministic AST (Abstract Syntax Tree) scripts**, **automated verification hooks**, and **authoritative domain references**.

---

## 📚 Skill Catalog

| Skill Name | Domain | Primary Focus | Status |
| :--- | :--- | :--- | :--- |
| [**`react-a11y-ast-refactorer`**](./skills/react-a11y-ast-refactorer) | ♿ Accessibility & WCAG 2.2 | In-place TSX AST scanning, focus traps, APG keyboard patterns, and axe-core test generation. | 🟢 Ready |
| **`aeo-search-architect`** *(Coming Soon)* | 🤖 AEO & Generative Search | Entity schema graphs, direct-answer synthesis, and CMS structured data pipelines for Perplexity & ChatGPT. | ⚪ Planned |
| **`cwv-inp-doctor`** *(Coming Soon)* | ⚡ Core Web Vitals | Main-thread blocking de-risking, `startTransition`, CLS layout shift prevention, and LCP preloading. | ⚪ Planned |

---

## ⚡ Flagship Skill: `react-a11y-ast-refactorer`

An expert accessibility skill that enables AI agents to parse local React/TypeScript code using **AST analysis (`ts-morph`)**, pinpoint WCAG 2.2 violations with exact line numbers, and refactor components in-place.

### 🔍 Before vs. After: Fixing an Inaccessible Modal

```diff
- // ❌ BEFORE: Leaky div popup, no keyboard trap, no ARIA role, focus trapped nowhere
- export const Modal = ({ isOpen, onClose, children }) => {
-   if (!isOpen) return null;
-   return (
-     <div className="overlay" onClick={onClose}>
-       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
-         <span className="close-btn" onClick={onClose}>✕</span>
-         {children}
-       </div>
-     </div>
-   );
- };

+ // ✅ AFTER: WCAG 2.2 compliant modal with focus trap, Escape key, and ARIA dialog
+ export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, titleId, children }) => {
+   const modalRef = useRef<HTMLDivElement>(null);
+   const previousFocus = useRef<HTMLElement | null>(null);
+
+   // Handle Escape key & trap focus within the modal container
+   useEffect(() => {
+     if (!isOpen) return;
+     previousFocus.current = document.activeElement as HTMLElement;
+     modalRef.current?.focus();
+
+     const handleKeyDown = (e: KeyboardEvent) => {
+       if (e.key === 'Escape') onClose();
+       if (e.key === 'Tab' && modalRef.current) {
+         const focusables = modalRef.current.querySelectorAll<HTMLElement>(
+           'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
+         );
+         const first = focusables[0];
+         const last = focusables[focusables.length - 1];
+         if (e.shiftKey && document.activeElement === first) {
+           last?.focus();
+           e.preventDefault();
+         } else if (!e.shiftKey && document.activeElement === last) {
+           first?.focus();
+           e.preventDefault();
+         }
+       }
+     };
+
+     window.addEventListener('keydown', handleKeyDown);
+     return () => {
+       window.removeEventListener('keydown', handleKeyDown);
+       previousFocus.current?.focus(); // Restore focus on close
+     };
+   }, [isOpen, onClose]);
+
+   if (!isOpen) return null;
+   return (
+     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
+       <div
+         ref={modalRef}
+         role="dialog"
+         aria-modal="true"
+         aria-labelledby={titleId}
+         tabIndex={-1}
+         onClick={(e) => e.stopPropagation()}
+         className="bg-white rounded-xl p-6 shadow-2xl max-w-md w-full focus:outline-none"
+       >
+         <button
+           onClick={onClose}
+           aria-label="Close dialog"
+           className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 rounded-lg min-w-[24px] min-h-[24px]"
+         >
+           ✕
+         </button>
+         {children}
+       </div>
+     </div>
+   );
+ };
```

---

## 🛠️ How to Install Skills

### For Google Antigravity & Codex
Copy the desired skill directory into your user or project skills folder:
```bash
# Global installation:
cp -r skills/react-a11y-ast-refactorer ~/.gemini/config/skills/

# Or local project installation:
cp -r skills/react-a11y-ast-refactorer .gemini/skills/
```

### For Claude Code
```bash
# Copy into your Claude Code skills directory:
cp -r skills/react-a11y-ast-refactorer ~/.claude/skills/
```

### For Cursor
Add the rules from `SKILL.md` directly into your `.cursorrules` or `.cursor/rules/a11y.mdc`.

---

## 🧪 Running the Local Deterministic AST Scanner

You can execute the standalone AST auditor against any directory in your codebase:

```bash
# Install dependencies:
pnpm install

# Run the AST accessibility scanner:
pnpm audit:a11y --path src/components/
```

---

## 📄 License
MIT © [kilinkis](https://github.com/kilinkis)
