import { useLang, LANGS } from "../i18n";
import { Mark, Wordmark } from "../components/Mark";

export type LegalDoc = "terms" | "privacy";

/**
 * Legal document page - Terms of Use / Privacy Policy.
 * Paper background, editorial single column, per-language copy,
 * cross-link to the other document, language toggle, back to site.
 */
export default function Legal({
  doc,
  onBack,
  onNav,
}: {
  doc: LegalDoc;
  onBack: () => void;
  onNav: (d: LegalDoc) => void;
}) {
  const { t, lang, setLang } = useLang();
  const L = t.legal;
  const title = doc === "terms" ? L.termsTitle : L.privacyTitle;
  const other: LegalDoc = doc === "terms" ? "privacy" : "terms";
  const otherTitle = doc === "terms" ? L.privacyTitle : L.termsTitle;
  const sections = doc === "terms" ? L.terms : L.privacy;

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      {/* top bar */}
      <header
        className="sticky top-0 z-40 border-b"
        style={{ background: "color-mix(in srgb, var(--paper) 88%, transparent)", backdropFilter: "blur(10px)", borderColor: "var(--rule)" }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-8 h-[64px] flex items-center justify-between gap-4">
          <button type="button" onClick={onBack} className="flex items-center gap-2.5 group" aria-label="getnamed home">
            <Mark size={22} tone="ink" />
            <Wordmark tone="ink" style={{ fontSize: 15 }} />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {LANGS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLang(l.id)}
                  className="font-mono-brand text-[11px] tracking-[0.12em] uppercase px-2 py-1 transition-colors"
                  style={{
                    color: lang === l.id ? "var(--acc)" : "var(--steel)",
                    fontWeight: lang === l.id ? 600 : 500,
                  }}
                  aria-pressed={lang === l.id}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={onBack}
              className="font-mono-brand text-[11px] tracking-[0.12em] uppercase border px-4 py-2 transition-colors"
              style={{ borderColor: "var(--ink)", color: "var(--ink)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink)";
                e.currentTarget.style.color = "var(--bone)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--ink)";
              }}
            >
              ← {t.nav.back}
            </button>
          </div>
        </div>
      </header>

      {/* document */}
      <main className="max-w-[1100px] mx-auto px-5 md:px-8 pt-16 md:pt-24 pb-24">
        <p className="lbl lbl-bracket" style={{ color: "var(--acc)" }}>
          getnamed · legal
        </p>
        <h1
          className="font-display font-bold mt-6"
          style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 0.98, letterSpacing: "-0.035em" }}
        >
          {title}
        </h1>
        <p className="lbl mt-5">{L.updated}</p>

        <div className="mt-14 flex flex-col gap-11 max-w-[74ch]">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display font-bold" style={{ fontSize: "clamp(19px, 1.9vw, 26px)", letterSpacing: "-0.015em" }}>
                {s.h}
              </h2>
              {s.p.map((para, i) => (
                <p key={i} className="mt-3.5 text-[15.5px] md:text-[16.5px] leading-[1.75]" style={{ color: "#45454c" }}>
                  {para}
                </p>
              ))}
            </section>
          ))}
        </div>

        {/* cross-link */}
        <div className="mt-16 border-t pt-8 flex flex-wrap items-center gap-4" style={{ borderColor: "var(--rule)" }}>
          <p className="lbl">{L.otherDoc}</p>
          <button
            type="button"
            onClick={() => onNav(other)}
            className="font-mono-brand text-[12px] tracking-[0.12em] uppercase font-semibold px-5 py-3 transition-colors"
            style={{ background: "var(--ink)", color: "var(--bone)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--acc)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
          >
            {otherTitle} →
          </button>
        </div>
      </main>
    </div>
  );
}
