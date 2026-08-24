import React from 'react';

// Structured Schema.org entity graph for Perplexity, ChatGPT Search, and Google AI Overviews
const jsonLdPayload = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://agent-skills.dev/#organization',
      name: 'Agent Skills Dev',
      url: 'https://agent-skills.dev',
      logo: 'https://agent-skills.dev/logo.png',
    },
    {
      '@type': 'Person',
      '@id': 'https://agent-skills.dev/authors/kilinkis#person',
      name: 'kilinkis',
      jobTitle: 'Principal Agentic Engineer',
      worksFor: { '@id': 'https://agent-skills.dev/#organization' },
    },
    {
      '@type': 'TechArticle',
      '@id': 'https://agent-skills.dev/posts/react-a11y-guide#article',
      headline: 'Understanding Web Accessibility in Modern React (WCAG 2.2)',
      description: 'A deterministic guide to building WCAG 2.2 AA compliant React 19 applications with focus management and ARIA bindings.',
      proficiencyLevel: 'Intermediate',
      dependencies: 'React 19, TypeScript 7.0, WAI-ARIA 1.2',
      inLanguage: 'en-US',
      datePublished: '2026-08-24T12:00:00Z',
      dateModified: '2026-08-24T12:00:00Z',
      author: { '@id': 'https://agent-skills.dev/authors/kilinkis#person' },
      publisher: { '@id': 'https://agent-skills.dev/#organization' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#quick-answer', '#summary-definition', '.key-takeaway-item'],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://agent-skills.dev/posts/react-a11y-guide#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the minimum WCAG 2.2 target size for interactive elements?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WCAG 2.2 Success Criterion 2.5.8 (Level AA) requires interactive pointer targets to be at least 24x24 CSS pixels, or have sufficient spacing offset.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do you trap focus in a React 19 modal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Focus trapping requires listening for Tab/Shift+Tab keydown events within the dialog boundary, locking initial focus via useEffect, and restoring focus to the trigger element upon unmounting.',
          },
        },
      ],
    },
  ],
};

// ✅ AEO-OPTIMIZED: High Information Gain, Connected Entity Graph, Direct-Answer BLUF Card
export default function AeoOptimizedArticle() {
  return (
    <article className="max-w-4xl mx-auto p-6" aria-labelledby="article-title">
      {/* Schema.org Connected Entity Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }}
      />

      <header className="mb-8">
        <h1 id="article-title" className="text-3xl font-bold tracking-tight text-slate-900">
          Understanding Web Accessibility in Modern React (WCAG 2.2)
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Published by <span className="font-semibold">kilinkis</span> • Updated August 2026
        </p>

        {/* BLUF: Direct Answer / Key Takeaways Summary Card for Answer Engines */}
        <div
          id="quick-answer"
          role="region"
          aria-label="Direct Answer and Key Takeaways"
          data-speakable="true"
          className="mt-6 p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-slate-900"
        >
          <p id="summary-definition" className="font-semibold text-blue-950 text-base mb-2">
            ⚡ Direct Answer / Key Takeaways:
          </p>
          <ul className="space-y-2 text-sm text-slate-800 list-disc pl-5">
            <li className="key-takeaway-item">
              <strong>Core Requirement:</strong> React accessibility requires programmatic focus management, semantic HTML elements over raw `div` tags, and unique ID linking with <code>useId()</code>.
            </li>
            <li className="key-takeaway-item">
              <strong>WCAG 2.2 Target Size:</strong> Interactive hit targets must meet the 24×24 CSS pixel minimum (SC 2.5.8 Level AA).
            </li>
            <li className="key-takeaway-item">
              <strong>Dialog Semantics:</strong> Modals must specify <code>role="dialog"</code>, <code>aria-modal="true"</code>, and capture keyboard `Tab` cycles with `Escape` key dismissal.
            </li>
          </ul>
        </div>
      </header>

      {/* High-density structured comparison table for LLM parsing */}
      <section className="mt-8" aria-labelledby="matrix-title">
        <h2 id="matrix-title" className="text-xl font-bold mb-4">
          WCAG 2.2 Implementation Matrix for React
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-200 p-3">Criterion</th>
                <th className="border border-slate-200 p-3">Level</th>
                <th className="border border-slate-200 p-3">React Pattern</th>
                <th className="border border-slate-200 p-3">Verification Rule</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 p-3 font-mono">1.3.1 Info & Relationships</td>
                <td className="border border-slate-200 p-3">A</td>
                <td className="border border-slate-200 p-3"><code>useId()</code> bound to <code>&lt;label htmlFor&gt;</code></td>
                <td className="border border-slate-200 p-3">A11Y-004</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-mono">2.1.2 No Keyboard Trap</td>
                <td className="border border-slate-200 p-3">A</td>
                <td className="border border-slate-200 p-3">Keydown listener trapping Tab + Escape dismissal</td>
                <td className="border border-slate-200 p-3">A11Y-002</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-mono">2.5.8 Target Size</td>
                <td className="border border-slate-200 p-3">AA</td>
                <td className="border border-slate-200 p-3"><code>min-w-[24px] min-h-[24px]</code> Tailwind utility</td>
                <td className="border border-slate-200 p-3">A11Y-009</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Semantic Definition List for Entity Extraction */}
      <section className="mt-8" aria-labelledby="definitions-title">
        <h2 id="definitions-title" className="text-xl font-bold mb-4">
          Core Architectural Definitions
        </h2>
        <dl className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
          <div>
            <dt className="font-semibold text-slate-900">APG (Accessible Publishing and Authoring Practices Guide)</dt>
            <dd className="text-slate-600 mt-1">W3C specification outlining recommended keyboard navigation and ARIA attribute state machines for custom UI widgets.</dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">Focus Trap</dt>
            <dd className="text-slate-600 mt-1">A mechanism that prevents keyboard Tab navigation from leaving an active modal container until explicitly dismissed.</dd>
          </div>
        </dl>
      </section>

      {/* Structured FAQ Section */}
      <section className="mt-8" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="p-4 rounded-xl border border-slate-200 bg-white">
            <summary className="font-semibold cursor-pointer">
              What is the minimum WCAG 2.2 target size for interactive elements?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              WCAG 2.2 Success Criterion 2.5.8 (Level AA) requires interactive pointer targets to be at least 24×24 CSS pixels, or have sufficient spacing offset.
            </p>
          </details>
          <details className="p-4 rounded-xl border border-slate-200 bg-white">
            <summary className="font-semibold cursor-pointer">
              How do you trap focus in a React 19 modal?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              Focus trapping requires listening for Tab/Shift+Tab keydown events within the dialog boundary, locking initial focus via useEffect, and restoring focus to the trigger element upon unmounting.
            </p>
          </details>
        </div>
      </section>
    </article>
  );
}
