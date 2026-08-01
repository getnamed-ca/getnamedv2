import { useState } from "react";
import { useLang } from "../i18n";

/**
 * Free Report CTA - sits directly under the hero.
 * Two-column box on paper: headline + supporting copy left,
 * name / business / domain / email (+ optional phone) form right,
 * Named-Green button. All fields mandatory except phone;
 * required fields carry a red asterisk. Email is format-checked.
 * No backend by design: submission opens a pre-filled email
 * to SEOfreereport@getnamed.ca.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function FreeReport({ onLegal }: { onLegal: (d: "terms" | "privacy") => void }) {
  const { t } = useLang();
  const r = t.report;
  const [name, setName] = useState("");
  const [biz, setBiz] = useState("");
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  // error kind (not a stored string) so the message always follows the active language
  const [err, setErr] = useState<"" | "missing" | "email">("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !biz.trim() || !domain.trim() || !email.trim()) {
      setErr("missing");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErr("email");
      return;
    }
    setErr("");
    const subject = r.mailSubject + biz.trim();
    const lines = [
      `${r.name}: ${name.trim()}`,
      `${r.business}: ${biz.trim()}`,
      `${r.domain}: ${domain.trim()}`,
      `${r.email}: ${email.trim()}`,
    ];
    if (phone.trim()) lines.push(`${r.phone}: ${phone.trim()}`);
    window.location.href =
      "mailto:SEOfreereport@getnamed.ca?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));
  };

  const asterisk = <span style={{ color: "#D32626" }} aria-hidden="true"> *</span>;

  const fieldLabel = (htmlFor: string, text: string, required: boolean) => (
    <label htmlFor={htmlFor} className="lbl" style={{ color: "var(--ink)" }}>
      {text}
      {required ? asterisk : <span style={{ color: "var(--steel)" }}> {r.optional}</span>}
    </label>
  );

  return (
    <section id="report" className="relative py-20 md:py-28" style={{ background: "var(--paper)", color: "var(--ink)" }} aria-label="Free report">
      <div className="max-w-[1600px] mx-auto px-5 md:px-10">
        {/* top bar */}
        <div className="flex items-center justify-between border-b pb-3 mb-10 md:mb-14" style={{ borderColor: "var(--rule)" }}>
          <p className="lbl lbl-bracket" style={{ color: "var(--acc)" }}>{r.topLeft}</p>
          <p className="lbl">{r.topRight}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* left: headline + supporting copy */}
          <div>
            <h2
              className="font-display font-bold"
              style={{ fontSize: "clamp(40px, 5.4vw, 88px)", lineHeight: 0.96, letterSpacing: "-0.035em", color: "var(--ink)" }}
            >
              {r.headline}
            </h2>
            <p className="mt-7 max-w-[52ch] text-[16px] md:text-[17.5px] leading-relaxed" style={{ color: "#55555c" }}>
              {r.body}
            </p>
          </div>

          {/* right: form */}
          <form onSubmit={submit} noValidate className="w-full">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                {fieldLabel("fr-name", r.name, true)}
                <input
                  id="fr-name"
                  type="text"
                  className="gn-input"
                  placeholder={r.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                {fieldLabel("fr-biz", r.business, true)}
                <input
                  id="fr-biz"
                  type="text"
                  className="gn-input"
                  placeholder={r.business}
                  value={biz}
                  onChange={(e) => setBiz(e.target.value)}
                  autoComplete="organization"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                {fieldLabel("fr-domain", r.domain, true)}
                <input
                  id="fr-domain"
                  type="text"
                  className="gn-input"
                  placeholder="www.yourbiz.ca"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  autoComplete="url"
                  inputMode="url"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                {fieldLabel("fr-email", r.email, true)}
                <input
                  id="fr-email"
                  type="email"
                  className="gn-input"
                  placeholder="name@yourbiz.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                {fieldLabel("fr-phone", r.phone, false)}
                <input
                  id="fr-phone"
                  type="tel"
                  className="gn-input"
                  placeholder={r.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </div>

              <button
                type="submit"
                className="font-mono-brand text-[13px] tracking-[0.14em] uppercase font-semibold py-4 px-6 transition-colors"
                style={{ background: "var(--acc)", color: "var(--bone)" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--acc)")}
              >
                {r.button}
              </button>

              {err && (
                <p className="font-mono-brand text-[12px] tracking-[0.06em]" style={{ color: "#D32626" }} role="alert">
                  {err === "missing" ? r.missing : r.invalidEmail}
                </p>
              )}

              <p className="font-mono-brand text-[12px] tracking-[0.04em] text-center" style={{ color: "var(--steel)" }}>
                {r.note}
              </p>

              <p className="font-mono-brand text-[11px] tracking-[0.04em] leading-relaxed text-center" style={{ color: "var(--steel)" }}>
                {r.consentPre}{" "}
                <button
                  type="button"
                  onClick={() => onLegal("terms")}
                  className="underline underline-offset-2 hover:text-[var(--acc)] transition-colors"
                  style={{ color: "var(--ink)" }}
                >
                  {r.terms}
                </button>{" "}
                {r.consentMid}{" "}
                <button
                  type="button"
                  onClick={() => onLegal("privacy")}
                  className="underline underline-offset-2 hover:text-[var(--acc)] transition-colors"
                  style={{ color: "var(--ink)" }}
                >
                  {r.privacy}
                </button>
                .
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
