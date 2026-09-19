import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Music2 } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Section } from "@/components/portfolio/Section";
import { POSTS, isInternal } from "@/lib/writing";
import { getTopTracks } from "@/lib/spotify.functions";
import { getRecentlyPlayed } from "@/lib/spotify.functions";
import type { SpotifyTrack } from "@/lib/spotify.server";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tony Kwok — Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Machine Learning Engineer in London working on personalization, experimentation, retention, and customer decision-making.",
      },
      { property: "og:title", content: "Tony Kwok — Machine Learning Engineer" },
      {
        property: "og:description",
        content:
          "Machine Learning Engineer in London working on personalization, experimentation, retention, and customer decision-making.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://tonykwokch.com/social-preview.png?v=2" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Tony Kwok — Machine Learning Engineer" },
      {
        name: "twitter:description",
        content:
          "Machine Learning Engineer in London working on personalization, experimentation, retention, and customer decision-making.",
      },
      { name: "twitter:image", content: "https://tonykwokch.com/social-preview.png?v=2" },
    ],
  }),
  component: Index,
});

const EXPERIENCE = [
  {
    role: "Machine Learning Engineer",
    company: "Spotify",
    period: "Nov 2025 – Present",
    focus:
      "Leading the development of personalised subscription grace-period decisioning, from heuristic rules towards predictive and causal ML. Building supporting inference services and tooling for policy evaluation and experimentation.",
    themes: ["Personalisation", "Causal ML", "Production ML"],
  },
  {
    role: "Machine Learning Engineer",
    company: "Trainline",
    period: "Jun 2024 – Nov 2025",
    focus:
      "Worked on customer lifetime value prediction and contextual bandits for personalised content, supporting conversion optimisation and profitable growth.",
    themes: ["ML Systems", "Contextual bandits", "Personalisation"],
  },
  {
    role: "Machine Learning Engineer (Consultant)",
    company: "Guidehouse",
    period: "Aug 2023 – May 2024",
    focus:
      "Worked on digital twins for gas distribution networks, using property graphs and autoencoder-based synthetic data generation.",
    themes: ["Temporal heterogeneous graphs", "Autoencoders"],
  },
  {
    role: "Research Assistant (Medical AI)",
    company: "Dept. of Medicine, University of Hong Kong",
    period: "Aug 2021 – May 2022",
    focus:
      "Worked on convolutional neural networks for orthopaedic medical-image classification.",
    themes: ["Deep learning", "Medical imaging"],
  },
];

const INTERESTS = [
  {
    title: "Personalization",
    body: "Tailoring product experiences to individual customers using behavioural signals and machine learning.",
  },
  {
    title: "Growth Systems",
    body: "Models and pipelines that support acquisition, conversion, and lifetime value across the customer journey.",
  },
  {
    title: "Experimentation",
    body: "Designing and analysing A/B tests so product and business teams can make confident decisions.",
  },
  {
    title: "Decision Intelligence",
    body: "Connecting predictions to actions — turning model outputs into policies, thresholds, and business rules.",
  },
  {
    title: "Causal Inference",
    body: "Estimating real effects of interventions when randomised experiments aren't feasible or affordable.",
  },
  {
    title: "Foundation Models for Enterprise ML",
    body: "Relational foundation models and other enterprise FMs that predict directly from business data — and how to extend them from zero-shot predictions to zero-shot actions.",
  },
];

function TrackRow({ track, index }: { track: SpotifyTrack; index: number }) {
  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg p-2 transition hover:bg-background/60"
    >
      {track.image ? (
        <img
          src={track.image}
          alt={track.album}
          className="h-12 w-12 flex-shrink-0 rounded object-cover"
          loading="lazy"
        />
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded bg-border">
          <Music2 className="h-5 w-5 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">
          <span className="mr-2 text-muted-foreground">{index + 1}</span>
          {track.name}
        </p>
        <p className="truncate text-xs text-muted-foreground">{track.artist}</p>
      </div>
    </a>
  );
}

const TIME_RANGES = [
  { label: "1 month", value: "short_term" as const },
  { label: "3 months", value: "medium_term" as const },
  { label: "6 months", value: "long_term" as const },
];

function SpotifyListening() {
  const fetchTop = useServerFn(getTopTracks);
  const fetchRecent = useServerFn(getRecentlyPlayed);

  const [timeRange, setTimeRange] = useState<"short_term" | "medium_term" | "long_term">("medium_term");

  const topQuery = useQuery({
    queryKey: ["spotify-top", timeRange],
    queryFn: () => fetchTop({ data: { timeRange } }),
    staleTime: 1000 * 60 * 5,
  });
  const recentQuery = useQuery({
    queryKey: ["spotify-recent"],
    queryFn: () => fetchRecent(),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {/* Top tracks */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Top Tracks</h3>
          <div className="flex gap-1">
            {TIME_RANGES.map((r) => (
              <button
                key={r.value}
                onClick={() => setTimeRange(r.value)}
                className={`rounded-md px-2 py-1 text-xs transition ${
                  timeRange === r.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>
        {topQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 rounded bg-border animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-3/4 rounded bg-border animate-pulse" />
                  <div className="h-2.5 w-1/2 rounded bg-border animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : topQuery.data?.error ? (
          <p className="text-sm text-muted-foreground">Unavailable right now.</p>
        ) : (
          <div className="space-y-1">
            {(topQuery.data?.tracks ?? []).map((t, i) => (
              <TrackRow key={t.url + i} track={t} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Recently played */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="mb-1 text-sm font-semibold text-foreground">Recently Played</h3>
        <p className="mb-4 text-xs text-muted-foreground">Latest listening</p>
        {recentQuery.isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-12 w-12 flex-shrink-0 rounded bg-border animate-pulse" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-3/4 rounded bg-border animate-pulse" />
                  <div className="h-2.5 w-1/2 rounded bg-border animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : recentQuery.data?.error ? (
          <p className="text-sm text-muted-foreground">Unavailable right now.</p>
        ) : (
          <div className="space-y-1">
            {(recentQuery.data?.tracks ?? []).map((t, i) => (
              <TrackRow key={t.url + i} track={t} index={i} />
            ))}
          </div>
        )}
      </div>
      <a
        href="https://open.spotify.com/user/31hxmf42aaupgkgzoiwfbr7inb7m"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition hover:bg-accent"
      >
        <Music2 className="h-4 w-4" /> Listen with me on Spotify
      </a>
    </div>
  );
}

function Index() {
  return (
    <div id="top" className="relative min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO */}
      <section className="relative pt-40 pb-24 sm:pt-48 sm:pb-32">
        <div className="mx-auto w-full max-w-4xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" /> London, UK
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Machine learning for user understanding and personalisation.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              I'm Tony, a Machine Learning Engineer at Spotify in London. I build models and production ML systems that learn from user behaviour and optimise user journeys. I also write about recommender systems and foundation models for structured data.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:bg-foreground/90"
              >
                View experience
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-foreground/40"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="Background.">
        <div className="max-w-3xl space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
          <p>
            My work spans modelling, experimentation and the engineering needed to put ML into production. At Spotify, I work on personalising subscription experiences, connecting predictions to decisions and evaluating their impact through experiments.
          </p>
          <p>
            I'm particularly interested in how models learn useful representations of people and structured data. Recently, I've been exploring generative recommenders, tabular and relational foundation models, and how these approaches connect to practical decision-making.
          </p>
          <p>
            I studied Mathematics at the Chinese University of Hong Kong and Statistics at the University of Warwick, where my dissertation explored vision-language models for chest X-ray report generation.
          </p>
          <p>
            Away from work, I enjoy singing, badminton and playing music.
          </p>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="Experience" title="Selected roles.">
        <div className="divide-y divide-border rounded-xl border border-border bg-card">
          {EXPERIENCE.map((job) => (
            <div key={job.company + job.period} className="grid gap-3 p-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:p-8">
              <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {job.period}
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">{job.role}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">{job.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">{job.focus}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {job.themes.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* INTERESTS */}
      <Section id="interests" eyebrow="Areas of Interest" title="What I think about.">
        <div className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {INTERESTS.map((item) => (
            <div key={item.title} className="bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WRITING */}
      <Section id="writing" eyebrow="Writing" title="Notes and essays.">
        <p className="max-w-2xl text-sm text-muted-foreground">
          Thoughts on machine learning, experimentation, growth, and decision-making.
        </p>
        <div className="mt-8 divide-y divide-border rounded-xl border border-border bg-card">
          {POSTS.map((essay) => {
            const content = (
              <div className="grid gap-3 p-6 sm:grid-cols-[180px_1fr] sm:gap-8 sm:p-8">
                <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {essay.date}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {essay.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-base">
                    {essay.excerpt}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    {isInternal(essay) ? "Read post" : `Read on ${essay.source}`}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
            return isInternal(essay) ? (
              <Link
                key={essay.slug}
                to="/writing/$slug"
                params={{ slug: essay.slug }}
                className="block transition hover:bg-background/50"
              >
                {content}
              </Link>
            ) : (
              <a
                key={essay.title}
                href={essay.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:bg-background/50"
              >
                {content}
              </a>
            );
          })}
        </div>
      </Section>

      {/* SPOTIFY */}
      <Section id="listening" eyebrow="Now Playing" title="What I'm listening to.">
        <SpotifyListening />
      </Section>

      {/* CONTACT */}
      <Section id="contact" eyebrow="Contact" title="Get in touch.">
        <div className="max-w-2xl">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm particularly interested in speaking with operators and leaders working on
            retention, experimentation, lifecycle marketing, personalization, and customer
            decision-making.
          </p>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            If you're tackling these problems, I'd love to exchange ideas and learn how your
            team approaches them.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <a
              href="mailto:chkwok730@gmail.com"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-foreground/40"
            >
              <Mail className="h-4 w-4" /> Email
            </a>
            <a
              href="https://linkedin.com/in/tonykwokch"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-foreground/40"
            >
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://github.com/kwokchunghim"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-foreground/40"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <p>© {new Date().getFullYear()} Tony Kwok</p>
          <p>London, UK</p>
        </div>
      </footer>
    </div>
  );
}
