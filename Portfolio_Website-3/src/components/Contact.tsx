import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const contactInfo = [
  { Icon: Mail, label: "Email", value: "harshal@example.com", href: "mailto:harshal@example.com" },
  { Icon: MapPin, label: "Location", value: "Nagpur, Maharashtra, India", href: "https://maps.google.com/?q=Nagpur,India" },
  { Icon: Phone, label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
];

const socials = [
  { Icon: Github, href: "https://github.com", label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: SiLeetcode, href: "https://leetcode.com/", label: "LeetCode" },
  { Icon: Mail, href: "mailto:harshal@example.com", label: "Email" },
];

import { geoEquirectangular, geoPath } from "d3-geo";
import { feature, mesh } from "topojson-client";
import worldTopo from "world-atlas/countries-110m.json";

const MAP_W = 800;
const MAP_H = 400;
const NAGPUR: [number, number] = [79.0882, 21.1458];

// Projection is computed once; the marker uses the same projection as the land shapes.
const topo = worldTopo as any;
const land = feature(topo, topo.objects.land) as any;
const borders = mesh(topo, topo.objects.countries, (a: any, b: any) => a !== b) as any;
const projection = geoEquirectangular()
  .scale(MAP_W / (2 * Math.PI))
  .translate([MAP_W / 2, MAP_H / 2 + 30]);
const pathGen = geoPath(projection);
const landPath = pathGen(land) ?? "";
const borderPath = pathGen(borders) ?? "";
const [nx, ny] = projection(NAGPUR)!;

function ContactMap() {
  return (
    <div className="contact-map relative mt-10">
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full" role="img" aria-label="World map with a marker on Nagpur, India">
        <path d={landPath} className="contact-map-land" strokeWidth={0.6} />
        <path d={borderPath} className="contact-map-border" fill="none" strokeWidth={0.4} />
        <line x1={nx} y1={ny} x2={nx} y2={ny - 48} stroke="#8B5CF6" strokeWidth={1} strokeOpacity={0.7} />
        <circle cx={nx} cy={ny} r={4} fill="#A78BFA" className="contact-ripple" />
        <circle cx={nx} cy={ny} r={3.2} fill="#8B5CF6" stroke="#C4B5FD" strokeWidth={1} />
      </svg>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-28 scroll-mt-20 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-10 left-[10%] h-72 w-72 rounded-full bg-primary/[0.05] blur-[140px] dark:bg-primary/[0.08]" />
      </div>
      <div className="site-container">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20 items-start">
          <div className="min-w-0">
            <p className="font-mono text-sm text-gradient mb-4">// 05 — CONTACT</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              Let's work <span className="text-gradient">together</span>.
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed">
              Have a project, a role, or just an idea worth exploring? I'd love to hear from you.
            </p>
            <ContactMap />
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer" aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/60 dark:bg-white/[0.03] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:text-primary hover:border-primary/40">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="lg:pt-24">
            {contactInfo.map(({ Icon, label, value, href }) => (
              <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="group flex items-start gap-4 border-b border-border py-7 first:border-t transition-colors">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-card/60 dark:bg-white/[0.03] text-muted-foreground transition-colors group-hover:text-primary group-hover:border-primary/40">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
                  <span className="mt-1.5 block text-lg sm:text-xl font-medium text-foreground break-words transition-colors group-hover:text-primary">{value}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <footer className="mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground pt-8">
          <p>© {new Date().getFullYear()} Harshal Raut. Crafted with care.</p>
          <p className="font-mono text-xs">Designed & built from scratch.</p>
        </footer>
      </div>
    </section>
  );
}
