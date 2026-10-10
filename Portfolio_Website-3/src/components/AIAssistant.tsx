import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Bot, ChevronDown, Send, X } from "lucide-react";
import { chatWithAssistant } from "@/lib/ai-assistant.functions";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS: { label: string; prompt: string }[] = [
  { label: "View Skills", prompt: "What are Harshal's main skills?" },
  { label: "My Projects", prompt: "Tell me about Harshal's projects." },
  { label: "Experience", prompt: "Summarize Harshal's experience." },
  { label: "Download Resume", prompt: "How can I download Harshal's resume?" },
  { label: "Contact Me", prompt: "How do I contact Harshal?" },
];

const INTRO: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Harshal AI 👋\nAsk me anything about Harshal, his skills, projects, experience, or education.",
};

function AIOrb({ active }: { active: boolean }) {
  return (
    <span className={`ai-orb${active ? " ai-orb--active" : ""}`} aria-hidden="true">
      <span className="ai-orb__glass" />
      <span className="ai-orb__core">
        <span className="ai-orb__rotation">
          <span className="ai-orb__fluid ai-orb__fluid--primary" />
          <span className="ai-orb__fluid ai-orb__fluid--secondary" />
          <span className="ai-orb__fluid ai-orb__fluid--tertiary" />
        </span>
      </span>
      <span className="ai-orb__shine" />
    </span>
  );
}

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INTRO]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const send = useServerFn(chatWithAssistant);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function ask(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const payload = next.filter((m) => m !== INTRO).slice(-12);
      const { reply } = await send({ data: { messages: payload } });
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong reaching the assistant. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 group"
      >
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full transition-[transform,filter] duration-300 group-hover:scale-105 group-hover:brightness-110 active:scale-[0.97]">
          <AIOrb active={loading} />
        </span>
      </button>

      {/* Panel */}
      <div
        className={`fixed z-50 bottom-24 right-3 sm:right-5 w-[min(94vw,26rem)] origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="relative rounded-3xl">
          {/* Ambient glow behind panel */}
          <div className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/25 via-purple-glow/15 to-blue-glow/25 blur-2xl opacity-70" />
          <div className="relative glass-strong rounded-3xl flex flex-col h-[34rem] max-h-[80vh] border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
              <div className="relative shrink-0">
                <span className="absolute inset-0 rounded-full bg-gradient-primary blur-md opacity-70" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground ring-1 ring-white/20">
                  <Bot className="h-5 w-5" />
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display text-sm font-semibold leading-tight tracking-tight">
                  Harshal AI
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI Assistant
                </div>
              </div>
              {/* Language selector */}
              <button
                type="button"
                className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                aria-label="Select language"
              >
                EN
                <ChevronDown className="h-3 w-3" />
              </button>
              {/* Close */}
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                      m.role === "user"
                        ? "bg-gradient-primary text-primary-foreground rounded-br-sm shadow-md shadow-primary/30"
                        : "bg-white/5 border border-white/10 text-foreground rounded-bl-sm backdrop-blur-sm"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-sm bg-white/5 border border-white/10 px-4 py-3 backdrop-blur-sm">
                    <div className="flex gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggestions */}
            {messages.length <= 2 && !loading && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => ask(s.prompt)}
                    className="text-[11px] rounded-full glass px-2.5 py-1 text-muted-foreground hover:text-foreground hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="p-3.5 border-t border-white/10 bg-white/[0.03] flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border border-white/10 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full px-4 py-2.5 text-sm placeholder:text-muted-foreground/70 transition-all"
                maxLength={500}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-md shadow-primary/30 transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/40 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
