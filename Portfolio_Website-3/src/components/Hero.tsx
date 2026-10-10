import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, Mail, Download } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { CodeCard } from "./CodeCard";

const ROLES = [
  "Frontend Developer",
  "Full Stack Developer",
  "Python Developer",
  "Creative Coder",
];

function useTypewriter(words: string[], typeSpeed = 90, eraseSpeed = 45, pause = 1400) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[i % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setI((v) => v + 1);
    } else {
      timeout = setTimeout(() => {
        setText(
          deleting
            ? current.substring(0, text.length - 1)
            : current.substring(0, text.length + 1)
        );
      }, deleting ? eraseSpeed : typeSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, i, words, typeSpeed, eraseSpeed, pause]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(ROLES);

  return (
    <section id="home" className="relative min-h-[88vh] flex items-center pt-28 pb-16 lg:pt-32 lg:pb-20">
      {/* Ambient environmental lighting: layered, very large, soft radial washes */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-[30vh] -z-10 h-[190vh] overflow-x-clip"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 60%, transparent 100%)",
        }}
      >

        {/* Layer 1 — broad atmospheric wash across the whole hero */}
        <div
          className="absolute left-1/2 top-[15%] h-[140vh] w-[190vw] -translate-x-1/2 blur-[500px] animate-glow-pulse"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 45%, color-mix(in oklab, var(--blue-glow) 16%, transparent), transparent 75%)",
          }}
        />
        {/* Layer 2 — left-side lift */}
        <div
          className="absolute -left-[25vw] top-[8%] h-[110vh] w-[95vw] blur-[420px] animate-glow-pulse"
          style={{
            animationDelay: "2s",
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--purple-glow) 13%, transparent), transparent 78%)",
          }}
        />
        {/* Layer 3 — right-side ambience, drifting low into the next section */}
        <div
          className="absolute -right-[20vw] top-[26%] h-[125vh] w-[100vw] blur-[640px] animate-glow-pulse"
          style={{
            animationDelay: "4s",
            background:
              "radial-gradient(closest-side, color-mix(in oklab, var(--blue-glow) 11%, transparent), transparent 80%)",
          }}
        />
      </div>



      {/* Grid pattern moved to global page background (src/routes/index.tsx) */}

      <div className="relative site-container">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20 lg:items-center">
          <div className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </div>

          <p className="mt-8 font-mono text-sm text-muted-foreground">
            <span className="text-gradient">$</span> hello, world — I'm
          </p>

          <h1 className="mt-3 text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight">
            Harshal <span className="text-gradient">Raut</span>
          </h1>

          <div className="mt-6 flex items-center text-xl sm:text-2xl lg:text-3xl font-display font-medium text-muted-foreground min-h-[2.5rem]">
            <span className="text-foreground/40 mr-3">&gt;</span>
            <span className="typing-cursor text-gradient">{typed}</span>
          </div>

          <p className="mt-8 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            I build fast, accessible and beautifully crafted web experiences.
            Passionate about clean code, thoughtful design, and turning ideas
            into production-grade products.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
            >
              Let's work together
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground/90 transition-all duration-300 hover:border-primary/30 hover:bg-white/70 dark:hover:bg-white/12 hover:text-foreground hover:shadow-[0_0_20px_-4px_color-mix(in_oklab,var(--primary)_25%,transparent)] hover:-translate-y-0.5 active:scale-[0.97]"
            >
              <Download className="h-4 w-4 transition-all duration-300 group-hover:animate-download-bounce" />
              Download CV
            </a>
          </div>

          <div className="mt-12 flex items-center gap-4">
            {[
              { Icon: Github, href: "https://github.com", label: "GitHub" },
              { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { Icon: SiLeetcode, href: "https://leetcode.com/", label: "LeetCode" },
              { Icon: Mail, href: "mailto:hello@example.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="glass rounded-full p-3 text-muted-foreground transition-all hover:scale-110 hover:text-foreground hover:bg-white/10"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
            <div className="ml-2 h-px flex-1 max-w-[120px] bg-gradient-to-r from-border to-transparent" />
          </div>
          </div>

          <div className="mt-4 animate-fade-up lg:mt-0" style={{ animationDelay: "0.2s" }}>
            <CodeCard />
          </div>

        </div>
      </div>
    </section>
  );
}
