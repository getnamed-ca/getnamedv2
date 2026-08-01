import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import InkCanvas from "../components/InkCanvas";

/**
 * Hero - ink bloom scrubbed by scroll behind "get[named]" set in
 * enormous type filling ~80% of the viewport, with the manifesto
 * line typing itself beneath.
 */
export default function Hero() {
  const { t } = useLang();
  const [typed, setTyped] = useState("");
  const [parallax, setParallax] = useState(0);
  const [started, setStarted] = useState(false);

  // Typewriter - the manifesto line types itself (brand caret motif)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTyped("");
    if (reduced) {
      setTyped(t.hero.typed);
      return;
    }
    setStarted(false);
    const startDelay = window.setTimeout(() => setStarted(true), 700);
    return () => window.clearTimeout(startDelay);
  }, [t.hero.typed]);

  useEffect(() => {
    if (!started || typed.length >= t.hero.typed.length) return;
    const ch = t.hero.typed[typed.length];
    const pause = ch === " " ? 30 : ch === "." ? 260 : 46 + Math.random() * 40;
    const id = window.setTimeout(() => setTyped(t.hero.typed.slice(0, typed.length + 1)), pause);
    return () => window.clearTimeout(id);
  }, [started, typed, t.hero.typed]);

  // Scroll parallax - type lifts and fades as ink keeps blooming
  useEffect(() => {
    const onScroll = () => setParallax(Math.min(window.scrollY / window.innerHeight, 1));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden grain" aria-label="getnamed hero">
      {/* Ink bloom (scroll-scrubbed placeholder for Seedance clip 01) */}
      <InkCanvas className="absolute inset-0 w-full h-full" />

      {/* Content */}
      <div
        className="relative z-10 h-full max-w-[1600px] mx-auto px-5 md:px-10 flex flex-col justify-between pt-24 pb-8"
        style={{
          transform: `translateY(${parallax * -60}px)`,
          opacity: 1 - parallax * 0.85,
        }}
      >
        <div className="flex items-start justify-between">
          <p className="lbl lbl-bracket">{t.hero.eyebrow}</p>
          <p className="lbl hidden md:block">46.5°N · 73.6°W</p>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1
            className="font-display font-bold leading-[0.88] text-[var(--bone)]"
            style={{ fontSize: "clamp(64px, 14.5vw, 240px)", letterSpacing: "-0.04em" }}
          >
            get<span className="text-[var(--acc)]">[</span>
            <span className="text-[var(--acc)]">named</span>
            <span className="text-[var(--acc)]">]</span>
          </h1>
          <p className="mt-6 md:mt-8 font-display font-medium text-[var(--bone)]" style={{ fontSize: "clamp(19px, 2.6vw, 38px)", letterSpacing: "-0.02em", minHeight: "1.4em" }}>
            {typed}
            <span className="type-caret" aria-hidden="true" />
          </p>
          <p className="mt-5 max-w-[52ch] text-[15px] md:text-[17px] leading-relaxed" style={{ color: "#B9B9C0" }}>
            {t.hero.sub}
          </p>
        </div>

        <div className="flex items-end justify-between">
          <p className="lbl lbl-bracket">{t.hero.scroll} ↓</p>
          <p className="lbl hidden lg:block max-w-[300px] text-right normal-case tracking-normal" style={{ textTransform: "none", letterSpacing: "0.04em" }}>
            {t.hero.videoNote}
          </p>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--deep))" }} />
    </section>
  );
}
