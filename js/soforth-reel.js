/* Studio reel (a lit screen cutting through the brand) and the brush thread
   (one orange stroke that travels down the page with the reader). No dependencies. */
(function () {
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ── Reel ── */
  var screen = document.querySelector("[data-reel]");
  var stage = document.querySelector("[data-reel-stage]");
  var reelSection = document.getElementById("reel");
  if (screen && stage) {
    var frames = Array.prototype.slice.call(screen.querySelectorAll(".reel__frame"));
    var i = 0;
    var timer = null;
    var visible = false;

    var show = function (n) {
      frames.forEach(function (f, j) { f.classList.toggle("is-on", j === n); });
      stage.style.setProperty("--glow", frames[n].getAttribute("data-glow") || "#efe8dc");
    };
    var tick = function () {
      timer = null;
      if (!visible) return;
      i = (i + 1) % frames.length;
      show(i);
      timer = setTimeout(tick, Number(frames[i].getAttribute("data-hold")) || 1200);
    };

    if (reduce) {
      show(frames.length - 1); // the signature frame, still
    } else if ("IntersectionObserver" in window) {
      show(0);
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        if (visible && !timer) timer = setTimeout(tick, Number(frames[i].getAttribute("data-hold")) || 1200);
        if (!visible && timer) { clearTimeout(timer); timer = null; }
      }, { threshold: 0.35 }).observe(stage);
    } else {
      show(frames.length - 1);
    }
  }

  /* ── Brush thread ── */
  var brush = document.querySelector("[data-brush-thread]");
  if (!brush || reduce) return;
  var landing = document.querySelector(".expression--close");
  var dim = 0; // 0..1, how much to step back (over the reel, or once it has landed)
  var raf = 0;

  var place = function () {
    raf = 0;
    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var max = Math.max(1, document.documentElement.scrollHeight - vh);
    var p = Math.min(1, Math.max(0, window.scrollY / max));
    var w = brush.offsetWidth;
    var h = brush.offsetHeight;
    var narrow = vw < 700;
    // Weave between the margins, slowly, as the reader moves down the page.
    var phase = p * Math.PI * 2.6 - Math.PI / 2;
    var cx = narrow ? 0.9 + 0.08 * Math.sin(phase) : 0.5 + 0.4 * Math.sin(phase);
    var cy = 0.22 + 0.5 * (0.5 + 0.5 * Math.sin(p * Math.PI * 3.4));
    var slope = Math.cos(phase); // direction of travel
    var x = cx * vw - w / 2;
    var y = cy * vh - h / 2;
    var rot = -8 + slope * 14;
    var flip = slope < 0 ? -1 : 1;
    brush.style.transform = "translate3d(" + x.toFixed(1) + "px," + y.toFixed(1) + "px,0) rotate(" + rot.toFixed(2) + "deg) scaleX(" + flip + ")";
    brush.style.opacity = String(((narrow ? 0.8 : 0.92) * (1 - dim)).toFixed(3));
  };
  var queue = function () { if (!raf) raf = requestAnimationFrame(place); };

  if ("IntersectionObserver" in window) {
    var reelOn = false;
    var landed = false;
    var update = function () { dim = landed || reelOn ? 1 : 0; queue(); };
    if (reelSection) new IntersectionObserver(function (e) { reelOn = e[0].intersectionRatio > 0.45; update(); }, { threshold: [0, 0.45, 1] }).observe(reelSection);
    if (landing) new IntersectionObserver(function (e) { landed = e[0].isIntersecting; update(); }, { threshold: 0.25 }).observe(landing);
  }

  // Paint it in on arrival, then let it travel.
  brush.style.clipPath = "inset(0 100% 0 0)";
  var start = function () {
    place();
    brush.classList.add("is-live");
    brush.style.transition = "opacity 0.6s ease, clip-path 1.4s cubic-bezier(.6,0,.2,1)";
    requestAnimationFrame(function () { brush.style.clipPath = "inset(0 0% 0 0)"; });
    setTimeout(function () { brush.style.transition = "opacity 0.6s ease"; brush.style.clipPath = ""; }, 1500);
  };
  if (brush.complete) start(); else brush.addEventListener("load", start, { once: true });
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", queue);
})();
