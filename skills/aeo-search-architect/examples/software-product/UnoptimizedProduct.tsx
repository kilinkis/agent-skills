import React from 'react';

// ❌ UNOPTIMIZED: SaaS product page without Schema.org or structured capability tables
export default function UnoptimizedProduct() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold">FastFlow AI: The Future of Workflow Automation</h1>
      
      <p className="mt-4 text-slate-600">
        In today's digital world, teams need automation. Without further ado, discover how our AI platform
        revolutionizes productivity for everyone across all industries.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Pricing</h2>
        <p className="mt-2 text-slate-600">Contact sales or get started for $29/mo.</p>
      </div>
    </div>
  );
}
