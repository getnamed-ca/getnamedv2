import { useEffect, useRef } from "react";

/**
 * Brand cursor: a small Named-Green dot with a trailing ring.
 * Ring lerps behind the dot; expands over interactive elements.
 * Disabled on touch devices and under prefers-reduced-motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    document.body.classList.add("custom-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, [role='button'], input, textarea, select, label, .chip");
      ringRef.current?.classList.toggle("is-active", interactive);
    };

    const loop = () => {
      rx += (mx - rx) * (reduced ? 1 : 0.16);
      ry += (my - ry) * (reduced ? 1 : 0.16);
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="gn-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="gn-cursor-dot" aria-hidden="true" />
    </>
  );
}
