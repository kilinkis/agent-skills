/**
 * ✅ AEO-OPTIMIZED: Enriched CMS Schema for AI Answer Engines
 * 
 * Includes explicit fields for:
 * - BLUF Direct-Answer Summaries (under 60 words for citation hooks)
 * - Key Takeaways bullet lists
 * - Wikidata / Schema.org entity semantic references
 * - Structured FAQ question-answer pairs
 * - Speakable CSS selector targets
 */

export interface AeoEntityReference {
  name: string;
  sameAsUri: string; // e.g. "https://www.wikidata.org/wiki/Q11463" or "https://schema.org/TechArticle"
  type: string;
}

export interface AeoFaqItem {
  question: string;
  answer: string;
}

export const aeoEnrichedArticleSchema = {
  name: 'aeoArticle',
  title: 'AEO-Optimized Technical Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Headline (Schema.org headline)',
      type: 'string',
      description: 'Clear, informative title matching search intent.',
      validation: (Rule: any) => Rule.required().max(110),
    },
    {
      name: 'slug',
      title: 'Canonical Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'proficiencyLevel',
      title: 'Target Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'Beginner' },
          { title: 'Intermediate', value: 'Intermediate' },
          { title: 'Expert', value: 'Expert' },
        ],
      },
      initialValue: 'Intermediate',
    },
    {
      name: 'dependencies',
      title: 'Technical Dependencies (e.g. React 19, TypeScript 7.0)',
      type: 'string',
      description: 'Informs answer engines of software prerequisite versions.',
    },
    {
      name: 'directAnswerSummary',
      title: '⚡ Direct Answer / BLUF Summary (AEO Hook)',
      type: 'text',
      rows: 3,
      description: 'Concise 40-60 word definitive answer quoted directly by Perplexity and ChatGPT Search.',
      validation: (Rule: any) => Rule.required().max(350),
    },
    {
      name: 'keyTakeaways',
      title: 'Key Takeaways (Bulleted Information Gain)',
      type: 'array',
      of: [{ type: 'string' }],
      description: '3-5 high-density bulleted facts for summary cards.',
      validation: (Rule: any) => Rule.min(3).max(5),
    },
    {
      name: 'primaryEntities',
      title: 'Linked Knowledge Graph Entities (Wikidata / Schema.org)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Entity Name', type: 'string' },
            { name: 'sameAsUri', title: 'Wikidata / Authority URI', type: 'url' },
            { name: 'type', title: 'Schema.org Type', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'faqItems',
      title: 'Structured FAQ Entities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Direct Answer Text', type: 'text', rows: 2 },
          ],
        },
      ],
    },
    {
      name: 'author',
      title: 'Author Attribution (E-E-A-T Person Entity)',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body Content (Semantic Blocks)',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
