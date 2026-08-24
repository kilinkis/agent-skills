# 📑 W3C ARIA Authoring Practices Guide (APG) Patterns for React

Standard keyboard interaction and ARIA state specifications for common UI widgets based on the [W3C WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/).

---

## 1. Dialog (Modal) Pattern

* **Role**: `role="dialog"` or `role="alertdialog"`
* **Properties**:
  * `aria-modal="true"`: Tells assistive tech to treat outside DOM as non-existent.
  * `aria-labelledby="[header-id]"`: Points to the dialog heading element.
  * `aria-describedby="[body-id]"`: Optional, points to the dialog body summary.
* **Keyboard Interaction**:
  * `Tab` / `Shift + Tab`: Cycles focus only through focusable elements inside the dialog.
  * `Escape`: Closes the dialog immediately and returns focus to the trigger element.

---

## 2. Menu Button (Dropdown) Pattern

* **Trigger Button**:
  * `aria-haspopup="menu"`: Declares that clicking opens a menu.
  * `aria-expanded="true | false"`: Reflects open/closed state.
  * `aria-controls="[menu-id]"`: ID of the menu container.
* **Menu Container**:
  * `role="menu"` with `aria-orientation="vertical"`.
* **Menu Items**:
  * `role="menuitem"`.
* **Keyboard Interaction**:
  * `ArrowDown` on trigger: Opens menu and places focus on the first item.
  * `ArrowDown` / `ArrowUp` on items: Moves focus cyclically to next/previous item.
  * `Enter` / `Space`: Activates the focused item and closes the menu.
  * `Escape`: Closes the menu and returns focus to the trigger button.

---

## 3. Disclosure / Accordion Pattern

* **Trigger Button**:
  * `aria-expanded="true | false"`: Indicates disclosure state.
  * `aria-controls="[panel-id]"`: Points to the collapsible content container.
* **Panel Container**:
  * `id="[panel-id]"`
  * `hidden={!isOpen}`: Completely hides content from layout and accessibility tree when collapsed.
* **Keyboard Interaction**:
  * `Enter` / `Space`: Toggles expansion.
