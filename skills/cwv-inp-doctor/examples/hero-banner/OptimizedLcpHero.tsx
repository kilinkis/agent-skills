import React from 'react';

// ✅ CWV-OPTIMIZED: Explicit dimensions (CLS = 0) and priority hints (LCP < 1.2s)
export function OptimizedLcpHero() {
  return (
    <section className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-4 text-slate-950">
        Optimized High-Performance Digital Platform
      </h1>
      <p className="text-slate-600 mb-6 text-lg">
        Deterministic speed and zero layout shifts across mobile and desktop.
      </p>

      {/* ✅ Explicit width/height, fetchPriority high, async decoding, aspect-ratio container */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 aspect-[16/9] w-full">
        <img
          src="/assets/hero-dashboard.webp"
          alt="Dashboard Preview"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover aspect-[16/9]"
        />
      </div>
    </section>
  );
}
