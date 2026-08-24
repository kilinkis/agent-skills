# 📋 AEO & Schema.org JSON-LD Cheat Sheet

A comprehensive reference of **Schema.org entity types** and JSON-LD structural patterns prioritized by **AI Answer Engines (Perplexity, ChatGPT Search, Google AI Overviews, Gemini)**.

---

## 1. Core Schema Types for Generative Search

| Schema.org Type | Primary Use Case | Key Answer Engine Signals |
| :--- | :--- | :--- |
| **`TechArticle`** | Technical guides, tutorials, API docs | `proficiencyLevel`, `dependencies`, `headline`, `speakable` |
| **`SoftwareApplication`** | SaaS tools, libraries, desktop apps | `applicationCategory`, `operatingSystem`, `offers`, `featureList` |
| **`FAQPage`** | FAQ sections, Q&A documentation | `mainEntity` with direct `Question` and `acceptedAnswer` |
| **`HowTo`** | Step-by-step implementation walkthroughs | `step` with `HowToStep`, `itemListElement`, `totalTime` |
| **`ItemList`** | Top tools, best practices rankings | `itemListElement`, `position`, `name`, `description` |
| **`Organization`** | Brand / Publisher authority | `name`, `url`, `logo`, `sameAs` (social/Wikidata) |
| **`Person`** | Author credentials & E-E-A-T | `name`, `jobTitle`, `worksFor`, `sameAs` (GitHub/LinkedIn) |
| **`SpeakableSpecification`** | Direct excerpt targeting for voice/AI | `cssSelector` or `xpath` pointing to BLUF summary nodes |

---

## 2. Connected Entity Graph Pattern (`@graph`)

Instead of isolated schema objects, combine all entities into a single `@graph` array linked via `@id` references:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Acme Corp",
      "url": "https://example.com",
      "sameAs": [
        "https://github.com/acme",
        "https://x.com/acme",
        "https://www.wikidata.org/wiki/Q12345"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://example.com/authors/john-doe#person",
      "name": "John Doe",
      "jobTitle": "Lead AI Engineer",
      "worksFor": { "@id": "https://example.com/#organization" },
      "sameAs": "https://github.com/johndoe"
    },
    {
      "@type": "TechArticle",
      "@id": "https://example.com/blog/aeo-guide#article",
      "isPartOf": { "@id": "https://example.com/#website" },
      "headline": "AEO Guide: Schema.org for AI Search",
      "description": "How to optimize websites for Perplexity and ChatGPT Search.",
      "proficiencyLevel": "Intermediate",
      "dependencies": "Next.js 15, React 19, TypeScript 5.7",
      "datePublished": "2026-08-24T12:00:00Z",
      "dateModified": "2026-08-24T12:00:00Z",
      "author": { "@id": "https://example.com/authors/john-doe#person" },
      "publisher": { "@id": "https://example.com/#organization" },
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": ["#quick-answer", ".key-takeaways"]
      }
    }
  ]
}
```

---

## 3. Schema Property Reference

### `TechArticle`
```json
{
  "@type": "TechArticle",
  "headline": "Exact, descriptive article title",
  "description": "150-character summary explaining the core solution",
  "proficiencyLevel": "Beginner | Intermediate | Expert",
  "dependencies": "Prerequisite software, libraries, and runtime versions",
  "inLanguage": "en-US",
  "author": { "@type": "Person", "name": "Author Name" },
  "publisher": { "@type": "Organization", "name": "Publisher Name" },
  "datePublished": "2026-08-24T00:00:00Z",
  "dateModified": "2026-08-24T12:00:00Z"
}
```

### `SoftwareApplication`
```json
{
  "@type": "SoftwareApplication",
  "name": "AppName",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "macOS, Linux, Windows",
  "softwareVersion": "2.1.0",
  "offers": {
    "@type": "Offer",
    "price": "0.00",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "94"
  }
}
```

### `FAQPage`
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the primary question?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Direct, 1-3 sentence factual answer without conversational filler."
      }
    }
  ]
}
```
