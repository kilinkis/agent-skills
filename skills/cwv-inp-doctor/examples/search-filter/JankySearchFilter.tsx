import React, { useState } from 'react';

const MOCK_ITEMS = Array.from({ length: 5000 }, (_, i) => ({
  id: `item-${i}`,
  name: `Data Record ${i} - High Latency Entity`,
  category: i % 2 === 0 ? 'Engineering' : 'Architecture',
}));

// ❌ UNOPTIMIZED: Synchronous heavy filtering inside onChange handler
// Blocks the main thread on every keystroke, causing severe INP degradation (> 400ms).
export function JankySearchFilter() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(MOCK_ITEMS);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    // Heavy synchronous filter directly in event callback
    const filtered = MOCK_ITEMS.filter((item) =>
      item.name.toLowerCase().includes(val.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
    setResults(filtered);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Unoptimized Search Filter</h2>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Type to search 5,000 items..."
        className="w-full p-2 border rounded"
      />
      <ul className="mt-4 space-y-1 max-h-80 overflow-y-auto">
        {results.slice(0, 50).map((item) => (
          <li key={item.id} className="p-2 bg-slate-50 border rounded text-sm">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
