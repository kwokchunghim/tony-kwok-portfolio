## Swap one interest for foundation models in enterprise ML

Replace the **Machine Learning Infrastructure** card in the Areas of Interest grid with a new entry on foundation models for enterprise ML. It is the least distinctive of the six — pipelines/feature stores/serving overlap with the engineering already described in Experience, while personalization, growth, experimentation, decision intelligence, and causal inference each map to a specific theme you write about.

### New card

```
Title: Foundation Models for Enterprise ML
Body:  Relational foundation models and other tabular/enterprise FMs that
       predict directly from business data — and how to extend them from
       zero-shot predictions to zero-shot actions and decisions.
```

This also ties directly into your Writing section post on relational foundation models.

### Technical detail

Single edit to the `INTERESTS` array in `src/routes/index.tsx`: remove the `Machine Learning Infrastructure` object and add the new one in its place (keeping six items so the 3-column grid stays balanced). No component or layout changes.

If you'd rather drop a different interest, or want the wording to name Kumo/RFMs explicitly, say so and I'll adjust.
