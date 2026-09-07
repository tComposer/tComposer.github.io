(function(){
"use strict";
if (window.__lawyBeoordelingen) { window.__lawyBeoordelingen.mountAll(); return; }
/* De origin waar het script vandaan komt wint (preview-deploys en een lokale
   dev-server werken dan vanzelf); de ingebakken site-URL is de terugval. */
var ORIGIN = (function () {
  try { var s = document.currentScript; if (s && s.src) return new URL(s.src).origin; } catch (e) {}
  return "https://dejuisteadvocaat.be";
})();
var CSS = "\n:host{display:block;--surface:#FFFFFF;--surface-2:#EDEDED;--text:#1D1D1B;--muted:#666666;--border:#C7C7C6;--hairline:#DADADA;--accent:#0038FF;--action:#0038FF;--action-hover:#0030DB;--action-active:#0026AE;--on-action:#FFFFFF;--focus:#0038FF;font-family:\"Lawy Proxima\",\"Proxima Nova\",\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:14px;line-height:1.45;color:var(--text);letter-spacing:0;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}\n:host([data-theme=\"dark\"]){--surface:#1D1D1B;--surface-2:#242422;--text:#FFFFFF;--muted:#AFAFAF;--border:rgba(255,255,255,0.18);--hairline:rgba(255,255,255,0.14);--accent:#7C92FF;--action:#0038FF;--action-hover:#0030DB;--action-active:#0026AE;--on-action:#FFFFFF;--focus:#ADBDFF;color-scheme:dark}\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n.lb{background:var(--surface);border:1px solid var(--border);border-radius:12px;color:var(--text);overflow:hidden;box-shadow:none}\n.kop{display:flex;align-items:center;justify-content:space-between;gap:16px 24px;flex-wrap:wrap;padding:20px 22px;min-height:86px}\n.links{display:flex;flex-direction:column;gap:8px;min-width:0}\n.score{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.score>svg{width:20px;height:20px;color:var(--accent);flex:none}\n.v{font-size:30px;font-weight:600;line-height:1;letter-spacing:-.3px}\n.of{font-size:14px;font-weight:600;color:var(--muted);margin-right:6px}\n.n{font-size:14px;font-weight:600;color:var(--muted);padding-left:14px;border-left:1px solid var(--hairline)}\n.leeg,.laadt{font-size:14px;color:var(--muted);max-width:52ch}\n.trust{display:flex;align-items:center;gap:6px 0;flex-wrap:wrap;font-size:12.5px;font-weight:600;color:var(--muted)}\n.trust>span+span::before{content:\"\\00b7\";margin:0 8px;color:var(--border)}\n.trust .ok{display:inline-flex;align-items:center;gap:5px;color:var(--text)}\n.trust .ok svg{width:12px;height:9px;color:var(--text)}\n.acties{display:flex;align-items:center;gap:18px;flex-wrap:wrap}\n.cta{display:inline-flex;align-items:center;justify-content:center;height:44px;padding:0 18px;border-radius:8px;background:var(--action);color:var(--on-action);font-size:14px;font-weight:600;text-decoration:none;white-space:nowrap;transition:background-color 200ms ease}\n.cta:hover{background:var(--action-hover)}\n.cta:active{background:var(--action-active)}\n.link,.lees{color:var(--text);font-size:14px;font-weight:600;text-decoration:underline;text-underline-offset:3px;text-decoration-color:var(--border);white-space:nowrap}\n.link:hover,.lees:hover{text-decoration-color:var(--text)}\n.lees{font-size:13px;margin-left:4px}\n.demo{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 22px;font-size:12.5px;color:var(--muted);border-top:1px solid var(--hairline);background:var(--surface-2)}\n.tag,.chip{display:inline-flex;align-items:center;height:22px;padding:0 8px;border-radius:6px;background:var(--surface-2);color:var(--text);font-size:12px;font-weight:600;line-height:1;white-space:nowrap}\n.demo .tag{background:var(--surface);border:1px solid var(--border)}\n.chip-demo{background:transparent;border:1px solid var(--border);color:var(--muted)}\n.regel{height:1px;background:var(--hairline)}\n.lijst{list-style:none;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));overflow:hidden}\n.item{display:flex;flex-direction:column;gap:10px;padding:20px 22px;border-right:1px solid var(--hairline);border-bottom:1px solid var(--hairline);margin:0 -1px -1px 0}\n.rk{display:flex;align-items:center;gap:8px;flex-wrap:wrap}\n.rs{display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:600;line-height:1}\n.rs svg{width:14px;height:14px;color:var(--accent)}\n.tekst{font-size:15px;line-height:1.5;text-wrap:pretty}\n.door{font-size:12.5px;color:var(--muted);margin-top:auto}\n.antwoord{font-size:13px;line-height:1.45;color:var(--muted);border-top:1px solid var(--hairline);padding-top:10px}\n.antwoord b{display:block;color:var(--text);font-size:12px;font-weight:600;margin-bottom:3px}\n.voet{display:flex;justify-content:space-between;align-items:center;gap:8px 16px;flex-wrap:wrap;padding:12px 22px}\n.via{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:var(--muted);text-decoration:none}\n.via svg{display:block}\n.noot{font-size:12px;color:var(--muted)}\na:focus-visible{outline:2px solid var(--focus);outline-offset:2px;border-radius:8px}\n@media (prefers-reduced-motion:reduce){*{transition:none!important}}\n";
var STAR = "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z\" fill=\"currentColor\"/></svg>";
var CHECK = "<svg viewBox=\"4 6 16 11\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M20 6 9 17l-5-5\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>";
var WORDMARK = {"light":"<svg width=\"55.45\" height=\"16\" viewBox=\"0 0 55.45 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" focusable=\"false\" style=\"display:block;flex:none\"><g transform=\"translate(-4.12,-35.13) scale(0.09368000000000001)\" fill=\"#1D1D1B\"><path d=\"M155.69,389.87c-1.95-5.82-8.51-8.47-14.01-5.82-5.87,2.83-12.65,4.46-19.84,4.46-1.35,0-2.67-.06-3.99-.16l-12.15,3.99,38.05,124.2,49.12-15.7-37.19-110.97Z\"/><path d=\"M223.93,499.14h27.33v-108.44l-27.33,8.16v100.28Z\"/><path d=\"M339.69,431.15h-21.77v4.76c-5.9-4.08-13.66-6.46-22.61-6.46-24.97,0-37.95,14.44-37.95,35.69s12.98,35.69,37.95,35.69c8.26,0,15.52-2.04,21.08-5.62v5.62h23.37v-24.53c-.06-.52-.09-1.06-.09-1.65v-43.51h.01ZM312.36,476.87c-2.86,2.2-6.92,3.56-12.15,3.56-11.3,0-15.52-6.62-15.52-15.3s4.22-15.3,15.52-15.3c5.22,0,9.27,1.52,12.15,3.9v23.11h0Z\"/><path d=\"M508.55,431.15l-17.22,48.31-17.09-48.31h-42.02l-10.46,32.63-14.33-32.63h-16.04l-14.33,32.63-10.46-32.63h-23.78l21.75,67.98h19.06l15.78-30.1,15.78,30.1h19.06l18.64-58.23,26.19,67.34-1.71,4.07c-1.24,3.13-4.66,4.23-10.1,4.23-1.86,0-4.2-.47-5.9-1.41l-3.41,21.43c2.49.78,8.07,1.25,10.25,1.25,14.28-.31,25.62-3.92,31.67-19.87l34.03-86.79h-25.35Z\"/><path d=\"M147.79,383.16s-2.56-.62-6.12.91c-5.87,2.83-12.63,4.44-19.83,4.44s-13.32-1.46-18.99-4.05c-5.49-2.51-11.91.15-13.85,5.9l-37.01,110.48,49.12,15.7,37.72-123.2c.1-.34,3.07-10.12,8.96-10.16h0Z\"/></g><rect x=\"51.45\" y=\"7.63\" width=\"4\" height=\"4\" fill=\"#0038FF\"/></svg>","dark":"<svg width=\"55.45\" height=\"16\" viewBox=\"0 0 55.45 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" focusable=\"false\" style=\"display:block;flex:none\"><g transform=\"translate(-4.12,-35.13) scale(0.09368000000000001)\" fill=\"#FFFFFF\"><path d=\"M155.69,389.87c-1.95-5.82-8.51-8.47-14.01-5.82-5.87,2.83-12.65,4.46-19.84,4.46-1.35,0-2.67-.06-3.99-.16l-12.15,3.99,38.05,124.2,49.12-15.7-37.19-110.97Z\"/><path d=\"M223.93,499.14h27.33v-108.44l-27.33,8.16v100.28Z\"/><path d=\"M339.69,431.15h-21.77v4.76c-5.9-4.08-13.66-6.46-22.61-6.46-24.97,0-37.95,14.44-37.95,35.69s12.98,35.69,37.95,35.69c8.26,0,15.52-2.04,21.08-5.62v5.62h23.37v-24.53c-.06-.52-.09-1.06-.09-1.65v-43.51h.01ZM312.36,476.87c-2.86,2.2-6.92,3.56-12.15,3.56-11.3,0-15.52-6.62-15.52-15.3s4.22-15.3,15.52-15.3c5.22,0,9.27,1.52,12.15,3.9v23.11h0Z\"/><path d=\"M508.55,431.15l-17.22,48.31-17.09-48.31h-42.02l-10.46,32.63-14.33-32.63h-16.04l-14.33,32.63-10.46-32.63h-23.78l21.75,67.98h19.06l15.78-30.1,15.78,30.1h19.06l18.64-58.23,26.19,67.34-1.71,4.07c-1.24,3.13-4.66,4.23-10.1,4.23-1.86,0-4.2-.47-5.9-1.41l-3.41,21.43c2.49.78,8.07,1.25,10.25,1.25,14.28-.31,25.62-3.92,31.67-19.87l34.03-86.79h-25.35Z\"/><path d=\"M147.79,383.16s-2.56-.62-6.12.91c-5.87,2.83-12.63,4.44-19.83,4.44s-13.32-1.46-18.99-4.05c-5.49-2.51-11.91.15-13.85,5.9l-37.01,110.48,49.12,15.7,37.72-123.2c.1-.34,3.07-10.12,8.96-10.16h0Z\"/></g><rect x=\"51.45\" y=\"7.63\" width=\"4\" height=\"4\" fill=\"#7C92FF\"/></svg>"};
var TEKST = {nl:{locale:"nl-BE",laadt:"Beoordelingen worden geladen…",leeg:"Nog geen beoordelingen. Cliënten die via Lawy contact opnamen, kunnen hun ervaring hier delen.",op5:"op 5",aantal:(n)=>`${n} ${n === 1 ? "beoordeling" : "beoordelingen"}`,schrijf:"Schrijf een beoordeling",alle:"Alle beoordelingen",voorbeeld:"Voorbeeld",demo:"Voorbeeldweergave — er zijn nog geen echte beoordelingen. Deze verdwijnen zodra de eerste echte beoordeling verschijnt.",antwoord:"Antwoord van ",lees:"Lees verder",via:"via",noot:"Beoordelingen zijn gemodereerd en volgen op een aanvraag via Lawy.",geverifieerd:"Geverifieerd profiel",sinds:(j)=>`Aan de balie sinds ${j}`,profiel:"Bekijk het Lawy-profiel van "},fr:{locale:"fr-BE",laadt:"Chargement des avis…",leeg:"Pas encore d'avis. Les clients qui ont pris contact via Lawy peuvent partager leur expérience ici.",op5:"sur 5",aantal:(n)=>`${n} avis`,schrijf:"Rédiger un avis",alle:"Tous les avis",voorbeeld:"Exemple",demo:"Aperçu — il n'y a pas encore de vrais avis. Ces exemples disparaissent dès le premier vrai avis.",antwoord:"Réponse de ",lees:"Lire la suite",via:"via",noot:"Les avis sont modérés et font suite à une demande via Lawy.",geverifieerd:"Profil vérifié",sinds:(j)=>`Au barreau depuis ${j}`,profiel:"Voir le profil Lawy de "},en:{locale:"en-GB",laadt:"Loading reviews…",leeg:"No reviews yet. Clients who got in touch through Lawy can share their experience here.",op5:"out of 5",aantal:(n)=>`${n} ${n === 1 ? "review" : "reviews"}`,schrijf:"Write a review",alle:"All reviews",voorbeeld:"Example",demo:"Preview — there are no real reviews yet. These examples disappear as soon as the first real review appears.",antwoord:"Reply from ",lees:"Read more",via:"via",noot:"Reviews are moderated and follow a request made through Lawy.",geverifieerd:"Verified profile",sinds:(j)=>`At the bar since ${j}`,profiel:"View the Lawy profile of "}};
var VOORBEELD = {"nl":[{"score":5,"tekst":"Duidelijk gesprek, eerlijke inschatting van de kosten vooraf en snel antwoord op mijn vragen. Ik wist op elk moment waar we stonden.","naam":"A. Peeters","datum":"2026-06-12","rechtsgebied":"Familierecht"},{"score":5,"tekst":"Mijn dossier was complexer dan ik dacht. Alles werd rustig uitgelegd, zonder jargon, en de afspraken werden nagekomen.","naam":"M. Janssens","datum":"2026-04-03","rechtsgebied":"Contracten"},{"score":4,"tekst":"Correcte en snelle afhandeling. Het dossier was van de eerste keer volledig, wat maanden scheelde.","naam":"L. Claes","datum":"2026-02-19","rechtsgebied":"Verkeersrecht"}],"fr":[{"score":5,"tekst":"Entretien clair, estimation honnête des frais dès le départ et réponses rapides à mes questions. Je savais à tout moment où nous en étions.","naam":"A. Dubois","datum":"2026-06-12","rechtsgebied":"Droit de la famille"},{"score":5,"tekst":"Mon dossier était plus complexe que je ne le pensais. Tout a été expliqué calmement, sans jargon, et les engagements ont été tenus.","naam":"M. Lambert","datum":"2026-04-03","rechtsgebied":"Contrats"},{"score":4,"tekst":"Traitement correct et rapide. Le dossier était complet du premier coup, ce qui a fait gagner des mois.","naam":"L. Martin","datum":"2026-02-19","rechtsgebied":"Droit de la circulation"}],"en":[{"score":5,"tekst":"Clear conversation, an honest cost estimate up front and quick answers to my questions. I always knew where we stood.","naam":"A. Peeters","datum":"2026-06-12","rechtsgebied":"Family law"},{"score":5,"tekst":"My case was more complex than I thought. Everything was explained calmly, without jargon, and every commitment was kept.","naam":"M. Janssens","datum":"2026-04-03","rechtsgebied":"Contracts"},{"score":4,"tekst":"Correct and fast handling. The file was complete the first time, which saved months.","naam":"L. Claes","datum":"2026-02-19","rechtsgebied":"Traffic law"}]};
var MAX_TEKST = 260;

function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
function komma(n, taal) { return taal === "en" ? String(n) : String(n).replace(".", ","); }
function maand(iso, t, fallback) {
  if (!iso) return fallback || "";
  var d = new Date(iso);
  if (isNaN(d.getTime())) return fallback || "";
  try { return new Intl.DateTimeFormat(t.locale, { month: "long", year: "numeric" }).format(d); } catch (e) { return fallback || ""; }
}
function taalVan(el) {
  var v = (el.getAttribute("data-taal") || "").toLowerCase().slice(0, 2);
  if (!TEKST[v]) v = (document.documentElement.lang || "").toLowerCase().slice(0, 2);
  return TEKST[v] ? v : "nl";
}
/* Kap een lange beoordeling op een woordgrens af en verwijs naar de volledige
   tekst op het profiel: nooit een stille afkapping. */
function kort(tekst, alle, t) {
  if (tekst.length <= MAX_TEKST) return esc(tekst);
  var deel = tekst.slice(0, MAX_TEKST); var sp = deel.lastIndexOf(" ");
  if (sp > MAX_TEKST * 0.6) deel = deel.slice(0, sp);
  return esc(deel.replace(/[\s,;:]+$/, "")) + '\u2026 <a class="lees" href="' + esc(alle) + '" target="_blank" rel="noopener">' + t.lees + "</a>";
}

/* Proxima Nova van de Lawy-origin, één keer per document, twee gewichten. */
function fonts() {
  return; /* demo op GitHub Pages: geen Proxima Nova meegeleverd */
  if (document.getElementById("lawy-widget-fonts")) return;
  var s = document.createElement("style"); s.id = "lawy-widget-fonts";
  s.textContent = "@font-face{font-family:'Lawy Proxima';src:url('" + ORIGIN + "/fonts/ProximaNova-Regular.otf') format('opentype');font-weight:400;font-style:normal;font-display:swap}" +
    "@font-face{font-family:'Lawy Proxima';src:url('" + ORIGIN + "/fonts/ProximaNova-Semibold.ttf') format('truetype');font-weight:600;font-style:normal;font-display:swap}";
  document.head.appendChild(s);
}

function render(root, cfg, data, laadt) {
  var t = TEKST[cfg.taal];
  var adv = (data && data.advocaat) || {};
  var profiel = adv.profiel || (ORIGIN + "/advocaten/" + cfg.slug);
  var beoordelen = adv.beoordelen || (profiel + "/beoordelen");
  var alle = adv.beoordelingen || (profiel + "/beoordelingen");
  var items = (data && data.beoordelingen) || [];
  var aantal = data && data.score ? data.score.aantal : 0;
  var gem = data && data.score ? data.score.gemiddelde : null;
  var demo = false;
  if (!laadt && !items.length && cfg.voorbeeld) {
    demo = true; items = VOORBEELD[cfg.taal]; aantal = items.length;
    gem = Math.round(items.reduce(function (s, r) { return s + r.score; }, 0) / aantal * 10) / 10;
  }
  items = items.slice(0, cfg.max);

  var score = laadt
    ? '<span class="laadt">' + t.laadt + "</span>"
    : aantal
      ? STAR + '<b class="v">' + komma(gem, cfg.taal) + '</b><span class="of">' + t.op5 + '</span><span class="n">' + t.aantal(aantal) + "</span>"
      : '<span class="leeg">' + t.leeg + "</span>";

  /* Vertrouwensregel: alleen feiten die op het profiel staan. */
  var trust = [];
  if (adv.geverifieerd) trust.push('<span class="ok">' + CHECK + t.geverifieerd + "</span>");
  if (adv.balie) trust.push("<span>" + esc(adv.balie) + "</span>");
  if (adv.sinds) trust.push("<span>" + t.sinds(adv.sinds) + "</span>");
  var trustRegel = trust.length && !laadt ? '<p class="trust">' + trust.join("") + "</p>" : "";

  var kop = '<div class="kop"><div class="links"><div class="score">' + score + "</div>" + trustRegel + '</div><div class="acties"><a class="cta" href="' + esc(beoordelen) + '" target="_blank" rel="noopener">' + t.schrijf + "</a>" +
    (aantal && !demo ? '<a class="link" href="' + esc(alle) + '" target="_blank" rel="noopener">' + t.alle + "</a>" : "") + "</div></div>";
  var demoRegel = demo ? '<p class="demo"><span class="tag">' + t.voorbeeld + "</span>" + t.demo + "</p>" : "";
  var lijst = items.length ? '<ol class="lijst">' + items.map(function (r) {
    var wanneer = maand(r.datum, t, r.wanneer);
    return '<li class="item"><p class="rk"><span class="rs">' + STAR + "<b>" + esc(r.score) + "</b></span>" +
      (r.rechtsgebied ? '<span class="chip">' + esc(r.rechtsgebied) + "</span>" : "") +
      (demo ? '<span class="chip chip-demo">' + t.voorbeeld + "</span>" : "") +
      '</p><p class="tekst">' + kort(String(r.tekst || ""), alle, t) + '</p><p class="door">\u2014 ' + esc(r.naam) + (wanneer ? ", " + esc(wanneer) : "") + "</p>" +
      (r.antwoord ? '<p class="antwoord"><b>' + t.antwoord + esc(adv.naam || "") + "</b>" + esc(r.antwoord.tekst) + "</p>" : "") + "</li>";
  }).join("") + "</ol>" : "";
  var voet = '<div class="voet"><a class="via" href="' + esc(profiel) + '" target="_blank" rel="noopener" aria-label="' + t.profiel + esc(adv.naam || "") + '">' + t.via + " " + WORDMARK[cfg.theme] + '</a><p class="noot">' + t.noot + "</p></div>";

  root.innerHTML = "<style>" + CSS + '</style><div class="lb">' + kop + demoRegel + (lijst ? '<div class="regel"></div>' + lijst : "") + '<div class="regel"></div>' + voet + "</div>";
}

function mount(el) {
  if (el.__lawy) return; el.__lawy = true;
  var cfg = {
    slug: el.getAttribute("data-advocaat"),
    theme: el.getAttribute("data-theme") === "dark" ? "dark" : "light",
    taal: taalVan(el),
    voorbeeld: el.getAttribute("data-voorbeeld") === "1",
    max: parseInt(el.getAttribute("data-max") || "3", 10) || 3
  };
  if (!cfg.slug) return;
  el.setAttribute("data-theme", cfg.theme);
  var root = el.attachShadow ? el.attachShadow({ mode: "open" }) : el;
  fonts();
  render(root, cfg, null, true);
  fetch(ORIGIN + "/api/reviews/" + encodeURIComponent(cfg.slug), { headers: { accept: "application/json" } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .catch(function () { return null; })
    .then(function (data) { render(root, cfg, data, false); });
}

function mountAll() {
  var els = document.querySelectorAll("[data-lawy-beoordelingen]");
  for (var i = 0; i < els.length; i++) mount(els[i]);
}

window.__lawyBeoordelingen = { mount: mount, mountAll: mountAll };
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountAll); else mountAll();
})();
