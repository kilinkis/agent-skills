# 📊 Core Web Vitals (CWV) Metric Thresholds & Diagnostics

Official Google Chrome User Experience Report (CrUX) and Lighthouse performance criteria for modern web applications.

---

## 1. Google Core Web Vitals Targets

| Metric | Full Name | Good (Green) | Needs Improvement (Yellow) | Poor (Red) | Primary Culprits |
| :--- | :--- | :---: | :---: | :---: | :--- |
| **INP** | **Interaction to Next Paint** | **&lt; 200ms** | 200ms – 500ms | &gt; 500ms | Heavy JS event handlers, long tasks, layout thrashing |
| **LCP** | **Largest Contentful Paint** | **&lt; 2.5s** | 2.5s – 4.0s | &gt; 4.0s | Unoptimized hero images, render-blocking CSS, slow TTFB |
| **CLS** | **Cumulative Layout Shift** | **&lt; 0.1** | 0.1 – 0.25 | &gt; 0.25 | Images/ads lacking dimensions, dynamic top-injected banners |
| **TTFB** | **Time to First Byte** | **&lt; 800ms** | 800ms – 1.8s | &gt; 1.8s | Uncached SSR queries, unoptimized database joins |
| **FCP** | **First Contentful Paint** | **&lt; 1.8s** | 1.8s – 3.0s | &gt; 3.0s | Large initial bundle, synchronous blocking scripts |

---

## 2. INP Breakdown & Optimization Strategy

INP measures the single worst latency interaction across a user's page visit.

```
Total Interaction Latency = [Input Delay] + [Processing Time] + [Presentation Delay]
```

1. **Input Delay**: Time spent waiting for main thread tasks to finish before the event handler runs.
   * *Fix*: Break long tasks using `scheduler.yield()` or web workers.
2. **Processing Time**: Execution time of the React event handler.
   * *Fix*: Move expensive calculations into `useDeferredValue` or `startTransition`.
3. **Presentation Delay**: Time needed by browser engine to calculate layout, styles, and paint pixels.
   * *Fix*: Avoid layout thrashing and keep DOM node counts under 1,500.

---

## 3. LCP Priority Hints

For critical above-the-fold hero images:
```html
<link rel="preload" fetchpriority="high" as="image" href="/hero.webp" type="image/webp">
```
In React/Next.js:
```tsx
<img
  src="/hero.webp"
  alt="Dashboard Hero"
  width={1920}
  height={1080}
  fetchPriority="high"
  decoding="async"
/>
```
