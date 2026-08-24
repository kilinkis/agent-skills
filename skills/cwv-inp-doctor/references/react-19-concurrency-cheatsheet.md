# ⚡ React 19 Concurrency & Performance Cheatsheet

A quick reference guide for utilizing React 19 concurrent features to achieve sub-50ms INP and non-blocking user interfaces.

---

## 1. Concurrent Hooks Overview

| Hook / API | Primary Use Case | INP Impact |
| :--- | :--- | :--- |
| **`startTransition(fn)`** | Mark state updates as non-urgent transitions | Allows high-priority typing/clicks to interrupt heavy state recalculations |
| **`useDeferredValue(val)`** | Defer rendering an expensive derived UI sub-tree | Immediate input response while background list renders concurrently |
| **`useActionState(fn)`** | Form and async action handling with pending state | Eliminates manual state flag boilerplate and sync event bottlenecks |
| **`useOptimistic(state)`** | Immediate optimistic UI response for mutations | 0ms perceived latency on user actions |

---

## 2. Patterns & Code Snippets

### `useDeferredValue` for Live Search Lists
```tsx
import { useState, useDeferredValue, useMemo } from 'react';

export function SearchList({ allItems }) {
  const [text, setText] = useState('');
  const deferredText = useDeferredValue(text);
  const isPending = text !== deferredText;

  const filtered = useMemo(() => {
    return allItems.filter(item => item.name.includes(deferredText));
  }, [allItems, deferredText]);

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <div style={{ opacity: isPending ? 0.7 : 1 }}>
        {filtered.map(item => <Row key={item.id} data={item} />)}
      </div>
    </div>
  );
}
```

### `startTransition` for Heavy Tab Navigation
```tsx
import { useState, useTransition } from 'react';

export function TabContainer() {
  const [tab, setTab] = useState('overview');
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (newTab: string) => {
    startTransition(() => {
      setTab(newTab);
    });
  };

  return (
    <div>
      <button onClick={() => handleTabChange('overview')}>Overview</button>
      <button onClick={() => handleTabChange('heavyAnalytics')}>Analytics</button>
      {isPending && <Spinner />}
      <TabContent tab={tab} />
    </div>
  );
}
```
