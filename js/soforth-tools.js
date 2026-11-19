/* Studio "Inside your workspace" carousel: native horizontal scroll with snap (swipe,
   trackpad, keyboard), plus arrow buttons that move one card. No dependencies. */
(function () {
  var root = document.querySelector("[data-tools]");
  if (!root) return;
  var track = root.querySelector("[data-tools-track]");
  var prev = root.querySelector("[data-tools-prev]");
  var next = root.querySelector("[data-tools-next]");
  if (!track || !prev || !next) return;

  function step() {
    var card = track.querySelector(".tool");
    if (!card) return track.clientWidth;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return card.getBoundingClientRect().width + gap;
  }
  function update() {
    var max = track.scrollWidth - track.clientWidth - 2;
    prev.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= max;
    root.classList.toggle("is-start", prev.disabled);
    root.classList.toggle("is-end", next.disabled);
  }
  prev.addEventListener("click", function () { track.scrollBy({ left: -step(), behavior: "smooth" }); });
  next.addEventListener("click", function () { track.scrollBy({ left: step(), behavior: "smooth" }); });
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
