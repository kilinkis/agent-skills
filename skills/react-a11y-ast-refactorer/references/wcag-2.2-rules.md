# 📋 WCAG 2.2 Quick Reference for React Engineers

A consolidated reference matrix of the most critical **Web Content Accessibility Guidelines (WCAG 2.2 AA & AAA)** criteria applicable to React component development.

---

## 1. Perceivable (Information Must Be Presentable to Users)

| Criteria | Level | Rule Name | React / JSX Implementation |
| :--- | :--- | :--- | :--- |
| **1.1.1** | A | Non-text Content | Always provide `alt` for `<img>`. For SVG icons in buttons, use `aria-hidden="true"` and put `aria-label` on the parent `<button>`. |
| **1.3.1** | A | Info and Relationships | Use native semantic elements (`<dialog>`, `<nav>`, `<main>`, `<button>`). Bind `<label htmlFor={id}>` to `<input id={id}>` using React `useId()`. |
| **1.4.3** | AA | Contrast (Minimum) | Standard text must have at least **4.5:1** contrast against its background. Large text (18pt / 14pt bold) requires **3.0:1**. |
| **1.4.11** | AA | Non-text Contrast | UI components (borders, radio checks, focus rings) must have at least **3.0:1** contrast against adjacent colors. |

---

## 2. Operable (User Interface Components Must Be Navigable)

| Criteria | Level | Rule Name | React / JSX Implementation |
| :--- | :--- | :--- | :--- |
| **2.1.1** | A | Keyboard Navigation | All functionality must be operable via keyboard (`Tab`, `Shift+Tab`, `Enter`, `Space`, `ArrowKeys`). Never use `<div onClick>` without key listeners. |
| **2.1.2** | A | No Keyboard Trap | Ensure focus can be cycled out of widgets. For Modals, implement a **focus trap** that allows exit via the `Escape` key. |
| **2.4.1** | A | Bypass Blocks | Provide a "Skip to Content" anchor link at the top of the application tree. |
| **2.4.7** | AA | Focus Visible | Never set `outline: none` without providing a high-contrast replacement ring (e.g. `focus:ring-2 focus:ring-blue-500`). |
| **2.5.8** | AA | Target Size (Minimum) | Interactive targets must be at least **24×24 CSS pixels**, or have sufficient surrounding spacing (AAA requires **44×44px**). |

---

## 3. Understandable (Information & Operation Must Be Clear)

| Criteria | Level | Rule Name | React / JSX Implementation |
| :--- | :--- | :--- | :--- |
| **3.3.1** | A | Error Identification | When form validation fails, announce the error in text and set `aria-invalid="true"` on the failing input. |
| **3.3.2** | A | Labels or Instructions | Provide clear visible labels and helper text linked via `aria-describedby`. |
| **3.3.7** | A | Redundant Entry | Do not ask users to re-enter information previously provided in the same session. |

---

## 4. Robust (Content Must Be Interpretable by Assistive Tech)

| Criteria | Level | Rule Name | React / JSX Implementation |
| :--- | :--- | :--- | :--- |
| **4.1.2** | A | Name, Role, Value | Custom widgets must expose ARIA roles (`role="menu"`, `role="tab"`), states (`aria-expanded`, `aria-selected`), and accessible names. |
| **4.1.3** | AA | Status Messages | Dynamic asynchronous updates (toasts, live counters) must use `role="status"` or `aria-live="polite"`. |
