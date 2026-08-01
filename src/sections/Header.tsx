import { useEffect, useRef, useState } from "react";
import { useLang, LANGS, type Lang } from "../i18n";
import { Mark, Wordmark } from "../components/Mark";
import CharLink from "../components/CharLink";

export default function Header({ onIntake, onNav }: { onIntake: () => void; onNav: (id: string) => void }) {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    const onClick = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const pick = (l: Lang) => {
    setLang(l);
    setLangOpen(false);
  };

  const links = [
    { id: "work", label: t.nav.work },
    { id: "services", label: t.nav.services },
    { id: "ethos", label: t.nav.studio },
    { id: "faq", label: t.nav.faq },
  ];

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(11,12,14,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--rule-dark)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between px-5 md:px-10 py-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3"
            aria-label="getnamed home"
          >
            <Mark size={30} tone="bone" />
            <Wordmark tone="bone" style={{ fontSize: 19 }} />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
            {links.map((l) => (
              <CharLink
                key={l.id}
                text={l.label}
                className="font-mono-brand text-[12px] uppercase tracking-[0.14em] text-[var(--bone)]"
                onClick={(e) => {
                  e.preventDefault();
                  onNav(l.id);
                }}
                href={`#${l.id}`}
              />
            ))}
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Language selector */}
            <div ref={langRef} className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className="font-mono-brand text-[12px] tracking-[0.14em] uppercase text-[var(--bone)] border border-[var(--rule-dark)] px-3 py-2 flex items-center gap-2 hover:border-[var(--acc)] transition-colors"
              >
                <span className="text-[var(--acc-bright)]">[</span>
                {lang.toUpperCase()}
                <span className="text-[var(--acc-bright)]">]</span>
                <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
                  <path d="M1 1l3.5 3.5L8 1" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
              {langOpen && (
                <div
                  role="listbox"
                  className="absolute right-0 mt-2 min-w-[190px] border border-[var(--rule-dark)]"
                  style={{ background: "rgba(11,12,14,0.96)", backdropFilter: "blur(14px)" }}
                >
                  {LANGS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      role="option"
                      aria-selected={lang === l.id}
                      onClick={() => pick(l.id)}
                      className="w-full text-left px-4 py-3 font-mono-brand text-[12px] tracking-[0.1em] uppercase flex items-center justify-between hover:bg-[#15171b] transition-colors"
                      style={{ color: lang === l.id ? "var(--acc-bright)" : "var(--bone)" }}
                    >
                      <span>{l.full}</span>
                      {lang === l.id && <span aria-hidden="true">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA - client project intake */}
            <button
              type="button"
              onClick={onIntake}
              className="hidden md:inline-flex items-center gap-2 font-mono-brand text-[12px] tracking-[0.12em] uppercase font-semibold px-4 py-2.5 transition-colors"
              style={{ background: "var(--bone)", color: "var(--ink)" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--acc-bright)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bone)")}
            >
              {t.nav.cta}
              <span aria-hidden="true">→</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="block w-6 h-[2px] bg-[var(--bone)] transition-transform" style={{ transform: menuOpen ? "translateY(4px) rotate(45deg)" : "none" }} />
              <span className="block w-6 h-[2px] bg-[var(--bone)] transition-transform" style={{ transform: menuOpen ? "translateY(-4px) rotate(-45deg)" : "none" }} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col justify-center px-8" style={{ background: "var(--deep)" }}>
          <nav className="flex flex-col gap-6" aria-label="Mobile">
            {links.map((l, i) => (
              <button
                key={l.id}
                type="button"
                className="text-left font-display font-bold text-[13vw] leading-[0.95] text-[var(--bone)]"
                style={{ letterSpacing: "-0.03em", transitionDelay: `${i * 60}ms` }}
                onClick={() => {
                  setMenuOpen(false);
                  onNav(l.id);
                }}
              >
                <span className="font-mono-brand text-[13px] text-[var(--acc-bright)] align-super mr-3">0{i + 1}</span>
                {l.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                onIntake();
              }}
              className="mt-6 inline-flex w-fit items-center gap-3 font-mono-brand text-[13px] tracking-[0.12em] uppercase font-semibold px-6 py-4"
              style={{ background: "var(--acc)", color: "var(--bone)" }}
            >
              {t.nav.cta} →
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
