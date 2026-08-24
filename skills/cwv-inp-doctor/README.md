# ⚡ `cwv-inp-doctor` Agent Skill

An automated, deterministic Core Web Vitals (CWV) performance toolkit for React 19 and Next.js applications. Equips AI coding assistants to audit, de-risk main-thread blocking operations, apply React 19 concurrency primitives, eliminate layout shifts, and prioritize critical assets.

---

## 🎯 Use Cases

* **INP (Interaction to Next Paint) Optimization**: Refactor synchronous input handlers with `useDeferredValue` and `startTransition` to achieve sub-50ms interaction response times.
* **CLS (Cumulative Layout Shift) Elimination**: Identify missing aspect ratios and dimensions on media tags to lock visual layout before loading.
* **LCP (Largest Contentful Paint) Acceleration**: Remove lazy loading from above-the-fold hero banners and inject priority hints (`fetchPriority="high"`).
* **Scroll Performance**: Ensure all window scroll and touch listeners are marked `{ passive: true }`.
* **Offscreen Content Containment**: Apply `content-visibility: auto` to virtual feeds and large DOM structures.

---

## 💻 Running the Deterministic CWV Auditor

```bash
# In the agent-skills root:
pnpm install

# Audit any directory or component file for Core Web Vitals issues:
pnpm audit:cwv --path src/components/
```
