import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [active, setActive] = useState<string>("about");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="group flex items-center gap-2 text-sm font-semibold tracking-tight">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-border bg-card/70 backdrop-blur text-gradient">TK</span>
          <span className="hidden sm:inline text-foreground/90">Tony Kwok</span>
        </a>
        <nav
          className={`glass hidden rounded-full px-2 py-1.5 md:flex ${
            scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.25)]" : ""
          }`}
        >
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                active === s.id
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === s.id && (
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{ background: "var(--gradient-primary)" }}
                />
              )}
              {s.label}
            </a>
          ))}
        </nav>
        <a
          href="https://calendar.app.google/pmdtLx8yLMk6tLeJ8"
          target="_top"
          rel="noreferrer noopener"
          className="hidden rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-medium backdrop-blur transition hover:border-primary/60 hover:text-primary md:inline-block"
        >
          Let's chat
        </a>
      </div>
    </header>
  );
}