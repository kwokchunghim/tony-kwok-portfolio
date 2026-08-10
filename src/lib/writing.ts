export interface ExternalPost {
  title: string;
  date: string;
  excerpt: string;
  href: string;
  source: string;
}

export type Block = string | { list: string[] };

export interface InternalPost {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
  body: Block[];
}

export type Post = ExternalPost | InternalPost;

export function isInternal(post: Post): post is InternalPost {
  return "slug" in post;
}

export const POSTS: Post[] = [
  {
    title: "Testing an Open Relational Foundation Model on My Laptop",
    date: "Aug 2026",
    excerpt:
      "I benchmarked zero-shot and continued-pretrained Relational Transformers against XGBoost and RelGT on two RelBench tasks — 18 hours on a 48GB Mac. One task was competitive; the other collapsed.",
    slug: "testing-an-open-relational-foundation-model",
    body: [
      "Since I posted twice about relational foundation models (RFMs) and entity decision learning (EDL), quite a few friends have reached out with questions. So I've decided to write about this space more regularly — starting with experiments, not just papers.",
      "I built [Relagentship](https://github.com/kwokchunghim/relagentship/tree/agent/add-reltrial-benchmark), a small open-source benchmark comparing four approaches:",
      {
        list: [
          "XGBoost with relational features",
          "Task-trained RelGT",
          "Zero-shot Relational Transformer (RT)",
          "RT continued-pretrained on other real databases",
        ],
      },
      "RT is an ambitious idea: instead of engineering features or training a new model for every prediction task, it samples a neighbourhood around a target row by following database relationships, converts the connected cells into tokens, and predicts using examples found inside that context. The published [RT-PluRel checkpoint](https://huggingface.co/stanford-star/rt-plurel) can therefore attempt new tasks without updating its weights.",
      "I tested it on two RelBench tasks. Both ran locally on a 48 GB Mac in roughly 18 hours.",
      "On Formula 1 driver-top3, continued-pretrained RT was competitive: 0.844 AUROC, compared with 0.855 for XGBoost and 0.804 for RelGT.",
      "But on the larger clinical-trial study-outcome task, the result changed sharply. Zero-shot RT achieved 0.515 AUROC — almost random ranking — and continued pretraining improved it only to 0.590. XGBoost and RelGT reached 0.718 and 0.699 respectively.",
      "More strikingly, at its validation-selected threshold, zero-shot RT predicted the positive class for every test row. Its apparently respectable F1 score therefore concealed a serious failure mode.",
      "This does not prove that RT is fundamentally broken. The comparison is not apples-to-apples: XGBoost and RelGT receive task-specific training, while RT uses published checkpoints. These are also fixed-seed local experiments.",
      "However, the result rhymes closely with the diagnosis in the recent [OpenRFM paper](https://arxiv.org/abs/2606.04320). The authors argue that RT depends on labels encountered during its sampled relational walk. When too few label-bearing rows appear, its in-context support becomes sparse and prediction can collapse into something resembling underdetermined kernel regression. They also find that synthetic-only pretraining may remain in a \"lazy\" regime rather than learning genuinely useful relational features.",
      "Interestingly, study-outcome is one of the failure cases highlighted in that paper.",
      "For EDL, this matters enormously. A model used to choose actions cannot merely work on average — we need to understand when its relational context contains enough evidence, when its pretraining assumptions transfer, and when a confident-looking metric hides collapse.",
      "Next, I want to examine these failure modes directly: label coverage, neighbourhood composition, calibration, and whether OpenRFM's proposed fixes change the result.",
      "All notebooks, predictions, configurations, and reproducibility checks are in the repo.",
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
