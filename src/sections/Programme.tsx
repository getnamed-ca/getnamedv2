import { useLang } from "../i18n";

/**
 * Programme - the engagement model as three numbered layers.
 * Editorial two-column layout on paper; measurement line closes the section.
 */
export default function Programme() {
  const { t } = useLang();

  return (
    <section id="programme" className="relative py-24 md:py-36" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        {/* Intro column */}
        <div className="self-start">
          <p className="lbl lbl-bracket mb-4">{t.programme.label}</p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(36px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.035em", color: "var(--ink)" }}>
            {t.programme.title}
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed" style={{ color: "#55555c" }}>
            {t.programme.lede}
          </p>
        </div>

        {/* Tier rows */}
        <div>
          {t.programme.tiers.map((tier) => (
            <div
              key={tier.n}
              className="group grid grid-cols-[64px_1fr] md:grid-cols-[110px_1fr] gap-4 md:gap-8 py-8 md:py-10 border-t transition-all duration-300"
              style={{ borderColor: "var(--rule)" }}
            >
              <span
                className="font-mono-brand text-[13px] md:text-[15px] font-semibold tracking-[0.16em] pt-1 whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--acc)]"
                style={{ color: "var(--steel)" }}
              >
                /{tier.n}
              </span>
              <div>
                <h3
                  className="font-display font-bold transition-transform duration-300 group-hover:translate-x-2"
                  style={{ fontSize: "clamp(24px, 2.6vw, 40px)", lineHeight: 1.05, letterSpacing: "-0.025em", color: "var(--ink)" }}
                >
                  {tier.h}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[15.5px] leading-relaxed" style={{ color: "#55555c" }}>
                  {tier.p}
                </p>
              </div>
            </div>
          ))}
          <div className="border-t" style={{ borderColor: "var(--rule)" }} />

          {/* Measurement line */}
          <p
            className="mt-12 font-mono-brand font-semibold text-[14px] md:text-[16.5px] leading-relaxed max-w-[64ch] pl-5"
            style={{ borderLeft: "3px solid var(--acc)", color: "var(--ink)" }}
          >
            {t.programme.measure}
          </p>
        </div>
      </div>
    </section>
  );
}
