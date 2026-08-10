# On-site blog posts in the Writing section

Keep the two existing LinkedIn essays exactly as they are (they keep linking out). Add support for posts that live on the site itself, and add one placeholder post as the third entry.

## What changes

- The Writing list gains a third entry: a placeholder post ("Placeholder title", current month, short placeholder excerpt) that links to an on-site page instead of LinkedIn.
- Clicking it opens a dedicated page at `/writing/<slug>` with the post title, date, and placeholder body copy, plus a "Back to writing" link.
- Each entry's call-to-action adapts: LinkedIn posts still say "Read on LinkedIn" and open in a new tab; on-site posts say "Read post" and navigate within the site.
- Every future post can be added by dropping one object into a single posts list — no layout work needed.

## Technical notes

- New shared data module `src/lib/writing.ts` holding a `POSTS` array. External items keep `href` + `source`; internal items get `slug` + `body` (array of paragraphs). Index page imports this instead of its local `ESSAYS` const.
- New route `src/routes/writing.$slug.tsx`: looks up the post by slug, renders it in the existing typography style with `Nav`, throws `notFound()` for unknown slugs, and defines its own `head()` with unique title/description/og tags.
- `src/routes/index.tsx` render logic branches on whether the entry has `href` (anchor, `target="_blank"`) or `slug` (`<Link to="/writing/$slug">`).
- `src/routes/sitemap[.]xml.ts` gains one entry per internal post, generated from the same `POSTS` array.
