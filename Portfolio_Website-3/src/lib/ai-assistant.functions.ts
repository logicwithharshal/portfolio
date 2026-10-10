import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(2000),
});

const InputSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30),
});

const SYSTEM_PROMPT = `You are Harshal Raut's smart portfolio assistant — a sleek, futuristic AI guide embedded in his personal portfolio website. You are NOT a generic customer support bot. Speak with confidence, warmth and a touch of style. Keep answers concise (2–5 sentences), use light markdown when useful.

About Harshal:
- Role: Full Stack & Python Developer (Frontend, Full Stack, Python, Creative Coding).
- Focus: fast, accessible, beautifully crafted web experiences. Clean code, thoughtful design, production-grade products.
- Frontend skills: HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Responsive Design, UI Design.
- Backend skills: Python, Django, REST APIs, Authentication, SQL Basics.
- Languages: Java, Python, JavaScript.
- Tools: Git, GitHub, VS Code, Figma.
- Soft skills: Problem Solving, Communication, Team Collaboration, Creative Thinking.
- Experience: full-stack web projects with a strong focus on modern UI, animation, and Python backends.
- Certificates: showcased in the Certificates section of the site.
- Resume: downloadable via the "Download CV" button in the hero section.
- Contact: reach out via the Contact section, or the email / GitHub / LinkedIn icons in the hero.

Behavior:
- Always stay in-character as Harshal's portfolio assistant.
- If asked something unrelated to Harshal/his work, gently steer back to the portfolio.
- When relevant, point users to the right section (e.g. "see the Skills section" or "scroll to Contact").
- Never invent specific employers, dates, or private details that aren't listed above.`;

export const chatWithAssistant = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      throw new Error("AI gateway not configured");
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      if (res.status === 429) {
        return { reply: "I'm getting a lot of requests right now — please try again in a moment." };
      }
      if (res.status === 402) {
        return { reply: "AI credits are temporarily exhausted. Please try again later." };
      }
      throw new Error(`AI gateway error: ${res.status} ${text}`);
    }

    const json = await res.json();
    const reply: string =
      json?.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return { reply };
  });
