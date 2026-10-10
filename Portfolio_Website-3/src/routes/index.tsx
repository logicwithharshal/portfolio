import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { AIAssistant } from "@/components/AIAssistant";
import { PixelSurface } from "@/components/PixelSurface";
import { Starfield } from "@/components/Starfield";
import { useIsDark } from "@/hooks/use-dark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Harshal Raut — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Harshal Raut — Full Stack & Python Developer crafting modern, performant web experiences.",
      },
      { property: "og:title", content: "Harshal Raut — Full Stack Developer" },
      {
        property: "og:description",
        content:
          "Portfolio of Harshal Raut — Full Stack & Python Developer crafting modern, performant web experiences.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const dark = useIsDark();
  return (
    <div className="relative min-h-screen">
      {/* Light mode: existing subtle grid */}
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      )}
      {dark ? <Starfield /> : <PixelSurface />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certificates />
        <Contact />
      </main>
      <AIAssistant />
    </div>
  );
}
