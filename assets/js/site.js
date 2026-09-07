/* Sitegedrag: navigatie op mobiel, vervaging van de kop bij scrollen, en een
   rustige onthulling van secties. Alles werkt ook zonder JavaScript.

   De onthulling is opzettelijk voorzichtig: alleen wat bij het laden ónder de
   vouw staat, begint onzichtbaar; wat in beeld is, staat er meteen. En na
   anderhalve seconde wordt alles hoe dan ook getoond, zodat een haperende
   waarnemer nooit een lege sectie kan achterlaten. */
(function () {
  const kop = document.getElementById("kop");
  const knop = document.getElementById("nav-knop");
  const lijst = document.getElementById("nav-lijst");
  const zetMenu = (open) => {
    if (!knop || !lijst) return;
    lijst.classList.toggle("open", open); knop.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open); kop && kop.classList.toggle("menu-open", open);
    if (open) { const eerste = lijst.querySelector("a"); eerste && eerste.focus(); } else knop.focus();
  };
  if (knop && lijst) {
    knop.addEventListener("click", () => zetMenu(!lijst.classList.contains("open")));
    lijst.addEventListener("click", (e) => { if (e.target.closest("a, button")) zetMenu(false); });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape" && lijst.classList.contains("open")) zetMenu(false); });
    window.matchMedia("(min-width: 64.01em)").addEventListener("change", (e) => { if (e.matches) zetMenu(false); });
  }
  const scrol = () => kop && kop.classList.toggle("gescrold", window.scrollY > 8);
  scrol(); window.addEventListener("scroll", scrol, { passive: true });

  const stil = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (stil || !("IntersectionObserver" in window)) return;
  const doelen = [...document.querySelectorAll("main > section, main > .hero, main > .hero-kader, main > .muur, main > article")]
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.9);
  const toon = (el) => el.classList.add("zichtbaar");
  doelen.forEach((el) => el.classList.add("onthul"));
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { toon(e.target); io.unobserve(e.target); } }), { rootMargin: "0px 0px -6% 0px", threshold: 0.05 });
  doelen.forEach((el) => io.observe(el));
  setTimeout(() => doelen.forEach(toon), 1500);
})();
