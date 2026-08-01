import { useEffect, useMemo, useState } from "react";
import { useLang, LANGS, type Lang } from "../i18n";
import { Mark, Wordmark } from "../components/Mark";

const STORAGE_KEY = "getnamed_intake_v1";

interface IntakeData {
  fields: Record<string, string>;
  choices: Record<string, string[]>;
}

function load(): IntakeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* noop */
  }
  return { fields: {}, choices: {} };
}

export default function Intake({ onBack }: { onBack: () => void }) {
  const { lang, setLang, t } = useLang();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeData>(load);

  const ti = t.intake;
  const TOTAL = ti.steps.length;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.lang = lang === "fr" ? "fr-CA" : lang;
  }, [step, lang]);

  const setField = (id: string, v: string) =>
    setData((d) => ({ ...d, fields: { ...d.fields, [id]: v } }));

  const toggleChoice = (group: string, val: string) =>
    setData((d) => {
      const cur = d.choices[group] || [];
      const next = cur.includes(val) ? cur.filter((x) => x !== val) : [...cur, val];
      return { ...d, choices: { ...d.choices, [group]: next } };
    });

  const mailto = useMemo(() => {
    let body = ti.emailHeading + "\n\n";
    ti.sections.forEach((sec) => {
      body += "== " + sec.title.toUpperCase() + " ==\n";
      sec.fields.forEach((f) => {
        const v = data.fields[f.id];
        if (v) body += f.label + ": " + v + "\n";
      });
      sec.choices.forEach((g) => {
        const v = (data.choices[g] || []).join(", ");
        if (v) body += (ti.choiceLabels[g] || g) + ": " + v + "\n";
      });
      body += "\n";
    });
    const subject = ti.emailSubject + (data.fields["biz_name"] || "");
    return "mailto:ProjectQuote@getnamed.ca?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }, [data, ti]);

  const copySummary = () => {
    let text = "";
    ti.sections.forEach((sec) => {
      text += sec.title.toUpperCase() + "\n";
      sec.fields.forEach((f) => {
        const v = data.fields[f.id];
        if (v) text += "- " + f.label + ": " + v + "\n";
      });
      sec.choices.forEach((g) => {
        const v = (data.choices[g] || []).join(", ");
        if (v) text += "- " + (ti.choiceLabels[g] || g) + ": " + v + "\n";
      });
      text += "\n";
    });
    navigator.clipboard.writeText(text).then(() => alert(ti.copied));
  };

  const current = ti.steps[step];
  const isLast = step === TOTAL - 1;

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)", color: "var(--ink)" }}>
      {/* progress */}
      <div className="sticky top-0 z-40 h-[3px] print:hidden" style={{ background: "var(--rule)" }}>
        <div className="h-full transition-all duration-300" style={{ width: `${((step + 1) / TOTAL) * 100}%`, background: "var(--acc)" }} />
      </div>

      <div className="max-w-[760px] mx-auto px-5 md:px-6 pt-8 pb-28">
        {/* intake top bar */}
        <header className="flex items-center justify-between gap-4 mb-10 print:hidden">
          <button type="button" onClick={onBack} className="flex items-center gap-3 group">
            <Mark size={30} tone="ink" />
            <Wordmark tone="ink" style={{ fontSize: 18 }} />
            <span className="font-mono-brand text-[11px] tracking-[0.12em] uppercase ml-2 group-hover:text-[var(--acc)] transition-colors" style={{ color: "var(--steel)" }}>
              ← {t.nav.back}
            </span>
          </button>
          <div className="flex border" style={{ borderColor: "var(--rule)" }}>
            {LANGS.map((l: { id: Lang; label: string }) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                className="font-mono-brand text-[11px] tracking-[0.08em] px-3 py-2 transition-colors"
                style={lang === l.id ? { background: "var(--ink)", color: "var(--bone)" } : { color: "var(--steel)" }}
              >
                {l.label}
              </button>
            ))}
          </div>
        </header>

        <p className="lbl lbl-bracket mb-3">{ti.title}</p>
        <p className="text-[14px] mb-10 print:hidden" style={{ color: "var(--steel)" }}>{ti.subtitle}</p>

        {/* step */}
        <section key={step} style={{ animation: "gn-step-in 0.25s ease" }}>
          <div className="flex items-center justify-between border-b pb-3 mb-6" style={{ borderColor: "var(--rule)" }}>
            <span className="lbl">
              {ti.stepOf} {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")} · {current.eyebrow}
            </span>
          </div>
          <h2 className="font-display font-bold mb-2" style={{ fontSize: "clamp(24px, 3vw, 34px)", lineHeight: 1.08, letterSpacing: "-0.025em" }}>
            {current.h}
          </h2>
          <p className="text-[15px] mb-8 max-w-[56ch]" style={{ color: "var(--steel)" }}>{current.lede}</p>

          {current.fields.map((f) => (
            <div key={f.id} className="mb-5">
              <label htmlFor={f.id} className="block font-mono-brand text-[11px] tracking-[0.1em] uppercase font-semibold mb-2">
                {f.label} {f.required && <span style={{ color: "var(--acc)" }}>*</span>}
              </label>
              {f.textarea ? (
                <textarea id={f.id} className="gn-input" rows={3} placeholder={f.ph || ""} value={data.fields[f.id] || ""} onChange={(e) => setField(f.id, e.target.value)} />
              ) : (
                <input id={f.id} type={f.id.includes("email") ? "email" : f.id.includes("site") || f.id.includes("comp") ? "text" : "text"} className="gn-input" placeholder={f.ph || ""} value={data.fields[f.id] || ""} onChange={(e) => setField(f.id, e.target.value)} />
              )}
              {f.hint && <p className="text-[12.5px] mt-1.5" style={{ color: "var(--steel)" }}>{f.hint}</p>}
            </div>
          ))}

          {current.choices.map((c) => (
            <div key={c.id} className="mb-6">
              <p className="font-mono-brand text-[11px] tracking-[0.1em] uppercase font-semibold mb-2.5">{c.label}</p>
              <div className="flex flex-wrap gap-2">
                {c.options.map((opt) => {
                  const on = (data.choices[c.id] || []).includes(opt);
                  return (
                    <button key={opt} type="button" className={`chip ${on ? "on" : ""}`} onClick={() => toggleChoice(c.id, opt)} aria-pressed={on}>
                      <span className="tick">✓ </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* review step */}
          {isLast && (
            <div>
              {ti.sections.map((sec) => {
                const rows: { k: string; v: string }[] = [];
                sec.fields.forEach((f) => {
                  const v = data.fields[f.id];
                  if (v) rows.push({ k: f.label, v });
                });
                sec.choices.forEach((g) => {
                  const v = (data.choices[g] || []).join(", ");
                  if (v) rows.push({ k: ti.choiceLabels[g] || g, v });
                });
                if (!rows.length) return null;
                return (
                  <div key={sec.title} className="border p-5 mb-4" style={{ borderColor: "var(--rule)", background: "#fff" }}>
                    <h4 className="font-mono-brand text-[12px] tracking-[0.08em] uppercase mb-3" style={{ color: "var(--steel)" }}>
                      {sec.title}
                    </h4>
                    <dl className="grid gap-x-4 gap-y-1.5 text-[14px]" style={{ gridTemplateColumns: "38% 62%" }}>
                      {rows.map((r, i) => (
                        <div key={i} className="contents">
                          <dt style={{ color: "var(--steel)" }}>{r.k}</dt>
                          <dd className="m-0">{r.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
              {!Object.keys(data.fields).length && !Object.keys(data.choices).length && <p className="text-[14px]" style={{ color: "var(--steel)" }}>{ti.noAnswers}</p>}
              <div className="flex flex-wrap gap-3 mt-6 print:hidden">
                <button type="button" onClick={() => window.print()} className="font-mono-brand text-[12px] tracking-[0.1em] uppercase font-semibold px-5 py-3 transition-colors" style={{ background: "var(--ink)", color: "var(--bone)" }}>
                  {ti.print}
                </button>
                <button type="button" onClick={copySummary} className="font-mono-brand text-[12px] tracking-[0.1em] uppercase font-semibold px-5 py-3 border transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]" style={{ borderColor: "var(--ink)", color: "var(--ink)" }}>
                  {ti.copy}
                </button>
                <a href={mailto} className="font-mono-brand text-[12px] tracking-[0.1em] uppercase font-semibold px-5 py-3 transition-colors" style={{ background: "var(--acc)", color: "var(--bone)" }}>
                  {ti.email} →
                </a>
              </div>
            </div>
          )}
        </section>

        {/* nav */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t print:hidden" style={{ borderColor: "var(--rule)" }}>
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="font-mono-brand text-[12px] tracking-[0.1em] uppercase font-semibold px-5 py-3 border transition-colors hover:bg-[var(--ink)] hover:text-[var(--bone)]"
            style={{ borderColor: "var(--ink)", color: "var(--ink)", visibility: step === 0 ? "hidden" : "visible" }}
          >
            {ti.back}
          </button>
          <div className="flex gap-1.5" aria-hidden="true">
            {ti.steps.map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: i <= step ? "var(--acc)" : "var(--rule)" }} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(TOTAL - 1, s + 1))}
            disabled={isLast}
            className="font-mono-brand text-[12px] tracking-[0.1em] uppercase font-semibold px-5 py-3 transition-colors disabled:opacity-30"
            style={{ background: "var(--ink)", color: "var(--bone)" }}
            onMouseEnter={(e) => { if (!isLast) e.currentTarget.style.background = "var(--acc)"; }}
            onMouseLeave={(e) => (e.currentTarget.style.background = "var(--ink)")}
          >
            {isLast ? ti.done : ti.next}
          </button>
        </div>
      </div>

      <style>{`@keyframes gn-step-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
