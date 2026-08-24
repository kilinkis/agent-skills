# 🤖 AI Answer Engine Crawler Guidelines & Indexing Heuristics

A technical reference guide detailing how modern **AI Answer Engines (Perplexity, OpenAI ChatGPT Search, Google AI Overviews, Anthropic Claude)** crawl, tokenize, extract facts, and rank structured web documents.

---

## 1. Major AI Crawler User-Agents & Behavior

| Crawler | Organization | Primary Function | Render Engine | robots.txt Directive |
| :--- | :--- | :--- | :--- | :--- |
| **`PerplexityBot`** | Perplexity AI | Real-time retrieval & citation generation | Headless Chromium (SSR preferred) | `User-agent: PerplexityBot` |
| **`OAI-SearchBot`** | OpenAI | ChatGPT Search real-time indexing | Headless Chromium | `User-agent: OAI-SearchBot` |
| **`GPTBot`** | OpenAI | Foundation model training & search indexing | Dynamic HTTP crawler | `User-agent: GPTBot` |
| **`GoogleOther` / `Google-Extended`** | Google | Gemini & Google AI Overviews ingestion | Googlebot rendering pipeline | `User-agent: Google-Extended` |
| **`ClaudeBot`** | Anthropic | Web retrieval & context grounding | HTTP/JSON parser | `User-agent: ClaudeBot` |

---

## 2. Key Answer Engine Indexing Heuristics

### 1. The "First 200 Tokens" Extraction Bias (BLUF)
* **Mechanism**: LLM retrieval models assign disproportionately high vector weight and attention to the first 200 tokens following the `<h1>` tag.
* **Implication**: Pages that bury the answer beneath introductory storytelling ("In today's digital world...") are routinely passed over in favor of concise, definition-first documents.
* **Rule**: Provide a **BLUF (Bottom Line Up Front)** direct-answer summary box directly below the title.

### 2. High Information Gain vs. Low Information Density
* **Concept**: Google's **Information Gain Score** patent and Perplexity's retrieval pipeline evaluate the ratio of unique semantic facts, code tokens, and metrics relative to word count.
* **High Density**: HTML tables (`<table>`), definition lists (`<dl>`), ordered steps (`<ol>`), and explicit numerical benchmarks.
* **Low Density**: Multi-paragraph transitions, generic rhetorical questions, and repetitive filler phrases.

### 3. Entity Graph Resolution via JSON-LD
* **Mechanism**: Crawlers parse embedded `<script type="application/ld+json">` graphs before rendering full client-side JavaScript.
* **Advantage**: Explicit `@graph` relationships allow Answer Engines to resolve ambiguous entity mentions instantly (e.g., distinguishing "React the library" from "react the verb").

### 4. DOM Chunking & Semantic Boundary Markers
* **Mechanism**: Search engines split web pages into semantic DOM chunks (`<article>`, `<section>`, `<header>`, `<main>`).
* **Rule**: Keep related questions, answers, and code snippets within bounded `<section aria-labelledby="...">` containers to prevent retrieval models from splitting context across chunk boundaries.

---

## 3. Recommended `robots.txt` Configuration for AEO

To ensure maximum visibility across all AI answer engines without exposing internal routes:

```txt
User-agent: *
Allow: /

# Allow AI Answer Engine crawlers
User-agent: PerplexityBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: ClaudeBot
Allow: /

Sitemap: https://example.com/sitemap.xml
```
