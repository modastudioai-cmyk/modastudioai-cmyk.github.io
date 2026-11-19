/* Studio "See it" section: as each reason scrolls past, it lights up its part of the
   example reply; the post-to-booking line draws as you scroll. Uses GSAP ScrollTrigger
   (self-hosted in /js/vendor). Without GSAP, or with reduced motion, everything stays
   visible and highlighted. */
(function () {
  var section = document.querySelector("[data-learn]");
  var learn = section && section.closest(".learn");
  if (!learn) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia("print").matches) return;

  var gsap = window.gsap;
  gsap.registerPlugin(window.ScrollTrigger);
  learn.classList.add("is-live");

  var steps = learn.querySelectorAll(".learn__why li[data-step]");
  var phone = learn.querySelector(".learn__phone");
  function light(n) {
    steps.forEach(function (li) { li.classList.toggle("is-on", Number(li.dataset.step) <= n); });
    learn.querySelectorAll(".learn__hl").forEach(function (el) {
      el.classList.toggle("is-on", Number(el.dataset.hl) <= n);
    });
  }

  var mm = gsap.matchMedia();
  mm.add("(min-width: 900px)", function () {
    // Desktop: the phone holds still while the three reasons pass.
    window.ScrollTrigger.create({
      trigger: section,
      start: "top 18%",
      end: "bottom 62%",
      pin: phone,
      pinSpacing: false,
    });
    var line = learn.querySelector(".learn__line span");
    if (line) {
      gsap.fromTo(line, { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: ".learn__path", start: "top 80%", end: "bottom 55%", scrub: 0.6 },
      });
    }
  });

  steps.forEach(function (li) {
    window.ScrollTrigger.create({
      trigger: li,
      start: "top 62%",
      onEnter: function () { light(Number(li.dataset.step)); },
      onLeaveBack: function () { light(Number(li.dataset.step) - 1); },
    });
  });
  light(0);
  window.addEventListener("beforeprint", function () { light(3); });
})();
