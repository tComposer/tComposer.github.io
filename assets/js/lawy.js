/* Lawy op een kantoorsite — als keurmerk, niet als merk.
 *
 * De site is van de advocaat. Lawy is de dienst waarvoor zij betaalt, voor
 * geloofwaardigheid en groei. Daarom verschijnt Lawy op precies drie plaatsen:
 * de profielkaart met beoordelingen (het zegel), de badge in de voettekst, en
 * één gedempte creditregel waar de intake vertrekt. Alles wat de bezoeker
 * bedient — de vraagmodule, de zwevende knop, de contextuele oproep, de lade —
 * is een onderdeel van háár site, in háár lettertype en kleuren.
 *
 *   <lawy-intake>    twee stappen: onderwerp → urgentie en taal → naar de intake
 *   <lawy-drawer>    zijpaneel (bureaublad) / volledig scherm (mobiel)
 *   <lawy-floating>  knop rechtsonder
 *   <lawy-cta>       contextuele oproep midden in een pagina
 *   <lawy-kaart>     de profielkaart met beoordelingen (iframe)
 *
 * Instellingen uit window.LAWY (gezet door build.mjs uit kantoor.json):
 * basis, slug, contactParam, embedContact, naam, expertise[].
 *
 * Lawy laat alleen /embed/ en /api/badge/ toe in een iframe op een andere
 * site; de intakepagina zelf niet. Daarom opent de intake op Lawy in een nieuw
 * tabblad. Onderwerp, urgentie en taal gaan als parameters mee — vandaag
 * genegeerd, morgen gelezen. Elke Lawy-link wijst naar het profiel of de intake
 * van déze advocaat; nooit naar de startpagina of de zoekfunctie. Nooit
 * suggereren dat iets de advocaat vervangt. */
(function () {
  const C = window.LAWY || {};
  const basis = (C.basis || "https://dejuisteadvocaat.be").replace(/\/$/, "");
  const profielUrl = `${basis}/advocaten/${C.slug}`;
  const kaartUrl = (theme) => `${C.assetsBasis !== undefined && C.assetsBasis !== null ? C.assetsBasis : basis}/embed/advocaat/${C.slug}.html`;
  const contactUrl = (q = {}) => { const p = new URLSearchParams(Object.entries(q).filter(([, v]) => v)); const s = p.toString(); return `${basis}/advocaten/${C.slug}/contact${s ? "?" + s : ""}`; };
  const naamVan = (domein) => (C.expertise || []).find((e) => e.domein === domein)?.naam || "";
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const credit = () => `<p class="lawy-credit-regel">Intake en beoordelingen via <a href="${profielUrl}" rel="noopener">Lawy</a></p>`;

  class LawyDrawer extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <div class="ld-achter" data-sluit></div>
        <aside class="ld-paneel" role="dialog" aria-modal="true" aria-labelledby="ld-titel" tabindex="-1">
          <div class="ld-kop"><div><p class="eyebrow" style="margin:0 0 6px">Uw juridische vraag</p><h2 class="ld-titel" id="ld-titel"></h2></div><button class="ld-sluit" type="button" aria-label="Sluiten" data-sluit>×</button></div>
          <div class="ld-body">
            <p class="ld-uitleg"></p>
            <div class="ld-inhoud"></div>
            <a class="knop" target="_blank" rel="noopener" data-contact>Vertel kort wat er speelt →</a>
            <p class="fijn">De vraag wordt gelezen en beantwoord door ${esc(C.naam || "de advocaat")} zelf.</p>
            ${credit()}
          </div>
        </aside>`;
      this.querySelectorAll("[data-sluit]").forEach((el) => el.addEventListener("click", () => this.sluit()));
      document.addEventListener("keydown", (e) => { if (e.key === "Escape" && this.classList.contains("open")) this.sluit(); });
      this._laatst = null;
    }
    open(q = {}) {
      const naam = naamVan(q.rechtgebied);
      this.querySelector("#ld-titel").textContent = naam ? `Heeft uw vraag betrekking op ${naam.toLowerCase()}?` : "Vertel kort wat er speelt.";
      this.querySelector(".ld-uitleg").textContent = naam
        ? `U leest over ${naam.toLowerCase()}. Op de intakepagina beschrijft u in enkele zinnen uw situatie; het kantoor ziet meteen waarover het gaat.`
        : "Op de intakepagina beschrijft u in enkele zinnen uw situatie. Deel nog geen vertrouwelijke dossierdetails — die bespreekt u in het gesprek.";
      const knop = this.querySelector("[data-contact]"); const inhoud = this.querySelector(".ld-inhoud");
      if (C.embedContact) { inhoud.innerHTML = `<iframe src="${contactUrl(q)}" title="Uw vraag aan ${esc(C.naam || "het kantoor")}"></iframe>`; knop.hidden = true; }
      else { inhoud.innerHTML = `<iframe src="${kaartUrl("light")}" title="Profiel en beoordelingen van ${esc(C.naam || "de advocaat")} op Lawy" loading="lazy"></iframe>`; knop.hidden = false; knop.href = contactUrl(C.contactParam ? q : {}); }
      this._laatst = document.activeElement; this.classList.add("open"); document.body.classList.add("ld-open"); this.querySelector(".ld-paneel").focus();
    }
    sluit() { this.classList.remove("open"); document.body.classList.remove("ld-open"); if (this._laatst && this._laatst.focus) this._laatst.focus(); }
  }

  class LawyIntake extends HTMLElement {
    connectedCallback() {
      const vast = this.dataset.context || ""; const exp = C.expertise || [];
      const keuze = { rechtgebied: vast, urgentie: "", taal: "" };
      this.innerHTML = `
        <div class="li-vak" data-stap="1">
          <p class="li-titel">Waar kunnen we u mee helpen?</p>
          <div class="li-lijn" aria-hidden="true"><span></span></div>
          <div class="li-stap li-stap-1">
            <div class="li-chips" role="group" aria-label="Onderwerp">
              ${exp.map((e) => `<button class="li-chip" type="button" data-k="rechtgebied" data-v="${esc(e.domein)}" aria-pressed="${e.domein === vast ? "true" : "false"}">${esc(e.naam)}</button>`).join("")}
              <button class="li-chip" type="button" data-k="rechtgebied" data-v="" aria-pressed="false">Andere situatie</button>
            </div>
          </div>
          <div class="li-stap li-stap-2" hidden>
            <p class="li-vraag2">Hoe dringend is het?</p>
            <div class="li-chips" role="group" aria-label="Urgentie">
              <button class="li-chip" type="button" data-k="urgentie" data-v="vandaag">Vandaag nog</button>
              <button class="li-chip" type="button" data-k="urgentie" data-v="week">Deze week</button>
              <button class="li-chip" type="button" data-k="urgentie" data-v="geen-haast">Geen haast</button>
            </div>
            <p class="li-vraag2">In welke taal spreekt u het liefst?</p>
            <div class="li-chips" role="group" aria-label="Taal">
              <button class="li-chip" type="button" data-k="taal" data-v="nl">Nederlands</button>
              <button class="li-chip" type="button" data-k="taal" data-v="tr">Türkçe</button>
            </div>
          </div>
          <div class="li-voet">
            <button class="knop" type="button" data-verder>Verder →</button>
            <button class="li-terug" type="button" data-terug hidden>← Onderwerp wijzigen</button>
            ${credit()}
          </div>
        </div>`;
      const vak = this.querySelector(".li-vak"); const s1 = this.querySelector(".li-stap-1"); const s2 = this.querySelector(".li-stap-2");
      const verder = this.querySelector("[data-verder]"); const terug = this.querySelector("[data-terug]");
      this.querySelectorAll(".li-chip").forEach((b) => b.addEventListener("click", () => {
        const k = b.dataset.k; this.querySelectorAll(`.li-chip[data-k="${k}"]`).forEach((x) => x.setAttribute("aria-pressed", "false"));
        b.setAttribute("aria-pressed", "true"); keuze[k] = b.dataset.v;
      }));
      const naarStap = (n) => { vak.dataset.stap = String(n); s1.hidden = n !== 1; s2.hidden = n !== 2; terug.hidden = n !== 2; verder.textContent = n === 1 ? "Verder →" : "Naar de intake →"; };
      verder.addEventListener("click", () => { if (vak.dataset.stap === "1") naarStap(2); else openDrawer(keuze); });
      terug.addEventListener("click", () => naarStap(1));
    }
  }

  class LawyCta extends HTMLElement {
    connectedCallback() {
      const ctx = this.dataset.context || ""; const naam = this.dataset.naam || naamVan(ctx);
      this.innerHTML = `<div class="lc-vak"><span class="lc-tekst">${naam ? `Een vraag over ${esc(naam.toLowerCase())}?` : "Een vraag over dit onderwerp?"}</span><button class="knop knop-licht" type="button">Stel uw vraag →</button></div>`;
      this.querySelector("button").addEventListener("click", () => openDrawer({ rechtgebied: ctx }));
    }
  }
  class LawyFloating extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `<button class="lf-knop" type="button"><span class="lf-std">Juridische vraag?</span><span class="lf-alt">Vertel kort wat er speelt</span></button>`;
      this.querySelector("button").addEventListener("click", () => openDrawer({ rechtgebied: paginaContext() }));
    }
  }
  class LawyKaart extends HTMLElement {
    connectedCallback() {
      const theme = this.dataset.theme || "light";
      this.innerHTML = `<iframe src="${kaartUrl(theme)}" title="Profiel en beoordelingen van ${esc(C.naam || "de advocaat")} op Lawy" loading="lazy"></iframe><p class="fijn"><a href="${profielUrl}" rel="noopener">Alle beoordelingen op Lawy →</a></p>`;
    }
  }


  function paginaContext() { const e = (C.expertise || []).find((x) => x.pad === location.pathname); return e ? e.domein : ""; }
  function openDrawer(q) { const d = document.querySelector("lawy-drawer"); if (d) d.open(q || {}); else window.open(contactUrl(C.contactParam ? q : {}), "_blank", "noopener"); }

  customElements.define("lawy-drawer", LawyDrawer);
  customElements.define("lawy-intake", LawyIntake);
  customElements.define("lawy-cta", LawyCta);
  customElements.define("lawy-floating", LawyFloating);
  customElements.define("lawy-kaart", LawyKaart);
  document.addEventListener("click", (e) => { const b = e.target.closest("[data-lawy-open]"); if (b) { e.preventDefault(); openDrawer({ rechtgebied: b.dataset.context || paginaContext() }); } });
  const m = document.createElement("div"); m.className = "mobiel-cta"; m.innerHTML = `<button class="knop" type="button" data-lawy-open>Stel uw vraag</button>`; document.body.appendChild(m);
})();
