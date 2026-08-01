import { useEffect, useRef } from "react";

/**
 * InkBloom - placeholder for Seedance hero clip 01.
 * Black ink blooming through water in extreme slow motion,
 * occasionally flashing into gold. Scroll-scrubbed: scroll velocity
 * feeds the bloom's turbulence and the whole field drifts with scroll.
 *
 * To swap in the real clip: place hero.mp4 in /public/media/ and set
 * USE_VIDEO = true.
 */
const USE_VIDEO = false;

interface Blob {
  // Orbit params - each blob walks a slow Lissajous path
  ax: number; ay: number; fx: number; fy: number; px: number; py: number;
  r: number; // base radius (fraction of min dimension)
  vr: number; // radial breathing speed
  pr: number; // radial phase
  gold: boolean;
}

export default function InkCanvas({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (USE_VIDEO) {
      videoRef.current?.play().catch(() => {});
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * DPR);
      canvas.height = Math.round(h * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Slow, heavy blobs - ink, not lava
    const blobs: Blob[] = Array.from({ length: 8 }, (_, i) => ({
      ax: 0.28 + Math.random() * 0.2,
      ay: 0.24 + Math.random() * 0.2,
      fx: 0.000045 + Math.random() * 0.00006,
      fy: 0.000038 + Math.random() * 0.00005,
      px: Math.random() * Math.PI * 2,
      py: Math.random() * Math.PI * 2,
      r: 0.16 + Math.random() * 0.22,
      vr: 0.00006 + Math.random() * 0.00008,
      pr: Math.random() * Math.PI * 2,
      gold: i === 6 || i === 7, // two rare gold filaments
    }));

    // Scroll scrub: velocity accelerates the simulation clock
    let lastY = window.scrollY;
    let scrollVel = 0;
    const onScroll = () => {
      const y = window.scrollY;
      scrollVel = Math.min(Math.abs(y - lastY) * 0.35, 26);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let simTime = Math.random() * 100000;
    let lastFrame = performance.now();
    let goldFlash = 0; // 0..1 intensity of the global gold flare
    let nextFlash = simTime + 9000 + Math.random() * 7000;
    let raf = 0;
    let visible = true;

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(canvas);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        lastFrame = now;
        return;
      }
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;
      // Scroll energy decays; it speeds up time and feeds turbulence
      scrollVel *= 0.92;
      simTime += dt * (reduced ? 0 : 1 + scrollVel * 0.14);

      // Occasional gold flash sweeping the field
      if (simTime > nextFlash) {
        goldFlash = 1;
        nextFlash = simTime + 11000 + Math.random() * 9000;
      }
      goldFlash = Math.max(0, goldFlash - dt * 0.0012);

      const minDim = Math.min(w, h);
      const scrollDrift = window.scrollY * 0.08;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0B0C0E";
      ctx.fillRect(0, 0, w, h);

      for (const b of blobs) {
        const cx = w * 0.5 + Math.cos(simTime * b.fx + b.px) * w * b.ax;
        const cy = h * 0.5 + Math.sin(simTime * b.fy + b.py) * h * b.ay - scrollDrift;
        const breathe = 1 + Math.sin(simTime * b.vr + b.pr) * 0.28;
        const R = b.r * minDim * breathe;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        if (b.gold) {
          const a = 0.05 + goldFlash * 0.22;
          g.addColorStop(0, `rgba(201, 162, 39, ${a})`);
          g.addColorStop(0.55, `rgba(201, 162, 39, ${a * 0.4})`);
          g.addColorStop(1, "rgba(201, 162, 39, 0)");
        } else {
          // Luminous ink: slightly raised blacks against the deep field
          const a = 0.10 + goldFlash * 0.03;
          g.addColorStop(0, `rgba(38, 42, 48, ${a + 0.06})`);
          g.addColorStop(0.5, `rgba(24, 27, 31, ${a})`);
          g.addColorStop(1, "rgba(11, 12, 14, 0)");
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dark voids - ink swallowing light back
      for (let i = 0; i < 3; i++) {
        const cx = w * (0.25 + i * 0.28) + Math.sin(simTime * 0.00006 + i * 2.1) * w * 0.12;
        const cy = h * 0.55 + Math.cos(simTime * 0.00005 + i * 1.7) * h * 0.25 - scrollDrift * 0.6;
        const R = minDim * (0.22 + 0.06 * Math.sin(simTime * 0.00007 + i));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, "rgba(5, 6, 7, 0.55)");
        g.addColorStop(1, "rgba(5, 6, 7, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.fill();
      }

      // Gold wash during a flash
      if (goldFlash > 0.01) {
        ctx.fillStyle = `rgba(201, 162, 39, ${goldFlash * 0.035})`;
        ctx.fillRect(0, 0, w, h);
      }

      if (reduced) cancelAnimationFrame(raf); // render a single still frame
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  if (USE_VIDEO) {
    return (
      <video
        ref={videoRef}
        className={className}
        src="/media/hero.mp4"
        muted
        loop
        playsInline
        autoPlay
        aria-hidden="true"
      />
    );
  }
  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
