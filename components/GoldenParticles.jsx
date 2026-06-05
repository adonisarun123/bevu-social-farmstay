"use client";

import { useEffect, useRef } from "react";

// Slow-drifting golden embers/petals over the hero.
// Lightweight canvas animation; disabled for users who prefer reduced motion.
export default function GoldenParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let particles = [];
    let w, h, dpr;

    const COLORS = ["#e7b35e", "#f1cf93", "#c0673c"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn(initial = false) {
      const count = Math.min(34, Math.floor(w / 38)); // fewer on phones
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: initial ? Math.random() * h : h + 10,
        r: 1 + Math.random() * 2.4,
        vy: -(0.12 + Math.random() * 0.3), // gentle upward drift
        vx: (Math.random() - 0.5) * 0.18,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.004 + Math.random() * 0.008,
        alpha: 0.25 + Math.random() * 0.5,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        twinkle: 0.5 + Math.random() * 0.5,
      }));
    }

    function tick(t) {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.sway += p.swaySpeed;
        p.x += p.vx + Math.sin(p.sway) * 0.25;
        p.y += p.vy;

        // recycle at top
        if (p.y < -12 || p.x < -12 || p.x > w + 12) {
          p.x = Math.random() * w;
          p.y = h + 10;
        }

        const flicker = p.alpha * (0.7 + 0.3 * Math.sin(t * 0.002 * p.twinkle + p.sway));
        ctx.globalAlpha = flicker;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    }

    resize();
    spawn(true);
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      resize();
      spawn(true);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full"
    />
  );
}
