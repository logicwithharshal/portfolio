import { useRef, useState } from "react";

export function CodeCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const py = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTransform(
      `perspective(1200px) rotateX(${-py * 5}deg) rotateY(${px * 5}deg) translate3d(0, -3px, 0)`
    );
  };

  const handleLeave = () => setTransform("");

  return (
    <div
      className="relative w-full max-w-[560px] mx-auto lg:mx-0 lg:ml-auto animate-float-slow"
      style={{ perspective: "1200px" }}
    >
      {/* Glow */}
      <div className="absolute -inset-6 rounded-3xl bg-gradient-primary opacity-0 dark:opacity-30 blur-3xl" />

      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transform,
          transition: "transform 300ms ease-out",
          transformStyle: "preserve-3d",
        }}
        className="code-editor relative rounded-2xl glass-strong overflow-hidden shadow-2xl shadow-purple-glow/20 border border-white/10"
      >
        {/* Editor title bar */}
        <div className="flex items-center gap-2 code-editor-bar px-4 py-3 border-b border-white/10 bg-black/20">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">
            Developer.java
          </span>
        </div>

        {/* Code body */}
        <pre className="px-4 py-5 sm:px-5 sm:py-6 font-mono text-[12px] sm:text-[13.5px] leading-[1.85] overflow-x-auto">
          <code>
            <Line n={1}>
              <K>public</K> <K>class</K> <T>Developer</T> <P>{"{"}</P>
            </Line>
            <Line n={2}>
              {"  "}<K>private</K> <T>String</T> <A>name</A> <P>=</P> <S>"Harshal Raut"</S><P>;</P>
            </Line>
            <Line n={3}>
              {"  "}<K>private</K> <T>String</T> <A>role</A> <P>=</P> <S>"Full Stack Developer"</S><P>;</P>
            </Line>
            <Line n={4}>
              {"  "}<K>private</K> <T>String</T><P>[]</P> <A>stack</A> <P>= {"{"}</P>
            </Line>
            <Line n={5}>
              {"      "}<S>"Java"</S><P>,</P> <S>"Python"</S><P>,</P> <S>"Django"</S><P>,</P>
            </Line>
            <Line n={6}>
              {"      "}<S>"React"</S><P>,</P> <S>"Node.js"</S>
            </Line>
            <Line n={7}>
              {"  "}<P>{"}"};</P>
            </Line>
            <Line n={8}>
              {"  "}<K>private</K> <K>boolean</K> <A>openToWork</A> <P>=</P> <N>true</N><P>;</P>
            </Line>
            <Line n={9}>{" "}</Line>
            <Line n={10}>
              {"  "}<K>public</K> <K>void</K> <F>build</F><P>() {"{"}</P>
            </Line>
            <Line n={11}>
              {"      "}<T>System</T><P>.</P><A>out</A><P>.</P><F>println</F><P>(</P>
            </Line>
            <Line n={12}>
              {"          "}<S>"Building production-ready software."</S>
            </Line>
            <Line n={13}>
              {"      "}<P>);</P>
            </Line>
            <Line n={14}>
              {"  "}<P>{"}"}</P>
            </Line>
            <Line n={15}>
              <P>{"}"}</P>
            </Line>
          </code>
        </pre>
      </div>
    </div>
  );
}

// Java syntax colors — restrained blue/indigo palette
const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#7c3aed] dark:text-[#c4b5fd]">{children}</span>
);
const T = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#0e7490] dark:text-[#a78bfa]">{children}</span>
);
const A = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#4338ca] dark:text-[#c4b5fd]">{children}</span>
);
const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#15803d] dark:text-[#86efac]">{children}</span>
);
const N = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#b45309] dark:text-[#fbbf24]">{children}</span>
);
const F = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#171717] dark:text-[#e0e7ff]">{children}</span>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[#6b6b6b] dark:text-[#64748b]">{children}</span>
);

function Line({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="whitespace-pre flex">
      <span className="select-none w-7 shrink-0 text-right pr-3 text-[#475569]">{n}</span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}
