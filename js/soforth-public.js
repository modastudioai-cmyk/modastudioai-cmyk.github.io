/**
 * SOFORTH public Pages behavior.
 * Static port of Stage 2E reveal, intelligence loop, Company Memory accumulation,
 * and Dots / Connections from commit 74d3c2cc3bb246cf5521e54950c8ab39bb22d529.
 * Presentation only. No intake, no network, no chat client.
 */
(function () {
  'use strict';

  var reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function reduced() {
    return reduceQuery.matches;
  }

  function setYear() {
    var year = document.getElementById('s2e-year');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function initReveal() {
    var nodes = document.querySelectorAll('.stage2e-reveal');
    if (!nodes.length) return;

    if (reduced()) {
      nodes.forEach(function (el) {
        el.classList.add('is-in');
      });
      return;
    }

    var pending = [];
    nodes.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add('is-in');
        return;
      }
      pending.push(el);
    });

    if (!pending.length) return;

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );

    pending.forEach(function (el) {
      io.observe(el);
    });
  }

  function initLoop() {
    var root = document.querySelector('[data-stage2e-loop]');
    if (!root) return;
    var steps = Array.prototype.slice.call(root.querySelectorAll('.stage2e-loop-step'));
    var fill = root.querySelector('[data-stage2e-loop-fill]');
    var kicker = root.querySelector('[data-stage2e-loop-kicker]');
    var note = root.querySelector('[data-stage2e-loop-note]');
    if (!steps.length) return;

    function paint(active) {
      steps.forEach(function (step, index) {
        step.setAttribute('data-active', index <= active ? 'true' : 'false');
        step.setAttribute('data-current', index === active ? 'true' : 'false');
      });
      if (fill) fill.style.width = ((active + 1) / steps.length) * 100 + '%';
      var current = steps[active];
      if (current && kicker) kicker.textContent = current.querySelector('.stage2e-loop-label').textContent;
      if (current && note) note.textContent = current.getAttribute('data-note') || '';
    }

    if (reduced()) {
      paint(steps.length - 1);
      return;
    }

    paint(0);

    var started = false;
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || started) return;
          started = true;
          io.disconnect();
          var i = 0;
          paint(0);
          var id = window.setInterval(function () {
            i += 1;
            if (i >= steps.length) {
              window.clearInterval(id);
              paint(steps.length - 1);
              return;
            }
            paint(i);
          }, 700);
        });
      },
      { threshold: 0.25 }
    );
    io.observe(root);
  }

  function initMemory() {
    var root = document.querySelector('[data-stage2e-memory]');
    if (!root) return;
    var chips = Array.prototype.slice.call(root.querySelectorAll('.stage2e-memory-chip'));
    var meta = root.querySelector('[data-stage2e-memory-meta]');
    var list = root.querySelector('.stage2e-memory-accum__list');
    if (!chips.length) return;

    function paint(count) {
      chips.forEach(function (chip, index) {
        var on = index < count;
        chip.classList.toggle('is-in', on);
        chip.setAttribute('data-on', on ? 'true' : 'false');
      });
      if (meta) meta.textContent = 'Context retained · ' + count + ' of ' + chips.length;
    }

    if (reduced()) {
      paint(chips.length);
      return;
    }

    paint(0);
    if (!list) return;

    var io = new IntersectionObserver(
      function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        io.disconnect();
        var n = 0;
        var timer = window.setInterval(function () {
          n += 1;
          paint(n);
          if (n >= chips.length) window.clearInterval(timer);
        }, 220);
      },
      { threshold: 0.3 }
    );
    io.observe(list);
  }

  function initDots() {
    var root = document.querySelector('[data-stage2e-dots]');
    if (!root) return;
    var dots = Array.prototype.slice.call(root.querySelectorAll('.stage2e-dot'));
    var labels = Array.prototype.slice.call(root.querySelectorAll('.stage2e-dot-label'));
    var lines = Array.prototype.slice.call(root.querySelectorAll('line'));
    var phase = root.querySelector('[data-stage2e-dots-phase]');

    function showDots(count) {
      dots.forEach(function (dot, index) {
        dot.classList.toggle('is-in', index < count);
      });
      labels.forEach(function (label, index) {
        label.classList.toggle('is-in', index < count);
      });
    }

    function showLines(count) {
      lines.forEach(function (line, index) {
        line.classList.toggle('is-on', index < count);
      });
    }

    function setPhase(text) {
      if (phase) phase.textContent = text;
    }

    if (reduced()) {
      showDots(dots.length);
      showLines(lines.length);
      setPhase('What looks isolated today may become a pattern tomorrow.');
      return;
    }

    showDots(0);
    showLines(0);
    setPhase('Isolated at first.');

    var io = new IntersectionObserver(
      function (entries) {
        if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
        io.disconnect();
        var n = 0;
        var timer = window.setInterval(function () {
          n += 1;
          showDots(n);
          if (n >= dots.length) {
            window.clearInterval(timer);
            setPhase('Relationships begin to appear.');
            var L = 0;
            timer = window.setInterval(function () {
              L += 1;
              showLines(L);
              if (L >= lines.length) {
                window.clearInterval(timer);
                setPhase('What looks isolated today may become a pattern tomorrow.');
              }
            }, 380);
          }
        }, 480);
      },
      { threshold: 0.35 }
    );
    io.observe(root);
  }

  document.documentElement.classList.add('js-motion');
  setYear();
  initReveal();
  initLoop();
  initMemory();
  initDots();
})();
