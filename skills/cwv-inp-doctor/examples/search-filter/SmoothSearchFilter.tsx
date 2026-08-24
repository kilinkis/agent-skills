import React, { useState, useDeferredValue, useMemo, useId } from 'react';

const MOCK_ITEMS = Array.from({ length: 5000 }, (_, i) => ({
  id: `item-${i}`,
  name: `Data Record ${i} - High Latency Entity`,
  category: i % 2 === 0 ? 'Engineering' : 'Architecture',
}));

// ✅ CWV-OPTIMIZED: React 19 useDeferredValue keeps keystrokes instant (INP < 50ms)
export function SmoothSearchFilter() {
  const [query, setQuery] = useState('');
  const inputId = useId();

  // Defer heavy list computation so typing never drops a frame
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const results = useMemo(() => {
    if (!deferredQuery.trim()) return MOCK_ITEMS;
    const lower = deferredQuery.toLowerCase();
    return MOCK_ITEMS.filter((item) => item.name.toLowerCase().includes(lower));
  }, [deferredQuery]);

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">INP-Optimized Concurrent Search</h2>
      <div>
        <label htmlFor={inputId} className="block text-sm font-semibold mb-1">
          Search Records
        </label>
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to search 5,000 items..."
          className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className={`mt-4 transition-opacity duration-150 ${isStale ? 'opacity-60' : 'opacity-100'}`}>
        <ul className="space-y-1 max-h-80 overflow-y-auto">
          {results.slice(0, 50).map((item) => (
            <li key={item.id} className="p-2 bg-slate-50 border border-slate-200 rounded text-sm">
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
