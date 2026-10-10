import { Code2, Sparkles, Rocket } from "lucide-react";
import { useRef, useState } from "react";
import portrait from "@/assets/harshal-portrait.png";

const stats = [
  { label: "Years Coding", value: "2+" },
  { label: "Projects Built", value: "5+" },
  { label: "Technologies", value: "7+" },
];

export function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: -py * 8, y: px * 8 });
  };
  const reset = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="about" className="relative py-28 scroll-mt-20">
      <div className="site-container">
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-sm text-gradient mb-3">// 01 — about</p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Crafting digital experiences with <span className="text-gradient">purpose</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 items-center">
          {/* Image */}
          <div className="lg:col-span-2">
            <div
              className="relative group [perspective:1200px]"
              onMouseMove={handleMove}
              onMouseLeave={reset}
            >
              <div className="absolute -inset-2 rounded-3xl bg-gradient-primary opacity-50 blur-3xl group-hover:opacity-80 transition-opacity duration-500 animate-glow-pulse" />
              <div
                ref={cardRef}
                className="relative glass-strong rounded-3xl p-2 aspect-[4/5] animate-float-slow transition-transform duration-300 ease-out will-change-transform"
                style={{
                  transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="relative h-full w-full rounded-2xl overflow-hidden">
                  <img
                    src={portrait}
                    alt="Harshal Raut portrait"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-glow/25 via-transparent to-blue-glow/25 mix-blend-overlay pointer-events-none" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                </div>
              </div>
              {/* floating chips */}
              <div className="absolute -top-4 -right-4 glass-strong rounded-2xl px-4 py-2 text-xs font-mono animate-float-slow">
                <span className="text-emerald-400">●</span> Building...
              </div>
              <div className="absolute -bottom-4 -left-4 glass-strong rounded-2xl px-4 py-2 text-xs font-mono animate-float-slow" style={{ animationDelay: "2s" }}>
                {"<dev />"}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              I'm a developer based in India, focused on building thoughtful,
              high-performance web applications. My work blends a deep love for
              <span className="text-foreground"> clean code</span> with a sharp
              eye for <span className="text-foreground">design detail</span>.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              From dynamic frontends to robust Python backends, I enjoy the full
              journey — taking a rough idea and shipping it as a polished,
              production-ready product.
            </p>

            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              {[
                { Icon: Code2, label: "Clean Code" },
                { Icon: Sparkles, label: "Modern UI" },
                { Icon: Rocket, label: "Fast & Scalable" },
              ].map(({ Icon, label }) => (
                <div key={label} className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/5 transition">
                  <div className="rounded-lg bg-gradient-primary p-2">
                    <Icon className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <span className="font-medium text-sm">{label}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5">
                  <div className="text-3xl font-bold text-gradient font-display">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
