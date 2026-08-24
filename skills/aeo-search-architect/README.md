# 🤖 `aeo-search-architect` Agent Skill

An automated, deterministic Answer Engine Optimization (AEO) and Schema.org entity graph toolkit for Next.js, React, and Headless CMS applications. Equips AI agents to maximize citation likelihood and Information Gain scores on **Perplexity, ChatGPT Search, Google AI Overviews, and Gemini**.

---

## 🎯 Use Cases

* **Direct-Answer Architecture (BLUF)**: Inject concise, high-visibility summary cards within the top 200 tokens to serve as direct citation hooks for AI search engines.
* **Connected Schema.org Graphs**: Generate linked `@graph` JSON-LD structures connecting `Organization` ➡️ `Person` ➡️ `TechArticle` / `SoftwareApplication` ➡️ `FAQPage`.
* **Speakable Excerpt Targeting**: Pinpoint precise DOM nodes with `SpeakableSpecification` for AI voice outputs and search overviews.
* **Headless CMS Enrichment**: Upgrade Sanity, Strapi, and Contentful schemas with structured fields for entity URIs, key takeaways, and direct answer summaries.
* **Information Gain Optimization**: Replace conversational filler with high-density comparison tables, definition lists (`<dl>`), and technical matrices.

---

## 🔍 Before vs. After Code Diffs

### 1. Next.js App Router Page (Direct-Answer & Connected Entity Graph)

```diff
- // ❌ BEFORE: Narrative filler, no Schema.org, answer buried at bottom
- export default function ArticlePage() {
-   return (
-     <div className="p-6">
-       <h1>Understanding Web Accessibility</h1>
-       <p>In today's fast-paced digital world, web development is evolving...</p>
-       <p>Without further ado, let's dive in...</p>
-       <p>In conclusion, accessibility is important.</p>
-     </div>
-   );
- }

+ // ✅ AFTER: AEO-Optimized with @graph JSON-LD, BLUF Summary Card & High Information Density
+ export default function ArticlePage() {
+   const jsonLd = {
+     '@context': 'https://schema.org',
+     '@graph': [
+       {
+         '@type': 'TechArticle',
+         '@id': 'https://example.com/posts/a11y-guide#article',
+         'headline': 'Understanding Web Accessibility in Modern React',
+         'proficiencyLevel': 'Intermediate',
+         'dependencies': 'React 19, TypeScript 7.0',
+         'speakable': {
+           '@type': 'SpeakableSpecification',
+           'cssSelector': ['#quick-answer', '.key-takeaways']
+         }
+       }
+     ]
+   };
+
+   return (
+     <article className="max-w-4xl mx-auto p-6" aria-labelledby="post-title">
+       <script
+         type="application/ld+json"
+         dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
+       />
+       <header className="mb-8">
+         <h1 id="post-title" className="text-3xl font-bold">Understanding Web Accessibility in Modern React</h1>
+         
+         {/* BLUF Direct Answer Block (Top 200 Tokens) */}
+         <div id="quick-answer" role="region" aria-label="Key Takeaways" className="mt-4 p-4 rounded-xl bg-blue-50 border border-blue-200">
+           <p className="font-semibold text-blue-900 mb-2">⚡ Direct Answer / Key Takeaways:</p>
+           <ul className="list-disc pl-5 text-sm text-blue-950 space-y-1">
+             <li><strong>Target Size:</strong> WCAG 2.2 SC 2.5.8 requires at least 24×24 CSS pixels.</li>
+             <li><strong>Dialogs:</strong> Enforce role="dialog", aria-modal="true", and focus trapping.</li>
+           </ul>
+         </div>
+       </header>
+       
+       {/* High-density structured table */}
+       <table className="w-full border-collapse border border-slate-200 text-sm">
+         ...
+       </table>
+     </article>
+   );
+ }
```

---

### 2. CMS Document Schema (Plain ➡️ AEO Enriched)

```diff
- // ❌ BEFORE: Minimal schema missing structured answer engine fields
- export const articleSchema = {
-   name: 'article',
-   type: 'document',
-   fields: [
-     { name: 'title', type: 'string' },
-     { name: 'slug', type: 'slug' },
-     { name: 'body', type: 'array', of: [{ type: 'block' }] },
-   ],
- };

+ // ✅ AFTER: AEO-enriched schema with entity hooks & direct-answer metadata
+ export const aeoArticleSchema = {
+   name: 'aeoArticle',
+   title: 'AEO Technical Article',
+   type: 'document',
+   fields: [
+     { name: 'title', type: 'string', validation: (Rule) => Rule.required().max(110) },
+     { name: 'slug', type: 'slug', validation: (Rule) => Rule.required() },
+     {
+       name: 'directAnswerSummary',
+       title: '⚡ Direct Answer / BLUF Summary',
+       type: 'text',
+       rows: 3,
+       description: 'Concise 40-60 word citation hook for Perplexity & ChatGPT Search.',
+       validation: (Rule) => Rule.required().max(350),
+     },
+     {
+       name: 'keyTakeaways',
+       title: 'Key Takeaways (High Information Gain Bullets)',
+       type: 'array',
+       of: [{ type: 'string' }],
+       validation: (Rule) => Rule.min(3).max(5),
+     },
+     {
+       name: 'primaryEntities',
+       title: 'Wikidata / Schema.org Entity References',
+       type: 'array',
+       of: [{ type: 'object', fields: [{ name: 'name', type: 'string' }, { name: 'sameAsUri', type: 'url' }] }],
+     },
+     {
+       name: 'faqItems',
+       title: 'Structured FAQ Entities',
+       type: 'array',
+       of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'answer', type: 'text' }] }],
+     },
+     { name: 'body', type: 'array', of: [{ type: 'block' }] },
+   ],
+ };
```

---

## 💻 Running the Deterministic AEO Validator

```bash
# In the agent-skills root:
pnpm install

# Run the AEO schema & Information Gain auditor:
pnpm audit:aeo --path skills/aeo-search-architect/examples/
```
