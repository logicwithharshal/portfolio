import { useEffect, useRef } from "react";

/**
 * Interactive pixel/block surface.
 * Idle: invisible. On cursor move, nearby square blocks lift out of the
 * surface with subtle indigo light showing in the gaps between them.
 *
 * Canvas based — no React state updates per block, single rAF loop that
 * parks itself when everything has settled. Disabled on touch devices and
 * for prefers-reduced-motion.
 */
export function PixelSurface() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 26; // block pitch
    const GAP = 3; // gap between blocks (light shows through)
    const RADIUS = 190; // interaction radius in px

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    // smoothed lift value per cell key
    const lift = new Map<string, number>();

    let mx = -9999;
    let my = -9999;
    let tx = -9999;
    let ty = -9999;
    let raf = 0;
    let running = false;

    const isDark = () => document.documentElement.classList.contains("dark");

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const roundRect = (x: number, y: number, size: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + size - r, y);
      ctx.quadraticCurveTo(x + size, y, x + size, y + r);
      ctx.lineTo(x + size, y + size - r);
      ctx.quadraticCurveTo(x + size, y + size, x + size - r, y + size);
      ctx.lineTo(x + r, y + size);
      ctx.quadraticCurveTo(x, y + size, x, y + size - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // ease pointer
      mx += (tx - mx) * 0.18;
      my += (ty - my) * 0.18;

      const dark = isDark();
      const blockSize = CELL - GAP;
      const region = RADIUS + CELL * 2;

      const c0 = Math.floor((mx - region) / CELL);
      const c1 = Math.ceil((mx + region) / CELL);
      const r0 = Math.floor((my - region) / CELL);
      const r1 = Math.ceil((my + region) / CELL);

      // touch targets in range
      for (let c = c0; c <= c1; c++) {
        for (let r = r0; r <= r1; r++) {
          const key = `${c}:${r}`;
          const cx = c * CELL + CELL / 2;
          const cy = r * CELL + CELL / 2;
          const d = Math.hypot(cx - mx, cy - my);
          let target = 1 - d / RADIUS;
          target = target <= 0 ? 0 : target * target * (3 - 2 * target); // smoothstep
          const cur = lift.get(key) ?? 0;
          if (target > 0 || cur > 0.001) lift.set(key, cur + (target - cur) * 0.14);
        }
      }

      let active = false;

      lift.forEach((v, key) => {
        if (v < 0.004) {
          lift.delete(key);
          return;
        }
        active = true;
        const [cs, rs] = key.split(":");
        const c = Number(cs);
        const r = Number(rs);
        const x = c * CELL + GAP / 2;
        const yBase = r * CELL + GAP / 2;
        if (x > w + CELL || yBase > h + CELL || x < -CELL || yBase < -CELL) return;

        const rise = v * 4.5; // subtle translateY
        const scale = 1 + v * 0.05;
        const size = blockSize * scale;
        const off = (blockSize - size) / 2;
        const y = yBase - rise;

        // light from underneath / between blocks
        ctx.globalAlpha = v * (dark ? 0.5 : 0.42);
        const g = ctx.createRadialGradient(
          x + blockSize / 2,
          yBase + blockSize / 2,
          0,
          x + blockSize / 2,
          yBase + blockSize / 2,
          CELL * 0.85,
        );
        g.addColorStop(0, dark ? "rgba(129,140,248,0.55)" : "rgba(99,102,241,0.40)");
        g.addColorStop(1, "rgba(56,189,248,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - CELL / 2, yBase - CELL / 2, CELL * 2, CELL * 2);

        // soft drop shadow under the raised block
        ctx.globalAlpha = v * 0.22;
        ctx.fillStyle = dark ? "rgba(2,6,23,0.9)" : "rgba(23,26,31,0.55)";
        roundRect(x + off, y + off + rise * 0.9, size, 4);
        ctx.fill();

        // the block face
        ctx.globalAlpha = v * (dark ? 0.75 : 0.85);
        ctx.fillStyle = dark ? "#111827" : "#FBFCFE";
        roundRect(x + off, y + off, size, 4);
        ctx.fill();

        // faint top edge highlight
        ctx.globalAlpha = v * (dark ? 0.18 : 0.3);
        ctx.strokeStyle = dark ? "rgba(226,232,240,0.5)" : "rgba(255,255,255,0.9)";
        ctx.lineWidth = 1;
        roundRect(x + off, y + off, size, 4);
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      const settled = !active && Math.abs(tx - mx) < 0.5 && Math.abs(ty - my) < 0.5;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(draw);
    };

    const kick = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    const onMove = (e: PointerEvent) => {
      if (tx < -1000) {
        mx = e.clientX;
        my = e.clientY;
      }
      tx = e.clientX;
      ty = e.clientY;
      kick();
    };

    const onLeave = () => {
      tx = -9999;
      ty = -9999;
      kick();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pixel-surface" />;
}
