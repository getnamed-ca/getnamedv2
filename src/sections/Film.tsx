import { useEffect, useRef } from "react";
import { useLang, type Lang, type SiteCopy } from "../i18n";
import CharLink from "../components/CharLink";
import "../film.css";

/**
 * Film - scroll-scrubbed cinematic hero ported from getnamed.ca.
 * 301 real frames drawn on a sticky canvas with an ImageBitmap sliding
 * window, five text beats, a typed AI-assistant card, chapter readout
 * and the lock finale. Engine is the old site's vanilla loop, wrapped
 * StrictMode-safe; language switches re-read copy without reloading.
 */

const FRAMES = 301;
const frameURL = (i: number) => `frames/f${String(i + 1).padStart(3, "0")}.jpg`;

const TIMINGS: { inn: number; peak: number; out: number; center: boolean }[] = [
  { inn: -0.1, peak: 0, out: 0.1, center: false },
  { inn: 0.06, peak: 0.12, out: 0.19, center: true },
  { inn: 0.24, peak: 0.3, out: 0.38, center: false },
  { inn: 0.44, peak: 0.5, out: 0.58, center: true },
  { inn: 0.72, peak: 0.78, out: 0.84, center: false },
  { inn: 0.86, peak: 0.96, out: 2, center: true }, // lock finale
];

const CH = [0, 0.2, 0.4, 0.6, 0.8];

const WORDMARKS: Record<Lang, { pre: string; em: string; post: string }> = {
  en: { pre: "get[", em: "named", post: "]" },
  fr: { pre: "nomme[", em: "toi", post: "]" },
  es: { pre: "get[", em: "named", post: "]" },
};

const MARK_SVG = (
  <>
    <path d="M46 24 H28 V96 H46" fill="none" stroke="currentColor" strokeWidth="11" />
    <path d="M74 24 H92 V96 H74" fill="none" stroke="currentColor" strokeWidth="11" />
    <rect x="55" y="40" width="10" height="40" rx="5" fill="#0F7A5A" className="fm-blink-rect" />
  </>
);

function charSpans(s: string, keyPrefix: string) {
  return [...s].map((c, i) => (
    <span className="fm-ch" key={`${keyPrefix}${i}`}>
      {c}
    </span>
  ));
}

export default function Film() {
  const { t, lang } = useLang();
  const tRef = useRef<SiteCopy>(t);
  tRef.current = t;

  const filmRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loadBarRef = useRef<HTMLElement>(null);
  const loadPctRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const grainRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const chLabelRef = useRef<HTMLDivElement>(null);
  const chBarRef = useRef<HTMLElement>(null);
  const scCardRef = useRef<HTMLDivElement>(null);
  const scQRef = useRef<HTMLDivElement>(null);
  const scARef = useRef<HTMLDivElement>(null);
  const wmkRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    let cancelled = false;
    const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    const sizeCanvas = () => {
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
    };
    sizeCanvas();

    /* ---------- frame loading ---------- */
    const images: (HTMLImageElement | null)[] = new Array(FRAMES).fill(null);
    let loaded = 0;
    const pump = () =>
      new Promise<void>((res) => {
        let i = 0;
        let inFlight = 0;
        const next = () => {
          if (cancelled) return res();
          while (inFlight < 10 && i < FRAMES) {
            const idx = i++;
            inFlight++;
            const im = new Image();
            im.onload = () => {
              if (cancelled) return;
              images[idx] = im;
              inFlight--;
              loaded++;
              const p = Math.round((loaded / FRAMES) * 100);
              if (loadBarRef.current) loadBarRef.current.style.width = p + "%";
              if (loadPctRef.current) loadPctRef.current.textContent = p + "%";
              if (idx === 0) drawFrame(0, true);
              next();
            };
            im.onerror = () => {
              if (cancelled) return;
              inFlight--;
              loaded++;
              next();
            };
            im.src = frameURL(idx);
          }
          if (loaded >= FRAMES) res();
        };
        next();
      });

    /* ---------- ImageBitmap sliding window (anti-jank core) ---------- */
    const bitmaps = new Map<number, ImageBitmap>();
    const decoding = new Set<number>();
    const B_AHEAD = 18;
    const B_KEEP = 28;
    let bmpCenter = -999;
    let displayed = -1;

    function ensureBitmaps(center: number) {
      if (Math.abs(center - bmpCenter) < 3) return;
      bmpCenter = center;
      const lo = Math.max(0, center - B_AHEAD);
      const hi = Math.min(FRAMES - 1, center + B_AHEAD);
      for (let i = lo; i <= hi; i++) {
        if (bitmaps.has(i) || decoding.has(i) || !images[i]) continue;
        decoding.add(i);
        createImageBitmap(images[i]!)
          .then((b) => {
            decoding.delete(i);
            if (cancelled) {
              b.close();
              return;
            }
            if (Math.abs(i - bmpCenter) > B_KEEP) {
              b.close();
              return;
            }
            bitmaps.set(i, b);
            if (i === displayed) drawFrame(i, true);
          })
          .catch(() => decoding.delete(i));
      }
      for (const k of Array.from(bitmaps.keys())) {
        if (k < center - B_KEEP || k > center + B_KEEP) {
          bitmaps.get(k)!.close();
          bitmaps.delete(k);
        }
      }
    }

    function nearestFrame(i: number): ImageBitmap | HTMLImageElement | null {
      for (let d = 0; d < FRAMES; d++) {
        if (bitmaps.has(i - d)) return bitmaps.get(i - d)!;
        if (bitmaps.has(i + d)) return bitmaps.get(i + d)!;
        if (images[i - d]) return images[i - d];
        if (images[i + d]) return images[i + d];
      }
      return null;
    }

    function drawFrame(i: number, force?: boolean) {
      i = Math.max(0, Math.min(FRAMES - 1, Math.round(i)));
      if (i === displayed && !force) return;
      displayed = i;
      const src = nearestFrame(i);
      if (!src) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = src.width;
      const ih = src.height;
      const s = Math.max(cw / iw, ch / ih);
      const w = iw * s;
      const h = ih * s;
      ctx.drawImage(src, (cw - w) / 2, (ch - h) / 2, w, h);
    }

    /* ---------- scroll + scrub ---------- */
    function filmProgress() {
      const r = filmRef.current!.getBoundingClientRect();
      return Math.max(0, Math.min(1, -r.top / (r.height - window.innerHeight)));
    }

    function beatAlpha(idx: number, p: number) {
      const b = TIMINGS[idx];
      if (p < b.inn || p > b.out) return 0;
      if (p < b.peak) return (p - b.inn) / Math.max(1e-4, b.peak - b.inn);
      if (b.out > 1.5) return 1;
      return 1 - (p - b.peak) / Math.max(1e-4, b.out - b.peak);
    }

    const CARET = '<span class="fm-caret"></span>';
    function buildTyped(str: string, n: number) {
      // \x01..\x02 marks the accent (name) span; n = visible chars
      let out = "";
      let vis = 0;
      let inEm = false;
      for (const c of str) {
        if (c === "\x01") {
          if (vis < n) {
            out += "<em>";
            inEm = true;
          }
          continue;
        }
        if (c === "\x02") {
          if (inEm) {
            out += "</em>";
            inEm = false;
          }
          continue;
        }
        if (vis >= n) break;
        out += c;
        vis++;
      }
      if (inEm) out += "</em>";
      return out;
    }

    function renderCard(p: number) {
      const card = scCardRef.current;
      if (!card) return;
      const d = tRef.current.film.scr;
      const oIn = Math.max(0, Math.min(1, (p - 0.575) / 0.025));
      const oOut = 1 - Math.max(0, Math.min(1, (p - 0.74) / 0.025));
      const o = Math.min(oIn, oOut);
      card.style.opacity = String(o);
      card.style.visibility = o <= 0 ? "hidden" : "visible";
      if (o <= 0) return;
      const q = d.q;
      const a = d.a;
      const qn = Math.floor(Math.max(0, Math.min(1, (p - 0.6) / 0.055)) * q.length);
      const an = Math.floor(Math.max(0, Math.min(1, (p - 0.655) / 0.055)) * a.replace(/[\x01\x02]/g, "").length);
      if (scQRef.current) scQRef.current.innerHTML = (qn > 0 ? q.slice(0, qn) : "") + (qn < q.length ? CARET : "");
      if (scARef.current)
        scARef.current.innerHTML =
          an > 0 ? buildTyped(a, an) + (an < a.replace(/[\x01\x02]/g, "").length ? CARET : CARET) : "";
    }

    let beatEls: HTMLElement[] = [];
    const collectEls = () => {
      beatEls = Array.from(filmRef.current!.querySelectorAll<HTMLElement>(".fm-beat"));
    };

    function positionLockChars(p: number) {
      // Queried per frame: React re-renders these spans on language switch
      const chars = wmkRef.current ? wmkRef.current.querySelectorAll<HTMLElement>(".fm-ch") : [];
      const tt = Math.max(0, Math.min(1, (p - 0.88) / 0.1));
      chars.forEach((s, i) => {
        const local = Math.max(0, Math.min(1, tt * 1.6 - i * 0.045));
        s.style.opacity = String(local);
        s.style.transform = `translateY(${(1 - local) * 0.9}em)`;
      });
    }

    function applyProgress(p: number, current: number) {
      drawFrame(current);
      ensureBitmaps(Math.round(current));
      beatEls.forEach((el, idx) => {
        const a = beatAlpha(idx, p);
        el.style.opacity = String(a);
        el.style.transform = a > 0 ? `translateY(${(1 - a) * 24}px)` : "";
        el.style.visibility = a <= 0 ? "hidden" : "visible";
      });
      const ramp = Math.max(0, Math.min(1, (p - 0.92) / 0.08));
      if (fadeRef.current) fadeRef.current.style.opacity = String(ramp);
      if (grainRef.current) grainRef.current.style.opacity = String(0.07 * (1 - ramp));
      if (vignetteRef.current) vignetteRef.current.style.opacity = String(1 - ramp);
      if (hintRef.current) hintRef.current.style.opacity = String(Math.max(0, 1 - p * 12));
      let ci = 0;
      for (let i = 0; i < CH.length; i++) if (p >= CH[i]) ci = i;
      const d = tRef.current.film;
      if (chLabelRef.current) chLabelRef.current.textContent = "0" + (ci + 1) + " · " + d.chapters[ci];
      const c0 = CH[ci];
      const c1 = ci < CH.length - 1 ? CH[ci + 1] : 1;
      if (chBarRef.current) chBarRef.current.style.width = Math.max(0, Math.min(1, (p - c0) / (c1 - c0))) * 100 + "%";
      renderCard(p);
    }

    /* ---------- jank meter ---------- */
    let deltas: number[] = [];
    let lastT = performance.now();
    const jankId = window.setInterval(() => {
      if (deltas.length) {
        const m = Math.max(...deltas);
        if (m > 50) console.warn("[jank] max frame delta", m.toFixed(1) + "ms");
        deltas = [];
      }
    }, 2000);

    /* ---------- main loop ---------- */
    let target = 0;
    let current = 0;
    let rafId = 0;
    function tick(now: number) {
      if (cancelled) return;
      const dt = now - lastT;
      lastT = now;
      if (dt < 200) deltas.push(dt);
      target = filmProgress();
      current += (target * (FRAMES - 1) - current) * (REDUCED ? 1 : 0.14);
      applyProgress(target, current);
      positionLockChars(target);
      rafId = requestAnimationFrame(tick);
    }

    const onResize = () => {
      sizeCanvas();
      drawFrame(displayed, true);
    };
    window.addEventListener("resize", onResize);

    /* ---------- boot ---------- */
    (async () => {
      collectEls();
      await pump();
      if (cancelled) return;
      for (let i = 0; i < 24; i++) {
        if (images[i]) {
          const b = await createImageBitmap(images[i]!).catch(() => null);
          if (b) bitmaps.set(i, b);
        }
      }
      if (cancelled) return;
      loaderRef.current?.classList.add("done");
      rafId = requestAnimationFrame(tick);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      window.clearInterval(jankId);
      window.removeEventListener("resize", onResize);
      for (const b of bitmaps.values()) b.close();
      bitmaps.clear();
      for (const im of images) {
        if (im) {
          im.onload = null;
          im.onerror = null;
        }
      }
    };
  }, []);

  const wm = WORDMARKS[lang];

  return (
    <>
      {/* Loader */}
      <div id="gn-loader" ref={loaderRef} aria-hidden="true">
        <svg className="fm-mark" viewBox="0 0 120 120" style={{ color: "#F4F4F2" }}>
          {MARK_SVG}
        </svg>
        <div className="fm-loadbar">
          <i ref={loadBarRef} />
        </div>
        <div className="fm-pct" ref={loadPctRef}>
          0%
        </div>
      </div>

      <section id="film" className="film-root" ref={filmRef} aria-label="Film">
        <div className="fm-stage">
          <canvas className="fm-canvas" ref={canvasRef} />
          <div className="fm-vignette" ref={vignetteRef} />
          <div className="fm-grain" ref={grainRef} />
          <div className="fm-fade-bottom" ref={fadeRef} />

          {/* Text beats */}
          {t.film.beats.map((b, i) => (
            <div key={i} className={`fm-beat${TIMINGS[i].center ? " fm-center" : ""}`}>
              {b.sub && <div className="fm-sub">{b.sub}</div>}
              <h2>{b.text}</h2>
            </div>
          ))}

          {/* Typed AI-assistant card */}
          <div className="fm-screen-card" ref={scCardRef} aria-hidden="true">
            <div className="fm-sc-label">{t.film.scr.label}</div>
            <div className="fm-sc-q" ref={scQRef} />
            <div className="fm-sc-a" ref={scARef} />
          </div>

          {/* Lock finale */}
          <div className="fm-beat fm-lock">
            <svg className="fm-mark" viewBox="0 0 120 120" aria-hidden="true" style={{ color: "#F4F4F2" }}>
              {MARK_SVG}
            </svg>
            <h1 className="fm-wordmark" ref={wmkRef}>
              {charSpans(wm.pre, "p")}
              <em>{charSpans(wm.em, "e")}</em>
              {charSpans(wm.post, "s")}
              <span className="fm-caret" aria-hidden="true" />
            </h1>
            <div className="fm-tag">{t.film.lock.tagline}</div>
            <a
              className="fm-btn"
              href="#report"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("report")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <CharLink text={t.film.lock.cta} bare twinColor="var(--deep)" />
            </a>
          </div>

          {/* Chapter readout */}
          <div className="fm-readout" aria-hidden="true">
            <div className="fm-ch-label" ref={chLabelRef}>
              01 · {t.film.chapters[0]}
            </div>
            <div className="fm-bar">
              <i ref={chBarRef} />
            </div>
          </div>
          <div className="fm-scrollhint" ref={hintRef}>
            {t.hero.scroll} ↓
          </div>
        </div>
      </section>
    </>
  );
}
