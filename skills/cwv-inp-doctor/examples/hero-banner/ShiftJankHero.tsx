import React from 'react';

// ❌ UNOPTIMIZED: Hero banner with loading="lazy" and missing width/height
// Triggers Cumulative Layout Shift (CLS > 0.25) and delays Largest Contentful Paint (LCP > 3.8s)
export function ShiftJankHero() {
  return (
    <section className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4">Unoptimized Digital Platform</h1>
      <p className="text-slate-600 mb-6">Building next generation web experiences.</p>
      
      {/* ❌ Missing width/height and has lazy loading on above-the-fold hero */}
      <img
        src="/assets/hero-dashboard.webp"
        alt="Dashboard Preview"
        loading="lazy"
        className="w-full"
      />
    </section>
  );
}
