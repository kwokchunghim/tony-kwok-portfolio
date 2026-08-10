export interface ExternalPost {
  title: string;
  date: string;
  excerpt: string;
  href: string;
  source: string;
}

export interface InternalPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  body: string[];
}

export type Post = ExternalPost | InternalPost;

export function isInternal(post: Post): post is InternalPost {
  return "slug" in post;
}

export const POSTS: Post[] = [
  {
    title: "Placeholder: What Personalization Owes the Business",
    date: "Aug 2026",
    excerpt:
      "Placeholder excerpt — a short note on connecting personalization models to the metrics the business actually cares about.",
    slug: "what-personalization-owes-the-business",
    body: [
      "This is placeholder content for the first post written directly on this site. It will be replaced with the real essay.",
      "Personalization systems are easy to justify in the abstract and hard to justify on a P&L. The gap is usually not modelling quality — it is the missing translation layer between a predicted propensity and a decision someone is willing to ship.",
      "Placeholder paragraph: this section will cover how to define the decision, the constraint, and the counterfactual before any model is trained.",
      "Placeholder paragraph: this section will cover measurement — what an experiment can and cannot tell you about a policy that adapts to the user it is measuring.",
    ],
  },
  {
    title: "Why I'm Bullish on Relational Foundation Models",
    date: "Aug 2026",
    excerpt:
      "Relational foundation models learn directly from the relational data businesses already have — no hand-built feature pipelines. Here's why that shifts the ML stack.",
    href: "https://www.linkedin.com/posts/tonykwokch_im-bullish-on-relational-foundation-models-share-7489429166719709184-4zl0/",
    source: "LinkedIn",
  },
  {
    title: "When Models Become Commodities, Decisions Become the Job",
    date: "Jul 2026",
    excerpt:
      "TabFMs and Kumo's RFMs are quietly automating feature engineering and model training. What's left for MLEs? Policy and decision-making.",
    href: "https://www.linkedin.com/posts/tonykwokch_ive-been-learning-about-googles-tabfm-and-share-7487992050878009344-BgAj/",
    source: "LinkedIn",
  },
];
