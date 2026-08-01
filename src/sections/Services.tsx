import { useLang } from "../i18n";

/**
 * Services - editorial two-column layout on paper.
 * Sticky label column left; numbered rows with divider rules right.
 */
export default function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="relative py-24 md:py-36" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        {/* Intro column (static - sticky-in-grid mis-paints on some browsers) */}
        <div className="self-start">
          <p className="lbl lbl-bracket mb-4">{t.services.label}</p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(36px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.035em", color: "var(--ink)" }}>
            {t.services.title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed" style={{ color: "#55555c" }}>
            {t.services.lede}
          </p>
        </div>

        {/* Numbered rows */}
        <div>
          {t.services.items.map((s) => (
            <div
              key={s.n}
              className="group grid grid-cols-[64px_1fr] md:grid-cols-[110px_1fr] gap-4 md:gap-8 py-8 md:py-10 border-t transition-all duration-300"
              style={{ borderColor: "var(--rule)" }}
            >
              <span
                className="font-mono-brand text-[13px] md:text-[15px] font-semibold tracking-[0.16em] pt-1 whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--acc)]"
                style={{ color: "var(--steel)" }}
              >
                /{s.n}
              </span>
              <div>
                <h3
                  className="font-display font-bold transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontSize: "clamp(24px, 2.6vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--ink)" }}
                >
                  {s.h}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed" style={{ color: "#55555c" }}>
                  {s.p}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: "var(--rule)" }} />
        </div>
      </div>
    </section>
  );
}
