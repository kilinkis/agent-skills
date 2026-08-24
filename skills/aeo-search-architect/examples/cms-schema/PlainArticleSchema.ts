/**
 * ❌ UNOPTIMIZED: Plain CMS Document Schema (Sanity / Strapi / Headless CMS)
 * 
 * Lacks direct-answer metadata fields, entity linkage hooks, Speakable selectors,
 * and key takeaways needed by AI Answer Engine ingestion pipelines.
 */
export const plainArticleSchema = {
  name: 'article',
  title: 'Blog Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
};
