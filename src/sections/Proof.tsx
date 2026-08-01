import { useLang } from "../i18n";

/**
 * Proof - dark stakes section: owner-to-owner lede, stat cards,
 * and guarantee chips. Ported from the getnamed.ca proof block.
 */
export default function Proof() {
  const { t } = useLang();

  return (
    <section id="proof" className="relative py-24 md:py-36" style={{ background: "var(--deep)", color: "var(--bone)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        <p className="lbl lbl-bracket mb-4">{t.proof.label}</p>
        <h2
          className="font-display font-bold max-w-[20ch]"
          style={{ fontSize: "clamp(36px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.035em", color: "var(--bone)" }}
        >
          {t.proof.title}
        </h2>
        <p className="mt-6 max-w-[58ch] text-[16px] leading-relaxed" style={{ color: "#b9b9bd" }}>
          {t.proof.lede}
        </p>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-14">
          {t.proof.stats.map((s) => (
            <div key={s.v} className="rounded-2xl p-7 md:p-8" style={{ border: "1px solid #26272A" }}>
              <span
                className="font-mono-brand font-semibold block mb-4"
                style={{ fontSize: "clamp(24px, 2.4vw, 36px)", letterSpacing: "-0.02em", color: "var(--bone)" }}
              >
                {s.v}
              </span>
              <p className="text-[14.5px] leading-relaxed" style={{ color: "#b9b9bd" }}>
                {s.p}
              </p>
            </div>
          ))}
        </div>

        {/* Guarantee chips */}
        <div className="flex flex-wrap gap-3 mt-12">
          {t.proof.guarantees.map((g) => (
            <span
              key={g}
              className="font-mono-brand font-semibold text-[11.5px] md:text-[12.5px] uppercase tracking-[0.12em] rounded-full px-5 py-2.5"
              style={{ border: "1px solid #26272A", color: "#b9b9bd" }}
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
