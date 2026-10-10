import { useMemo, type CSSProperties } from "react";

function makeShadows(count: number, area = 2000) {
  let seed = 42;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.floor(rand() * area);
    const y = Math.floor(rand() * area);
    parts.push(`${x}px ${y}px #eef4ff`);
  }
  return parts.join(", ");
}

/** Three-layer static starfield with duplicated layers for tall viewports. */
export function Starfield() {
  const shadows1 = useMemo(() => makeShadows(600), []);
  const shadows2 = useMemo(() => makeShadows(170), []);
  const shadows3 = useMemo(() => makeShadows(85), []);

  return (
    <div aria-hidden className="starfield-root">
      <div className="stars" style={{ "--star-shadows": shadows1 } as CSSProperties} />
      <div className="stars2" style={{ "--star-shadows": shadows2 } as CSSProperties} />
      <div className="stars3" style={{ "--star-shadows": shadows3 } as CSSProperties} />
    </div>
  );
}
