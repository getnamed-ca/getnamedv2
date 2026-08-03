import { useLang } from "../i18n";
import CharLink from "../components/CharLink";

/**
 * Ethos - the studio's belief system, editorial two-column.
 * Ends with the studio strip: silhouettes + city bokeh
 * (placeholder for Seedance clip 03 → /public/media/studio.mp4).
 */
const STUDIO_VIDEO = false;

export default function Ethos({ onIntake }: { onIntake: () => void }) {
  const { t } = useLang();

  return (
    <section id="ethos" className="relative py-24 md:py-36" style={{ background: "var(--deep)" }}>
      <div className="max-w-[1600px] mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20">
        <div className="self-start">
          <p className="lbl lbl-bracket mb-4">{t.ethos.label}</p>
        </div>
        <div>
          <h2
            className="font-display font-bold text-[var(--bone)] max-w-[22ch]"
            style={{ fontSize: "clamp(30px, 3.8vw, 60px)", lineHeight: 1.02, letterSpacing: "-0.03em" }}
          >
            {t.ethos.title}
          </h2>
          <div className="mt-10 space-y-7 max-w-[62ch]">
            {t.ethos.paras.map((p, i) => (
              <p key={i} className="text-[16px] md:text-[18px] leading-relaxed" style={{ color: i === 0 ? "#D8D8DE" : "#B9B9C0" }}>
                {p}
              </p>
            ))}
          </div>

          {/* Studio strip - clip 03 placeholder */}
          <div className="relative mt-16 overflow-hidden" style={{ border: "1px solid var(--rule-dark)", aspectRatio: "21 / 9" }}>
            {STUDIO_VIDEO ? (
              <video src="/media/studio.mp4" muted loop playsInline autoPlay className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0d0e11 0%, #07080a 100%)" }} aria-hidden="true">
                {/* city bokeh through the window */}
                <div className="bokeh-layer absolute inset-0">
                  {[
                    [12, 30, 70, "rgba(201,162,39,0.20)"],
                    [28, 22, 44, "rgba(244,244,242,0.10)"],
                    [45, 34, 90, "rgba(15,122,90,0.16)"],
                    [66, 20, 52, "rgba(201,162,39,0.14)"],
                    [82, 32, 76, "rgba(244,244,242,0.08)"],
                    [55, 18, 34, "rgba(201,162,39,0.18)"],
                    [90, 24, 40, "rgba(15,122,90,0.12)"],
                  ].map(([x, y, r, c], i) => (
                    <span
                      key={i}
                      className="absolute rounded-full"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        width: r,
                        height: r,
                        background: c,
                        filter: "blur(14px)",
                      }}
                    />
                  ))}
                </div>
                {/* silhouettes at desks */}
                <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1200 260" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M0 260 V190 Q120 178 210 192 T420 188 T640 196 T880 186 T1200 194 V260 Z" fill="#050607" opacity="0.9" />
                  <circle cx="300" cy="150" r="26" fill="#050607" />
                  <rect x="258" y="170" width="150" height="92" rx="10" fill="#050607" />
                  <circle cx="720" cy="142" r="28" fill="#050607" />
                  <rect x="672" y="164" width="160" height="98" rx="10" fill="#050607" />
                  {/* monitor glows */}
                  <rect x="430" y="120" width="130" height="80" rx="6" fill="#12a176" opacity="0.14" />
                  <rect x="440" y="130" width="110" height="60" rx="4" fill="#12a176" opacity="0.12" />
                  <rect x="880" y="112" width="140" height="86" rx="6" fill="#c9a227" opacity="0.10" />
                  <rect x="891" y="123" width="118" height="64" rx="4" fill="#c9a227" opacity="0.09" />
                </svg>
              </div>
            )}
            <p className="absolute bottom-4 left-5 lbl lbl-bracket z-10">{t.ethos.stripCaption}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-16 md:mt-20 px-5 md:px-10">
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
    </section>
  );
}
