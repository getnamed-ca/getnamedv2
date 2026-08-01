import { useState } from "react";
import { useLang } from "../i18n";

/**
 * FAQ - straight-shooter answers in branded drop-downs on paper.
 * Mirrors the FAQPage JSON-LD in index.html (AEO).
 */
export default function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 md:py-36" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        <div className="self-start">
          <p className="lbl lbl-bracket mb-4">{t.faq.label}</p>
          <h2 className="font-display font-bold" style={{ fontSize: "clamp(36px, 4.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.035em", color: "var(--ink)" }}>
            {t.faq.title}
          </h2>
        </div>

        <div>
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-t" style={{ borderColor: "var(--rule)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-8 text-left group"
                >
                  <span className="flex items-baseline gap-4 md:gap-6">
                    <span className="font-mono-brand text-[12px] font-semibold tracking-[0.14em]" style={{ color: isOpen ? "var(--acc)" : "var(--steel)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-display font-bold transition-transform duration-300 group-hover:translate-x-1.5"
                      style={{ fontSize: "clamp(19px, 2vw, 30px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)" }}
                    >
                      {item.q}
                    </span>
                  </span>
                  <span
                    className="flex-none w-9 h-9 flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: isOpen ? "var(--acc)" : "var(--rule)",
                      background: isOpen ? "var(--acc)" : "transparent",
                      color: isOpen ? "var(--bone)" : "var(--ink)",
                      transform: isOpen ? "rotate(45deg)" : "none",
                      fontSize: 20,
                      lineHeight: 1,
                    }}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div className={`faq-panel ${isOpen ? "open" : ""}`}>
                  <div>
                    <p className="pb-8 pl-9 md:pl-12 max-w-[62ch] text-[15.5px] leading-relaxed" style={{ color: "#55555c" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="border-t" style={{ borderColor: "var(--rule)" }} />
        </div>
      </div>
    </section>
  );
}
