# ♿ `react-a11y-ast-refactorer` Agent Skill

An automated, deterministic accessibility auditing and refactoring toolkit for React & TypeScript applications, powered by **AST analysis (`ts-morph`)** and **WCAG 2.2 AA/AAA** standards.

---

## 🎯 Use Cases

* **Component Accessibility Audits**: Scan any React component tree for missing ARIA attributes, non-interactive click handlers, and broken keyboard cycles.
* **Modal Focus Trapping**: Auto-refactor raw `div` popups into full WCAG 2.2 compliant dialogs with `Escape` dismissal and focus restoration.
* **APG Menu Keyboard Navigation**: Transform simple click-only dropdowns into full W3C ARIA menu widgets with Arrow key navigation.
* **Form Error Announcers**: Bind form validation states with `useId()`, `aria-invalid`, and `aria-describedby` for live screen reader alerts.

---

## 🔍 Before vs. After Code Diffs

### 1. Modal Component (Focus Trap & ARIA Dialog)

```diff
- // ❌ BEFORE: Inaccessible popup, no keyboard trap, no Escape close
- export const Modal = ({ isOpen, onClose, children }) => {
-   if (!isOpen) return null;
-   return (
-     <div className="overlay" onClick={onClose}>
-       <div className="content" onClick={(e) => e.stopPropagation()}>
-         <span onClick={onClose}>✕</span>
-         {children}
-       </div>
-     </div>
-   );
- };

+ // ✅ AFTER: WCAG 2.2 Compliant Modal with Focus Trap & useId()
+ export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
+   const modalRef = useRef<HTMLDivElement>(null);
+   const previousFocus = useRef<HTMLElement | null>(null);
+   const titleId = useId();
+
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
+           e.preventDefault();
+           last?.focus();
+         } else if (!e.shiftKey && document.activeElement === last) {
+           e.preventDefault();
+           first?.focus();
+         }
+       }
+     };
+
+     window.addEventListener('keydown', handleKeyDown);
+     return () => {
+       window.removeEventListener('keydown', handleKeyDown);
+       previousFocus.current?.focus();
+     };
+   }, [isOpen, onClose]);
+
+   if (!isOpen) return null;
+   return (
+     <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
+       <div
+         ref={modalRef}
+         role="dialog"
+         aria-modal="true"
+         aria-labelledby={titleId}
+         tabIndex={-1}
+         onClick={(e) => e.stopPropagation()}
+         className="bg-white rounded-xl p-6 shadow-2xl max-w-lg w-full relative focus:outline-none"
+       >
+         <button
+           onClick={onClose}
+           aria-label="Close dialog"
+           className="absolute top-4 right-4 min-w-[24px] min-h-[24px] p-2 text-slate-500 rounded-lg hover:bg-slate-100"
+         >
+           ✕
+         </button>
+         <h2 id={titleId} className="text-xl font-bold mb-4">{title}</h2>
+         <div>{children}</div>
+       </div>
+     </div>
+   );
+ };
```

---

### 2. Form Input Validation (Error Linking & `useId`)

```diff
- // ❌ BEFORE: Label missing htmlFor, error message not announced to screen readers
- <label>Email</label>
- <input type="text" value={email} onChange={...} />
- {error && <p className="text-red-500">{error}</p>}

+ // ✅ AFTER: Dynamic useId(), aria-invalid, and aria-describedby binding
+ const emailInputId = useId();
+ const emailErrorId = useId();
+
+ <label htmlFor={emailInputId} className="block text-sm font-semibold">Email Address</label>
+ <input
+   id={emailInputId}
+   type="email"
+   value={email}
+   onChange={...}
+   aria-invalid={error ? 'true' : 'false'}
+   aria-describedby={error ? emailErrorId : undefined}
+   className="..."
+ />
+ {error && (
+   <p id={emailErrorId} role="alert" aria-live="polite" className="text-xs text-red-600 mt-1">
+     {error}
+   </p>
+ )}
```

---

## 💻 Running the Deterministic AST Auditor

```bash
# In the agent-skills root:
pnpm install

# Audit any folder or component file:
pnpm audit:a11y --path skills/react-a11y-ast-refactorer/examples/
```
