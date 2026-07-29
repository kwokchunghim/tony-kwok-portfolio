## Add first essay to the Writing section

Replace the "Coming soon" placeholder in the Writing section of `src/routes/index.tsx` with a scalable list of essays, seeded with the LinkedIn post.

### Data structure
Add an `ESSAYS` array near `EXPERIENCE` / `INTERESTS`:
```ts
const ESSAYS = [
  {
    title: "When Models Become Commodities, Decisions Become the Job",
    date: "Jul 2026",
    excerpt: "TabFMs and RFMs may automate feature engineering and training. What's left for MLEs? Policy and decision-making.",
    href: "https://www.linkedin.com/in/tonykwokch", // to be replaced with the actual LinkedIn post URL
    body: `...full post text...`,
  },
];
```

Proposed title options (I'll use the first unless you pick another):
1. **When Models Become Commodities, Decisions Become the Job**
2. The Next MLE Bottleneck Isn't Modelling — It's Deciding
3. From Predictions to Policies: The Future of Business ML

### Rendering
Render essays as a vertical stack of cards inside the existing `Section id="writing"`, matching the site's minimal aesthetic (border, bg-card, hover state consistent with Experience/Contact cards):

```
[ Date · reading context ]
Title (h3, semibold)
Excerpt (muted-foreground, ~2 lines)
Read on LinkedIn →
```

Each card is an `<a>` linking to `href` with `target="_blank" rel="noreferrer noopener"`. When `href` is empty, render as a non-link card.

The full `body` is kept in the data model (not shown yet) so we can later switch to on-site essay pages without a data migration.

### Scalability
Adding a new essay = pushing one object onto `ESSAYS`. No new components, no route changes. If the list grows past ~6, we can later paginate or move each essay to its own route under `src/routes/writing/$slug.tsx` reusing the same data shape.

### Open question
Do you have the LinkedIn post URL to link to? If not, I'll leave `href` empty and the card will render without a link until you share it.
