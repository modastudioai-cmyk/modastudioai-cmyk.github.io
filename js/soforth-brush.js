/* The signature brushstroke (25 Nov 2026).
   The light on the wet paint follows the pointer, and the stroke leans
   slightly toward it. Fine pointers with motion only; everyone else
   keeps the slow drifting light from CSS. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (reduce.matches || !fine.matches) return;

  var areas = document.querySelectorAll("[data-brush-area]");
  Array.prototype.forEach.call(areas, function (area) {
    var brush = area.querySelector("[data-brush]");
    if (!brush) return;
    var frame = 0;
    var px = 0.5;
    var py = 0.5;

    function paint() {
      frame = 0;
      var rect = brush.getBoundingClientRect();
      var x = rect.width ? (px - rect.left) / rect.width : 0.5;
      var y = rect.height ? (py - rect.top) / rect.height : 0.5;
      brush.style.setProperty("--px", (x * 100).toFixed(1) + "%");
      brush.style.setProperty("--py", (y * 100).toFixed(1) + "%");
      brush.style.setProperty("--tx", ((x - 0.5) * 14).toFixed(1) + "px");
      brush.style.setProperty("--ty", ((y - 0.5) * 10).toFixed(1) + "px");
    }

    area.addEventListener("pointermove", function (event) {
      px = event.clientX;
      py = event.clientY;
      brush.classList.add("is-pointing");
      if (!frame) frame = window.requestAnimationFrame(paint);
    });
    area.addEventListener("pointerleave", function () {
      brush.classList.remove("is-pointing");
      brush.style.removeProperty("--tx");
      brush.style.removeProperty("--ty");
    });
  });
})();
