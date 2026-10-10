import { useEffect, useRef } from "react";
import { Award, ExternalLink, ImageIcon } from "lucide-react";

type Cert = {
  title: string;
  issuer: string;
  year: string;
  image?: string;
  credentialUrl?: string;
};

const certs: Cert[] = [
  { title: "Python for Everybody", issuer: "Coursera", year: "2024", credentialUrl: "#" },
  { title: "Full Stack Web Development", issuer: "Udemy", year: "2024", credentialUrl: "#" },
  { title: "Django REST Framework", issuer: "freeCodeCamp", year: "2023", credentialUrl: "#" },
  { title: "Responsive Web Design", issuer: "freeCodeCamp", year: "2023", credentialUrl: "#" },
];

function CertCard({ cert, ariaHidden }: { cert: Cert; ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden}
      className="cert-card group relative w-[420px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl shadow-[0_10px_36px_-18px_oklch(0.2_0.05_260/0.35)] transition-transform duration-500 ease-out hover:scale-[1.03] dark:bg-white/[0.03] dark:border-white/8 sm:w-[460px] lg:w-[500px]"
    >
      {/* image with hover blur + overlay + button */}
      <div className="relative aspect-[16/11] w-full overflow-hidden border-b border-border bg-muted/40 dark:bg-white/[0.02]">
        <div className="absolute inset-0 transition-[filter] duration-500 ease-out group-hover:blur-sm">
          {cert.image ? (
            <img
              src={cert.image}
              alt={cert.title}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
        </div>
        {/* dark overlay on hover */}
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 ease-out group-hover:bg-black/50" />
        {/* centered View Certificate button */}
        {cert.credentialUrl ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            tabIndex={ariaHidden ? -1 : 0}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 rounded-full bg-gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 hover:shadow-primary/50"
          >
            View Certificate
          </a>
        ) : null}
      </div>

      <div className="relative p-7 sm:p-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="rounded-lg border border-border bg-secondary/60 dark:bg-white/[0.04] p-2.5">
            <Award className="h-5 w-5 text-primary" />
          </div>
          <span className="font-mono text-sm text-muted-foreground">{cert.year}</span>
        </div>
        <h3
          className="font-display text-xl font-semibold leading-snug text-foreground overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3.5rem",
          }}
        >
          {cert.title}
        </h3>
        <p className="mt-2 text-base text-muted-foreground truncate">{cert.issuer}</p>
      </div>
    </div>
  );
}

export function Certificates() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const cards = Array.from(viewport.querySelectorAll<HTMLElement>(".cert-card"));
    const pause = () => track.classList.add("is-paused");
    const resume = () => track.classList.remove("is-paused");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", pause);
      card.addEventListener("mouseleave", resume);
    });
    viewport.addEventListener("mouseleave", resume);

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("mouseenter", pause);
        card.removeEventListener("mouseleave", resume);
      });
      viewport.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section
      id="certificates"
      className="relative overflow-x-clip py-28 scroll-mt-20 transition-colors duration-500"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-[15%] h-[360px] w-[360px] rounded-full bg-primary/[0.05] blur-[140px] dark:bg-primary/[0.08]" />
        <div className="absolute -bottom-40 right-[10%] h-[420px] w-[420px] rounded-full bg-accent/[0.04] blur-[160px] dark:bg-accent/[0.06]" />
      </div>

      <div className="site-container mb-16">
        <p className="font-mono text-sm text-gradient mb-3">// 04 — certificates</p>
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Always <span className="text-gradient">learning</span>
        </h2>
        <p className="mt-4 max-w-xl text-base text-muted-foreground">
          A continuously growing collection of certifications and credentials.
        </p>
      </div>

      <div
        ref={viewportRef}
        className="cert-viewport relative overflow-x-clip overflow-y-visible py-12"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
        }}
      >
        <div ref={trackRef} className="cert-track">
          {[0, 1].map((dup) => (
            <div key={dup} aria-hidden={dup === 1} className="cert-group">
              {certs.map((cert) => (
                <div key={`${dup}-${cert.title}`} className="px-4 sm:px-5">
                  <CertCard cert={cert} ariaHidden={dup === 1} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
