import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n";

/**
 * Kinetic manifesto - a pinned 320vh section where each scroll step
 * slams one word on screen: LOUD. PRECISE. UNFORGETTABLE.
 * Slam = scale 2.6 → 1 with expo easing + a hair of overshoot,
 * chromatic ghost trailing behind the impact.
 */
export default function Manifesto() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const prog = Math.min(Math.max(-rect.top / total, 0), 1);
      setP(prog);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const words = t.manifesto.words;
  const INTRO_END = 0.16;
  const WORD_SPAN = 0.68 / words.length; // words occupy 0.16 → 0.84
  const OUTRO_START = 0.86;

  const easeOutExpo = (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
  const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

  // Intro fades in then out
  const introIn = easeOutExpo(clamp01(p / 0.06));
  const introOut = 1 - clamp01((p - (INTRO_END - 0.05)) / 0.05);
  const introOpacity = introIn * introOut;

  const outroIn = easeOutExpo(clamp01((p - OUTRO_START) / 0.06));

  const activeIdx = Math.min(
    Math.floor((p - INTRO_END) / WORD_SPAN),
    words.length - 1
  );

  return (
    <section ref={ref} className="relative" style={{ height: "320vh" }} aria-label="Manifesto">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center" style={{ background: "var(--deep)" }}>
        {/* faint structural rule */}
        <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: "var(--rule-dark)", opacity: 0.35 }} />

        {/* Intro line */}
        <p
          className="absolute font-display font-medium text-center px-6 max-w-[26ch]"
          style={{
            fontSize: "clamp(22px, 3.4vw, 44px)",
            letterSpacing: "-0.02em",
            color: "#B9B9C0",
            opacity: introOpacity,
            transform: `translateY(${(1 - introIn) * 30}px)`,
          }}
        >
          {t.manifesto.intro}
        </p>

        {/* The slam words */}
        {words.map((w, i) => {
          const start = INTRO_END + i * WORD_SPAN;
          const lp = clamp01((p - start) / WORD_SPAN);
          if (lp <= 0 || lp >= 1) return null;

          const slam = easeOutExpo(clamp01(lp / 0.22)); // impact in first 22%
          const exit = clamp01((lp - 0.82) / 0.18); // leaves in last 18%
          const scale = 2.6 - 1.6 * slam + exit * 0.15;
          const y = (1 - slam) * 34 - exit * 60;
          const opacity = slam * (1 - exit);
          const ghost = (1 - slam) * 10;

          return (
            <div key={i} className="absolute text-center px-4" style={{ opacity }}>
              <p
                className="font-display font-bold uppercase leading-[0.85] text-[var(--bone)]"
                style={{
                  fontSize: "clamp(64px, 15vw, 230px)",
                  letterSpacing: "-0.03em",
                  transform: `translateY(${y}px) scale(${scale})`,
                  textShadow: ghost > 0.4 ? `${ghost}px 0 0 rgba(15,122,90,0.35), -${ghost}px 0 0 rgba(201,162,39,0.22)` : "none",
                  willChange: "transform, opacity",
                }}
              >
                {w.slice(0, -1)}
                <span className="text-[var(--acc)]">.</span>
              </p>
              <p
                className="lbl mt-6"
                style={{ opacity: clamp01((lp - 0.25) / 0.2) * (1 - exit) }}
              >
                [ {String(i + 1).padStart(2, "0")} / {String(words.length).padStart(2, "0")} ]
              </p>
            </div>
          );
        })}

        {/* Outro */}
        <p
          className="absolute font-mono-brand text-[13px] md:text-[15px] tracking-[0.2em] uppercase text-center px-6"
          style={{
            color: "var(--steel)",
            opacity: outroIn,
            transform: `translateY(${(1 - outroIn) * 24}px)`,
          }}
        >
          · {t.manifesto.outro}
        </p>

        {/* Side progress rail */}
        <div className="absolute right-5 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2" aria-hidden="true">
          {words.map((_, i) => (
            <span
              key={i}
              className="block w-[3px] transition-all duration-300"
              style={{
                height: i === activeIdx && p >= INTRO_END && p < OUTRO_START ? 42 : 18,
                background: i === activeIdx && p >= INTRO_END && p < OUTRO_START ? "var(--acc-bright)" : "var(--rule-dark)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
