import { useEffect, useMemo, useState } from "react";
import { COPY, LangContext, getInitialLang, type Lang } from "./i18n";
import Cursor from "./components/Cursor";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import FreeReport from "./sections/FreeReport";
import Manifesto from "./sections/Manifesto";
import Work from "./sections/Work";
import Services from "./sections/Services";
import Ethos from "./sections/Ethos";
import Faq from "./sections/Faq";
import Footer from "./sections/Footer";
import Intake from "./sections/Intake";
import Legal, { type LegalDoc } from "./sections/Legal";
import CookieBanner from "./components/CookieBanner";

const TITLES: Record<Lang, string> = {
  en: "getnamed · Digital Studio in Montréal | Brands, Websites, SEO & AI Visibility",
  fr: "getnamed · Atelier digital à Montréal | Marques, sites web, SEO et visibilité IA",
  es: "getnamed · Estudio digital en Montreal | Marcas, sitios web, SEO y visibilidad IA",
};

const DESCS: Record<Lang, string> = {
  en: "getnamed is a bilingual digital studio in Montréal building brands and websites for companies that refuse to be ignored. Found on Google, named in AI answers, in French and English.",
  fr: "getnamed est un atelier digital bilingue à Montréal qui bâtit des marques et des sites pour les entreprises qui refusent de passer inaperçues. Trouvées sur Google, nommées dans les réponses IA, en français et en anglais.",
  es: "getnamed es un estudio digital bilingüe en Montreal que construye marcas y sitios para empresas que se niegan a pasar desapercibidas. Encontradas en Google, nombradas en respuestas de IA, en francés e inglés.",
};

export default function App() {
  const [lang, setLangState] = useState<Lang>(getInitialLang);
  const [view, setView] = useState<"home" | "intake" | LegalDoc>("home");

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("gn_lang", l);
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    document.documentElement.lang = lang === "fr" ? "fr-CA" : lang;
    document.title = TITLES[lang];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", DESCS[lang]);
  }, [lang]);

  const goHome = () => {
    setView("home");
    window.scrollTo(0, 0);
  };
  const goIntake = () => {
    setView("intake");
    window.scrollTo(0, 0);
  };
  const goLegal = (d: LegalDoc) => {
    setView(d);
    window.scrollTo(0, 0);
  };
  const navTo = (id: string) => {
    if (view !== "home") {
      setView("home");
      requestAnimationFrame(() => {
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
      });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const ctx = useMemo(() => ({ lang, setLang, t: COPY[lang] }), [lang]);

  return (
    <LangContext.Provider value={ctx}>
      <Cursor />
      {view === "home" ? (
        <>
          <Header onIntake={goIntake} onNav={navTo} />
          <main>
            <Hero />
            <FreeReport onLegal={goLegal} />
            <Manifesto />
            <Work />
            <Services />
            <Ethos />
            <Faq />
          </main>
          <Footer onIntake={goIntake} onLegal={goLegal} />
        </>
      ) : view === "intake" ? (
        <Intake onBack={goHome} />
      ) : (
        <Legal doc={view} onBack={goHome} onNav={goLegal} />
      )}
      <CookieBanner onPrivacy={() => goLegal("privacy")} />
    </LangContext.Provider>
  );
}
