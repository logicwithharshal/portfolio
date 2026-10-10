import { useEffect, useRef, useState } from "react";

type Exp = {
  role: string;
  company: string;
  logo?: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
};

const experience: Exp[] = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2024 — Present",
    current: true,
    description:
      "Building bespoke web applications for clients using React, Django and modern cloud tooling. Focused on performance, accessibility, and thoughtful UX.",
    tags: ["React", "Django", "Postgres", "AWS"],
  },
  {
    role: "Python Developer Intern",
    company: "Tech Studio",
    period: "2023 — 2024",
    description:
      "Worked on REST APIs, data pipelines and internal dashboards for an analytics product. Shipped features end-to-end alongside a senior team.",
    tags: ["Python", "FastAPI", "Docker", "Redis"],
  },
  {
    role: "Frontend Developer",
    company: "Open Source",
    period: "2022 — 2023",
    description:
      "Contributed to design systems and component libraries; shipped accessible, polished UI adopted by multiple production projects.",
    tags: ["JavaScript", "CSS", "UI", "a11y"],
  },
];

const initials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [visible, setVisible] = useState<boolean[]>(() =>
    experience.map(() => false),
  );
  const [activeIndex, setActiveIndex] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [headVisible, setHeadVisible] = useState(false);
  const [outroVisible, setOutroVisible] = useState(false);
  const outroRef = useRef<HTMLDivElement>(null);

  // Heading + outro reveal
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const watch = (el: Element | null, cb: () => void) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            cb();
            io.disconnect();
          }
        },
        { threshold: 0.2 },
      );
      io.observe(el);
      observers.push(io);
    };
    watch(sectionRef.current, () => setHeadVisible(true));
    watch(outroRef.current, () => setOutroVisible(true));
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // One-time sequential card reveal via IntersectionObserver
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = Number((entry.target as HTMLElement).dataset["index"]);
          io.unobserve(entry.target);
          setVisible((prev) => {
            if (prev[i]) return prev;
            const next = [...prev];
            next[i] = true;
            return next;
          });
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" },
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Active milestone + progress line
  useEffect(() => {
    let raf = 0;
    let pending = false;

    const measure = () => {
      pending = false;
      const timeline = timelineRef.current;
      if (!timeline) return;
      const center = window.innerHeight * 0.45;
      const timelineTop = timeline.getBoundingClientRect().top;

      let active = -1;
      let lastDotY = 0;
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const dotY = el.getBoundingClientRect().top + 26;
        if (dotY <= center) {
          active = i;
          lastDotY = dotY - timelineTop;
        }
      });

      const total = timeline.offsetHeight || 1;
      setProgress(Math.min(Math.max(lastDotY / total, 0), 1));
      setActiveIndex(active);
    };

    const onScroll = () => {
      if (pending) return;
      pending = true;
      raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 scroll-mt-20"
    >
      {/* ambient lighting behind the timeline */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="exp-streak absolute left-[-20%] top-[18%] h-[320px] w-[70%] rounded-full blur-[150px]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--primary) 10%, transparent), transparent)",
          }}
        />
        <div
          className="exp-streak absolute right-[-20%] top-[60%] h-[340px] w-[70%] rounded-full blur-[160px]"
          style={{
            animationDelay: "-12s",
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 9%, transparent), transparent)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[980px] px-5 sm:px-8">
        <div
          className={`exp-head mb-16 sm:mb-20 ${headVisible ? "is-visible" : ""}`}
        >
          <p className="font-mono text-xs sm:text-sm text-gradient mb-3 tracking-wide">
            // 03 — EXPERIENCE
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Experience
          </h2>
          <p className="exp-sub mt-4 max-w-xl text-[15px] sm:text-base text-muted-foreground">
            A chronological walk through my professional journey — the roles,
            teams and problems that shaped how I build software.
          </p>
        </div>

        <div ref={timelineRef} className="relative pl-8 sm:pl-12 lg:pl-0">
          {/* base rail */}
          <div
            className="absolute left-[5px] sm:left-[9px] lg:left-[calc(50%-0.5px)] top-2 bottom-2 w-px bg-border/60 origin-top"
            style={{
              transform: `scaleY(${headVisible ? 1 : 0})`,
              transition: "transform 1100ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />
          {/* gradient progress */}
          <div
            className="absolute left-[5px] sm:left-[9px] lg:left-[calc(50%-0.5px)] top-2 w-px bg-gradient-to-b from-primary/10 via-primary to-accent shadow-[0_0_10px_1px_color-mix(in_oklab,var(--primary)_35%,transparent)]"
            style={{
              height: `${progress * 100}%`,
              transition: "height 500ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          <div className="space-y-14 sm:space-y-20 lg:space-y-12">
            {experience.map((exp, i) => {
              const isLeft = i % 2 === 1;
              return (
              <div
                key={exp.role}
                data-index={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                className={[
                  "exp-item relative lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]",
                  visible[i] ? "is-visible" : "",
                  activeIndex === i ? "is-active" : "",
                  activeIndex > i ? "is-passed" : "",
                ].join(" ")}
              >
                <div
                  className="exp-dot absolute z-10 top-[22px] h-[9px] w-[9px] rounded-full border border-border bg-background left-[-28px] sm:left-[-44px] lg:left-[calc(50%-4.5px)]"
                  aria-hidden
                />
                <div
                  aria-hidden
                  className={`exp-connector absolute top-[26px] hidden h-px w-10 lg:block ${
                    isLeft ? "right-[calc(50%+6px)]" : "left-[calc(50%+6px)]"
                  }`}
                />

                <div
                  className={`exp-reveal ${
                    isLeft
                      ? "is-left lg:col-start-1 lg:pr-14"
                      : "lg:col-start-2 lg:pl-14"
                  }`}
                >
                <article className="exp-card rounded-2xl px-5 py-6 sm:px-7 sm:py-7">
                  <div className="flex items-start gap-4">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="mt-1 h-9 w-9 shrink-0 rounded-lg object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/70 bg-foreground/[0.04] font-mono text-[11px] font-semibold text-muted-foreground"
                      >
                        {initials(exp.company)}
                      </span>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col gap-1.5 md:flex-row md:items-baseline md:justify-between md:gap-6">
                        <h3 className="exp-title font-display text-2xl sm:text-3xl font-semibold leading-tight text-foreground/80 transition-colors duration-500">
                          {exp.role}
                        </h3>
                        <span className="hidden font-mono text-xs text-muted-foreground md:block md:whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="text-[15px] text-muted-foreground">
                          {exp.company}
                        </p>
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary">
                            <span className="exp-pulse h-1.5 w-1.5 rounded-full bg-primary" />
                            Current
                          </span>
                        )}
                        <span className="font-mono text-xs text-muted-foreground md:hidden">
                          {exp.period}
                        </span>
                      </div>

                      <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
                        {exp.description}
                      </p>

                      <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
                        {exp.tags.map((t) => (
                          <span
                            key={t}
                            className="font-mono text-xs text-muted-foreground/80"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
                </div>
              </div>
              );
            })}
          </div>
        </div>

        <div
          ref={outroRef}
          className={`exp-head mt-20 pl-8 sm:pl-12 ${outroVisible ? "is-visible" : ""}`}
        >
          <p className="font-mono text-xs text-muted-foreground">What's next?</p>
          <a
            href="#contact"
            className="story-link mt-2 inline-block font-display text-xl sm:text-2xl font-semibold text-gradient"
          >
            Let's build something.
          </a>
        </div>
      </div>
    </section>
  );
}
