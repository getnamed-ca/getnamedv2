import { useState } from "react";
import { useLang } from "../i18n";
import CharLink from "../components/CharLink";

/**
 * Selected work - 4 showcase case studies in an asymmetric grid.
 * Hover reveals a sliding typographic showreel panel
 * (placeholder for Seedance clip 02: swap SHOWREEL_VIDEO on and add
 * /public/media/showreel.mp4).
 */
const SHOWREEL_VIDEO = false;

function Reel({ word, active }: { word: string; active: boolean }) {
  if (SHOWREEL_VIDEO) {
    return <video src="/media/showreel.mp4" muted loop playsInline autoPlay={active} className="absolute inset-0 w-full h-full object-cover" />;
  }
  const strip = Array(6).fill(word).join(" · ");
  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col justify-center gap-[2vh]" style={{ background: "var(--ink)" }} aria-hidden="true">
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          className="reel-track whitespace-nowrap font-display font-bold uppercase leading-none"
          style={{
            fontSize: "clamp(40px, 5.4vw, 92px)",
            letterSpacing: "-0.03em",
            color: row === 1 ? "transparent" : "var(--bone)",
            WebkitTextStroke: row === 1 ? "1.5px var(--acc-bright)" : undefined,
            animationDuration: `${16 + row * 5}s`,
            animationDirection: row === 1 ? "reverse" : "normal",
            opacity: row === 2 ? 0.35 : 1,
          }}
        >
          {strip} · {strip}
        </div>
      ))}
      {/* scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg, transparent 0 3px, rgba(11,12,14,0.28) 3px 4px)" }}
      />
      <p className="absolute bottom-4 left-5 lbl lbl-bracket">Showreel · 00:08</p>
    </div>
  );
}

export default function Work({ onIntake }: { onIntake: () => void }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" className="relative py-24 md:py-36" style={{ background: "var(--deep)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b pb-8 mb-14" style={{ borderColor: "var(--rule-dark)" }}>
          <div>
            <p className="lbl lbl-bracket mb-4">{t.work.label}</p>
            <h2 className="font-display font-bold text-[var(--bone)]" style={{ fontSize: "clamp(38px, 6vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.035em" }}>
              {t.work.title}
            </h2>
          </div>
          <p className="lbl max-w-[320px] normal-case" style={{ textTransform: "none", letterSpacing: "0.04em" }}>{t.work.note}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {t.work.items.map((item, i) => (
            <article
              key={item.name}
              className="group relative overflow-hidden"
              style={{
                marginTop: i % 2 === 1 ? "clamp(0px, 6vw, 96px)" : 0,
                border: "1px solid var(--rule-dark)",
                aspectRatio: "4 / 4.6",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Poster (base state) */}
              <div className="absolute inset-0 p-6 md:p-9 flex flex-col justify-between" style={{ background: "linear-gradient(160deg, #101114 0%, #0B0C0E 70%)" }}>
                <div className="flex items-start justify-between">
                  <span className="lbl">[ {String(i + 1).padStart(2, "0")} ]</span>
                  <span className="font-mono-brand text-[12px] font-semibold tracking-[0.06em]" style={{ color: "var(--acc-bright)" }}>{item.stat}</span>
                </div>
                <div
                  className="absolute right-0 bottom-0 font-display font-bold uppercase select-none pointer-events-none"
                  style={{
                    fontSize: "clamp(180px, 22vw, 380px)",
                    lineHeight: 0.75,
                    color: "transparent",
                    WebkitTextStroke: "1px #1e2024",
                    letterSpacing: "-0.05em",
                  }}
                  aria-hidden="true"
                >
                  {item.name.charAt(0)}
                </div>
                <div className="relative">
                  <p className="font-mono-brand text-[11px] tracking-[0.14em] uppercase mb-3" style={{ color: "var(--steel)" }}>{item.tags}</p>
                  <h3 className="font-display font-bold text-[var(--bone)]" style={{ fontSize: "clamp(30px, 3.4vw, 54px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[14px]" style={{ color: "var(--steel)" }}>{item.sector}</p>
                </div>
              </div>

              {/* Hover reveal - showreel wipe */}
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{ transform: hovered === i ? "translateY(0)" : "translateY(101%)", transitionTimingFunction: "cubic-bezier(0.65,0,0.35,1)" }}
                aria-hidden={hovered !== i}
              >
                <Reel word={item.name} active={hovered === i} />
              </div>
            </article>
          ))}
        </div>

        <p className="lbl mt-10 normal-case" style={{ textTransform: "none", letterSpacing: "0.04em" }}>{t.work.reel}</p>

        <div className="flex justify-center mt-16 md:mt-20">
          <button
            type="button"
            onClick={onIntake}
            className="inline-flex items-center gap-3 font-mono-brand text-[13px] tracking-[0.14em] uppercase font-semibold px-6 py-4 rounded-full transition-transform"
            style={{ background: "var(--acc)", color: "var(--bone)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--acc-bright)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--acc)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <CharLink text={t.nav.cta} bare twinColor="var(--deep)" />
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
