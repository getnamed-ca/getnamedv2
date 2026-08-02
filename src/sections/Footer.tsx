import { useLang } from "../i18n";
import { Mark, Wordmark } from "../components/Mark";
import CharLink from "../components/CharLink";

/**
 * Oversized footer CTA - "Got a brand worth fighting for?"
 * Email, socials, intake shortcut, brand line.
 */
export default function Footer({ onIntake, onLegal }: { onIntake: () => void; onLegal: (d: "terms" | "privacy") => void }) {
  const { t } = useLang();

  const socials = [
    { name: "LinkedIn", href: "https://www.linkedin.com/" },
    { name: "Instagram", href: "https://www.instagram.com/" },
    { name: "X", href: "https://x.com/" },
  ];

  return (
    <footer className="relative grain z-[2]" style={{ background: "var(--deep)", isolation: "isolate" }} aria-label="Footer">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 pt-24 md:pt-36 pb-10">
        <p className="lbl lbl-bracket mb-8">[ getnamed ]</p>

        <button type="button" onClick={onIntake} className="block text-left group w-full">
          <h2
            className="font-display font-bold text-[var(--bone)] max-w-[14ch] transition-colors duration-300"
            style={{ fontSize: "clamp(44px, 8.5vw, 150px)", lineHeight: 0.92, letterSpacing: "-0.04em" }}
          >
            {t.footer.big}
            <span
              className="inline-block ml-4 md:ml-6 transition-transform duration-300 group-hover:translate-x-4"
              style={{ color: "var(--acc-bright)" }}
              aria-hidden="true"
            >
              →
            </span>
          </h2>
        </button>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 border-t pt-10" style={{ borderColor: "var(--rule-dark)" }}>
          <div>
            <p className="lbl mb-4">{t.footer.emailLabel}</p>
            <a
              href="mailto:info@getnamed.ca"
              className="font-display font-bold text-[var(--bone)] hover:text-[var(--acc-bright)] transition-colors"
              style={{ fontSize: "clamp(20px, 2.4vw, 34px)", letterSpacing: "-0.02em" }}
            >
              info@getnamed.ca
            </a>
          </div>
          <div>
            <p className="lbl mb-4">{t.footer.socialsLabel}</p>
            <div className="flex flex-col gap-2">
              {socials.map((s) => (
                <CharLink
                  key={s.name}
                  text={s.name}
                  href={s.href}
                  className="font-mono-brand text-[13px] uppercase tracking-[0.14em] text-[var(--bone)] w-fit"
                  onClick={() => window.open(s.href, "_blank", "noopener")}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="lbl mb-4">{t.footer.location}</p>
            <p className="font-mono-brand text-[13px] leading-relaxed" style={{ color: "var(--steel)" }}>
              {t.footer.tagline}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-t pt-8" style={{ borderColor: "var(--rule-dark)" }}>
          <div className="flex items-center gap-3">
            <Mark size={30} tone="bone" />
            <Wordmark tone="bone" style={{ fontSize: 21 }} />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <CharLink
              text={t.legal.termsTitle}
              className="font-mono-brand text-[11px] uppercase tracking-[0.14em] text-[var(--steel)]"
              onClick={() => onLegal("terms")}
            />
            <CharLink
              text={t.legal.privacyTitle}
              className="font-mono-brand text-[11px] uppercase tracking-[0.14em] text-[var(--steel)]"
              onClick={() => onLegal("privacy")}
            />
            <p className="font-mono-brand text-[11px] tracking-[0.14em] uppercase" style={{ color: "var(--steel)" }}>
              {t.footer.rights}
            </p>
          </div>
        </div>

        {/* Oversized brand lockup - mark, giant wordmark, manifesto */}
        <div className="mt-16 md:mt-24 flex flex-col items-center text-center select-none" aria-hidden="false">
          <Mark size={72} tone="bone" />
          <div
            className="mt-6 font-display font-bold text-[var(--bone)] leading-[0.88] whitespace-nowrap"
            style={{ fontSize: "clamp(52px, 12.5vw, 200px)", letterSpacing: "-0.04em" }}
          >
            get<span style={{ color: "var(--acc)" }}>[named]</span>
          </div>
          <p
            className="mt-8 font-display font-bold text-[var(--bone)] max-w-[26ch]"
            style={{ fontSize: "clamp(24px, 3.4vw, 52px)", lineHeight: 1.1, letterSpacing: "-0.025em" }}
          >
            {t.hero.typed}
            <span className="type-caret" aria-hidden="true" />
          </p>
          <p
            className="mt-5 max-w-[52ch] text-[15px] md:text-[17px] leading-relaxed"
            style={{ color: "#B9B9C0" }}
          >
            {t.hero.sub}
          </p>
        </div>
      </div>
    </footer>
  );
}
