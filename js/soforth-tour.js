/* Studio "Inside your workspace": one slide at a time. Native scroll-snap (swipe, trackpad,
   keyboard) plus arrows, dots and a count. No dependencies. */
(function () {
  var root = document.querySelector("[data-tour]");
  if (!root) return;
  var track = root.querySelector("[data-tour-track]");
  var slides = track ? track.querySelectorAll(".tour__slide") : [];
  var prev = root.querySelector("[data-tour-prev]");
  var next = root.querySelector("[data-tour-next]");
  var count = root.querySelector("[data-tour-count]");
  var dotsBox = root.querySelector("[data-tour-dots]");
  if (!track || !slides.length) return;

  var dots = [];
  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tour__dot";
    b.setAttribute("aria-label", "Go to slide " + (i + 1));
    b.addEventListener("click", function () { go(i); });
    dotsBox.appendChild(b);
    dots.push(b);
  });
  dotsBox.removeAttribute("aria-hidden");

  // The slide we are on or heading to (so quick taps don't read a half-finished scroll).
  var current = 0;
  function index() {
    return current;
  }
  function go(i) {
    current = Math.max(0, Math.min(slides.length - 1, i));
    track.scrollTo({ left: current * track.clientWidth, behavior: "smooth" });
    update();
  }
  function settle() {
    current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    update();
  }
  function update() {
    var i = current;
    if (count) count.textContent = i + 1 + " / " + slides.length;
    prev.disabled = i <= 0;
    next.disabled = i >= slides.length - 1;
    dots.forEach(function (d, k) { d.classList.toggle("is-on", k === i); d.setAttribute("aria-current", k === i ? "true" : "false"); });
  }
  prev.addEventListener("click", function () { go(index() - 1); });
  next.addEventListener("click", function () { go(index() + 1); });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); go(index() + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(index() - 1); }
  });
  var t;
  track.addEventListener("scroll", function () { clearTimeout(t); t = setTimeout(settle, 120); }, { passive: true });
  window.addEventListener("resize", function () { track.scrollLeft = current * track.clientWidth; });
  update();
})();
