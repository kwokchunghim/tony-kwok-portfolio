import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, MapPin, ExternalLink } from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { NeuralBackground } from "@/components/portfolio/NeuralBackground";
import { Section } from "@/components/portfolio/Section";

export const Route = createFileRoute("/")({
  component: Index,
});

const EXPERIENCE = [
  {
    role: "Machine Learning Engineer",
    company: "Spotify",
    period: "Nov 2025 – Present",
    bullets: [
      "Subscriptions R&D — User Understanding.",
    ],
  },
  {
    role: "Machine Learning Engineer",
    company: "Trainline",
    period: "Jun 2024 – Nov 2025",
    bullets: [
      "Profitable Growth and Customer LTV.",
    ],
  },
  {
    role: "Machine Learning Engineer (Consultant)",
    company: "Guidehouse",
    period: "Aug 2023 – May 2024",
    bullets: [
      "Digital Twins for Gas Distribution Network.",
    ],
  },
  {
    role: "Applied Data Scientist",
    company: "Dept. of Medicine, University of Hong Kong",
    period: "Aug 2021 – May 2022",
    bullets: [
      "Image Classification for Orthopaedics.",
    ],
  },
];

const SKILLS: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["Python", "SQL", "Scala (Scio)", "Java"] },
  { label: "ML Frameworks", items: ["PyTorch", "TensorFlow / TFX", "HuggingFace", "XGBoost", "Ray"] },
  { label: "Data Platforms", items: ["GCP (BigQuery, Bigtable, Dataflow)", "AWS (Athena, EMR)", "Redis"] },
  { label: "ML Platforms", items: ["Databricks", "Kubeflow", "MLflow", "Feast", "Vertex AI", "NVIDIA Triton"] },
  { label: "DevOps / Infra", items: ["Flyte", "Airflow", "Jenkins", "Kubernetes", "Docker", "Terraform", "AWS ECS"] },
];

function Index() {
  return (
    <div id="top" className="relative min-h-screen overflow-x-clip">
      <Nav />

      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-primary)" }}
        />
        <NeuralBackground />
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              Entering my builder era · startup-bound
            </div>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Tony C.H. Kwok
            </h1>
            <p className="mt-4 text-xl font-medium text-gradient sm:text-2xl">
              ML engineer, learning to build
            </p>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Spent a few years shipping ML at scale. Spending the next few
              figuring out how to build my own things.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#experience"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
              >
                See what I've shipped
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="mailto:chkwok730@gmail.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:border-primary/60 hover:text-primary"
              >
                <Mail className="h-4 w-4" /> Say hi
              </a>
            </div>

            <div className="mt-10 flex items-center gap-5 text-muted-foreground">
              <a href="https://github.com/kwokchunghim" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="transition hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/tonykwokch" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="transition hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:chkwok730@gmail.com" aria-label="Email" className="transition hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <Section id="about" eyebrow="About" title="From shipping ML to shipping products.">
        <div className="glass rounded-2xl p-8 sm:p-10">
          <p className="text-lg leading-relaxed text-foreground/90">
            I've spent the last few years as an ML Engineer shipping real-world systems
            at scale — personalisation, real-time inference, graph-based simulation.
            Now I'm transitioning into my <span className="text-primary font-medium">builder era</span>:
            using that engineering muscle to ship products end-to-end and pave the way
            toward starting something of my own.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> London, UK <span aria-hidden>🇬🇧</span>
          </div>
        </div>
      </Section>

      {/* EXPERIENCE */}
      <Section id="experience" eyebrow="Experience" title="Where I've shipped.">
        <div className="relative pl-6 sm:pl-10">
          <div
            aria-hidden
            className="absolute bottom-0 left-1.5 top-0 w-px sm:left-3"
            style={{
              background:
                "linear-gradient(to bottom, transparent, var(--primary) 10%, var(--primary) 90%, transparent)",
              opacity: 0.35,
            }}
          />
          <div className="space-y-10">
            {EXPERIENCE.map((job, i) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                className="relative"
              >
                <span
                  aria-hidden
                  className="absolute -left-[22px] top-2 grid h-3 w-3 place-items-center rounded-full sm:-left-[34px]"
                  style={{ background: "var(--gradient-primary)", boxShadow: "0 0 16px var(--primary)" }}
                />
                <div className="glass rounded-2xl p-6 transition hover:border-primary/40 sm:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-primary">{job.company}</p>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                      {job.period}
                    </span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-foreground/80">
                    {job.bullets.map((b, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SKILLS */}
      <Section id="skills" eyebrow="Skills" title="The toolkit.">
        <div className="grid gap-5 md:grid-cols-2">
          {SKILLS.map((group) => (
            <div key={group.label} className="glass rounded-2xl p-6">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary/90">
                {group.label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((s) => (
                  <span
                    key={s}
                    className="cursor-default rounded-full border border-border bg-background/40 px-3 py-1.5 text-xs font-medium text-foreground/85 transition hover:border-primary/60 hover:text-primary hover:shadow-[0_0_24px_-6px_var(--primary)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" eyebrow="Projects" title="Selected work.">
        <a
          href="https://x-raydar.info"
          target="_blank"
          rel="noreferrer noopener"
          className="border-gradient group block overflow-hidden rounded-2xl bg-card/60 p-8 backdrop-blur-xl transition hover:-translate-y-0.5"
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold tracking-tight">GIT-ARRG-X</h3>
              <p className="mt-1 text-sm text-primary">x-raydar.info</p>
            </div>
            <ExternalLink className="h-5 w-5 text-muted-foreground transition group-hover:text-primary" />
          </div>
          <p className="mt-5 max-w-3xl text-foreground/85">
            Contributor to GIT-ARRG-X, a vision-language model for automated chest X-ray report
            generation built on Generative Image Transformers (GIT). Part of the NHS-backed
            X-Raydar Project led by Prof. Giovanni Montana at the University of Warwick,
            improving the clinical quality and coherence of AI-generated radiology reports.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["PyTorch", "Vision-Language", "Medical AI", "NLP"].map((t) => (
              <span key={t} className="rounded-full border border-border bg-background/40 px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </a>
      </Section>

      {/* EDUCATION */}
      <Section id="education" eyebrow="Education" title="Foundations.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="glass rounded-2xl p-7">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">2022 – 2023</p>
            <h3 className="mt-2 text-lg font-semibold">MSc Statistics</h3>
            <p className="text-primary">University of Warwick</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li className="flex gap-3"><span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />Distinction</li>
              <li className="flex gap-3"><span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />Winton Dissertation Prize Winner</li>
            </ul>
          </div>
          <div className="glass rounded-2xl p-7">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">2016 – 2020</p>
            <h3 className="mt-2 text-lg font-semibold">BSc Mathematics (Honours)</h3>
            <p className="text-primary">The Chinese University of Hong Kong</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80">
              <li className="flex gap-3"><span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-primary" />Enrichment Mathematics Scholarship (top nationwide admits)</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* CONTACT / FOOTER */}
      <footer id="contact" className="relative scroll-mt-24 px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Open to <span className="text-gradient">interesting problems</span>.
          </h2>
          <p className="mt-4 text-muted-foreground">
            The best way to reach me is email — I read everything.
          </p>
          <a
            href="mailto:chkwok730@gmail.com"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
            style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
          >
            <Mail className="h-4 w-4" /> chkwok730 [at] gmail [dot] com
          </a>
          <div className="mt-10 flex items-center justify-center gap-6 text-muted-foreground">
            <a href="https://github.com/kwokchunghim" target="_blank" rel="noreferrer noopener" aria-label="GitHub" className="transition hover:text-primary">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com/in/tonykwokch" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn" className="transition hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:chkwok730@gmail.com" aria-label="Email" className="transition hover:text-primary">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <p className="mt-10 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Tony C.H. Kwok
          </p>
        </div>
      </footer>
    </div>
  );
}
