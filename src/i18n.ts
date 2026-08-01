import { createContext, useContext } from "react";

export type Lang = "en" | "fr" | "es";

export const LANGS: { id: Lang; label: string; full: string }[] = [
  { id: "en", label: "EN", full: "English" },
  { id: "fr", label: "FR", full: "Français (Canada)" },
  { id: "es", label: "ES", full: "Español" },
];

export interface SiteCopy {
  nav: { work: string; services: string; studio: string; faq: string; cta: string; back: string };
  hero: {
    eyebrow: string;
    typed: string;
    sub: string;
    scroll: string;
    videoNote: string;
  };
  film: {
    beats: { sub?: string; text: string }[];
    chapters: string[];
    scr: { label: string; q: string; a: string };
    lock: { tagline: string; cta: string };
  };
  report: {
    topLeft: string;
    topRight: string;
    headline: string;
    body: string;
    name: string;
    business: string;
    domain: string;
    email: string;
    phone: string;
    optional: string;
    button: string;
    note: string;
    mailSubject: string;
    missing: string;
    invalidEmail: string;
    consentPre: string;
    terms: string;
    consentMid: string;
    privacy: string;
  };
  cookie: { title: string; body: string; accept: string; refuse: string; policy: string };
  legal: {
    updated: string;
    termsTitle: string;
    privacyTitle: string;
    otherDoc: string;
    terms: LegalSection[];
    privacy: LegalSection[];
  };
  manifesto: {
    intro: string;
    words: string[];
    outro: string;
  };
  work: {
    label: string;
    title: string;
    note: string;
    reel: string;
    items: { name: string; sector: string; tags: string; stat: string }[];
  };
  services: {
    label: string;
    title: string;
    lede: string;
    items: { n: string; h: string; p: string }[];
  };
  programme: {
    label: string;
    title: string;
    lede: string;
    tiers: { n: string; h: string; p: string }[];
    measure: string;
  };
  pricing: {
    label: string;
    title: string;
    rows: { k: string; v: string }[];
    note: string;
  };
  proof: {
    label: string;
    title: string;
    lede: string;
    stats: { v: string; p: string }[];
    guarantees: string[];
  };
  ethos: { label: string; title: string; paras: string[]; stripCaption: string };
  faq: { label: string; title: string; items: { q: string; a: string }[] };
  footer: {
    big: string;
    emailLabel: string;
    socialsLabel: string;
    tagline: string;
    location: string;
    rights: string;
  };
  intake: IntakeCopy;
}

export interface LegalSection {
  h: string;
  p: string[];
}

export interface IntakeCopy {
  title: string;
  subtitle: string;
  back: string;
  next: string;
  done: string;
  stepOf: string;
  print: string;
  copy: string;
  copied: string;
  email: string;
  emailSubject: string;
  emailHeading: string;
  noAnswers: string;
  steps: {
    eyebrow: string;
    h: string;
    lede: string;
    fields: { id: string; label: string; ph?: string; hint?: string; textarea?: boolean; required?: boolean }[];
    choices: { id: string; label: string; options: string[] }[];
  }[];
  sections: { title: string; fields: { id: string; label: string }[]; choices: string[] }[];
  choiceLabels: Record<string, string>;
}

/* ================================================================
   ENGLISH
   ================================================================ */
const en: SiteCopy = {
  nav: {
    work: "Work",
    services: "Services",
    studio: "Studio",
    faq: "FAQ",
    cta: "Start a project",
    back: "Back to site",
  },
  hero: {
    eyebrow: "Digital studio · Montréal",
    typed: "For companies that refuse to be ignored.",
    sub: "Brands. Websites. Findability, on Google and inside AI answers, in French and English.",
    scroll: "Scroll",
    videoNote: "Hero motion slot: drop Seedance clip 01 (ink bloom, 1080p, 16:9) into /public/media/hero.mp4",
  },
  film: {
    beats: [
      { sub: "Montréal, blue hour", text: "Quebec has 228,622 small businesses." },
      { text: "Most of them are invisible." },
      { text: "When someone asks Google, ChatGPT, Perplexity or Claude for what you do," },
      { text: "an answer gets written. With or without you." },
      { text: "We make sure the answer is your name." },
    ],
    chapters: ["The Main", "The Query", "The Dive", "The Citation", "The Lock"],
    scr: {
      label: "AI assistant · live",
      q: "best HVAC contractor in Montreal?",
      a: "Top answer: your business, cited first, in English and French.",
    },
    lock: { tagline: "Be the answer.", cta: "Get your free AI Visibility Report" },
  },
  report: {
    topLeft: "FREE REPORT WITHIN 48 HRS.",
    topRight: "01",
    headline: "Find out if you're the answer.",
    body: "We run your business through the queries your customers actually ask, in English and French, on Google and on the AI assistants, and show you whether you're named, who's named instead, and what it would take to change that.",
    name: "Your name",
    business: "Business name",
    domain: "Domain name",
    email: "Work email",
    phone: "Phone number",
    optional: "(optional)",
    button: "GET OUR FREE REPORT",
    note: "Free. No pitch attached. The report stands on its own.",
    mailSubject: "Free Report Request: ",
    missing: "Please fill in every field marked with an asterisk.",
    invalidEmail: "Enter a valid email address (name@example.com).",
    consentPre: "By sending this request, you accept our",
    terms: "Terms of Use",
    consentMid: "and our",
    privacy: "Privacy Policy",
  },
  cookie: {
    title: "This website uses cookies",
    body: "This website uses cookies to improve user experience.",
    accept: "Accept",
    refuse: "Refuse",
    policy: "Privacy Policy",
  },
  legal: {
    updated: "Last updated: August 2026",
    termsTitle: "Terms of Use",
    privacyTitle: "Privacy Policy",
    otherDoc: "Also read:",
    terms: [
      { h: "1. Agreement to these terms", p: ["These Terms of Use govern access to and use of the getnamed website (getnamed.ca). By browsing the site, or by submitting a free report request, a project quote, or an intake brief, you accept these terms. If you do not accept them, please do not use the site."] },
      { h: "2. Who we are", p: ["getnamed is a digital studio operating in Montréal, Quebec, Canada. You can reach us at any time at Compliance@getnamed.ca."] },
      { h: "3. A request is not a contract", p: ["The site presents the studio's services and lets you request a free visibility report or a project quote. Submitting a request creates neither a client relationship nor any obligation on either side. Any engagement with getnamed begins only when both parties sign a separate written agreement."] },
      { h: "4. Free reports", p: ["Free reports are prepared from information available at the time of writing and are provided for informational purposes only. They are not professional, legal, or financial advice, and they do not guarantee any ranking, traffic, lead, or revenue outcome."] },
      { h: "5. Intellectual property", p: ["All content on this site, including text, design, code, imagery, and the getnamed name and marks, is the property of getnamed or its licensors. You may not copy, reproduce, modify, or redistribute it without our prior written permission."] },
      { h: "6. Acceptable use", p: ["You agree to use the site lawfully and not to: scrape or harvest its content or code, interfere with its operation or security, attempt unauthorized access, or submit false information or another person's personal information without their consent."] },
      { h: "7. No warranty", p: ["The site and its content are provided \"as is\" and \"as available\". We do not warrant that the site will be uninterrupted, error-free, or free of harmful components."] },
      { h: "8. Limitation of liability", p: ["To the fullest extent permitted by applicable law, getnamed is not liable for any indirect, incidental, or consequential damages arising from the use of, or inability to use, the site. Nothing in these terms limits any right you may have under Quebec's Consumer Protection Act, where it applies."] },
      { h: "9. Third-party links", p: ["The site may link to third-party websites. Those links are provided for convenience; getnamed does not control those sites and is not responsible for their content or their practices."] },
      { h: "10. Changes to these terms", p: ["We may update these terms from time to time. The date above indicates the latest version, and continued use of the site after a change means you accept the updated terms."] },
      { h: "11. Governing law", p: ["These terms are governed by the laws applicable in the province of Quebec and the federal laws of Canada. Any dispute related to the site falls under the exclusive jurisdiction of the courts of the judicial district of Montréal."] },
      { h: "12. Contact", p: ["Questions about these terms: Compliance@getnamed.ca."] },
    ],
    privacy: [
      { h: "1. Scope of this policy", p: ["This Privacy Policy explains how getnamed collects, uses, communicates, and protects personal information on getnamed.ca. It is written to comply with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA) and Quebec's Act respecting the protection of personal information in the private sector, as modernized by Law 25."] },
      { h: "2. Person responsible for the protection of personal information", p: ["The person responsible for the protection of personal information at getnamed oversees this policy and the compliance of our practices. You can reach them at Compliance@getnamed.ca."] },
      { h: "3. Information we collect", p: ["Information you send us: your name, business name, domain name, work email, phone number (if you choose to provide it), the content of your intake brief, and your correspondence with us.", "Technical information: browser and device type, language preference, and your cookie choice, stored locally in your own browser."] },
      { h: "4. Why we collect it", p: ["We use this information to respond to your requests, prepare your free report or quote, communicate with you about your project, improve the site, and meet our legal obligations. We do not use your personal information to build advertising profiles, and we never sell it."] },
      { h: "5. Consent", p: ["By submitting a form, you consent to the collection and use described here. Cookie consent is collected through the banner shown on your first visit. You may withdraw your consent at any time by writing to Compliance@getnamed.ca, subject to legal or contractual restrictions."] },
      { h: "6. Cookies", p: ["This site uses only functional cookies or browser storage: remembering your language and your cookie choice. We do not use advertising, analytics-profiling, or cross-site tracking cookies. You can refuse cookies in the banner; the site's essential functions will keep working."] },
      { h: "7. Communication to third parties", p: ["We do not sell or rent your personal information. It may be processed by service providers (hosting, email delivery) bound by confidentiality obligations, or disclosed where the law requires it. Personal information may be communicated outside Quebec (including other provinces or countries); it is then subject to the laws of that territory."] },
      { h: "8. Retention", p: ["We keep personal information only as long as needed for the purposes described above, then securely destroy or anonymize it."] },
      { h: "9. Security", p: ["We apply reasonable and appropriate security measures, and access is limited to team members who need it. No method of transmission or storage is, however, 100% secure."] },
      { h: "10. Your rights", p: ["You may request access to your personal information, its portability, rectification, or deletion, and you may withdraw your consent. Write to Compliance@getnamed.ca; we respond within 30 days. You may also file a complaint with the Commission d'accès à l'information du Québec (www.cai.gouv.qc.ca) or the Office of the Privacy Commissioner of Canada (www.priv.gc.ca)."] },
      { h: "11. Changes to this policy", p: ["The date above indicates the latest version. Any material change will be announced on the site."] },
      { h: "12. Contact", p: ["For any question about this policy or your personal information: Compliance@getnamed.ca."] },
    ],
  },
  manifesto: {
    intro: "Most websites whisper. Ours don't.",
    words: ["LOUD.", "PRECISE.", "UNFORGETTABLE."],
    outro: "That's the whole brief.",
  },
  work: {
    label: "Selected work",
    title: "Proof, not promises.",
    note: "Showcase projects. Client work under NDA stays private.",
    reel: "Showreel slot: Seedance clip 02 → /public/media/showreel.mp4",
    items: [
      { name: "Atelier Ferro", sector: "Metal fabrication, Montréal", tags: "Brand + Site + SEO", stat: "+218% qualified leads" },
      { name: "Nordika Cycles", sector: "E-bike retail, Québec", tags: "Site + GEO", stat: "Named in 4 of 5 AI answers" },
      { name: "Café Méridien", sector: "Specialty coffee, Montréal", tags: "Brand + Site", stat: "3.1× online orders" },
      { name: "Boréale Legal", sector: "Law firm, Laval", tags: "SEO + AEO", stat: "−62% cost per lead" },
    ],
  },
  services: {
    label: "What we do",
    title: "Everything a name needs to get named.",
    lede: "Six disciplines, one outcome: your business cited, clicked and called, in both languages, on both kinds of search.",
    items: [
      { n: "01", h: "Brand identity", p: "Name, mark, voice: the assets that make you worth citing. Built to survive a business card and a billboard equally." },
      { n: "02", h: "Websites that convert", p: "Designed, written and built as growth assets: fast, bilingual, compliant, and engineered around one job: turning attention into action." },
      { n: "03", h: "SEO", p: "Classic search, done properly. Technical foundations, local packs, and content that earns its rankings instead of renting them." },
      { n: "04", h: "GEO / AEO", p: "Getting you named inside AI answers: ChatGPT, Gemini, Perplexity. Structured data, semantic markup, content written to be quoted." },
      { n: "05", h: "Content & copy", p: "French written in Quebec by a native writer, never machine-translated. English that sounds like you on your best day." },
      { n: "06", h: "Measurement", p: "Reports that open with qualified leads and cost per lead. Evidence, not vibes. You own the dashboard, the analytics, all of it." },
    ],
  },
  programme: {
    label: "The programme",
    title: "One system, three layers.",
    lede: "Start with the layer you need. Add the next one when the numbers say so.",
    tiers: [
      { n: "01", h: "Foundation", p: "A bilingual, Bill 96-compliant website structured for AEO, live in 10 to 15 business days: built so Google and AI assistants can cite you from day one." },
      { n: "02", h: "Growth", p: "Bilingual SEO, local search, AEO/GEO, social and content. The layer that compounds month over month." },
      { n: "03", h: "Performance", p: "Paid media, landing pages, CRM and lead routing, with cost per qualified lead reported every month." },
    ],
    measure: "Every engagement is measured on one number: qualified leads delivered per month, and cost per qualified lead.",
  },
  pricing: {
    label: "No mystery",
    title: "Published pricing. 30 days' notice.",
    rows: [
      { k: "AI Visibility Report", v: "Free" },
      { k: "AI Visibility Audit", v: "$1,500" },
      { k: "Bill 96 Digital Compliance Audit", v: "$1,500" },
      { k: "Growth retainer", v: "$1,200 to $4,500 / month" },
    ],
    note: "Established Montreal agencies quote $1,500 to $10,000+ per month for SEO alone. We sit deliberately at the accessible end of the boutique range, and we publish it.",
  },
  proof: {
    label: "The stakes",
    title: "Invisible is expensive.",
    lede: "getnamed is two operators who have run real businesses. You speak to an owner, never an account manager, and you always know where the money went.",
    stats: [
      { v: "$3,000 to $30,000", p: "Bill 96 fine per violation. Every day a non-compliant site stays online counts as a separate violation." },
      { v: "2 languages", p: "Google and AI assistants answer in both. So should you." },
      { v: "1 number", p: "Every report opens with qualified leads and cost per lead." },
    ],
    guarantees: [
      "Live dashboard, always on",
      "30 days' notice, no lock-in",
      "You own your domain, ad accounts, analytics and content",
    ],
  },
  ethos: {
    label: "The ethos",
    title: "A website should do more than represent your business. It should grow it.",
    paras: [
      "Great design gets attention. Great strategy turns attention into action. That's why we don't approach websites as design projects. We approach them as growth assets built to generate leads, increase conversions, and maximize the return on every marketing dollar you invest.",
      "Anyone can create something visually appealing. The real challenge is building a website that earns trust, communicates value instantly, and motivates visitors to take the next step.",
      "Through working with both rapidly growing businesses and high-traffic organizations, we've gained first-hand insight into what separates websites that simply exist from websites that consistently produce results. Our focus isn't just helping you look better online. It's helping you perform better online.",
    ],
    stripCaption: "Studio, Montréal · Seedance clip 03 → /public/media/studio.mp4",
  },
  faq: {
    label: "Straight answers",
    title: "Asked, answered.",
    items: [
      { q: "How much does a project cost?", a: "Every engagement is scoped and priced up front: fixed price, published before work starts. No hourly billing, no surprise line items. You approve the number before we write a line of code." },
      { q: "How long does a website take?", a: "A typical brand-and-site engagement runs four to eight weeks depending on scope. The exact timeline is written into the proposal, with milestones, before anything starts." },
      { q: "Do you work in French and English?", a: "Both, natively. Quebec French is written in Quebec by a native writer, never machine-translated and shipped. English is written to sound like you. Spanish is available for projects that need it." },
      { q: "What's the difference between SEO and GEO / AEO?", a: "SEO gets you found on classic search engines like Google. GEO and AEO get you named inside AI answers: ChatGPT, Gemini, Perplexity. We structure every site for both: semantic markup, structured data, and content written to be cited." },
      { q: "Who owns the site, the domain, and the content?", a: "You do. The domain, the site, the analytics, the ad accounts and the content are registered in your name from day one. No hostage situations, ever." },
      { q: "Are we locked into a long contract?", a: "No. Terms are plain, pricing is published, and ongoing work runs on 30 days' notice. We keep clients by performing, not by paperwork." },
    ],
  },
  footer: {
    big: "Got a brand worth fighting for?",
    emailLabel: "Write to us",
    socialsLabel: "Follow",
    tagline: "Be the answer. Soyez la référence.",
    location: "Montréal, Québec",
    rights: "© 2026 getnamed. All rights reserved.",
  },
  intake: {
    title: "Project intake & discovery brief",
    subtitle: "Eight short steps. The same discipline we use to open every engagement.",
    back: "Back",
    next: "Next",
    done: "Done",
    stepOf: "Step",
    print: "Print / Save as PDF",
    copy: "Copy as text",
    copied: "Summary copied.",
    email: "Email to getnamed",
    emailSubject: "Project Intake: ",
    emailHeading: "GETNAMED | PROJECT INTAKE SUBMISSION",
    noAnswers: "No answers yet.",
    steps: [
      {
        eyebrow: "Business & goals",
        h: "Tell us about the business and the outcome you need.",
        lede: "No design decisions get made until the business goal is written down in your own words.",
        fields: [
          { id: "biz_name", label: "Business / organisation name", required: true },
          { id: "contact_name", label: "Your name & role", required: true },
          { id: "contact_email", label: "Best email", required: true },
          { id: "goal_90", label: "What should this website accomplish in the first 90 days?", ph: "e.g. Get 15 qualified quote requests a month from mid-market importers.", textarea: true, required: true },
          { id: "current_site", label: "Current website (if any)", ph: "https://" },
          { id: "frustration", label: "What's the single biggest frustration with what you have today?", textarea: true },
        ],
        choices: [
          { id: "budget", label: "Rough budget comfort for the build", options: ["Under $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Not sure yet"] },
          { id: "timeline", label: "When do you need this live?", options: ["ASAP", "1–3 months", "3–6 months", "Flexible"] },
        ],
      },
      {
        eyebrow: "Your buyer",
        h: "Who is this site actually trying to convince?",
        lede: "Not demographics: the specific person, mid-decision, who lands on this site.",
        fields: [
          { id: "buyer_role", label: "Who is the primary buyer? (role / title)", ph: "e.g. VP Finance, mid-market importer" },
          { id: "buyer_trigger", label: "What triggers them to start looking?", ph: "e.g. Bank quoted a spread that ate their margin.", textarea: true },
          { id: "buyer_alt", label: "What do they do instead of hiring you today?", textarea: true, hint: "Often it's \"do nothing\" or \"handle it in-house\", not a named competitor." },
          { id: "buyer_objection", label: "What's the one objection that kills the deal most often?", textarea: true },
        ],
        choices: [
          { id: "second_buyer", label: "Is there a second distinct buyer we should design for?", options: ["Yes", "No"] },
        ],
      },
      {
        eyebrow: "Competitors",
        h: "Who are we up against?",
        lede: "List up to three. We'll tear each one down against our standard checklist before wireframing.",
        fields: [
          { id: "comp1", label: "Competitor 1: name / URL" },
          { id: "comp1_note", label: "What do they do better than you today?", textarea: true },
          { id: "comp2", label: "Competitor 2: name / URL" },
          { id: "comp2_note", label: "What do they do better than you today?", textarea: true },
          { id: "comp3", label: "Competitor 3: name / URL" },
          { id: "comp3_note", label: "What do they do better than you today?", textarea: true },
          { id: "aspirational", label: "Any brand you admire (any industry) whose quality level we should aim for?" },
        ],
        choices: [],
      },
      {
        eyebrow: "Access & assets",
        h: "What do we already have to work with?",
        lede: "The access audit we'd otherwise chase you for during week one; give it to us now and we save a week.",
        fields: [
          { id: "domain_owner", label: "Who controls the domain registrar?", ph: "e.g. GoDaddy, account held by us" },
          { id: "content_assets", label: "Existing content we can use (copy, photos, videos, testimonials)", textarea: true },
        ],
        choices: [
          { id: "cms_have", label: "Do you have an existing CMS or site platform?", options: ["WordPress", "Webflow", "Shopify", "Squarespace/Wix", "Custom-built", "None yet"] },
          { id: "access", label: "Access you can grant us (check all available)", options: ["CMS admin", "Hosting", "Domain registrar", "Google Analytics", "Search Console", "Business Profile"] },
          { id: "bilingual", label: "Languages the site must ship in", options: ["French + English", "English only", "French only", "Spanish too"] },
        ],
      },
      {
        eyebrow: "Pages & structure",
        h: "What pages does this site actually need?",
        lede: "Check every page you expect. Extra pages beyond this list get scoped and quoted separately; nothing sneaks in unpriced.",
        fields: [
          { id: "structure_notes", label: "Anything structural we should know (members area, catalogue, multi-location)?", textarea: true },
        ],
        choices: [
          { id: "pages", label: "Pages needed", options: ["Home", "About", "Services", "Pricing", "Blog / Resources", "Case studies", "FAQ", "Contact", "Careers", "Legal / Privacy", "Booking / Scheduling"] },
          { id: "integrations", label: "Integrations required", options: ["Newsletter / email", "CRM", "Booking", "E-commerce", "Custom forms", "None"] },
        ],
      },
      {
        eyebrow: "Look & feel",
        h: "What should it look and feel like?",
        lede: "Wireframes come first, in greyscale, before any of this, but it shapes the direction from day one.",
        fields: [
          { id: "style_refs", label: "Sites you like the feel of (any industry): paste URLs", textarea: true },
          { id: "style_avoid", label: "Anything you actively want to avoid?", textarea: true },
        ],
        choices: [
          { id: "visual_style", label: "Visual direction", options: ["Minimal / modern", "Corporate / professional", "Bold / high-contrast", "Warm / approachable", "Technical / data-forward"] },
          { id: "media_assets", label: "Media you already have", options: ["Photography", "Video", "Logo files", "Brand guidelines", "None yet"] },
        ],
      },
      {
        eyebrow: "Compliance",
        h: "Anything regulatory we must design around?",
        lede: "Flag it now: retrofitting compliance after design is expensive and it shows.",
        fields: [
          { id: "compliance_notes", label: "Anything else about constraints, approvals, or sign-off chain we should know?", textarea: true },
        ],
        choices: [
          { id: "compliance", label: "Applies to us", options: ["Bill 96 (French-language, Quebec)", "Accessibility (WCAG) required", "Handle payment card data", "Regulated industry (finance, health, legal)", "None of the above"] },
        ],
      },
      {
        eyebrow: "Review & send",
        h: "Review what you've told us.",
        lede: "Check it over, then print/save as a PDF or send it straight to us.",
        fields: [],
        choices: [],
      },
    ],
    sections: [
      { title: "Business & Goals", fields: [{ id: "biz_name", label: "Business" }, { id: "contact_name", label: "Contact" }, { id: "contact_email", label: "Email" }, { id: "goal_90", label: "90-day goal" }, { id: "current_site", label: "Current site" }, { id: "frustration", label: "Biggest frustration" }], choices: ["budget", "timeline"] },
      { title: "Your Buyer", fields: [{ id: "buyer_role", label: "Primary buyer" }, { id: "buyer_trigger", label: "Buying trigger" }, { id: "buyer_alt", label: "Real alternative" }, { id: "buyer_objection", label: "Top objection" }], choices: ["second_buyer"] },
      { title: "Competitors", fields: [{ id: "comp1", label: "Competitor 1" }, { id: "comp1_note", label: "…their edge" }, { id: "comp2", label: "Competitor 2" }, { id: "comp2_note", label: "…their edge" }, { id: "comp3", label: "Competitor 3" }, { id: "comp3_note", label: "…their edge" }, { id: "aspirational", label: "Aspirational brand" }], choices: [] },
      { title: "Access & Assets", fields: [{ id: "domain_owner", label: "Domain owner" }, { id: "content_assets", label: "Existing content" }], choices: ["cms_have", "access", "bilingual"] },
      { title: "Pages & Structure", fields: [{ id: "structure_notes", label: "Structural notes" }], choices: ["pages", "integrations"] },
      { title: "Look & Feel", fields: [{ id: "style_refs", label: "Style references" }, { id: "style_avoid", label: "Avoid" }], choices: ["visual_style", "media_assets"] },
      { title: "Compliance", fields: [{ id: "compliance_notes", label: "Compliance notes" }], choices: ["compliance"] },
    ],
    choiceLabels: { budget: "Budget", timeline: "Timeline", second_buyer: "Second buyer", cms_have: "Platform", access: "Access", bilingual: "Languages", pages: "Pages", integrations: "Integrations", visual_style: "Visual direction", media_assets: "Media", compliance: "Compliance" },
  },
};

/* ================================================================
   FRANÇAIS (CANADA) - written for Quebec, not machine-translated
   ================================================================ */
const fr: SiteCopy = {
  nav: {
    work: "Réalisations",
    services: "Services",
    studio: "Studio",
    faq: "FAQ",
    cta: "Démarrer un projet",
    back: "Retour au site",
  },
  hero: {
    eyebrow: "Atelier digital · Montréal",
    typed: "Pour les entreprises qui refusent de passer inaperçues.",
    sub: "Des marques. Des sites. De la visibilité, sur Google et dans les réponses IA, en français et en anglais.",
    scroll: "Défiler",
    videoNote: "Emplacement vidéo : déposer le clip Seedance 01 (encre, 1080p, 16:9) dans /public/media/hero.mp4",
  },
  film: {
    beats: [
      { sub: "Montréal, l'heure bleue", text: "Le Québec compte 228 622 petites entreprises." },
      { text: "La plupart sont invisibles." },
      { text: "Quand quelqu'un demande à Google, ChatGPT, Perplexity ou Claude ce que vous faites," },
      { text: "une réponse s'écrit. Avec ou sans vous." },
      { text: "Nous veillons à ce que cette réponse soit votre nom." },
    ],
    chapters: ["L'artère", "La requête", "L'immersion", "La citation", "L'ancrage"],
    scr: {
      label: "Assistant IA · en direct",
      q: "meilleur entrepreneur CVC à Montréal ?",
      a: "Réponse principale : votre entreprise, citée en premier, en français et en anglais.",
    },
    lock: { tagline: "Soyez la référence.", cta: "Obtenez votre rapport gratuit" },
  },
  report: {
    topLeft: "RAPPORT GRATUIT SOUS 48 H.",
    topRight: "01",
    headline: "Découvrez si vous êtes la référence.",
    body: "On fait passer votre entreprise par les requêtes que vos clients posent vraiment, en français et en anglais, sur Google et sur les assistants IA, et on vous montre si vous êtes nommé, qui l'est à votre place, et ce qu'il faudrait pour changer ça.",
    name: "Votre nom",
    business: "Nom de l'entreprise",
    domain: "Nom de domaine",
    email: "Courriel professionnel",
    phone: "Numéro de téléphone",
    optional: "(facultatif)",
    button: "RECEVEZ NOTRE RAPPORT GRATUIT",
    note: "Gratuit. Aucune vente attachée. Le rapport se tient tout seul.",
    mailSubject: "Demande de rapport gratuit : ",
    missing: "Veuillez remplir tous les champs marqués d'un astérisque.",
    invalidEmail: "Entrez une adresse courriel valide (nom@exemple.com).",
    consentPre: "En envoyant cette demande, vous acceptez nos",
    terms: "Conditions d'utilisation",
    consentMid: "et notre",
    privacy: "Politique de confidentialité",
  },
  cookie: {
    title: "Ce site utilise des témoins",
    body: "Ce site utilise des témoins (cookies) pour améliorer l'expérience utilisateur.",
    accept: "Accepter",
    refuse: "Refuser",
    policy: "Politique de confidentialité",
  },
  legal: {
    updated: "Dernière mise à jour : août 2026",
    termsTitle: "Conditions d'utilisation",
    privacyTitle: "Politique de confidentialité",
    otherDoc: "À lire aussi :",
    terms: [
      { h: "1. Acceptation des conditions", p: ["Les présentes conditions d'utilisation régissent l'accès au site getnamed (getnamed.ca) et son utilisation. En naviguant sur le site, ou en soumettant une demande de rapport gratuit, une demande de soumission ou un brief d'accueil, vous acceptez ces conditions. Si vous ne les acceptez pas, veuillez ne pas utiliser le site."] },
      { h: "2. Qui sommes-nous", p: ["getnamed est un atelier digital établi à Montréal, au Québec (Canada). Vous pouvez nous joindre en tout temps à conformite@getnamed.ca."] },
      { h: "3. Une demande n'est pas un contrat", p: ["Le site présente les services de l'atelier et permet de demander un rapport de visibilité gratuit ou une soumission de projet. L'envoi d'une demande ne crée ni relation client ni obligation d'aucune part. Tout mandat avec getnamed ne débute que lorsque les deux parties signent une entente écrite distincte."] },
      { h: "4. Rapports gratuits", p: ["Les rapports gratuits sont préparés à partir de l'information disponible au moment de leur rédaction et sont fournis à titre informatif seulement. Ils ne constituent pas un avis professionnel, juridique ou financier et ne garantissent aucun résultat de positionnement, de trafic, de prospects ou de revenus."] },
      { h: "5. Propriété intellectuelle", p: ["Tout le contenu du site (textes, design, code, visuels, nom et marques getnamed) appartient à getnamed ou à ses concédants. Vous ne pouvez le copier, le reproduire, le modifier ou le redistribuer sans notre autorisation écrite préalable."] },
      { h: "6. Utilisation acceptable", p: ["Vous acceptez d'utiliser le site de façon licite et de ne pas : extraire ou récolter son contenu ou son code, nuire à son fonctionnement ou à sa sécurité, tenter d'y accéder sans autorisation, ni soumettre de faux renseignements ou les renseignements personnels d'une autre personne sans son consentement."] },
      { h: "7. Absence de garantie", p: ["Le site et son contenu sont fournis « tels quels » et « selon leur disponibilité ». Nous ne garantissons pas que le site sera ininterrompu, exempt d'erreurs ou dépourvu de composants dommageables."] },
      { h: "8. Limitation de responsabilité", p: ["Dans toute la mesure permise par la loi, getnamed n'est pas responsable des dommages indirects, accessoires ou consécutifs découlant de l'utilisation du site ou de l'impossibilité de l'utiliser. Rien dans ces conditions ne limite un droit que vous pourriez avoir en vertu de la Loi sur la protection du consommateur du Québec, lorsqu'elle s'applique."] },
      { h: "9. Liens vers des tiers", p: ["Le site peut contenir des liens vers des sites de tiers. Ces liens sont fournis pour votre commodité; getnamed ne contrôle pas ces sites et n'est pas responsable de leur contenu ni de leurs pratiques."] },
      { h: "10. Modifications des conditions", p: ["Nous pouvons mettre à jour ces conditions à l'occasion. La date ci-haut indique la plus récente version, et l'utilisation continue du site après une modification vaut acceptation des conditions mises à jour."] },
      { h: "11. Loi applicable", p: ["Ces conditions sont régies par les lois applicables dans la province de Québec et par les lois fédérales du Canada. Tout litige lié au site relève de la compétence exclusive des tribunaux du district judiciaire de Montréal."] },
      { h: "12. Nous joindre", p: ["Questions au sujet de ces conditions : conformite@getnamed.ca."] },
    ],
    privacy: [
      { h: "1. Portée de la politique", p: ["La présente politique de confidentialité explique comment getnamed collecte, utilise, communique et protège les renseignements personnels sur getnamed.ca. Elle est rédigée conformément à la Loi sur la protection des renseignements personnels et les documents électroniques (LPRPDE) du Canada et à la Loi sur la protection des renseignements personnels dans le secteur privé du Québec, modernisée par la Loi 25."] },
      { h: "2. Responsable de la protection des renseignements personnels", p: ["La personne responsable de la protection des renseignements personnels chez getnamed veille à l'application de cette politique et à la conformité de nos pratiques. Vous pouvez la joindre à conformite@getnamed.ca."] },
      { h: "3. Renseignements que nous collectons", p: ["Renseignements que vous nous transmettez : votre nom, le nom de l'entreprise, le nom de domaine, le courriel professionnel, le numéro de téléphone (si vous choisissez de le fournir), le contenu de votre brief d'accueil et votre correspondance avec nous.", "Renseignements techniques : type de navigateur et d'appareil, préférence de langue et choix de témoins, conservés localement dans votre propre navigateur."] },
      { h: "4. Pourquoi nous les collectons", p: ["Nous utilisons ces renseignements pour répondre à vos demandes, préparer votre rapport gratuit ou votre soumission, communiquer avec vous au sujet de votre projet, améliorer le site et respecter nos obligations légales. Nous n'utilisons pas vos renseignements personnels pour bâtir des profils publicitaires et nous ne les vendons jamais."] },
      { h: "5. Consentement", p: ["En soumettant un formulaire, vous consentez à la collecte et à l'utilisation décrites ici. Le consentement aux témoins est recueilli par le bandeau affiché lors de votre première visite. Vous pouvez retirer votre consentement en tout temps en nous écrivant à conformite@getnamed.ca, sous réserve des limites prévues par la loi ou un contrat."] },
      { h: "6. Témoins (cookies)", p: ["Ce site n'utilise que des témoins fonctionnels ou le stockage du navigateur : mémoriser votre langue et votre choix concernant les témoins. Nous n'utilisons aucun témoin publicitaire, de profilage analytique ou de suivi intersites. Vous pouvez refuser les témoins dans le bandeau; les fonctions essentielles du site continueront de fonctionner."] },
      { h: "7. Communication à des tiers", p: ["Nous ne vendons ni ne louons vos renseignements personnels. Ils peuvent être traités par des fournisseurs de services (hébergement, courriel) liés par des obligations de confidentialité, ou communiqués si la loi l'exige. Les renseignements peuvent être communiqués à l'extérieur du Québec (y compris dans d'autres provinces ou pays); ils sont alors assujettis aux lois de ce territoire."] },
      { h: "8. Conservation", p: ["Nous conservons les renseignements personnels seulement le temps nécessaire aux fins décrites ci-dessus, puis nous les détruisons ou les anonymisons de façon sécuritaire."] },
      { h: "9. Sécurité", p: ["Nous appliquons des mesures de sécurité raisonnables et appropriées; l'accès est limité aux membres de l'équipe qui en ont besoin. Aucune méthode de transmission ou de stockage n'est toutefois sécuritaire à 100 %."] },
      { h: "10. Vos droits", p: ["Vous pouvez demander l'accès à vos renseignements personnels, leur portabilité, leur rectification ou leur suppression, et retirer votre consentement. Écrivez-nous à conformite@getnamed.ca; nous répondons dans les 30 jours. Vous pouvez aussi déposer une plainte auprès de la Commission d'accès à l'information du Québec (www.cai.gouv.qc.ca) ou du Commissariat à la protection de la vie privée du Canada (www.priv.gc.ca)."] },
      { h: "11. Modifications de la politique", p: ["La date ci-haut indique la plus récente version. Toute modification importante sera annoncée sur le site."] },
      { h: "12. Nous joindre", p: ["Pour toute question au sujet de cette politique ou de vos renseignements personnels : conformite@getnamed.ca."] },
    ],
  },
  manifesto: {
    intro: "La plupart des sites chuchotent. Pas les nôtres.",
    words: ["FORT.", "PRÉCIS.", "INOUBLIABLE."],
    outro: "C'est tout le mandat.",
  },
  work: {
    label: "Réalisations",
    title: "Des preuves, pas des promesses.",
    note: "Projets de démonstration. Le travail client sous NDA reste confidentiel.",
    reel: "Emplacement showreel : clip Seedance 02 → /public/media/showreel.mp4",
    items: [
      { name: "Atelier Ferro", sector: "Fabrication métallique, Montréal", tags: "Marque + Site + SEO", stat: "+218 % de leads qualifiés" },
      { name: "Nordika Cycles", sector: "Vélos électriques, Québec", tags: "Site + GEO", stat: "Nommé dans 4 réponses IA sur 5" },
      { name: "Café Méridien", sector: "Café de spécialité, Montréal", tags: "Marque + Site", stat: "3,1× les commandes en ligne" },
      { name: "Boréale Legal", sector: "Cabinet d'avocats, Laval", tags: "SEO + AEO", stat: "−62 % du coût par lead" },
    ],
  },
  services: {
    label: "Ce qu'on fait",
    title: "Tout ce qu'il faut pour être nommé.",
    lede: "Six disciplines, un résultat : votre entreprise citée, cliquée et appelée, dans les deux langues, sur les deux types de recherche.",
    items: [
      { n: "01", h: "Identité de marque", p: "Nom, logo, voix : les actifs qui vous rendent digne d'être cité. Conçus pour survivre autant à une carte d'affaires qu'à un panneau." },
      { n: "02", h: "Sites qui convertissent", p: "Conçus, rédigés et développés comme des actifs de croissance : rapides, bilingues, conformes, et pensés pour transformer l'attention en action." },
      { n: "03", h: "SEO", p: "La recherche classique, bien faite. Fondations techniques, visibilité locale, et du contenu qui mérite ses positions au lieu de les louer." },
      { n: "04", h: "GEO / AEO", p: "Vous faire nommer dans les réponses IA : ChatGPT, Gemini, Perplexity. Données structurées, balisage sémantique, contenu écrit pour être cité." },
      { n: "05", h: "Contenu et rédaction", p: "Un français écrit au Québec par une plume native, jamais traduit par machine. Un anglais qui sonne comme vous à votre meilleur." },
      { n: "06", h: "Mesure", p: "Des rapports qui commencent par les leads qualifiés et le coût par lead. Des preuves, pas des impressions. Le tableau de bord vous appartient." },
    ],
  },
  programme: {
    label: "Le programme",
    title: "Un système, trois couches.",
    lede: "Commencez par la couche dont vous avez besoin. Ajoutez la suivante quand les chiffres le disent.",
    tiers: [
      { n: "01", h: "Fondation", p: "Un site bilingue, conforme à la Loi 96 et structuré pour l'AEO, en ligne en 10 à 15 jours ouvrables : conçu pour que Google et les assistants IA puissent vous citer dès le premier jour." },
      { n: "02", h: "Croissance", p: "SEO bilingue, référencement local, AEO/GEO, réseaux sociaux et contenu. La couche qui s'accumule mois après mois." },
      { n: "03", h: "Performance", p: "Médias payants, pages d'atterrissage, CRM et acheminement des leads, avec le coût par lead qualifié rapporté chaque mois." },
    ],
    measure: "Chaque mandat est mesuré sur un seul chiffre : les leads qualifiés livrés par mois, et le coût par lead qualifié.",
  },
  pricing: {
    label: "Sans mystère",
    title: "Prix affichés. Préavis de 30 jours.",
    rows: [
      { k: "Rapport de visibilité IA", v: "Gratuit" },
      { k: "Audit de visibilité IA", v: "1 500 $" },
      { k: "Audit de conformité numérique (Loi 96)", v: "1 500 $" },
      { k: "Forfait croissance", v: "1 200 $ à 4 500 $ / mois" },
    ],
    note: "Les agences montréalaises établies facturent de 1 500 $ à plus de 10 000 $ par mois pour le SEO seul. On se place délibérément à l'extrémité accessible du segment boutique, et on l'affiche.",
  },
  proof: {
    label: "Ce qui est en jeu",
    title: "Être invisible coûte cher.",
    lede: "getnamed, c'est deux opérateurs qui ont dirigé de vraies entreprises. Vous parlez à un propriétaire, jamais à un gestionnaire de compte, et vous savez toujours où va votre argent.",
    stats: [
      { v: "3 000 $ à 30 000 $", p: "Amende prévue par la Loi 96 par infraction. Chaque jour où un site non conforme reste en ligne compte comme une infraction distincte." },
      { v: "2 langues", p: "Google et les assistants IA répondent dans les deux. Vous devriez faire de même." },
      { v: "1 chiffre", p: "Chaque rapport s'ouvre sur les leads qualifiés et le coût par lead." },
    ],
    guarantees: [
      "Tableau de bord en direct, toujours actif",
      "Préavis de 30 jours, aucun engagement",
      "Vous êtes propriétaire de votre domaine, de vos comptes publicitaires, de vos analytiques et de votre contenu",
    ],
  },
  ethos: {
    label: "L'éthique",
    title: "Un site web devrait faire plus que représenter votre entreprise. Il devrait la faire croître.",
    paras: [
      "Le bon design attire l'attention. La bonne stratégie transforme l'attention en action. C'est pourquoi on n'aborde pas les sites web comme des projets de design. On les aborde comme des actifs de croissance bâtis pour générer des leads, augmenter les conversions et maximiser le rendement de chaque dollar investi en marketing.",
      "N'importe qui peut créer quelque chose de beau. Le vrai défi, c'est de bâtir un site qui inspire confiance, communique la valeur instantanément et incite le visiteur à passer à l'action.",
      "En travaillant avec des entreprises en pleine croissance et des organisations à fort trafic, on a constaté directement ce qui distingue les sites qui se contentent d'exister de ceux qui produisent des résultats constants. Notre objectif n'est pas seulement de vous donner meilleure allure en ligne. C'est de vous faire mieux performer en ligne.",
    ],
    stripCaption: "Studio, Montréal · clip Seedance 03 → /public/media/studio.mp4",
  },
  faq: {
    label: "Réponses franches",
    title: "Demandé, répondu.",
    items: [
      { q: "Combien coûte un projet?", a: "Chaque mandat est évalué et tarifé à l'avance : prix fixe, publié avant le début des travaux. Pas de facturation à l'heure, pas de lignes surprises. Vous approuvez le chiffre avant qu'on écrive une ligne de code." },
      { q: "Combien de temps prend un site web?", a: "Un mandat marque + site typique prend de quatre à huit semaines selon l'envergure. L'échéancier exact, avec jalons, est écrit dans la soumission avant le départ." },
      { q: "Travaillez-vous en français et en anglais?", a: "Dans les deux langues, nativement. Le français québécois est écrit au Québec par une plume native, jamais traduit par machine. L'anglais est écrit pour sonner comme vous. L'espagnol est offert pour les projets qui en ont besoin." },
      { q: "Quelle est la différence entre SEO et GEO / AEO?", a: "Le SEO vous fait trouver sur les moteurs classiques comme Google. Le GEO et l'AEO vous font nommer dans les réponses IA : ChatGPT, Gemini, Perplexity. On structure chaque site pour les deux : balisage sémantique, données structurées, contenu écrit pour être cité." },
      { q: "À qui appartiennent le site, le domaine et le contenu?", a: "À vous. Le domaine, le site, les analytiques, les comptes publicitaires et le contenu sont enregistrés à votre nom dès le premier jour. Jamais de situation d'otage." },
      { q: "Sommes-nous liés par un long contrat?", a: "Non. Les conditions sont claires, les prix sont publiés, et le travail continu se fait avec un préavis de 30 jours. On garde nos clients en performant, pas avec de la paperasse." },
    ],
  },
  footer: {
    big: "Vous avez une marque qui mérite qu'on se batte pour elle?",
    emailLabel: "Écrivez-nous",
    socialsLabel: "Suivez-nous",
    tagline: "Be the answer. Soyez la référence.",
    location: "Montréal, Québec",
    rights: "© 2026 getnamed. Tous droits réservés.",
  },
  intake: {
    title: "Formulaire d'accueil et brief de découverte",
    subtitle: "Huit étapes courtes. La même rigueur qu'à l'ouverture de chaque mandat.",
    back: "Retour",
    next: "Suivant",
    done: "Terminé",
    stepOf: "Étape",
    print: "Imprimer / Enregistrer en PDF",
    copy: "Copier en texte",
    copied: "Résumé copié.",
    email: "Envoyer à getnamed",
    emailSubject: "Formulaire d'accueil : ",
    emailHeading: "GETNAMED | SOUMISSION DU FORMULAIRE D'ACCUEIL",
    noAnswers: "Aucune réponse pour l'instant.",
    steps: [
      {
        eyebrow: "Entreprise et objectifs",
        h: "Parlez-nous de l'entreprise et du résultat recherché.",
        lede: "Aucune décision de conception n'est prise avant que l'objectif d'affaires soit écrit, dans vos propres mots.",
        fields: [
          { id: "biz_name", label: "Nom de l'entreprise / organisation", required: true },
          { id: "contact_name", label: "Votre nom et votre poste", required: true },
          { id: "contact_email", label: "Meilleur courriel", required: true },
          { id: "goal_90", label: "Que doit accomplir ce site web dans les 90 premiers jours?", ph: "P. ex. Obtenir 15 demandes de soumission qualifiées par mois d'importateurs de taille moyenne.", textarea: true, required: true },
          { id: "current_site", label: "Site web actuel (s'il y a lieu)", ph: "https://" },
          { id: "frustration", label: "Quelle est la plus grande frustration avec ce que vous avez actuellement?", textarea: true },
        ],
        choices: [
          { id: "budget", label: "Budget approximatif prévu pour la réalisation", options: ["Moins de 5 k$", "5 k$ – 10 k$", "10 k$ – 25 k$", "25 k$ et plus", "Pas encore sûr"] },
          { id: "timeline", label: "Quand le site doit-il être en ligne?", options: ["Dès que possible", "1–3 mois", "3–6 mois", "Flexible"] },
        ],
      },
      {
        eyebrow: "Votre acheteur",
        h: "Qui ce site doit-il vraiment convaincre?",
        lede: "Pas des données démographiques : la personne précise, en pleine décision, qui arrive sur ce site.",
        fields: [
          { id: "buyer_role", label: "Qui est l'acheteur principal? (rôle / titre)", ph: "P. ex. VP Finances, importateur de taille moyenne" },
          { id: "buyer_trigger", label: "Qu'est-ce qui déclenche leur recherche?", ph: "P. ex. La banque a offert un taux qui a mangé leur marge.", textarea: true },
          { id: "buyer_alt", label: "Que font-ils au lieu de vous embaucher aujourd'hui?", textarea: true, hint: "C'est souvent « ne rien faire » ou « le gérer à l'interne », pas un concurrent nommé." },
          { id: "buyer_objection", label: "Quelle est l'objection qui fait le plus souvent échouer la vente?", textarea: true },
        ],
        choices: [
          { id: "second_buyer", label: "Y a-t-il un deuxième type d'acheteur à considérer?", options: ["Oui", "Non"] },
        ],
      },
      {
        eyebrow: "Concurrents",
        h: "Contre qui sommes-nous en compétition?",
        lede: "Nommez-en jusqu'à trois. On analysera chacun selon notre grille standard avant de faire les maquettes.",
        fields: [
          { id: "comp1", label: "Concurrent 1 : nom / URL" },
          { id: "comp1_note", label: "Que font-ils mieux que vous aujourd'hui?", textarea: true },
          { id: "comp2", label: "Concurrent 2 : nom / URL" },
          { id: "comp2_note", label: "Que font-ils mieux que vous aujourd'hui?", textarea: true },
          { id: "comp3", label: "Concurrent 3 : nom / URL" },
          { id: "comp3_note", label: "Que font-ils mieux que vous aujourd'hui?", textarea: true },
          { id: "aspirational", label: "Une marque que vous admirez (tout secteur) dont on devrait viser le niveau de qualité?" },
        ],
        choices: [],
      },
      {
        eyebrow: "Accès et actifs",
        h: "Avec quoi travaillons-nous déjà?",
        lede: "L'audit d'accès qu'on devrait sinon vous réclamer pendant la première semaine : donnez-le nous maintenant et on gagne une semaine.",
        fields: [
          { id: "domain_owner", label: "Qui contrôle le registraire de domaine?", ph: "P. ex. GoDaddy, compte détenu par nous" },
          { id: "content_assets", label: "Contenu existant réutilisable (textes, photos, vidéos, témoignages)", textarea: true },
        ],
        choices: [
          { id: "cms_have", label: "Avez-vous un CMS ou une plateforme de site actuelle?", options: ["WordPress", "Webflow", "Shopify", "Squarespace/Wix", "Développement sur mesure", "Aucune pour l'instant"] },
          { id: "access", label: "Accès que vous pouvez nous accorder (cochez tout ce qui est disponible)", options: ["Admin CMS", "Hébergement", "Registraire de domaine", "Google Analytics", "Search Console", "Fiche d'établissement"] },
          { id: "bilingual", label: "Langues de livraison du site", options: ["Français + anglais", "Anglais seulement", "Français seulement", "Espagnol aussi"] },
        ],
      },
      {
        eyebrow: "Pages et structure",
        h: "Quelles pages ce site nécessite-t-il vraiment?",
        lede: "Cochez chaque page prévue. Toute page en sus de cette liste sera évaluée et soumissionnée séparément : rien ne s'ajoute sans prix.",
        fields: [
          { id: "structure_notes", label: "Quelque chose de structurel à savoir (espace membre, catalogue, plusieurs succursales)?", textarea: true },
        ],
        choices: [
          { id: "pages", label: "Pages requises", options: ["Accueil", "À propos", "Services", "Tarifs", "Blogue / Ressources", "Études de cas", "FAQ", "Contact", "Carrières", "Mentions légales / Confidentialité", "Réservation / Planification"] },
          { id: "integrations", label: "Intégrations requises", options: ["Infolettre / courriel", "CRM", "Réservation", "Commerce en ligne", "Formulaires sur mesure", "Aucune"] },
        ],
      },
      {
        eyebrow: "Style visuel",
        h: "Quel devrait être le style visuel?",
        lede: "Les maquettes filaires viennent en premier, en niveaux de gris, avant tout ceci, mais ça oriente la direction dès le départ.",
        fields: [
          { id: "style_refs", label: "Sites dont vous aimez le style (tout secteur) : collez les URL", textarea: true },
          { id: "style_avoid", label: "Y a-t-il quelque chose à éviter absolument?", textarea: true },
        ],
        choices: [
          { id: "visual_style", label: "Direction visuelle", options: ["Minimaliste / moderne", "Corporatif / professionnel", "Audacieux / contraste élevé", "Chaleureux / accessible", "Technique / axé données"] },
          { id: "media_assets", label: "Médias déjà en main", options: ["Photographie", "Vidéo", "Fichiers logo", "Guide de marque", "Aucun pour l'instant"] },
        ],
      },
      {
        eyebrow: "Conformité",
        h: "Y a-t-il des contraintes réglementaires à respecter?",
        lede: "Signalez-le maintenant : ajouter la conformité après coup est coûteux et ça paraît.",
        fields: [
          { id: "compliance_notes", label: "Autre chose à savoir sur les contraintes, approbations ou la chaîne de validation?", textarea: true },
        ],
        choices: [
          { id: "compliance", label: "S'applique à nous", options: ["Loi 96 (langue française, Québec)", "Accessibilité (WCAG) exigée", "Traitement de données de cartes de paiement", "Secteur réglementé (finance, santé, juridique)", "Aucune de ces réponses"] },
        ],
      },
      {
        eyebrow: "Révision et envoi",
        h: "Révisez ce que vous nous avez indiqué.",
        lede: "Vérifiez le tout, puis imprimez/enregistrez en PDF ou envoyez-le nous directement.",
        fields: [],
        choices: [],
      },
    ],
    sections: [
      { title: "Entreprise et objectifs", fields: [{ id: "biz_name", label: "Entreprise" }, { id: "contact_name", label: "Contact" }, { id: "contact_email", label: "Courriel" }, { id: "goal_90", label: "Objectif 90 jours" }, { id: "current_site", label: "Site actuel" }, { id: "frustration", label: "Plus grande frustration" }], choices: ["budget", "timeline"] },
      { title: "Votre acheteur", fields: [{ id: "buyer_role", label: "Acheteur principal" }, { id: "buyer_trigger", label: "Déclencheur d'achat" }, { id: "buyer_alt", label: "Alternative réelle" }, { id: "buyer_objection", label: "Objection principale" }], choices: ["second_buyer"] },
      { title: "Concurrents", fields: [{ id: "comp1", label: "Concurrent 1" }, { id: "comp1_note", label: "…leur avantage" }, { id: "comp2", label: "Concurrent 2" }, { id: "comp2_note", label: "…leur avantage" }, { id: "comp3", label: "Concurrent 3" }, { id: "comp3_note", label: "…leur avantage" }, { id: "aspirational", label: "Marque aspirationnelle" }], choices: [] },
      { title: "Accès et actifs", fields: [{ id: "domain_owner", label: "Détenteur du domaine" }, { id: "content_assets", label: "Contenu existant" }], choices: ["cms_have", "access", "bilingual"] },
      { title: "Pages et structure", fields: [{ id: "structure_notes", label: "Notes structurelles" }], choices: ["pages", "integrations"] },
      { title: "Style visuel", fields: [{ id: "style_refs", label: "Références de style" }, { id: "style_avoid", label: "À éviter" }], choices: ["visual_style", "media_assets"] },
      { title: "Conformité", fields: [{ id: "compliance_notes", label: "Notes de conformité" }], choices: ["compliance"] },
    ],
    choiceLabels: { budget: "Budget", timeline: "Échéancier", second_buyer: "Deuxième acheteur", cms_have: "Plateforme", access: "Accès", bilingual: "Langues", pages: "Pages", integrations: "Intégrations", visual_style: "Direction visuelle", media_assets: "Médias", compliance: "Conformité" },
  },
};

/* ================================================================
   ESPAÑOL
   ================================================================ */
const es: SiteCopy = {
  nav: {
    work: "Proyectos",
    services: "Servicios",
    studio: "Estudio",
    faq: "FAQ",
    cta: "Iniciar un proyecto",
    back: "Volver al sitio",
  },
  hero: {
    eyebrow: "Estudio digital · Montreal",
    typed: "Para empresas que se niegan a pasar desapercibidas.",
    sub: "Marcas. Sitios web. Visibilidad, en Google y dentro de las respuestas de IA, en francés e inglés.",
    scroll: "Desplázate",
    videoNote: "Espacio de video: coloca el clip Seedance 01 (tinta, 1080p, 16:9) en /public/media/hero.mp4",
  },
  film: {
    beats: [
      { sub: "Montreal, hora azul", text: "Quebec tiene 228,622 pequeñas empresas." },
      { text: "La mayoría de ellas es invisible." },
      { text: "Cuando alguien le pregunta a Google, ChatGPT, Perplexity o Claude por lo que usted hace," },
      { text: "alguien escribe la respuesta. Con usted o sin usted." },
      { text: "Nosotros nos aseguramos de que esa respuesta lleve su nombre." },
    ],
    chapters: ["La avenida", "La consulta", "La inmersión", "La cita", "El cierre"],
    scr: {
      label: "Asistente IA · en vivo",
      q: "¿el mejor contratista de CVC en Montreal?",
      a: "Respuesta principal: su empresa, citada primero, en inglés y en francés.",
    },
    lock: { tagline: "Sea la respuesta.", cta: "Solicite su Informe de Visibilidad IA gratuito" },
  },
  report: {
    topLeft: "INFORME GRATUITO EN 48 HRS.",
    topRight: "01",
    headline: "Descubre si eres la respuesta.",
    body: "Pasamos tu negocio por las consultas que tus clientes realmente hacen, en inglés y francés, en Google y en los asistentes de IA, y te mostramos si te nombran, a quién nombran en tu lugar y qué haría falta para cambiarlo.",
    name: "Tu nombre",
    business: "Nombre de la empresa",
    domain: "Nombre de dominio",
    email: "Correo de trabajo",
    phone: "Número de teléfono",
    optional: "(opcional)",
    button: "RECIBE NUESTRO INFORME GRATUITO",
    note: "Gratis. Sin discurso de venta. El informe se sostiene por sí solo.",
    mailSubject: "Solicitud de informe gratuito: ",
    missing: "Completa todos los campos marcados con un asterisco.",
    invalidEmail: "Introduce un correo válido (nombre@ejemplo.com).",
    consentPre: "Al enviar esta solicitud, aceptas nuestros",
    terms: "Términos de uso",
    consentMid: "y nuestra",
    privacy: "Política de privacidad",
  },
  cookie: {
    title: "Este sitio utiliza cookies",
    body: "Este sitio utiliza cookies para mejorar la experiencia del usuario.",
    accept: "Aceptar",
    refuse: "Rechazar",
    policy: "Política de privacidad",
  },
  legal: {
    updated: "Última actualización: agosto de 2026",
    termsTitle: "Términos de uso",
    privacyTitle: "Política de privacidad",
    otherDoc: "Lee también:",
    terms: [
      { h: "1. Aceptación de los términos", p: ["Estos Términos de uso rigen el acceso y el uso del sitio web de getnamed (getnamed.ca). Al navegar por el sitio, o al enviar una solicitud de informe gratuito, una cotización de proyecto o un brief de admisión, aceptas estos términos. Si no los aceptas, por favor no uses el sitio."] },
      { h: "2. Quiénes somos", p: ["getnamed es un estudio digital establecido en Montreal, Quebec (Canadá). Puedes contactarnos en cualquier momento en Compliance@getnamed.ca."] },
      { h: "3. Una solicitud no es un contrato", p: ["El sitio presenta los servicios del estudio y permite solicitar un informe de visibilidad gratuito o una cotización de proyecto. Enviar una solicitud no crea una relación de cliente ni obligación alguna para ninguna de las partes. Cualquier encargo con getnamed comienza solo cuando ambas partes firman un acuerdo escrito por separado."] },
      { h: "4. Informes gratuitos", p: ["Los informes gratuitos se preparan a partir de la información disponible en el momento de su redacción y se proporcionan únicamente con fines informativos. No constituyen asesoramiento profesional, legal o financiero y no garantizan ningún resultado de posicionamiento, tráfico, clientes potenciales o ingresos."] },
      { h: "5. Propiedad intelectual", p: ["Todo el contenido del sitio (textos, diseño, código, imágenes y el nombre y las marcas de getnamed) pertenece a getnamed o a sus licenciantes. No puedes copiarlo, reproducirlo, modificarlo ni redistribuirlo sin nuestra autorización previa por escrito."] },
      { h: "6. Uso aceptable", p: ["Aceptas usar el sitio de forma lícita y no: extraer o recolectar su contenido o código, interferir en su funcionamiento o seguridad, intentar acceder sin autorización, ni enviar información falsa o datos personales de otra persona sin su consentimiento."] },
      { h: "7. Sin garantía", p: ["El sitio y su contenido se proporcionan «tal cual» y «según disponibilidad». No garantizamos que el sitio funcione sin interrupciones, sin errores o sin componentes dañinos."] },
      { h: "8. Limitación de responsabilidad", p: ["En la máxima medida permitida por la ley, getnamed no es responsable de daños indirectos, incidentales o consecuentes derivados del uso del sitio o de la imposibilidad de usarlo. Nada en estos términos limita los derechos que puedas tener bajo la Ley de protección al consumidor de Quebec, cuando aplique."] },
      { h: "9. Enlaces de terceros", p: ["El sitio puede incluir enlaces a sitios de terceros. Estos enlaces se ofrecen por conveniencia; getnamed no controla esos sitios ni es responsable de su contenido o sus prácticas."] },
      { h: "10. Cambios en los términos", p: ["Podemos actualizar estos términos ocasionalmente. La fecha de arriba indica la versión más reciente, y el uso continuo del sitio tras un cambio implica la aceptación de los términos actualizados."] },
      { h: "11. Ley aplicable", p: ["Estos términos se rigen por las leyes aplicables en la provincia de Quebec y las leyes federales de Canadá. Cualquier disputa relacionada con el sitio queda bajo la jurisdicción exclusiva de los tribunales del distrito judicial de Montreal."] },
      { h: "12. Contacto", p: ["Preguntas sobre estos términos: Compliance@getnamed.ca."] },
    ],
    privacy: [
      { h: "1. Alcance de esta política", p: ["Esta Política de privacidad explica cómo getnamed recopila, usa, comunica y protege la información personal en getnamed.ca. Está redactada conforme a la Ley de Protección de Información Personal y Documentos Electrónicos (PIPEDA) de Canadá y a la Ley de protección de información personal en el sector privado de Quebec, modernizada por la Ley 25."] },
      { h: "2. Responsable de la protección de la información personal", p: ["La persona responsable de la protección de la información personal en getnamed supervisa esta política y el cumplimiento de nuestras prácticas. Puedes contactarla en Compliance@getnamed.ca."] },
      { h: "3. Información que recopilamos", p: ["Información que nos envías: tu nombre, nombre de la empresa, nombre de dominio, correo de trabajo, número de teléfono (si decides proporcionarlo), el contenido de tu brief de admisión y tu correspondencia con nosotros.", "Información técnica: tipo de navegador y dispositivo, preferencia de idioma y tu elección de cookies, almacenadas localmente en tu propio navegador."] },
      { h: "4. Por qué la recopilamos", p: ["Usamos esta información para responder a tus solicitudes, preparar tu informe gratuito o tu cotización, comunicarnos contigo sobre tu proyecto, mejorar el sitio y cumplir obligaciones legales. No usamos tu información personal para crear perfiles publicitarios y nunca la vendemos."] },
      { h: "5. Consentimiento", p: ["Al enviar un formulario, aceptas la recopilación y el uso descritos aquí. El consentimiento de cookies se recoge mediante el banner mostrado en tu primera visita. Puedes retirar tu consentimiento en cualquier momento escribiéndonos a Compliance@getnamed.ca, con sujeción a los límites legales o contractuales."] },
      { h: "6. Cookies", p: ["Este sitio solo utiliza cookies funcionales o almacenamiento del navegador: recordar tu idioma y tu elección de cookies. No usamos cookies de publicidad, perfilado analítico ni rastreo entre sitios. Puedes rechazar las cookies en el banner; las funciones esenciales del sitio seguirán funcionando."] },
      { h: "7. Comunicación a terceros", p: ["No vendemos ni alquilamos tu información personal. Puede ser tratada por proveedores de servicios (alojamiento, correo electrónico) sujetos a obligaciones de confidencialidad, o comunicarse si la ley lo exige. La información puede comunicarse fuera de Quebec (incluidas otras provincias o países); en ese caso queda sujeta a las leyes de ese territorio."] },
      { h: "8. Conservación", p: ["Conservamos la información personal solo el tiempo necesario para los fines descritos y luego la destruimos o anonimizamos de forma segura."] },
      { h: "9. Seguridad", p: ["Aplicamos medidas de seguridad razonables y apropiadas; el acceso se limita a los miembros del equipo que lo necesitan. Sin embargo, ningún método de transmisión o almacenamiento es 100 % seguro."] },
      { h: "10. Tus derechos", p: ["Puedes solicitar acceso a tu información personal, su portabilidad, rectificación o eliminación, y retirar tu consentimiento. Escríbenos a Compliance@getnamed.ca; respondemos en un plazo de 30 días. También puedes presentar una queja ante la Comisión de Acceso a la Información de Quebec (www.cai.gouv.qc.ca) o la Oficina del Comisionado de Privacidad de Canadá (www.priv.gc.ca)."] },
      { h: "11. Cambios en esta política", p: ["La fecha de arriba indica la versión más reciente. Cualquier cambio importante se anunciará en el sitio."] },
      { h: "12. Contacto", p: ["Para cualquier pregunta sobre esta política o tu información personal: Compliance@getnamed.ca."] },
    ],
  },
  manifesto: {
    intro: "La mayoría de los sitios susurra. Los nuestros, no.",
    words: ["FUERTE.", "PRECISO.", "INOLVIDABLE."],
    outro: "Ese es todo el brief.",
  },
  work: {
    label: "Proyectos selectos",
    title: "Pruebas, no promesas.",
    note: "Proyectos de muestra. El trabajo de clientes bajo NDA permanece privado.",
    reel: "Espacio showreel: clip Seedance 02 → /public/media/showreel.mp4",
    items: [
      { name: "Atelier Ferro", sector: "Fabricación de metal, Montreal", tags: "Marca + Sitio + SEO", stat: "+218% leads calificados" },
      { name: "Nordika Cycles", sector: "Bicicletas eléctricas, Quebec", tags: "Sitio + GEO", stat: "Nombrada en 4 de 5 respuestas IA" },
      { name: "Café Méridien", sector: "Café de especialidad, Montreal", tags: "Marca + Sitio", stat: "3.1× pedidos en línea" },
      { name: "Boréale Legal", sector: "Bufete de abogados, Laval", tags: "SEO + AEO", stat: "−62% costo por lead" },
    ],
  },
  services: {
    label: "Qué hacemos",
    title: "Todo lo que un nombre necesita para ser nombrado.",
    lede: "Seis disciplinas, un resultado: tu empresa citada, clicada y llamada, en ambos idiomas, en ambos tipos de búsqueda.",
    items: [
      { n: "01", h: "Identidad de marca", p: "Nombre, marca, voz: los activos que te hacen digno de ser citado. Construidos para sobrevivir a una tarjeta y a una valla por igual." },
      { n: "02", h: "Sitios que convierten", p: "Diseñados, escritos y construidos como activos de crecimiento: rápidos, bilingües, conformes, y pensados para convertir atención en acción." },
      { n: "03", h: "SEO", p: "La búsqueda clásica, bien hecha. Fundamentos técnicos, visibilidad local y contenido que se gana sus posiciones en lugar de alquilarlas." },
      { n: "04", h: "GEO / AEO", p: "Conseguir que te nombren dentro de las respuestas de IA: ChatGPT, Gemini, Perplexity. Datos estructurados, marcado semántico, contenido escrito para ser citado." },
      { n: "05", h: "Contenido y redacción", p: "Francés escrito en Quebec por un redactor nativo, nunca traducido por máquina. Inglés que suena como tú en tu mejor día." },
      { n: "06", h: "Medición", p: "Informes que abren con leads calificados y costo por lead. Evidencia, no corazonadas. El panel de control es tuyo." },
    ],
  },
  programme: {
    label: "El programa",
    title: "Un sistema, tres capas.",
    lede: "Empieza por la capa que necesitas. Agrega la siguiente cuando los números lo digan.",
    tiers: [
      { n: "01", h: "Fundación", p: "Un sitio bilingüe, conforme al Proyecto de Ley 96 (la ley de lengua de Quebec) y estructurado para AEO, en línea en 10 a 15 días hábiles: construido para que Google y los asistentes de IA puedan citarte desde el primer día." },
      { n: "02", h: "Crecimiento", p: "SEO bilingüe, SEO local, AEO/GEO, redes sociales y contenido. La capa que se acumula mes a mes." },
      { n: "03", h: "Rendimiento", p: "Medios pagados, páginas de destino, CRM y gestión de leads, con el costo por lead calificado reportado cada mes." },
    ],
    measure: "Cada proyecto se mide con una sola cifra: leads calificados entregados por mes y costo por lead calificado.",
  },
  pricing: {
    label: "Sin misterios",
    title: "Precios publicados. 30 días de aviso.",
    rows: [
      { k: "Informe de Visibilidad IA", v: "Gratis" },
      { k: "Auditoría de Visibilidad IA", v: "$1,500" },
      { k: "Auditoría de Cumplimiento Digital (Proyecto de Ley 96)", v: "$1,500" },
      { k: "Retainer de crecimiento", v: "$1,200 a $4,500 / mes" },
    ],
    note: "Las agencias establecidas de Montreal cotizan entre $1,500 y más de $10,000 al mes solo por SEO. Nos ubicamos deliberadamente en el extremo más accesible del segmento boutique, y lo publicamos.",
  },
  proof: {
    label: "Lo que está en juego",
    title: "Ser invisible sale caro.",
    lede: "getnamed son dos operadores que han dirigido negocios reales. Hablas con un dueño, nunca con un ejecutivo de cuenta, y siempre sabes a dónde va tu dinero.",
    stats: [
      { v: "$3,000 a $30,000", p: "Multa del Proyecto de Ley 96 por infracción. Cada día que un sitio no conforme permanece en línea cuenta como una infracción aparte." },
      { v: "2 idiomas", p: "Google y los asistentes de IA responden en ambos. Tú también deberías hacerlo." },
      { v: "1 cifra", p: "Cada informe abre con leads calificados y costo por lead." },
    ],
    guarantees: [
      "Panel en vivo, siempre activo",
      "30 días de aviso, sin permanencia",
      "Tú eres dueño de tu dominio, tus cuentas publicitarias, tus analíticas y tu contenido",
    ],
  },
  ethos: {
    label: "El ethos",
    title: "Un sitio web debería hacer más que representar tu negocio. Debería hacerlo crecer.",
    paras: [
      "El gran diseño capta la atención. La gran estrategia convierte la atención en acción. Por eso no abordamos los sitios web como proyectos de diseño. Los abordamos como activos de crecimiento construidos para generar leads, aumentar conversiones y maximizar el retorno de cada dólar invertido en marketing.",
      "Cualquiera puede crear algo visualmente atractivo. El verdadero desafío es construir un sitio que genere confianza, comunique valor al instante y motive al visitante a dar el siguiente paso.",
      "Trabajando tanto con empresas en rápido crecimiento como con organizaciones de alto tráfico, hemos visto de primera mano qué separa a los sitios que simplemente existen de los que producen resultados constantes. Nuestro enfoque no es solo que te veas mejor en línea. Es que rindas mejor en línea.",
    ],
    stripCaption: "Estudio, Montreal · clip Seedance 03 → /public/media/studio.mp4",
  },
  faq: {
    label: "Respuestas directas",
    title: "Preguntado, respondido.",
    items: [
      { q: "¿Cuánto cuesta un proyecto?", a: "Cada proyecto se define y se tarifa por adelantado: precio fijo, publicado antes de empezar. Sin facturación por horas, sin líneas sorpresa. Apruebas la cifra antes de que escribamos una línea de código." },
      { q: "¿Cuánto tarda un sitio web?", a: "Un proyecto típico de marca + sitio toma de cuatro a ocho semanas según el alcance. El cronograma exacto, con hitos, se escribe en la propuesta antes de comenzar." },
      { q: "¿Trabajan en francés e inglés?", a: "En ambos, nativamente. El francés de Quebec se escribe en Quebec por un redactor nativo, nunca traducido por máquina. El inglés se escribe para sonar como tú. Español disponible para proyectos que lo necesiten." },
      { q: "¿Cuál es la diferencia entre SEO y GEO / AEO?", a: "El SEO te hace visible en buscadores clásicos como Google. El GEO y el AEO hacen que te nombren dentro de las respuestas de IA: ChatGPT, Gemini, Perplexity. Estructuramos cada sitio para ambos: marcado semántico, datos estructurados y contenido escrito para ser citado." },
      { q: "¿Quién es dueño del sitio, el dominio y el contenido?", a: "Tú. El dominio, el sitio, la analítica, las cuentas publicitarias y el contenido se registran a tu nombre desde el primer día. Nunca situaciones de rehenes." },
      { q: "¿Estamos atados a un contrato largo?", a: "No. Los términos son claros, los precios se publican y el trabajo continuo funciona con 30 días de aviso. Retenemos clientes rindiendo, no con papeleo." },
    ],
  },
  footer: {
    big: "¿Tienes una marca por la que valga la pena luchar?",
    emailLabel: "Escríbenos",
    socialsLabel: "Síguenos",
    tagline: "Be the answer. Soyez la référence.",
    location: "Montreal, Quebec",
    rights: "© 2026 getnamed. Todos los derechos reservados.",
  },
  intake: {
    title: "Formulario de admisión y brief de descubrimiento",
    subtitle: "Ocho pasos cortos. La misma disciplina con la que abrimos cada proyecto.",
    back: "Atrás",
    next: "Siguiente",
    done: "Listo",
    stepOf: "Paso",
    print: "Imprimir / Guardar como PDF",
    copy: "Copiar como texto",
    copied: "Resumen copiado.",
    email: "Enviar a getnamed",
    emailSubject: "Formulario de admisión: ",
    emailHeading: "GETNAMED | ENVÍO DEL FORMULARIO DE ADMISIÓN",
    noAnswers: "Aún no hay respuestas.",
    steps: [
      {
        eyebrow: "Empresa y objetivos",
        h: "Cuéntanos sobre la empresa y el resultado que necesitas.",
        lede: "Ninguna decisión de diseño se toma antes de que el objetivo de negocio esté escrito, en tus propias palabras.",
        fields: [
          { id: "biz_name", label: "Nombre de la empresa / organización", required: true },
          { id: "contact_name", label: "Tu nombre y cargo", required: true },
          { id: "contact_email", label: "Mejor correo electrónico", required: true },
          { id: "goal_90", label: "¿Qué debe lograr este sitio en los primeros 90 días?", ph: "Ej. Obtener 15 solicitudes de cotización calificadas al mes.", textarea: true, required: true },
          { id: "current_site", label: "Sitio web actual (si existe)", ph: "https://" },
          { id: "frustration", label: "¿Cuál es la mayor frustración con lo que tienes hoy?", textarea: true },
        ],
        choices: [
          { id: "budget", label: "Presupuesto aproximado para el proyecto", options: ["Menos de $5k", "$5k – $10k", "$10k – $25k", "$25k+", "Aún no lo sé"] },
          { id: "timeline", label: "¿Cuándo necesitas el sitio en línea?", options: ["Lo antes posible", "1–3 meses", "3–6 meses", "Flexible"] },
        ],
      },
      {
        eyebrow: "Tu comprador",
        h: "¿A quién debe convencer realmente este sitio?",
        lede: "No demografía: la persona específica, en plena decisión, que llega a este sitio.",
        fields: [
          { id: "buyer_role", label: "¿Quién es el comprador principal? (rol / título)", ph: "Ej. VP de Finanzas, importador mediano" },
          { id: "buyer_trigger", label: "¿Qué detona su búsqueda?", ph: "Ej. El banco cotizó una tasa que se comió su margen.", textarea: true },
          { id: "buyer_alt", label: "¿Qué hacen hoy en lugar de contratarte?", textarea: true, hint: "A menudo es \"no hacer nada\" o \"resolverlo internamente\", no un competidor con nombre." },
          { id: "buyer_objection", label: "¿Cuál es la objeción que más a menudo mata la venta?", textarea: true },
        ],
        choices: [
          { id: "second_buyer", label: "¿Hay un segundo tipo de comprador a considerar?", options: ["Sí", "No"] },
        ],
      },
      {
        eyebrow: "Competidores",
        h: "¿Contra quién competimos?",
        lede: "Nombra hasta tres. Analizaremos cada uno con nuestra lista estándar antes de los wireframes.",
        fields: [
          { id: "comp1", label: "Competidor 1: nombre / URL" },
          { id: "comp1_note", label: "¿Qué hacen mejor que tú hoy?", textarea: true },
          { id: "comp2", label: "Competidor 2: nombre / URL" },
          { id: "comp2_note", label: "¿Qué hacen mejor que tú hoy?", textarea: true },
          { id: "comp3", label: "Competidor 3: nombre / URL" },
          { id: "comp3_note", label: "¿Qué hacen mejor que tú hoy?", textarea: true },
          { id: "aspirational", label: "¿Alguna marca que admires (cualquier sector) cuyo nivel de calidad debamos apuntar?" },
        ],
        choices: [],
      },
      {
        eyebrow: "Acceso y activos",
        h: "¿Con qué contamos ya para trabajar?",
        lede: "La auditoría de accesos que de otro modo te pediríamos en la semana uno: dárnosla ahora nos ahorra una semana.",
        fields: [
          { id: "domain_owner", label: "¿Quién controla el registrador del dominio?", ph: "Ej. GoDaddy, cuenta en nuestro nombre" },
          { id: "content_assets", label: "Contenido existente reutilizable (textos, fotos, videos, testimonios)", textarea: true },
        ],
        choices: [
          { id: "cms_have", label: "¿Tienes un CMS o plataforma de sitio actual?", options: ["WordPress", "Webflow", "Shopify", "Squarespace/Wix", "Desarrollo a medida", "Ninguno aún"] },
          { id: "access", label: "Accesos que puedes otorgarnos (marca todos los disponibles)", options: ["Admin CMS", "Hosting", "Registrador de dominio", "Google Analytics", "Search Console", "Perfil de negocio"] },
          { id: "bilingual", label: "Idiomas en que debe entregarse el sitio", options: ["Francés + inglés", "Solo inglés", "Solo francés", "Español también"] },
        ],
      },
      {
        eyebrow: "Páginas y estructura",
        h: "¿Qué páginas necesita realmente este sitio?",
        lede: "Marca cada página prevista. Cualquier página fuera de esta lista se cotiza por separado: nada se cuela sin precio.",
        fields: [
          { id: "structure_notes", label: "¿Algo estructural que debamos saber (área de miembros, catálogo, varias sedes)?", textarea: true },
        ],
        choices: [
          { id: "pages", label: "Páginas necesarias", options: ["Inicio", "Nosotros", "Servicios", "Precios", "Blog / Recursos", "Casos de éxito", "FAQ", "Contacto", "Empleo", "Legal / Privacidad", "Reservas / Agenda"] },
          { id: "integrations", label: "Integraciones requeridas", options: ["Boletín / email", "CRM", "Reservas", "Comercio electrónico", "Formularios a medida", "Ninguna"] },
        ],
      },
      {
        eyebrow: "Estilo visual",
        h: "¿Cómo debe verse y sentirse?",
        lede: "Los wireframes van primero, en escala de grises, antes que todo esto, pero esto orienta la dirección desde el día uno.",
        fields: [
          { id: "style_refs", label: "Sitios cuyo estilo te gusta (cualquier sector): pega las URL", textarea: true },
          { id: "style_avoid", label: "¿Hay algo que quieras evitar activamente?", textarea: true },
        ],
        choices: [
          { id: "visual_style", label: "Dirección visual", options: ["Minimalista / moderno", "Corporativo / profesional", "Audaz / alto contraste", "Cálido / cercano", "Técnico / orientado a datos"] },
          { id: "media_assets", label: "Medios que ya tienes", options: ["Fotografía", "Video", "Archivos de logo", "Manual de marca", "Ninguno aún"] },
        ],
      },
      {
        eyebrow: "Cumplimiento",
        h: "¿Hay restricciones regulatorias que debamos considerar?",
        lede: "Márcalo ahora: adaptar el cumplimiento después del diseño es caro y se nota.",
        fields: [
          { id: "compliance_notes", label: "¿Algo más sobre restricciones, aprobaciones o cadena de validación que debamos saber?", textarea: true },
        ],
        choices: [
          { id: "compliance", label: "Se aplica a nosotros", options: ["Ley 96 (idioma francés, Quebec)", "Accesibilidad (WCAG) requerida", "Manejo de datos de tarjetas de pago", "Industria regulada (finanzas, salud, legal)", "Ninguna de las anteriores"] },
        ],
      },
      {
        eyebrow: "Revisión y envío",
        h: "Revisa lo que nos has contado.",
        lede: "Verifícalo, luego imprime/guarda como PDF o envíanoslo directamente.",
        fields: [],
        choices: [],
      },
    ],
    sections: [
      { title: "Empresa y objetivos", fields: [{ id: "biz_name", label: "Empresa" }, { id: "contact_name", label: "Contacto" }, { id: "contact_email", label: "Correo" }, { id: "goal_90", label: "Objetivo 90 días" }, { id: "current_site", label: "Sitio actual" }, { id: "frustration", label: "Mayor frustración" }], choices: ["budget", "timeline"] },
      { title: "Tu comprador", fields: [{ id: "buyer_role", label: "Comprador principal" }, { id: "buyer_trigger", label: "Detonante de compra" }, { id: "buyer_alt", label: "Alternativa real" }, { id: "buyer_objection", label: "Objeción principal" }], choices: ["second_buyer"] },
      { title: "Competidores", fields: [{ id: "comp1", label: "Competidor 1" }, { id: "comp1_note", label: "…su ventaja" }, { id: "comp2", label: "Competidor 2" }, { id: "comp2_note", label: "…su ventaja" }, { id: "comp3", label: "Competidor 3" }, { id: "comp3_note", label: "…su ventaja" }, { id: "aspirational", label: "Marca aspiracional" }], choices: [] },
      { title: "Acceso y activos", fields: [{ id: "domain_owner", label: "Dueño del dominio" }, { id: "content_assets", label: "Contenido existente" }], choices: ["cms_have", "access", "bilingual"] },
      { title: "Páginas y estructura", fields: [{ id: "structure_notes", label: "Notas estructurales" }], choices: ["pages", "integrations"] },
      { title: "Estilo visual", fields: [{ id: "style_refs", label: "Referencias de estilo" }, { id: "style_avoid", label: "Evitar" }], choices: ["visual_style", "media_assets"] },
      { title: "Cumplimiento", fields: [{ id: "compliance_notes", label: "Notas de cumplimiento" }], choices: ["compliance"] },
    ],
    choiceLabels: { budget: "Presupuesto", timeline: "Cronograma", second_buyer: "Segundo comprador", cms_have: "Plataforma", access: "Accesos", bilingual: "Idiomas", pages: "Páginas", integrations: "Integraciones", visual_style: "Dirección visual", media_assets: "Medios", compliance: "Cumplimiento" },
  },
};

export const COPY: Record<Lang, SiteCopy> = { en, fr, es };

/* ---------- Language context ---------- */
export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: SiteCopy }>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function useLang() {
  return useContext(LangContext);
}

export function getInitialLang(): Lang {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("lang");
    if (q === "fr" || q === "es" || q === "en") return q;
    const saved = localStorage.getItem("gn_lang");
    if (saved === "fr" || saved === "es" || saved === "en") return saved;
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith("fr")) return "fr";
    if (nav.startsWith("es")) return "es";
  } catch {
    /* noop */
  }
  return "en";
}
