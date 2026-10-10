import { useEffect, useRef, useState } from "react";
import { ExternalLink, Folder, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import leadMgmtAsset from "@/assets/project-lead-mgmt.jpg";

type Project = {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    title: "n8n Automated Lead Management System",
    description:
      "A robust full-stack solution designed to capture, manage, and automate lead processing. Integrates a React frontend with a Node.js backend and leverages n8n workflows for data syncing (Google Sheets) and notifications (Discord & Email).",
    image: leadMgmtAsset.url,
    technologies: ["n8n", "TypeScript", "Tailwind", "React", "Node.js"],
    github: "https://github.com",
    demo: "https://example.com",
    featured: true,
  },
  {
    title: "Dev Blogs",
    description:
      "A scalable microservices-based blogging platform architected with gRPC for efficient inter-service communication. Containerized with Docker and orchestrated for high availability.",
    technologies: ["Node.js", "gRPC", "Docker", "Microservices", "TypeScript", "React", "Tailwind", "Nginx", "Kubernetes", "Prisma"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "UpsideDown",
    description:
      "A visually immersive Stranger Things inspired web experience featuring an interactive 'flashlight' reveal effect. Move your cursor to explore the Upside Down and reveal the true face of Vecna.",
    technologies: ["html", "tailwind", "javascript"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "FoodSnap AI",
    description:
      "A smart nutrition tracking application that leverages artificial intelligence to analyze food images, identify dishes, and estimate their nutritional content.",
    technologies: ["gemini", "tailwind", "react", "node.js", "mongodb", "typescript", "edamam food api"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "The C.L.A.U.S. Console",
    description:
      "The C.L.A.U.S. Console (Command Logic & Authorized User System) is the comprehensive digital transformation initiative for toy logistics (Hackathon Project).",
    technologies: ["google model viewer", "tailwind", "react", "node.js", "firebase", "typescript", "three.js", "gemini", "tripo AI", "framer motion"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "FlowWell",
    description:
      "FlowWell is a comprehensive workflow management platform that streamlines project planning, execution, and monitoring.",
    technologies: ["bootstrap", "javascript", "react", "node.js", "mongodb", "hugging face", "framer motion"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    title: "Portfolio Website",
    description:
      "A premium personal portfolio built with modern web technologies, featuring glassmorphism, smooth animations, and a rich design system.",
    technologies: ["React", "TypeScript", "Tailwind", "TanStack"],
    github: "https://github.com",
    demo: "https://example.com",
  },
];

function ProjectPreview({ project, index }: { project: Project; index: number }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl border border-border bg-card/80 shadow-[0_28px_70px_-36px_color-mix(in_oklab,var(--foreground)_45%,transparent)] backdrop-blur-sm">
      {project.image ? (
        <>
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/15 to-transparent" />
          <div className="absolute inset-0 bg-primary/[0.06] mix-blend-overlay" />
        </>
      ) : (
        <div className="relative flex h-full min-h-72 w-full items-center justify-center overflow-hidden bg-gradient-to-br from-secondary/80 via-card to-primary/10">
          <div className="absolute inset-x-[10%] top-[16%] h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
          <div className="absolute bottom-[14%] left-[12%] font-mono text-xs text-muted-foreground/40">
            PROJECT / {String(index + 1).padStart(2, "0")}
          </div>
          <div className="flex max-w-md flex-col items-center gap-5 px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary shadow-[0_16px_38px_-20px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
              <Folder className="h-9 w-9" strokeWidth={1.5} />
            </span>
            <p className="font-display text-2xl font-semibold text-foreground sm:text-3xl">
              {project.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="pt-6">
      <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-3">
        {project.demo && (
          <Button asChild size="sm" className="bg-gradient-primary shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)] hover:brightness-110">
            <a href={project.demo} target="_blank" rel="noreferrer">
              <ExternalLink /> Live Demo
            </a>
          </Button>
        )}
        {project.github && (
          <Button asChild size="sm" variant="outline" className="border-border bg-secondary/50 hover:border-primary/40 hover:bg-primary/10 hover:text-primary">
            <a href={project.github} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    let frame = 0;

    const updateActiveProject = () => {
      if (!media.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight * 0.5;
        let closestIndex = 0;
        let closestDistance = Number.POSITIVE_INFINITY;

        rowRefs.current.forEach((row, index) => {
          if (!row) return;
          const bounds = row.getBoundingClientRect();
          const rowCenter = bounds.top + bounds.height / 2;
          const distance = Math.abs(rowCenter - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveIndex((current) => current === closestIndex ? current : closestIndex);
      });
    };

    updateActiveProject();
    window.addEventListener("scroll", updateActiveProject, { passive: true });
    window.addEventListener("resize", updateActiveProject);
    media.addEventListener("change", updateActiveProject);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveProject);
      window.removeEventListener("resize", updateActiveProject);
      media.removeEventListener("change", updateActiveProject);
    };
  }, []);

  return (
    <section id="projects" className="relative scroll-mt-20 py-28">
      <div className="site-container">
        <div className="mb-14 text-center lg:mb-20">
          <p className="mb-3 font-mono text-sm text-gradient">// 04 — PROJECTS</p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Featured <span className="text-gradient">Projects.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            A collection of my best work showcasing full-stack development, backend engineering, AI applications, and open-source contributions.
          </p>
        </div>

        <div className="hidden grid-cols-[minmax(0,1.35fr)_minmax(360px,1fr)] gap-12 lg:grid xl:gap-20">
          <div>
            <div className="sticky top-[18vh] aspect-[16/11] w-full">
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  aria-hidden={activeIndex !== index}
                  className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
                    activeIndex === index
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-[0.975] opacity-0"
                  }`}
                >
                  <ProjectPreview project={project} index={index} />
                </div>
              ))}
            </div>
          </div>

          <div className="pb-[24vh] pt-[8vh]">
            {projects.map((project, index) => {
              const isActive = activeIndex === index;
              return (
                <article
                  key={project.title}
                  ref={(element) => { rowRefs.current[index] = element; }}
                  className="flex min-h-[68vh] items-center border-t border-border last:border-b"
                >
                  <div className="w-full py-12">
                    <div className="flex items-start gap-4">
                      <span className={`pt-1 font-mono text-sm transition-colors duration-500 ${isActive ? "text-primary" : "text-subtle-foreground"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className={`mt-3 h-px transition-[width,background-color] duration-500 ${isActive ? "w-12 bg-primary" : "w-6 bg-border"}`} />
                      <h3 className={`font-display text-2xl font-semibold leading-tight transition-colors duration-500 xl:text-3xl ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                        {project.title}
                      </h3>
                    </div>

                    <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden pl-[5.5rem]">
                        <ProjectDetails project={project} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="space-y-16 lg:hidden">
          {projects.map((project, index) => (
            <article key={project.title} className="border-b border-border pb-16 last:border-b-0">
              <div className="aspect-[16/11] w-full">
                <ProjectPreview project={project} index={index} />
              </div>
              <div className="mt-7 flex items-start gap-4">
                <span className="pt-1 font-mono text-sm text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <ProjectDetails project={project} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}