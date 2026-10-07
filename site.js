(function () {
  var root = document.documentElement;
  var app = document.getElementById("app");
  var page = app ? app.getAttribute("data-page") : "";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var GA_ID = "G-GMPX24VL2W"; /* Google Analytics : colle ici ton ID de mesure, de la forme G-XXXXXXXXXX */
  var CONTACT = { phone: "243808464837", phoneText: "+243 808 464 837", email: "isaaccinza730@gmail.com" };

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function L(fr, en) { return '<span data-l="fr">' + fr + '</span><span data-l="en">' + en + '</span>'; }
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  /* ---------- Data (modifie ici) ---------- */
  var POLES = [
    { id: "data", c: "c-data", label: { fr: "Analyse de données", en: "Data analysis" },
      title: { fr: "Analyse de données", en: "Data analysis" },
      short: { fr: "Pour les ONG, institutions et équipes qui veulent des chiffres fiables : collecte digitale, analyse et visualisation, expliquées en langage simple.", en: "For NGOs, institutions and teams that want reliable figures: digital collection, analysis and visualization, explained in plain language." },
      text: { fr: "Je transforme des données brutes en résultats fiables et lisibles, de la collecte sur le terrain à l'interprétation en langage simple. C'est un service pour toute organisation qui a des données à comprendre, pas seulement pour la recherche académique.", en: "I turn raw data into reliable, readable results, from field collection to interpretation in plain language. It is a service for any organization with data to understand, not only for academic research." },
      audience: { fr: "ONG et institutions, équipes de projet, entreprises, et toute personne qui a besoin de chiffres fiables pour décider.", en: "NGOs and institutions, project teams, businesses, and anyone who needs reliable figures to make decisions." },
      tools: ["SPSS", "Stata", "R · RStudio", "Python (pandas, numpy, matplotlib)", "Excel avancé", "Power BI", "Tableau", "Epi Info", "KoboToolbox · ODK", "Google Forms · Microsoft Forms"],
      offers: [
        { t: { fr: "Préparation des données", en: "Data preparation" }, d: { fr: "Encodage, nettoyage, gestion des valeurs manquantes et structuration de la base.", en: "Coding, cleaning, handling missing values and structuring the dataset." } },
        { t: { fr: "Analyse descriptive", en: "Descriptive analysis" }, d: { fr: "Fréquences, moyennes et tableaux croisés.", en: "Frequencies, means and cross tables." } },
        { t: { fr: "Analyse inférentielle", en: "Inferential analysis" }, d: { fr: "Khi², t-test et ANOVA pour tester les différences et les liens entre variables.", en: "Chi-square, t-test and ANOVA to test differences and associations between variables." } },
        { t: { fr: "Analyse avancée", en: "Advanced analysis" }, d: { fr: "Régressions logistique et linéaire, analyse multivariée.", en: "Logistic and linear regression, multivariate analysis." } },
        { t: { fr: "Visualisation", en: "Visualization" }, d: { fr: "Graphiques, tableaux et tableaux de bord (Power BI, Tableau, Excel), prêts à intégrer dans un rapport.", en: "Charts, tables and dashboards (Power BI, Tableau, Excel), ready to include in a report." } },
        { t: { fr: "Collecte digitale", en: "Digital data collection" }, d: { fr: "Questionnaires sur KoboToolbox, Google Forms ou Microsoft Forms, testés avant le terrain, avec export structuré des données.", en: "Questionnaires on KoboToolbox, Google Forms or Microsoft Forms, tested before fieldwork, with structured data export." } },
        { t: { fr: "Interprétation en langage simple", en: "Interpretation in plain language" }, d: { fr: "Les résultats statistiques expliqués clairement, pour que chacun comprenne et puisse décider.", en: "Statistical results explained clearly so that everyone understands and can decide." } }
      ] },
    { id: "research", c: "c-research", label: { fr: "Conseil en recherche", en: "Research consulting" },
      title: { fr: "Conseil en recherche", en: "Research consulting" },
      short: { fr: "Je suis consultant en recherche au sein de CINZA Research Hub : j'accompagne étudiants, chercheurs et professeurs, du choix du sujet à la soutenance ou à la publication, en français et en anglais.", en: "I am a research consultant at CINZA Research Hub: I support students, researchers and professors, from choosing a topic to the defense or publication, in French and English." },
      text: { fr: "Je suis consultant en recherche au sein de CINZA Research Hub. J'accompagne étudiants, chercheurs et professeurs sur tout le cycle de la recherche, du choix du sujet à la soutenance ou à la publication. L'analyse et l'interprétation des données en font partie, au service du travail de recherche.", en: "I am a research consultant at CINZA Research Hub. I support students, researchers and professors across the whole research cycle, from choosing a topic to the defense or publication. Data analysis and interpretation are part of it, in service of the research work." },
      audience: { fr: "Étudiants (mémoires, TFC, thèses), chercheurs et professeurs d'université, étudiants et chercheurs internationaux.", en: "Students (dissertations, final-year projects, theses), university researchers and professors, international students and researchers." },
      tools: ["SPSS", "Stata", "R · RStudio", "Python", "Excel avancé", "Power BI", "Tableau", "Epi Info", "KoboToolbox · ODK", "Google Forms · Microsoft Forms", "Zotero · Mendeley", "APA · MLA · Vancouver", "Français · English"],
      offers: [
        { t: { fr: "Sujet et problématique", en: "Topic and research question" }, d: { fr: "Identifier des sujets pertinents à partir des besoins et des lacunes observées sur le terrain.", en: "Identify relevant topics from the needs and gaps observed in the field." } },
        { t: { fr: "Conseil méthodologique", en: "Methodology advice" }, d: { fr: "Méthode, échantillon, protocole et questionnaire adaptés à la question de recherche.", en: "Method, sample, protocol and questionnaire suited to the research question." } },
        { t: { fr: "Analyse et interprétation des résultats", en: "Analysis and interpretation of results" }, d: { fr: "Traitement des données du mémoire ou de l'étude, puis explication claire des résultats.", en: "Processing the data of the dissertation or study, then a clear explanation of the results." } },
        { t: { fr: "Rédaction scientifique", en: "Scientific writing" }, d: { fr: "Mise en forme des résultats, discussion, reformulation, normes APA, MLA ou Vancouver.", en: "Presentation of results, discussion, rewording, APA, MLA or Vancouver standards." } },
        { t: { fr: "Contrôle qualité", en: "Quality control" }, d: { fr: "Détection de plagiat et de contenu généré par IA, correction linguistique en français et en anglais.", en: "Plagiarism and AI-generated content detection, language correction in French and English." } },
        { t: { fr: "Coaching et formation", en: "Coaching and training" }, d: { fr: "Coaching pour le mémoire, formation à tous les outils d'analyse de données (SPSS, R, Stata, Python, Excel, Power BI…), préparation de la soutenance.", en: "Dissertation coaching, training in all data analysis tools (SPSS, R, Stata, Python, Excel, Power BI…), defense preparation." } },
        { t: { fr: "Résumés académiques (en préparation)", en: "Academic summaries (in preparation)" }, d: { fr: "Fiches de révision par cours et par promotion, construites à partir du syllabus et des anciens sujets.", en: "Revision sheets by course and by class, built from the syllabus and past papers." } },
        { t: { fr: "Bases de données pour chercheurs (en préparation)", en: "Databases for researchers (in preparation)" }, d: { fr: "Bases académiques prêtes à l'emploi, issues de collectes digitales.", en: "Ready-to-use academic databases built from digital collections." } }
      ],
      note: { fr: "Je guide et je structure. Le travail reste celui du chercheur : je ne rédige pas à sa place.", en: "I guide and structure. The work remains the researcher's own: I do not write it for them." } },
    { id: "front", c: "c-front", label: { fr: "Front-end", en: "Front-end" },
      title: { fr: "Développement front-end", en: "Front-end development" },
      short: { fr: "Je conçois et je développe des sites web et des applications web sur mesure : des interfaces soignées, rapides et fiables sur tous les écrans.", en: "I design and build websites and custom web applications: polished, fast and reliable interfaces on every screen." },
      text: { fr: "Je prends en charge toute la partie visible d'un produit web : de la maquette à la mise en ligne, avec les technologies et les outils adaptés au projet. Sites vitrines, applications, tableaux de bord, interfaces de plateformes : le rendu est soigné, rapide et fiable sur tous les appareils.", en: "I handle the whole visible side of a web product: from mockup to launch, with the technologies and tools that suit the project. Showcase sites, applications, dashboards, platform interfaces: the result is polished, fast and reliable on every device." },
      audience: { fr: "Indépendants, entreprises, radios, ONG, écoles, institutions et équipes qui ont besoin d'un site ou d'une application web de qualité.", en: "Freelancers, businesses, radio stations, NGOs, schools, institutions and teams that need a high-quality website or web application." },
      tools: ["HTML5", "CSS3 · Sass", "JavaScript (ES6+)", "TypeScript", "React", "Tailwind CSS · Bootstrap", "Figma", "Git · GitHub", "Netlify · Vercel · GitHub Pages"],
      offers: [
        { t: { fr: "Sites web", en: "Websites" }, d: { fr: "Sites vitrines, portfolios, sites institutionnels et multipages, en plusieurs langues, pensés pour présenter une activité et être trouvés.", en: "Showcase sites, portfolios, institutional and multi-page sites, in several languages, built to present an activity and be found." } },
        { t: { fr: "Applications web", en: "Web applications" }, d: { fr: "Applications interactives, tableaux de bord et interfaces de gestion avec logique dynamique et données en direct.", en: "Interactive applications, dashboards and management interfaces with dynamic logic and live data." } },
        { t: { fr: "Intégration de maquettes", en: "Design integration" }, d: { fr: "Transformation fidèle d'une maquette Figma ou d'une charte graphique en pages prêtes à l'emploi.", en: "Faithful conversion of a Figma mockup or a brand guide into production-ready pages." } },
        { t: { fr: "Adaptation à tous les écrans", en: "Every screen size" }, d: { fr: "Mise en page fluide qui reste propre du petit écran au grand écran, quel que soit l'appareil.", en: "Fluid layout that stays clean from small to large screens, on any device." } },
        { t: { fr: "Performance et accessibilité", en: "Performance and accessibility" }, d: { fr: "Chargement rapide, code propre, référencement et accessibilité soignés.", en: "Fast loading, clean code, careful SEO and accessibility." } },
        { t: { fr: "Interactions et intégrations", en: "Interactions and integrations" }, d: { fr: "Animations, formulaires, boutons de contact directs (WhatsApp, Gmail, LinkedIn), téléchargement de documents et connexion à des services externes.", en: "Animations, forms, direct contact buttons (WhatsApp, Gmail, LinkedIn), document downloads and connections to external services." } },
        { t: { fr: "Mise en ligne", en: "Going live" }, d: { fr: "Publication professionnelle sur toutes les plateformes : GitHub Pages, Netlify, Vercel ou hébergement classique, avec nom de domaine.", en: "Professional publishing on every platform: GitHub Pages, Netlify, Vercel or standard hosting, with a domain name." } }
      ] }
  ];
  var SVC_URL = {
    data: { fr: "analyse-de-donnees.html", en: "data-analysis.html" },
    research: { fr: "conseil-en-recherche.html", en: "research-consulting.html" },
    front: { fr: "developpement-front-end.html", en: "front-end-development.html" }
  };
  function svcLink(id, cls, fr, en) {
    return '<a class="' + cls + '" data-l="fr" href="' + SVC_URL[id].fr + '">' + fr + '</a><a class="' + cls + '" data-l="en" href="' + SVC_URL[id].en + '">' + en + "</a>";
  }
  var LEVELS = { 5: { fr: "Très avancé", en: "Very advanced" }, 4: { fr: "Avancé", en: "Advanced" } };

  var PROJECTS = [
    { poles: ["front", "data"], status: { fr: "En cours", en: "In progress" },
      title: { fr: "Calculateur de résultats universitaires", en: "University results calculator" },
      text: { fr: "Un seul programme de calcul des résultats pour toutes les facultés de l'université, du choix de la faculté à celui de la promotion.", en: "A single results calculator for every faculty of the university, from choosing the faculty to choosing the class." },
      detail: { fr: ["Une page d'accueil qui explique l'utilisation, un bouton par faculté, puis une liste déroulante des promotions.", "Saisie des notes (travaux journaliers puis examen) et calcul en direct des moyennes, des crédits validés et de la mention.", "Commencé par la médecine, du Bac+1 au Master 3. Premier modèle : L3 LMD en sciences biomédicales (60 crédits).", "Pensé pour le téléphone (Android et iPhone) et partageable par lien."], en: ["A home page explaining how to use it, one button per faculty, then a drop-down list of classes.", "Grade entry (continuous assessment then exam) with live calculation of averages, validated credits and distinction.", "Started with medicine, from Bac+1 to Master 3. First model: L3 LMD in biomedical sciences (60 credits).", "Designed for phones (Android and iPhone) and shareable by link."] },
      stack: ["Python", "Tkinter", "HTML", "CSS", "JavaScript"] },
    { poles: ["front"], status: { fr: "En cours", en: "In progress" },
      title: { fr: "Plateforme de rédaction radio", en: "Radio newsroom platform" },
      text: { fr: "Plateforme numérique pour la rédaction d'une station de radio.", en: "Digital platform for a radio station's newsroom." },
      detail: { fr: ["Soumission des nouvelles par les rédacteurs.", "Suivi de la validation de chaque nouvelle.", "Archivage consultable."], en: ["News submission by reporters.", "Tracking of each item's validation.", "Searchable archive."] },
      stack: [{ fr: "Conception d'interface", en: "Interface design" }, { fr: "Flux de travail", en: "Workflow" }] },
    { poles: ["data", "research"], status: { fr: "Service", en: "Service" },
      title: { fr: "Enquêtes, de la collecte aux résultats", en: "Surveys, from collection to results" },
      text: { fr: "Construction de l'outil de collecte, analyse et rédaction de l'interprétation.", en: "Building the collection tool, analysis and writing up the interpretation." },
      detail: { fr: ["Questionnaire adapté au terrain et à la question de recherche.", "Nettoyage des données et analyse descriptive.", "Rédaction des résultats pour mémoires et travaux de fin de cycle."], en: ["Questionnaire adapted to the field and the research question.", "Data cleaning and descriptive analysis.", "Results write-up for theses and final-year work."] },
      stack: [{ fr: "Questionnaires", en: "Questionnaires" }, { fr: "Analyse", en: "Analysis" }, { fr: "Rédaction", en: "Writing" }] },
    { poles: ["research"], status: { fr: "Depuis 2023", en: "Since 2023" },
      title: { fr: "CINZA Research Hub", en: "CINZA Research Hub" },
      text: { fr: "Service bilingue d'appui académique et scientifique que j'ai fondé.", en: "Bilingual academic and scientific support service that I founded." },
      detail: { fr: ["Afrique francophone, Afrique anglophone et international.", "Conseil méthodologique, enquêtes, interprétation des résultats.", "Accompagnement en français et en anglais."], en: ["Francophone Africa, Anglophone Africa and international.", "Methodology advice, surveys, results interpretation.", "Support in French and in English."] },
      stack: ["FR", "EN"] }
  ];
  var POLE_BY_ID = {};
  POLES.forEach(function (p) { POLE_BY_ID[p.id] = p; });
  var ROLES = [
    { fr: "analyste de données", en: "data analyst" },
    { fr: "consultant en recherche", en: "research consultant" },
    { fr: "développeur front-end", en: "front-end developer" }
  ];
  var SUBJECTS = [
    { v: "research", fr: "Mission de recherche", en: "Research assignment" },
    { v: "data", fr: "Analyse de données", en: "Data analysis" },
    { v: "web", fr: "Projet web", en: "Web project" },
    { v: "other", fr: "Autre demande", en: "Other request" }
  ];
  var CVS = {
    fr: { file: "cv-fr.pdf", name: "CV-Isaac-Mwembia-Cinza-FR.pdf" },
    en: { file: "cv-en.pdf", name: "CV-Isaac-Mwembia-Cinza-EN.pdf" }
  };
  var NAV = [
    { id: "home", href: "index.html", fr: "Accueil", en: "Home" },
    { id: "skills", href: "competences.html", fr: "Compétences", en: "Skills" },
    { id: "projects", href: "projets.html", fr: "Projets", en: "Projects" },
    { id: "cinza", href: "cinza.html", fr: "CINZA Research Hub", en: "CINZA Research Hub" },
    { id: "background", href: "parcours.html", fr: "Parcours et CV", en: "Background and CV" },
    { id: "contact", href: "contact.html", fr: "Contact", en: "Contact" }
  ];

  /* ---------- Header and footer ---------- */
  function renderChrome() {
    var h = $("#site-header");
    if (h) {
      h.innerHTML = '<header class="bar"><div class="wrap bar-in">' +
        '<a class="brand" href="index.html"><span class="mark" aria-hidden="true">IC</span><span>Isaac MWEMBIA CINZA</span></a>' +
        '<nav class="nav" id="nav" aria-label="Navigation">' + NAV.map(function (n) {
          return '<a href="' + n.href + '"' + (n.id === page ? ' aria-current="page"' : "") + ">" + L(n.fr, n.en) + "</a>";
        }).join("") + "</nav>" +
        '<div class="tools">' +
        '<button class="tool" id="lang-btn" type="button" aria-label="Changer de langue / Switch language"></button>' +
        '<button class="tool" id="theme-btn" type="button" aria-label="Changer le thème / Switch theme">' + L("Thème", "Theme") + '</button>' +
        '<button class="tool menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav">Menu</button>' +
        "</div></div></header>";
    }
    var f = $("#site-footer");
    if (f) {
      f.innerHTML = '<footer class="foot"><div class="wrap"><div><b>Isaac MWEMBIA CINZA</b><br>' + L("CEO de CINZA Labs", "CEO of CINZA Labs") + ' · Mbujimayi, ' + L("RDC", "DRC") + ' · © ' + new Date().getFullYear() + ' · ' + L("Tous droits réservés", "All rights reserved") + '</div>' +
        '<nav aria-label="Pied de page">' + NAV.map(function (n) { return '<a href="' + n.href + '">' + L(n.fr, n.en) + "</a>"; }).join("") + (GA_ID ? '<button type="button" class="cookie-link" id="cookie-btn">' + L("Cookies", "Cookies") + "</button>" : "") + "</nav>" +
        '<nav class="foot-svc" aria-label="Services">' + ["data", "research", "front"].map(function (id) { var p = POLE_BY_ID[id]; return svcLink(id, "", p.title.fr, p.title.en); }).join("") + "</nav></div></footer>" +
        '<div class="fab"><a data-wa target="_blank" rel="noopener" href="https://wa.me/' + CONTACT.phone + '" aria-label="WhatsApp">' +
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4.2A8 8 0 1 1 8.4 19z"/></svg><span>WhatsApp</span></a></div>';
    }
    var foot = $(".foot"), fab = $(".fab");
    if (foot && fab && "IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { fab.classList.toggle("hide", en[0].isIntersecting); }, { threshold: 0.05 }).observe(foot);
    }
    var menu = $("#menu-btn"), nav = $("#nav");
    if (menu && nav) {
      menu.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        menu.setAttribute("aria-expanded", String(open));
      });
    }
  }

  /* ---------- Language and theme ---------- */
  var lang = load("pf-lang");
  if (lang !== "fr" && lang !== "en") lang = (navigator.language || "fr").toLowerCase().indexOf("en") === 0 ? "en" : "fr";
  var pageLang = app ? app.getAttribute("data-lang") : null, pageAlt = app ? app.getAttribute("data-alt") : null;
  if (pageLang === "fr" || pageLang === "en") lang = pageLang; /* page de service : la langue est celle de la page */
  function setLang(l) {
    lang = l; root.setAttribute("lang", l); if (!pageLang) store("pf-lang", l);
    var lb = $("#lang-btn"); if (lb) lb.textContent = l === "fr" ? "EN" : "FR";
    refreshLinks(); renderRole(true); refreshCv(); refreshSelect();
  }
  var savedTheme = load("pf-theme");
  if (savedTheme === "dark" || savedTheme === "light") root.setAttribute("data-theme", savedTheme);
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return !!(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
  }

  /* ---------- WhatsApp and Gmail links ---------- */
  function waLink(text) { return "https://wa.me/" + CONTACT.phone + (text ? "?text=" + encodeURIComponent(text) : ""); }
  function gmailLink(subject, body) {
    return "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(CONTACT.email) +
      "&su=" + encodeURIComponent(subject || "") + "&body=" + encodeURIComponent(body || "");
  }
  function currentSubject() {
    var sel = $("#f-subject"); if (!sel) return "";
    var s = SUBJECTS.filter(function (x) { return x.v === sel.value; })[0] || SUBJECTS[0];
    return s[lang];
  }
  function composeText() {
    var name = ($("#f-name").value || "").trim(), msg = ($("#f-msg").value || "").trim(), subj = currentSubject();
    if (lang === "fr") return "Bonjour Isaac, " + (name ? "je suis " + name + ". " : "") + "Je vous contacte depuis votre portfolio au sujet de : " + subj + "." + (msg ? "\n\n" + msg : "");
    return "Hello Isaac, " + (name ? "I am " + name + ". " : "") + "I am reaching out from your portfolio about: " + subj + "." + (msg ? "\n\n" + msg : "");
  }
  function refreshLinks() {
    var general = lang === "fr" ? "Bonjour Isaac, je vous contacte depuis votre portfolio." : "Hello Isaac, I am reaching out from your portfolio.";
    $$("[data-wa]").forEach(function (a) { a.href = waLink(a.getAttribute("data-wa-" + lang) || general); });
    $$("[data-mail]").forEach(function (a) { a.href = gmailLink(lang === "fr" ? "Contact depuis votre portfolio" : "Contact from your portfolio", general); });
    if ($("#send-wa")) {
      var text = composeText(), who = ($("#f-name").value || "").trim() || (lang === "fr" ? "Contact portfolio" : "Portfolio contact");
      $("#send-wa").href = waLink(text);
      $("#send-mail").href = gmailLink(currentSubject() + " - " + who, text);
    }
  }
  function refreshSelect() {
    var sel = $("#f-subject"); if (!sel) return;
    var cur = sel.value || SUBJECTS[0].v;
    sel.innerHTML = SUBJECTS.map(function (s) { return '<option value="' + s.v + '">' + s[lang] + "</option>"; }).join("");
    sel.value = cur; refreshLinks();
  }

  /* ---------- Role rotator (home) ---------- */
  var roleIdx = 0, roleEl = null;
  function renderRole() { if (roleEl) roleEl.innerHTML = L(ROLES[roleIdx].fr, ROLES[roleIdx].en); }

  /* ---------- Page renderers ---------- */
  function stackItem(s) { return typeof s === "string" ? s : L(s.fr, s.en); }
  function projectCard(p, withMore) {
    return '<article class="card project c-' + p.poles[0] + '">' +
      '<div class="meta">' + p.poles.map(function (k) { return '<span class="tag c-' + k + '">' + L(POLE_BY_ID[k].label.fr, POLE_BY_ID[k].label.en) + "</span>"; }).join("") +
      '<span class="status">' + L(p.status.fr, p.status.en) + "</span></div>" +
      "<h3>" + L(p.title.fr, p.title.en) + "</h3><p>" + L(p.text.fr, p.text.en) + "</p>" +
      '<ul class="chips">' + p.stack.map(function (s) { return "<li>" + stackItem(s) + "</li>"; }).join("") + "</ul>" +
      (withMore ? '<button class="more" type="button" aria-expanded="false">' + L("Voir le détail", "See the detail") + "</button>" +
        '<div class="detail" hidden><ul>' + p.detail.fr.map(function (t, k) { return "<li>" + L(t, p.detail.en[k]) + "</li>"; }).join("") + "</ul></div>" : "") +
      "</article>";
  }
  function bindMore(scope) {
    $$(".more", scope).forEach(function (b) {
      b.addEventListener("click", function () {
        var d = b.nextElementSibling, open = b.getAttribute("aria-expanded") === "true";
        b.setAttribute("aria-expanded", String(!open)); d.hidden = open;
        b.innerHTML = open ? L("Voir le détail", "See the detail") : L("Masquer", "Hide");
      });
    });
  }

  function initHome() {
    roleEl = $("#role"); renderRole();
    setInterval(function () { if (reduce || document.hidden) return; roleIdx = (roleIdx + 1) % ROLES.length; renderRole(); }, 2800);
    var pc = $("#pole-cards");
    if (pc) pc.innerHTML = POLES.map(function (p) {
      return '<article class="card ' + p.c + '"><span class="tag">' + L(p.label.fr, p.label.en) + "</span><h3>" + L(p.title.fr, p.title.en) + "</h3><p>" + L(p.short.fr, p.short.en) + '</p>' + svcLink(p.id, "link-more", "Voir ce service", "See this service") + "</article>";
    }).join("");
    var ft = $("#featured");
    if (ft) { ft.innerHTML = [PROJECTS[0], PROJECTS[2]].map(function (p) { return projectCard(p, false); }).join(""); }
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          io.unobserve(en.target);
          var el = en.target, target = +el.getAttribute("data-count"), suffix = el.getAttribute("data-suffix") || "", t0 = null;
          (function step(ts) {
            if (t0 === null) t0 = ts;
            var k = Math.min(1, (ts - t0) / 900);
            el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + (k === 1 ? suffix : "");
            if (k < 1) requestAnimationFrame(step);
          })(performance.now());
        });
      }, { threshold: 0.6 });
      $$("[data-count]").forEach(function (el) { io.observe(el); });
    }
    var photo = $("#photo"), ph = $("#photo-ph");
    function ok() { photo.hidden = false; if (ph) ph.hidden = true; }
    function bad() { photo.hidden = true; if (ph) ph.hidden = false; }
    photo.addEventListener("load", ok); photo.addEventListener("error", bad);
    if (photo.complete) { photo.naturalWidth > 0 ? ok() : bad(); }
  }

  function initSkills() {
    var box = $("#poles-detail"); if (!box) return;
    box.innerHTML = POLES.map(function (p) {
      return '<section class="pole-sec ' + p.c + '" id="' + p.id + '">' +
        '<div class="pole-intro"><span class="tag">' + L(p.label.fr, p.label.en) + "</span><h2>" + L(p.title.fr, p.title.en) + "</h2><p>" + L(p.text.fr, p.text.en) + "</p>" +
        '<span class="level"><i><b></b><b></b><b></b><b></b><b></b></i>' + L("Niveau très avancé", "Very advanced level") + "</span>" +
        '<h3 class="mini">' + L("Pour qui", "Who it is for") + '</h3><p>' + L(p.audience.fr, p.audience.en) + "</p>" +
        '<h3 class="mini">' + L("Outils", "Tools") + '</h3><ul class="chips">' + p.tools.map(function (t) { return "<li>" + t + "</li>"; }).join("") + "</ul>" + svcLink(p.id, "link-more", "Voir la page de ce service", "See this service page") + "</div>" +
        '<div><h3 class="mini">' + L("Ce que je fais", "What I do") + '</h3><ul class="rows">' + p.offers.map(function (o) {
          return "<li><h3>" + L(o.t.fr, o.t.en) + "</h3><p>" + L(o.d.fr, o.d.en) + "</p></li>";
        }).join("") + "</ul>" + (p.note ? '<p class="note">' + L(p.note.fr, p.note.en) + "</p>" : "") + "</div></section>";
    }).join("");
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  }

  function initProjects() {
    var filter = "all", fbox = $("#filters"), pbox = $("#projects");
    function renderFilters() {
      var items = [{ id: "all", fr: "Tous", en: "All" }].concat(POLES.map(function (p) { return { id: p.id, fr: p.label.fr, en: p.label.en }; }));
      fbox.innerHTML = items.map(function (it) { return '<button type="button" data-f="' + it.id + '" aria-pressed="' + (it.id === filter) + '">' + L(it.fr, it.en) + "</button>"; }).join("");
      $$("button", fbox).forEach(function (b) { b.addEventListener("click", function () { filter = b.getAttribute("data-f"); renderFilters(); renderList(); }); });
    }
    function renderList() {
      pbox.innerHTML = PROJECTS.filter(function (p) { return filter === "all" || p.poles.indexOf(filter) !== -1; }).map(function (p) { return projectCard(p, true); }).join("");
      bindMore(pbox);
    }
    renderFilters(); renderList();
  }

  /* CV downloads */
  var cvBlobs = {}, downloads = null;
  function refreshCv() {
    if (!$("[data-cv]")) return;
    ["fr", "en"].forEach(function (k) {
      var a = $('[data-cv="' + k + '"]'), info = $('[data-cv-info="' + k + '"]'), ready = !!cvBlobs[k];
      a.setAttribute("aria-disabled", ready ? "false" : "true");
      $("[data-cv-label]", a).innerHTML = ready ? L("Télécharger le PDF", "Download the PDF") : L("Bientôt disponible", "Coming soon");
      info.textContent = ready ? "PDF · " + Math.max(1, Math.round(cvBlobs[k].size / 1024)) + (lang === "fr" ? " Ko" : " KB") : "PDF";
    });
    $("#cv-note").textContent = (cvBlobs.fr || cvBlobs.en) ? "" : (lang === "fr" ? "Les CV seront disponibles ici très bientôt." : "The CVs will be available here very soon.");
  }
  function initCv() {
    ["fr", "en"].forEach(function (k) {
      fetch(CVS[k].file).then(function (res) {
        var ct = (res.headers.get("content-type") || "").toLowerCase();
        if (!res.ok || ct.indexOf("pdf") === -1) throw new Error("none");
        return res.blob();
      }).then(function (blob) { cvBlobs[k] = blob; refreshCv(); }).catch(function () { refreshCv(); });
    });
    $$("[data-cv]").forEach(function (a) {
      a.addEventListener("click", function (e) {
        var k = a.getAttribute("data-cv");
        if (!cvBlobs[k]) { e.preventDefault(); return; }
        if (!downloads) a.setAttribute("download", CVS[k].name);
        if (downloads) {
          e.preventDefault();
          downloads.save({ filename: CVS[k].name, data: cvBlobs[k] }).catch(function (err) {
            if (err && err.code === "declined") return;
            window.open(CVS[k].file, "_blank");
          });
        }
      });
    });
    try {
      if (window.claude && window.claude.use) window.claude.use("downloads").then(function (d) { downloads = d || null; }, function () { downloads = null; });
    } catch (e) { downloads = null; }
  }

  function initContact() {
    ["f-name", "f-subject", "f-msg"].forEach(function (id) {
      var el = $("#" + id); el.addEventListener("input", refreshLinks); el.addEventListener("change", refreshLinks);
    });
    $("#composer").addEventListener("submit", function (e) { e.preventDefault(); });
  }

  /* Copy buttons */
  function initCopy() {
    $$("[data-copy]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy"), original = btn.innerHTML;
        function done() { btn.textContent = lang === "fr" ? "Copié" : "Copied"; setTimeout(function () { btn.innerHTML = original; }, 1400); }
        function fallback() {
          var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
          document.body.appendChild(ta); ta.select();
          try { document.execCommand("copy"); done(); } catch (e) {}
          document.body.removeChild(ta);
        }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
      });
    });
  }

  /* ---------- Statistiques (Google Analytics) avec consentement ---------- */
  var gaLoaded = false;
  function loadGA() {
    if (!GA_ID || gaLoaded) return;
    gaLoaded = true; window["ga-disable-" + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", GA_ID);
    var g = document.createElement("script"); g.async = true;
    g.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(g);
  }
  function initConsent() {
    if (!GA_ID) return;
    var bar = null;
    function hide() { if (bar) { bar.remove(); bar = null; } }
    function show() {
      if (bar) return;
      bar = document.createElement("div"); bar.className = "consent"; bar.setAttribute("role", "dialog"); bar.setAttribute("aria-label", "Cookies");
      bar.innerHTML = "<p>" + L("Ce site mesure anonymement ses visites avec Google Analytics, qui utilise des cookies. Acceptez-vous ?", "This site measures its visits anonymously with Google Analytics, which uses cookies. Do you accept?") + "</p>" +
        '<div class="consent-btns"><button type="button" class="consent-no">' + L("Refuser", "Decline") + '</button><button type="button" class="consent-yes">' + L("Accepter", "Accept") + "</button></div>";
      document.body.appendChild(bar);
      $(".consent-yes", bar).addEventListener("click", function () { store("pf-consent", "yes"); hide(); loadGA(); });
      $(".consent-no", bar).addEventListener("click", function () { store("pf-consent", "no"); window["ga-disable-" + GA_ID] = true; hide(); });
    }
    var c = load("pf-consent");
    if (c === "yes") loadGA(); else if (c !== "no") show(); else window["ga-disable-" + GA_ID] = true;
    var cb = $("#cookie-btn"); if (cb) cb.addEventListener("click", show);
  }

  /* ---------- Boot ---------- */
  window.__PF = { POLES: POLES, PROJECTS: PROJECTS, CONTACT: CONTACT, lang: function () { return lang; }, waLink: waLink };
  renderChrome();
  initConsent();
  if (page === "home") initHome();
  if (page === "skills") initSkills();
  if (page === "projects") initProjects();
  if (page === "background") initCv();
  if (page === "contact") initContact();
  initCopy();
  $("#theme-btn").addEventListener("click", function () {
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next); store("pf-theme", next);
  });
  $("#lang-btn").addEventListener("click", function () {
    var next = lang === "fr" ? "en" : "fr";
    if (pageLang && pageAlt) { store("pf-lang", next); location.href = pageAlt; return; }
    setLang(next);
  });
  setLang(lang);
  if (page === "contact") refreshSelect();
  var as = document.createElement("script"); as.src = "assistant.js"; as.defer = true; document.body.appendChild(as);
})();
