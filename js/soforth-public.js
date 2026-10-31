(function () {
      var world = document.getElementById("world");
      var guide = document.getElementById("guide");
      var guideName = document.getElementById("guide-name");
      var guideCount = document.getElementById("guide-count");
      var guideRoom = document.getElementById("guide-room");
      var guideLinks = document.querySelectorAll("[data-guide-link]");
      var names = { entrance: "Entrance", studio: "The Studio", partnership: "Partnership" };
      var counts = { entrance: "01", studio: "02", partnership: "03" };
      var steps = { entrance: "1", studio: "2", partnership: "3" };
      var pairs = {
        entrance: [["#studio", "The Studio is next"], ["#partnership", "Partnership"]],
        studio: [["#entrance", "Entrance"], ["#partnership", "Partnership is next"]],
        partnership: [["#studio", "The Studio"], ["#entrance", "Entrance"]]
      };
      var seen = { entrance: 0, studio: 0, partnership: 0 };
      var current = "";
      var lock = false;

      function reduced() {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }

      function setGuide(id) {
        if (!pairs[id] || id === current) return;
        current = id;
        guide.dataset.step = steps[id];
        guideCount.textContent = counts[id];
        guideName.textContent = names[id];
        guideLinks[0].setAttribute("href", pairs[id][0][0]);
        guideLinks[0].textContent = pairs[id][0][1];
        guideLinks[1].setAttribute("href", pairs[id][1][0]);
        guideLinks[1].textContent = pairs[id][1][1];
        var room = document.getElementById(id);
        room.classList.remove("is-arriving");
        window.requestAnimationFrame(function () {
          room.classList.add("is-arriving");
        });
      }

      function scrollToRoom(id) {
        lock = true;
        setGuide(id);
        var behavior = reduced() ? "auto" : "smooth";
        if (id === "entrance") world.scrollTo({ top: 0, behavior: behavior });
        else document.getElementById(id).scrollIntoView({ behavior: behavior, block: "start" });
        window.setTimeout(function () { lock = false; }, reduced() ? 40 : 850);
      }

      function focusGuide() {
        guideRoom.focus({ preventScroll: true });
      }

      window.addEventListener("hashchange", function () {
        var id = location.hash.replace("#", "") || "entrance";
        if (!pairs[id]) return;
        scrollToRoom(id);
        window.setTimeout(focusGuide, 0);
      });

      document.addEventListener("click", function (event) {
        var link = event.target.closest("a[href^='#']");
        if (!link) return;
        var id = link.getAttribute("href").slice(1);
        if (!pairs[id]) return;
        window.setTimeout(focusGuide, 0);
      });

      function keepsArrowKeys(target) {
        if (!target || !target.closest) return false;
        if (target.closest("input, textarea, select, [contenteditable='true']")) return true;
        var named = target.closest("[role]");
        if (!named) return false;
        var role = named.getAttribute("role");
        return role === "slider" || role === "spinbutton" || role === "listbox" || role === "option" || role === "menu" || role === "menuitem" || role === "combobox" || role === "textbox";
      }

      document.addEventListener("keydown", function (event) {
        var target = event.target;
        var behavior = reduced() ? "auto" : "smooth";
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          if (keepsArrowKeys(target)) return;
          event.preventDefault();
          world.scrollBy({ top: event.key === "ArrowDown" ? 56 : -56, behavior: behavior });
          return;
        }
        if (target.closest && target.closest("a, button, input, textarea, select")) return;
        if (event.key === "Home") {
          event.preventDefault();
          world.scrollTo({ top: 0, behavior: behavior });
        } else if (event.key === "End") {
          event.preventDefault();
          world.scrollTo({ top: world.scrollHeight, behavior: behavior });
        } else if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault();
          world.scrollBy({ top: (event.shiftKey ? -1 : 1) * world.clientHeight * 0.86, behavior: behavior });
        } else if (event.key === "PageDown" || event.key === "PageUp") {
          event.preventDefault();
          world.scrollBy({ top: (event.key === "PageDown" ? 1 : -1) * world.clientHeight * 0.86, behavior: behavior });
        }
      });

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          seen[entry.target.id] = entry.isIntersecting ? entry.intersectionRect.height : 0;
        });
        if (lock) return;
        var best = "";
        var height = 0;
        Object.keys(seen).forEach(function (id) {
          if (seen[id] > height) {
            height = seen[id];
            best = id;
          }
        });
        if (best) setGuide(best);
      }, { root: world, threshold: [0, 0.15, 0.35, 0.55, 0.75, 1] });

      Object.keys(pairs).forEach(function (id) {
        observer.observe(document.getElementById(id));
      });

      var opening = location.hash.replace("#", "");
      if (pairs[opening]) {
        document.getElementById(opening).scrollIntoView({ behavior: "auto", block: "start" });
        setGuide(opening);
      }
    })();
