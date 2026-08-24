import React from 'react';

// ❌ UNOPTIMIZED: Generic narrative blog post
// - No Schema.org JSON-LD structured data
// - No direct-answer summary block (buries conclusion under 500 words of filler)
// - Contains low-density fluff phrases that LLM crawlers discard
// - Unstructured prose instead of tables/definition lists
export default function UnoptimizedArticle() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">Understanding Web Accessibility in Modern React</h1>
      
      <p className="mt-4 text-slate-600">
        In today's fast-paced digital world, web development has evolved rapidly. Without further ado,
        let's dive right in to explore why accessibility is something every developer should care about.
        It is worth noting that making websites accessible is very important for all users across the globe.
      </p>

      <p className="mt-4 text-slate-600">
        When we build applications, we often forget about keyboard users. In conclusion, you should always test
        with a screen reader.
      </p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Common Questions</h2>
        <p className="mt-2 font-medium">What is WCAG?</p>
        <p className="text-slate-600">WCAG stands for Web Content Accessibility Guidelines, which are rules for the web.</p>
      </div>
    </div>
  );
}
