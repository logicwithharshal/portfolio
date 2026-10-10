import { useEffect, useRef, useState, type ComponentType, type CSSProperties, type SVGProps } from "react";
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiVuedotjs, SiAngular, SiTailwindcss, SiBootstrap, SiSass, SiRedux,
  SiNodedotjs, SiExpress, SiPython, SiSpringboot, SiDjango, SiFlask,
  SiGo, SiRust, SiMongodb, SiPostgresql, SiMysql, SiRedis,
  SiDocker, SiKubernetes, SiLinux, SiGit, SiGithub, SiGitlab,
  SiFigma, SiFirebase, SiGraphql, SiPrisma, SiSupabase, SiVercel,
  SiNetlify, SiCplusplus, SiSharp, SiFlutter, SiKotlin, SiSwift,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;
type Brand = { Icon: IconComponent; color: string; name: string };

const cards = [
  { title: "Frontend Development", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind"] },
  { title: "Backend Development",  items: ["Node.js", "Express", "Python", "Django", "REST APIs"] },
  { title: "Databases",            items: ["MongoDB", "PostgreSQL", "SQL"] },
  { title: "Programming Languages",items: ["Java", "Python", "JavaScript", "TypeScript"] },
  { title: "Tools & Workflow",     items: ["Git", "GitHub", "VS Code", "Figma", "Docker", "Linux"] },
  { title: "Soft Skills",          items: ["Problem Solving", "Communication", "Team Collaboration"] },
];

const ROW_A: Brand[] = [
  { Icon: SiHtml5, color: "#E34F26", name: "html" },
  { Icon: SiCss, color: "#1572B6", name: "css" },
  { Icon: SiJavascript, color: "#F7DF1E", name: "js" },
  { Icon: SiTypescript, color: "#3178C6", name: "ts" },
  { Icon: SiReact, color: "#61DAFB", name: "react" },
  { Icon: SiNextdotjs, color: "#E6E8EE", name: "next" },
  { Icon: SiTailwindcss, color: "#38BDF8", name: "tw" },
  { Icon: SiVuedotjs, color: "#42B883", name: "vue" },
  { Icon: SiAngular, color: "#DD0031", name: "ng" },
  { Icon: SiSass, color: "#CC6699", name: "sass" },
  { Icon: SiBootstrap, color: "#7952B3", name: "bs" },
  { Icon: SiRedux, color: "#764ABC", name: "redux" },
];

const ROW_B: Brand[] = [
  { Icon: SiNodedotjs, color: "#5FA04E", name: "node" },
  { Icon: SiExpress, color: "#E6E8EE", name: "express" },
  { Icon: SiPython, color: "#3776AB", name: "py" },
  { Icon: FaJava, color: "#E76F00", name: "java" },
  { Icon: SiSpringboot, color: "#6DB33F", name: "spring" },
  { Icon: SiDjango, color: "#0C8C5F", name: "django" },
  { Icon: SiFlask, color: "#E6E8EE", name: "flask" },
  { Icon: SiGo, color: "#00ADD8", name: "go" },
  { Icon: SiRust, color: "#DEA584", name: "rust" },
  { Icon: SiGraphql, color: "#E535AB", name: "gql" },
  { Icon: SiPrisma, color: "#8B96B0", name: "prisma" },
  { Icon: SiCplusplus, color: "#00599C", name: "cpp" },
];

const ROW_C: Brand[] = [
  { Icon: SiMongodb, color: "#00ED64", name: "mongo" },
  { Icon: SiPostgresql, color: "#4169E1", name: "pg" },
  { Icon: SiMysql, color: "#4479A1", name: "mysql" },
  { Icon: SiRedis, color: "#DC382D", name: "redis" },
  { Icon: SiSupabase, color: "#3ECF8E", name: "supa" },
  { Icon: SiFirebase, color: "#FFCA28", name: "fb" },
  { Icon: FaAws, color: "#FF9900", name: "aws" },
  { Icon: SiVercel, color: "#E6E8EE", name: "vercel" },
  { Icon: SiNetlify, color: "#00C7B7", name: "netlify" },
  { Icon: SiDocker, color: "#2496ED", name: "docker" },
  { Icon: SiKubernetes, color: "#326CE5", name: "k8s" },
  { Icon: SiLinux, color: "#E6E8EE", name: "linux" },
];

const ROW_D: Brand[] = [
  { Icon: SiGit, color: "#F05033", name: "git" },
  { Icon: SiGithub, color: "#E6E8EE", name: "gh" },
  { Icon: SiGitlab, color: "#FC6D26", name: "gl" },
  { Icon: VscVscode, color: "#2EA9F6", name: "vsc" },
  { Icon: SiFigma, color: "#F24E1E", name: "figma" },
  { Icon: SiSharp, color: "#239120", name: "cs" },
  { Icon: SiFlutter, color: "#02569B", name: "flutter" },
  { Icon: SiKotlin, color: "#7F52FF", name: "kotlin" },
  { Icon: SiSwift, color: "#F05138", name: "swift" },
  { Icon: SiReact, color: "#61DAFB", name: "react2" },
  { Icon: SiTypescript, color: "#3178C6", name: "ts2" },
  { Icon: SiNodedotjs, color: "#5FA04E", name: "node2" },
];

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: Brand[];
  direction: "left" | "right";
  duration: number;
}) {
  const marqueeStyle = { "--marquee-duration": `${duration}s` } as CSSProperties;

  const LogoGroup = ({ copy }: { copy: number }) => (
    <div className="skills-marquee-group">
      {items.map(({ Icon, color, name }) => (
        <div
          key={`${name}-${copy}`}
          className="skills-marquee-logo"
          style={{ opacity: "var(--logo-opacity)" }}
        >
          <Icon
            aria-hidden
            style={{
              width: "clamp(40px, 3.4vw, 55px)",
              height: "clamp(40px, 3.4vw, 55px)",
              color,
              fill: color,
              filter: "saturate(0.85)",
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="skills-marquee-viewport py-3">
      <div
        className={`skills-marquee-strip ${direction === "left" ? "skills-marquee-left" : "skills-marquee-right"}`}
        style={marqueeStyle}
      >
        <LogoGroup copy={1} />
        <LogoGroup copy={2} />
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || revealed) return;
    if (typeof IntersectionObserver === "undefined") { setRevealed(true); return; }
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { setRevealed(true); obs.disconnect(); break; }
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [revealed]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-28 scroll-mt-20 overflow-hidden"
    >
      {/* Marquee rows layer — spans full section width, behind cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[220px] bottom-10 z-0 flex flex-col justify-between"
      >
        <MarqueeRow items={ROW_A} direction="left" duration={60} />
        <MarqueeRow items={ROW_B} direction="right" duration={70} />
        <MarqueeRow items={ROW_C} direction="left" duration={65} />
        <MarqueeRow items={ROW_D} direction="right" duration={75} />
      </div>

      {/* Soft mask so logos fade at horizontal edges */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-10 z-[1] bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-10 z-[1] bg-gradient-to-l from-background to-transparent"
      />

      {/* Foreground content */}
      <div className="relative z-10 site-container">
        <div
          className={`text-center mb-14 transition-all duration-[1000ms] ease-out ${
            revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="font-mono text-sm text-gradient mb-3">// 02 — skills</p>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight">
            Technical <span className="text-gradient">Skills.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            The languages, frameworks and tools I build with — set against the ecosystem they live in.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {cards.map((c, i) => (
            <div
              key={c.title}
              className={`transition-all duration-[900ms] ease-out ${
                revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${220 + i * 100}ms` }}
            >
              <SkillCard title={c.title} items={c.items} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="group relative rounded-xl p-4 border border-border/70 bg-card/85 dark:bg-white/[0.06] backdrop-blur-2xl shadow-[0_20px_60px_-24px_oklch(0.15_0.05_260/0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card/95 dark:hover:bg-white/[0.09] hover:shadow-[0_24px_60px_-18px_color-mix(in_oklab,var(--primary)_50%,transparent)]">
      <h3 className="font-display text-sm font-semibold mb-2.5 text-foreground">{title}</h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <span
            key={s}
            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-secondary/60 dark:bg-white/5 border border-border/60 text-foreground/80 transition-colors hover:bg-secondary dark:hover:bg-white/10 hover:text-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
