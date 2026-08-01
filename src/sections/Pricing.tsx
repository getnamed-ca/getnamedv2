import { useLang } from "../i18n";

/**
 * Pricing - published rates as editorial rows on paper.
 * Service name left, price right, divider rules between; positioning note below.
 */
export default function Pricing() {
  const { t } = useLang();

  return (
    <section id="pricing" className="relative py-24 md:py-36" style={{ background: "var(--bone)", color: "var(--ink)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        {/* Intro column */}
        <div className="self-start">
          <p className="lbl lbl-bracket mb-4">{t.pricing.label}</p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(36px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.035em", color: "var(--ink)" }}>
            {t.pricing.title}
          </h2>
        </div>

        {/* Price rows */}
        <div>
          {t.pricing.rows.map((row) => (
            <div
              key={row.k}
              className="group flex flex-wrap justify-between items-baseline gap-3 md:gap-8 py-7 md:py-8 border-t transition-all duration-300"
              style={{ borderColor: "var(--rule)" }}
            >
              <h3
                className="font-display font-bold transition-transform duration-300 group-hover:translate-x-2"
                style={{ fontSize: "clamp(19px, 1.9vw, 27px)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)" }}
              >
                {row.k}
              </h3>
              <span className="font-mono-brand font-semibold text-[14px] md:text-[16px] tracking-[0.04em] whitespace-nowrap" style={{ color: "var(--acc)" }}>
                {row.v}
              </span>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: "var(--rule)" }} />

          <p className="mt-8 max-w-[64ch] text-[15px] leading-relaxed" style={{ color: "#55555c" }}>
            {t.pricing.note}
          </p>
        </div>
      </div>
    </section>
  );
}
