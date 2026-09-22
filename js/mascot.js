(function () {
  "use strict";

  var DIRECTIONS = [
    "up-left",
    "up",
    "up-right",
    "left",
    "center",
    "right",
    "down-left",
    "down",
    "down-right",
  ];

  var REACTIONS = [
    "blink",
    "heart",
    "sparkle",
    "surprised",
    "wink",
    "bashful",
    "sleepy",
    "dizzy",
    "delighted",
  ];

  var CLOCKWISE = [
    "right",
    "down-right",
    "down",
    "down-left",
    "left",
    "up-left",
    "up",
    "up-right",
  ];

  var SECTOR = (Math.PI * 2) / CLOCKWISE.length;
  var HYSTERESIS = 0.12;
  var DEAD_ZONE = 70;
  var PAYOFFS = ["heart", "sparkle", "delighted"];
  var BOOP_PAYOFF = 120;
  var BOOP_END = 560;
  var SQUASH_MS = 420;
  var DIZZY_AFTER = 4;
  var DIZZY_WINDOW = 1600;
  var DIZZY_END = 1100;

  var SQUASH = [
    { transform: "scale(1, 1)", easing: "ease-in" },
    { transform: "scale(1.10, 0.86)", offset: 0.18, easing: "ease-out" },
    { transform: "scale(0.95, 1.08)", offset: 0.45, easing: "ease-in-out" },
    { transform: "scale(1.03, 0.97)", offset: 0.72, easing: "ease-in-out" },
    { transform: "scale(1, 1)" },
  ];

  function wrap(angle) {
    return Math.atan2(Math.sin(angle), Math.cos(angle));
  }

  function cellStyle(index) {
    return (index % 3) * 50 + "% " + Math.floor(index / 3) * 50 + "%";
  }

  function mountMascot(root) {
    if (!root) return;

    var directions = root.getAttribute("data-directions");
    var reactions = root.getAttribute("data-reactions");
    var size = Number(root.getAttribute("data-size") || 140);
    var label = root.getAttribute("data-label") || "mascot";

    if (!directions || !reactions) return;

    var button = document.createElement("button");
    button.type = "button";
    button.className = "page-mascot";
    button.setAttribute("aria-label", "Boop the " + label);
    button.style.cssText =
      "position:relative;display:block;flex-shrink:0;width:" +
      size +
      "px;height:" +
      size +
      "px;padding:0;border:0;background:transparent;appearance:none;cursor:pointer;user-select:none;";

    var squash = document.createElement("span");
    squash.className = "page-mascot__squash";
    squash.style.cssText =
      "position:relative;display:block;width:100%;height:100%;transform-origin:50% 78%;";

    var dirLayer = document.createElement("span");
    dirLayer.className = "page-mascot__layer page-mascot__layer--dir";
    dirLayer.style.cssText =
      "position:absolute;inset:0;background-size:300% 300%;background-repeat:no-repeat;background-image:url(" +
      directions +
      ");";

    var reactLayer = document.createElement("span");
    reactLayer.className = "page-mascot__layer page-mascot__layer--react";
    reactLayer.style.cssText =
      "position:absolute;inset:0;background-size:300% 300%;background-repeat:no-repeat;background-image:url(" +
      reactions +
      ");opacity:0;";

    squash.appendChild(dirLayer);
    squash.appendChild(reactLayer);
    button.appendChild(squash);
    root.appendChild(button);

    var direction = "center";
    var reaction = null;
    var timers = [];
    var boops = { count: 0, at: 0 };
    var sector = -1;
    var pointer = null;

    function paint() {
      dirLayer.style.backgroundPosition = cellStyle(DIRECTIONS.indexOf(direction));
      dirLayer.style.opacity = reaction ? "0" : "1";
      reactLayer.style.backgroundPosition = cellStyle(
        REACTIONS.indexOf(reaction || "blink")
      );
      reactLayer.style.opacity = reaction ? "1" : "0";
    }

    function aim() {
      if (!pointer) return;
      var box = button.getBoundingClientRect();
      var dx = pointer.x - (box.left + box.width / 2);
      var dy = pointer.y - (box.top + box.height / 2);

      if (Math.hypot(dx, dy) < DEAD_ZONE) {
        sector = -1;
        direction = "center";
        paint();
        return;
      }

      var angle = Math.atan2(dy, dx);
      if (
        sector !== -1 &&
        Math.abs(wrap(angle - sector * SECTOR)) < SECTOR / 2 + HYSTERESIS
      ) {
        return;
      }

      sector =
        (Math.round(angle / SECTOR) + CLOCKWISE.length) % CLOCKWISE.length;
      direction = CLOCKWISE[sector];
      paint();
    }

    function clearTimers() {
      timers.forEach(window.clearTimeout);
      timers = [];
    }

    function later(ms, next) {
      timers.push(
        window.setTimeout(function () {
          reaction = next;
          paint();
        }, ms)
      );
    }

    function boop() {
      clearTimers();
      var now = Date.now();
      boops.count = now - boops.at < DIZZY_WINDOW ? boops.count + 1 : 1;
      boops.at = now;

      if (boops.count >= DIZZY_AFTER) {
        boops.count = 0;
        reaction = "dizzy";
        paint();
        later(DIZZY_END, null);
      } else {
        reaction = "blink";
        paint();
        later(BOOP_PAYOFF, PAYOFFS[(boops.count - 1) % PAYOFFS.length]);
        later(BOOP_END, null);
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }
      if (squash.animate) {
        squash.animate(SQUASH, { duration: SQUASH_MS, easing: "linear" });
      }
    }

    paint();

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener(
        "pointermove",
        function (event) {
          pointer = { x: event.clientX, y: event.clientY };
          aim();
        },
        { passive: true }
      );
      window.addEventListener("scroll", aim, { passive: true });
    }

    button.addEventListener("click", boop);
  }

  document.querySelectorAll("[data-page-mascot]").forEach(mountMascot);
})();
