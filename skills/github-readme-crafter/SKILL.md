---
name: github-readme-crafter
description: Create or improve GitHub repository README files with polished visual storytelling, useful live-demo links, Mermaid diagrams, screenshots, tables, badges, and math notation when relevant.
---

# GitHub README Crafter

Use this skill whenever the user asks to write, create, rewrite, improve, or polish a `README.md` for a GitHub repository. It applies to repository landing pages, package READMEs, project documentation front doors, and README sections.

## Goal

Make the README useful at a glance and compelling to explore. Treat Markdown as a presentation format, while keeping every claim, link, image, and command grounded in the repository or information the user provides.

## Workflow

1. Inspect the repository before drafting. Identify the project purpose, entry points, supported platforms, package or app name, setup commands, scripts, screenshots, logos, assets, examples, deployment configuration, and existing documentation. Preserve accurate content unless the user asks for a rewrite.
2. Choose a clear information path based on the project. Usually: title and value proposition, badges, visual hero or screenshot, short overview, live demo, key features, quick start, usage, architecture or workflow, configuration, development, testing, deployment, contributing, and license. Omit sections that do not apply.
3. Add visual structure deliberately. Prefer a strong opening image or logo when a suitable local asset exists, feature tables for comparisons or capabilities, Mermaid for architecture or flows, and compact callouts or headings for scanability. Do not add decorative visuals that do not explain the project.
4. Make the first successful action obvious. Include prerequisites, copyable commands, expected results, and links to deeper docs. Keep commands consistent with the repository's actual package manager and scripts.
5. Validate the result. Check relative paths, anchor links, code fences, Mermaid syntax, table rendering, math delimiters, command accuracy, and that no placeholder text or invented URLs remain.

## Visual Markdown rules

- Use a centered title block only when it improves the landing page. It may include a logo, one-sentence pitch, badges, and links such as `Demo`, `Documentation`, and `Getting Started`.
- Use shields or badges only for meaningful project signals such as build status, coverage, release, license, package version, or demo availability. Point badges at real URLs.
- Use repository-relative image paths for committed screenshots and assets. Give every image descriptive alt text. If no suitable image exists, do not fabricate one or imply that a screenshot is available.
- Use Mermaid fenced blocks for architecture, request flows, state transitions, data pipelines, and other relationships that are clearer as a diagram. Keep diagrams small enough to render and understand on GitHub.
- Use Markdown tables for feature matrices, supported environments, configuration summaries, and concise comparisons. Do not force prose into a table.
- Use GitHub-compatible math notation only for genuinely mathematical projects or concepts. Use inline `$...$` for short expressions and display `$$...$$` for equations, with a plain-language explanation nearby when useful.
- Use HTML sparingly for layout that GitHub Markdown supports reliably, such as a centered image or a compact link row. Keep the README readable in raw Markdown and accessible to screen readers.

## Links and accuracy

Include a live demo link when the repository exposes a deployed URL, documents one, or the user supplies one. Look for deployment metadata and existing references before asking for a URL. Never invent a demo, documentation site, badge endpoint, screenshot, metric, feature, or command. Clearly label local examples versus hosted demos.

Prefer links that help a reader continue: documentation, API reference, examples, releases, issue tracker, contribution guide, and deployment preview. Use descriptive link text instead of bare URLs when possible.

## Writing and style

- Lead with what the project does and why someone should care.
- Keep the opening concise, then provide depth through headings, tables, diagrams, examples, and links.
- Favor concrete nouns, active verbs, and copyable examples over marketing filler.
- Use consistent heading levels and language throughout.
- Do not use em dashes (`—`) anywhere in the README. Rewrite with commas, colons, parentheses, or separate sentences.
- Do not add a table of contents for a short README. Add one only when the document is long enough that navigation benefits.

## Final review checklist

Before finishing, confirm that the README:

- explains the project in the first screenful;
- contains at least one meaningful visual element when the repository provides one;
- exposes a real live demo when one is available;
- uses Mermaid, tables, screenshots, formulas, or badges only where they add information;
- gives a newcomer a reliable quick-start path;
- contains no invented content, broken local paths, placeholder text, or em dashes.
