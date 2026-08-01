import { useEffect, useState } from "react";
import { useLang } from "../i18n";

/**
 * Cookie consent banner - Canada (PIPEDA) / Quebec (Law 25) style:
 * informed, granular consent with Accept and Refuse given equal
 * prominence, plus a direct link to the Privacy Policy.
 * The choice is remembered in the browser (gn_cookie_choice).
 */
const KEY = "gn_cookie_choice";

export default function CookieBanner({ onPrivacy }: { onPrivacy: () => void }) {
  const { t } = useLang();
  const c = t.cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const choose = (v: "accepted" | "refused") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={c.title}
      className="cookie-in fixed z-[90] bottom-4 left-4 right-4 md:left-6 md:bottom-6 md:right-auto md:max-w-[430px] print:hidden"
      style={{
        background: "var(--paper)",
        color: "var(--ink)",
        border: "1px solid var(--rule)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
      }}
    >
      <div className="p-6 md:p-7">
        <p className="lbl lbl-bracket mb-4" style={{ color: "var(--acc)" }}>
          cookies
        </p>
        <h2 className="font-display font-bold" style={{ fontSize: "clamp(19px, 1.6vw, 24px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
          {c.title}
        </h2>
        <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#55555c" }}>
          {c.body}
        </p>
        <button
          type="button"
          onClick={onPrivacy}
          className="mt-2 font-mono-brand text-[11.5px] tracking-[0.08em] uppercase underline underline-offset-4 hover:text-[var(--acc)] transition-colors"
          style={{ color: "var(--ink)" }}
        >
          {c.policy} →
        </button>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => choose("refused")}
            className="font-mono-brand text-[12px] tracking-[0.12em] uppercase font-semibold py-3 px-4 border transition-colors"
            style={{ borderColor: "var(--ink)", color: "var(--ink)", background: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--ink)";
              e.currentTarget.style.color = "var(--bone)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--ink)";
            }}
          >
            {c.refuse}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="font-mono-brand text-[12px] tracking-[0.12em] uppercase font-semibold py-3 px-4 transition-colors"
            style={{ background: "var(--acc)", color: "var(--bone)" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--acc)")}
          >
            {c.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
