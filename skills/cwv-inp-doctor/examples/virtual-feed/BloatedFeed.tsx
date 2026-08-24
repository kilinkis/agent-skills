import React from 'react';

const FEED_POSTS = Array.from({ length: 200 }, (_, i) => ({
  id: `post-${i}`,
  title: `Activity Post #${i}`,
  content: `Detailed activity narrative for log entry ${i} with uncontained rendering.`,
  timestamp: `${i + 1}m ago`,
}));

// ❌ UNOPTIMIZED: Rendering 200 heavy DOM subtrees simultaneously without layout containment
export function BloatedFeed() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">Uncontained Activity Feed</h2>
      {FEED_POSTS.map((post) => (
        <div key={post.id} className="p-6 bg-white border rounded-xl shadow-sm">
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-slate-600 mt-2">{post.content}</p>
          <span className="text-xs text-slate-400 mt-4 block">{post.timestamp}</span>
        </div>
      ))}
    </div>
  );
}
