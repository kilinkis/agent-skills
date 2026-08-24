import React from 'react';

// Structured Schema.org SoftwareApplication entity graph for technical search
const softwareSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://fastflow.ai/#organization',
      name: 'FastFlow Technologies',
      url: 'https://fastflow.ai',
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://fastflow.ai/#software',
      name: 'FastFlow AI Engine',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux, Windows, Cloud (Docker)',
      softwareVersion: '3.4.0',
      description: 'Deterministic AST-based workflow automation engine for TypeScript and React codebases.',
      offers: {
        '@type': 'Offer',
        price: '29.00',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '128',
      },
      featureList: [
        'TypeScript 5.7+ AST Refactoring Engine',
        'Headless Next.js App Router Metadata Synchronization',
        'Zero-Latency Local Validation CLI',
      ],
      author: { '@id': 'https://fastflow.ai/#organization' },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['#product-summary', '#technical-specs'],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://fastflow.ai/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does FastFlow AI require cloud network connectivity for local AST audits?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. FastFlow AI executes deterministic AST analysis completely offline using local ts-morph bindings.',
          },
        },
      ],
    },
  ],
};

// ✅ AEO-OPTIMIZED: SoftwareApplication Schema, Technical Specs Matrix, Direct Capability Card
export default function AeoOptimizedProduct() {
  return (
    <main className="max-w-4xl mx-auto p-8" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          FastFlow AI Engine: Deterministic TypeScript AST Refactoring
        </h1>
        <p className="mt-2 text-lg text-slate-600">
          Automate complex AST code migrations and Schema.org compliance with zero LLM hallucinations.
        </p>

        {/* BLUF Direct-Answer Product Summary */}
        <div
          id="product-summary"
          role="region"
          aria-label="Product Capability Overview"
          data-speakable="true"
          className="mt-6 p-5 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-slate-900"
        >
          <p className="font-semibold text-indigo-950 text-base mb-2">
            ⚡ Capability Summary & Specifications:
          </p>
          <ul className="space-y-1.5 text-sm text-slate-800 list-disc pl-5">
            <li><strong>Category:</strong> Developer Tool / Code Automation Engine.</li>
            <li><strong>Supported Environments:</strong> Node.js 22+, React 19, Next.js App Router, Docker.</li>
            <li><strong>Key Differentiator:</strong> Local deterministic AST execution with zero token cost.</li>
            <li><strong>Pricing:</strong> $29.00 USD/month with self-hosted CLI support.</li>
          </ul>
        </div>
      </header>

      {/* Technical Specifications Matrix */}
      <section className="mt-8" id="technical-specs" aria-labelledby="specs-title">
        <h2 id="specs-title" className="text-2xl font-bold mb-4">
          Technical Specifications & System Compatibility
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200 text-left text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border border-slate-200 p-3">Specification</th>
                <th className="border border-slate-200 p-3">Supported Value</th>
                <th className="border border-slate-200 p-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-slate-200 p-3 font-semibold">Compiler Engine</td>
                <td className="border border-slate-200 p-3">ts-morph / TypeScript 5.7+</td>
                <td className="border border-slate-200 p-3">Full AST traversal & mutation</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-semibold">Execution Latency</td>
                <td className="border border-slate-200 p-3">&lt; 150ms per component tree</td>
                <td className="border border-slate-200 p-3">Zero external API dependencies</td>
              </tr>
              <tr>
                <td className="border border-slate-200 p-3 font-semibold">Supported Frameworks</td>
                <td className="border border-slate-200 p-3">Next.js 14/15, Vite, Remix</td>
                <td className="border border-slate-200 p-3">Native App Router Server Component support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Structured FAQ Section */}
      <section className="mt-8" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <details className="p-4 rounded-xl border border-slate-200 bg-white">
            <summary className="font-semibold cursor-pointer">
              Does FastFlow AI require cloud network connectivity for local AST audits?
            </summary>
            <p className="mt-2 text-sm text-slate-600">
              No. FastFlow AI executes deterministic AST analysis completely offline using local ts-morph bindings.
            </p>
          </details>
        </div>
      </section>
    </main>
  );
}
