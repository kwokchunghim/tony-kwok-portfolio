export interface ExternalPost {
  title: string;
  date: string;
  excerpt: string;
  href: string;
  source: string;
}

export type Block =
  | string
  | { heading: string }
  | { list: string[] }
  | { image: string; alt: string; caption?: string };

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
    title: "Semantic IDs—and How to Train Them",
    date: "Sep 2026",
    excerpt:
      "A look at how semantic IDs compress item embeddings into tokens, why simple residual K-Means can outperform RQ-VAE, and what generative recommenders do with them.",
    slug: "semantic-ids-and-how-to-train-them",
    body: [
      "Over the past few weeks, I’ve been shifting some of my attention from relational foundation models to generative recommenders (GenRecs). Working at Spotify, the idea of generating recommendations naturally interests me: how can we connect listeners with the right audio content?",
      { heading: "What semantic IDs are" },
      "One concept that keeps coming up is **semantic IDs**: short sequences of discrete tokens obtained by quantising dense item embeddings.",
      "Think of quantisation as approximating a continuous vector using a finite collection of representative vectors. Their indices become tokens. An item can then be represented as something like `(12, 45, 8, 19)`, which a generative model learns to predict one token at a time.",
      { heading: "Learning IDs with residual quantisation" },
      "Google’s **TIGER** trains a transformer to generate the next item’s semantic ID from a user’s interaction history. Its RQ-VAE starts with pretrained content embeddings, transforms them through an encoder, and quantises the resulting latent vectors. Each quantisation level approximates the residual left by previous levels. A decoder reconstructs the original embedding, with reconstruction, codebook and commitment losses training the components together. ([Rajput et al., 2023](https://papers.neurips.cc/paper_files/paper/2023/file/20dcab0f14046a5c6b02b61da9f13229-Paper-Conference.pdf))",
      "The residual idea reminds me of gradient boosting with squared-error loss: each stage addresses what previous stages failed to capture. The analogy is useful for understanding successive correction, although the training algorithms differ.",
      {
        image: "SEMANTIC_IDS_RQ_VAE",
        alt: "TIGER residual quantisation architecture showing a DNN encoder, three residual codebooks, semantic codes and a DNN decoder.",
        caption:
          "Figure 1. RQ-VAE encoder, residual quantisation and reconstruction. Source: Rajput et al. (2023), Figure 3.",
      },
      { heading: "When simpler quantisation wins" },
      "What surprised me in Spotify’s **GLIDE** paper was that residual K-Means outperformed RQ-VAE: **9.52% higher relative HitRate@30**, with fewer training complications. R-KMeans still learns centroids, but quantises the item embeddings directly, without an additional neural encoder–decoder. GLIDE’s embeddings come from a podcast-specific text encoder following BGE-M3’s architecture. ([D’Amico et al., 2026](https://arxiv.org/html/2603.17540), §§4.1 and 5.2.2)",
      "My hypothesis is that sufficiently good initial embeddings may leave less room for an additional learned transformation to help. That transformation could introduce distortion or optimisation difficulties without improving retrieval.",
      { heading: "What if a generated ID is invalid?" },
      "Another question bothered me: **what if the model generates a token sequence that doesn’t identify any real item?**",
      "TIGER’s nominal space contains 256⁴ = 4,294,967,296 combinations—approximately **4.29 billion**—versus roughly 12,000–18,000 catalogue items. Yet only **0.1%–1.6% of top-10 predictions were invalid** across its datasets. The authors suggest widening beam search and filtering invalid IDs. ([Rajput et al., 2023](https://papers.neurips.cc/paper_files/paper/2023/file/20dcab0f14046a5c6b02b61da9f13229-Paper-Conference.pdf), §§4 and 4.5)",
      "GLIDE also uses beam search, with 30 beams in production, and reports poorer retrieval with simpler decoding alternatives. Its evidence supports beam search for retrieval quality, rather than guaranteeing that every output is valid. ([D’Amico et al., 2026](https://arxiv.org/html/2603.17540), §§4.4.4 and 5.2.5)",
      { heading: "Why the representation is appealing" },
      "The appeal for me is the combination of **a compact output vocabulary and shared semantic structure**. Instead of learning a separate output token for every item, a model learns reusable code tokens and their combinations.",
      "For intuition, imagine two running shoes sharing an early prefix, with later tokens distinguishing finer details. This isn’t a manually assigned taxonomy: individual tokens need not translate neatly into “running,” “red” or a particular brand.",
      {
        image: "SEMANTIC_IDS_CATEGORIES",
        alt: "Category distributions for Amazon Beauty items grouped by prefixes of their semantic IDs.",
        caption:
          "Figure 2. Category distributions across semantic-code prefixes on Amazon Beauty. Source: Rajput et al. (2023), Figure 4.",
      },
      "There is still a learning problem after quantisation. Adding tokens to an LLM’s vocabulary doesn’t automatically give them meaning: their embeddings and predictive relationships need training. That can involve adapting a pretrained LLM or training a generative model from scratch.",
      { heading: "Beyond recommendation" },
      "I’m also curious about applications beyond recommendation—for example, representing customer behaviour as discrete codes for an LLM to model. That’s a hypothesis to test against alternatives such as dense-vector inputs, especially where quantisation might discard information the task needs.",
      "*This is an independent exploration of publicly available research, written in a personal capacity. This post is not affiliated with or endorsed by Spotify and does not represent Spotify’s views.*",
      { heading: "References" },
      "D’Amico, E., De Nadai, M., Chandar, P., Vohra, D., Lin, S., Lefarov, M., Gigioli, P., Penha, G., Kopysitsky, I., Senese, I. J., Mei, D., Fabbri, F., Semerci, O., Zhao, Y., Tang, V., St. Thomas, B., Ranieri, A., Smith, M. N. K., Bernkopf, A., . . . Bennett, P. N. (2026). *Deploying semantic ID-based generative retrieval for large-scale podcast discovery at Spotify* [Preprint]. arXiv. [https://doi.org/10.48550/arXiv.2603.17540](https://doi.org/10.48550/arXiv.2603.17540)",
      "Rajput, S., Mehta, N., Singh, A., Keshavan, R. H., Vu, T., Heldt, L., Hong, L., Tay, Y., Tran, V. Q., Samost, J., Kula, M., Chi, E. H., & Sathiamoorthy, M. (2023). Recommender systems with generative retrieval. *Advances in Neural Information Processing Systems, 36*. [https://doi.org/10.52202/075280-0452](https://doi.org/10.52202/075280-0452)",
    ],
  },
  {
    title: "Testing an Open Relational Foundation Model on My Laptop",
    date: "Aug 2026",
    excerpt:
      "I benchmarked zero-shot and continued-pretrained Relational Transformers against XGBoost and RelGT on two RelBench tasks — 18 hours on a 48GB Mac. One task was competitive; the other collapsed.",
    slug: "testing-an-open-relational-foundation-model",
    body: [
      "Since I posted twice about relational foundation models (RFMs), quite a few friends have reached out with questions. So I've decided to write about this space more regularly — starting with experiments, not just papers.",
      { heading: "The benchmark" },
      "I built [Relagentship](https://github.com/kwokchunghim/relagentship/tree/agent/add-reltrial-benchmark), a small open-source benchmark comparing four approaches:",
      {
        list: [
          "XGBoost with relational features",
          "Task-trained RelGT",
          "Zero-shot Relational Transformer (RT)",
          "RT continued-pretrained on other real databases",
        ],
      },
      { heading: "How RT works" },
      "RT, introduced in [Relational Transformer: Toward Zero-Shot Foundation Models for Relational Data](https://arxiv.org/abs/2510.06377) (Ranjan et al., 2025), is an ambitious idea: instead of engineering features or training a new model for every prediction task, it samples a neighbourhood around a target row by following database relationships, converts the connected cells into tokens, and predicts using examples found inside that context. The published [RT-PluRel checkpoint](https://huggingface.co/stanford-star/rt-plurel) can therefore attempt new tasks without updating its weights.",
      {
        image: "RT_ARCHITECTURE",
        alt: "Relational Transformer architecture: database schema and task schema, a sampled context window of cell tokens with in-context task labels, and transformer blocks with column, feature, neighbour and full attention feeding a per-datatype decoder.",
        caption:
          "How RT works: a sampled context window of cells from related tables is tokenised, then processed by relational attention layers that predict the masked target cell. Figure from Ranjan et al., \"Relational Transformer: Toward Zero-Shot Foundation Models for Relational Data\" (arXiv:2510.06377).",
      },
      { heading: "Results" },
      "I tested it on two RelBench tasks. Both ran locally on a 48 GB Mac in roughly 18 hours.",
      "On Formula 1 driver-top3, continued-pretrained RT was competitive: 0.844 AUROC, compared with 0.855 for XGBoost and 0.804 for RelGT.",
      "But on the larger clinical-trial study-outcome task, the result changed sharply. Zero-shot RT achieved 0.515 AUROC — almost random ranking — and continued pretraining improved it only to 0.590. XGBoost and RelGT reached 0.718 and 0.699 respectively.",
      "More strikingly, at its validation-selected threshold, zero-shot RT predicted the positive class for every test row. Its apparently respectable F1 score therefore concealed a serious failure mode.",
      { heading: "Caveats" },
      "This does not prove that RT is fundamentally broken. The comparison is not apples-to-apples: XGBoost and RelGT receive task-specific training, while RT uses published checkpoints. These are also fixed-seed local experiments.",
      { heading: "Why this rhymes with OpenRFM" },
      "However, the result rhymes closely with the diagnosis in the recent [OpenRFM paper](https://arxiv.org/abs/2606.04320). The authors argue that RT depends on labels encountered during its sampled relational walk. When too few label-bearing rows appear, its in-context support becomes sparse and prediction can collapse into something resembling underdetermined kernel regression. They also find that synthetic-only pretraining may remain in a \"lazy\" regime rather than learning genuinely useful relational features.",
      "Interestingly, study-outcome is one of the failure cases highlighted in that paper.",
      { heading: "Why this matters" },
      "A model used to choose actions cannot merely work on average — we need to understand when its relational context contains enough evidence, when its pretraining assumptions transfer, and when a confident-looking metric hides collapse.",
      "Next, I want to examine these failure modes directly: label coverage, neighbourhood composition, calibration, and whether OpenRFM's proposed fixes change the result.",
      { heading: "Looking forward" },
      "If RFMs eventually solve the prediction layer of enterprise ML the way LLMs solved much of NLP, I wonder whether policy decisioning becomes the next bottleneck for us MLEs to solve.",
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
