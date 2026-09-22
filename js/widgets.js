(function () {
  "use strict";

  var widget = document.getElementById("fab-widget");
  if (!widget) return;

  var toggle = document.getElementById("fab-toggle");
  var menu = document.getElementById("fab-menu");
  var panel = document.getElementById("fab-panel");
  var tooltip = document.getElementById("fab-tooltip");
  var botPanel = document.getElementById("fab-bot-panel");
  var chatPanel = document.getElementById("fab-chat-panel");
  var messagesEl = document.getElementById("fab-bot-messages");
  var optionsEl = document.getElementById("fab-bot-options");
  var botForm = document.getElementById("fab-bot-form");
  var botInput = document.getElementById("fab-bot-input");
  var resetBtn = document.getElementById("fab-bot-reset");

  var state = {
    menuOpen: false,
    botOpen: false,
    chatOpen: false,
    dragging: false,
    wasDragged: false,
    pos: { x: 0, y: 0 },
    typing: false,
  };

  var drag = null;

  function t(key, fallback) {
    var lang = document.documentElement.lang === "en" ? "en" : "vi";
    try {
      var dict =
        window.__PORTFOLIO_I18N && window.__PORTFOLIO_I18N[lang]
          ? window.__PORTFOLIO_I18N[lang]
          : null;
      if (dict && dict[key]) return dict[key];
    } catch (e) {}
    var el = document.querySelector('[data-i18n="' + key + '"]');
    if (el && el.textContent.trim()) return el.textContent.trim();
    return fallback || key;
  }

  function script() {
    return {
      welcome: {
        text: t(
          "fab.botWelcome",
          "Xin chào! Mình có thể giúp bạn tìm hiểu về kỹ năng, kinh nghiệm và dự án của Bảo."
        ),
        options: [
          { label: t("fab.optSkills", "Kỹ năng"), trigger: "skills" },
          { label: t("fab.optExp", "Kinh nghiệm"), trigger: "exp" },
          { label: t("fab.optProjects", "Dự án"), trigger: "projects" },
          { label: t("fab.optContact", "Liên hệ"), trigger: "contact" },
        ],
      },
      skills: {
        text: t(
          "fab.replySkills",
          "Bảo làm Backend / Full-stack với ASP.NET Core, Spring Boot, SQL và các stack web hiện đại."
        ),
      },
      exp: {
        text: t(
          "fab.replyExp",
          "Có kinh nghiệm thực tập tại FPT Software và các dự án cá nhân / học thuật."
        ),
      },
      projects: {
        text: t(
          "fab.replyProjects",
          "Xem phần Projects phía dưới để xem các sản phẩm nổi bật, hoặc hỏi mình chi tiết hơn."
        ),
      },
      contact: {
        text: t(
          "fab.replyContact",
          "Bạn có thể gửi email huynhnguyenbao3105@gmail.com hoặc nhắn Zalo 0939 082 419."
        ),
      },
      fallback: {
        text: t(
          "fab.botFallback",
          "Cảm ơn câu hỏi! Đây là bản demo UI — hãy dùng các gợi ý bên dưới hoặc cuộn xem portfolio."
        ),
      },
    };
  }

  function isOpen() {
    return state.menuOpen || state.botOpen || state.chatOpen;
  }

  function applyTransform() {
    widget.style.transform =
      "translate(" + state.pos.x + "px, " + state.pos.y + "px)";
    widget.style.transition = state.dragging
      ? "none"
      : "transform 300ms ease-out";
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.classList.remove("is-visible");
    tooltip.hidden = true;
  }

  function syncOpenClasses() {
    widget.classList.toggle("is-open", isOpen());
    widget.classList.toggle("is-menu-open", state.menuOpen);
    widget.classList.toggle(
      "is-panel-open",
      state.botOpen || state.chatOpen
    );
    toggle.setAttribute("aria-expanded", isOpen() ? "true" : "false");
    menu.setAttribute("aria-hidden", state.menuOpen ? "false" : "true");
    panel.setAttribute(
      "aria-hidden",
      state.botOpen || state.chatOpen ? "false" : "true"
    );

    if (botPanel) botPanel.hidden = !state.botOpen;
    if (chatPanel) chatPanel.hidden = !state.chatOpen;

    if (isOpen()) hideTooltip();
  }

  function closeAll() {
    state.menuOpen = false;
    state.botOpen = false;
    state.chatOpen = false;
    syncOpenClasses();
    window.setTimeout(function () {
      if (!isOpen()) {
        state.pos = { x: 0, y: 0 };
        applyTransform();
      }
    }, 300);
  }

  function openMenu() {
    state.botOpen = false;
    state.chatOpen = false;
    state.menuOpen = true;
    syncOpenClasses();
  }

  function openBot() {
    state.menuOpen = false;
    state.chatOpen = false;
    state.botOpen = true;
    syncOpenClasses();
    ensureWelcome();
  }

  function openChat() {
    state.menuOpen = false;
    state.botOpen = false;
    state.chatOpen = true;
    syncOpenClasses();
  }

  function formatTime(date) {
    try {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "";
    }
  }

  function appendMessage(sender, text) {
    if (!messagesEl) return;
    var row = document.createElement("div");
    row.className =
      "fab-msg " + (sender === "user" ? "fab-msg--user" : "fab-msg--bot");

    var avatar = document.createElement("div");
    avatar.className = "fab-msg__avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.innerHTML =
      sender === "bot"
        ? '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>'
        : '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

    var col = document.createElement("div");
    var bubble = document.createElement("div");
    bubble.className = "fab-msg__bubble";
    bubble.textContent = text;
    var meta = document.createElement("div");
    meta.className = "fab-msg__meta";
    meta.textContent = formatTime(new Date());
    col.appendChild(bubble);
    col.appendChild(meta);

    if (sender === "user") {
      row.appendChild(col);
      row.appendChild(avatar);
    } else {
      row.appendChild(avatar);
      row.appendChild(col);
    }

    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function setOptions(options) {
    if (!optionsEl) return;
    optionsEl.innerHTML = "";
    (options || []).forEach(function (opt) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fab-opt";
      btn.textContent = opt.label;
      btn.addEventListener("click", function () {
        handleUserText(opt.label, opt.trigger);
      });
      optionsEl.appendChild(btn);
    });
  }

  function showTyping(show) {
    state.typing = show;
    if (!messagesEl) return;
    var existing = messagesEl.querySelector(".fab-typing");
    if (existing) existing.remove();
    if (!show) return;
    var row = document.createElement("div");
    row.className = "fab-typing";
    row.innerHTML =
      '<div class="fab-msg__avatar" aria-hidden="true"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg></div><div class="fab-typing__dots"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(row);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function botReply(nodeKey) {
    var nodes = script();
    var node = nodes[nodeKey] || nodes.fallback;
    showTyping(true);
    window.setTimeout(function () {
      showTyping(false);
      appendMessage("bot", node.text);
      setOptions(node.options || nodes.welcome.options);
    }, 450);
  }

  function handleUserText(text, trigger) {
    if (!text || state.typing) return;
    appendMessage("user", text);
    setOptions([]);
    if (botInput) botInput.value = "";
    botReply(trigger || "fallback");
  }

  function ensureWelcome() {
    if (!messagesEl) return;
    if (messagesEl.children.length > 0) return;
    var welcome = script().welcome;
    appendMessage("bot", welcome.text);
    setOptions(welcome.options);
  }

  function resetBot() {
    if (messagesEl) messagesEl.innerHTML = "";
    setOptions([]);
    ensureWelcome();
  }

  function beginDrag(clientX, clientY) {
    state.dragging = true;
    widget.classList.add("is-dragging");
    drag = {
      startX: clientX,
      startY: clientY,
      initialX: state.pos.x,
      initialY: state.pos.y,
      moved: false,
    };
  }

  function applyDrag(clientX, clientY) {
    if (!drag) return;
    var dx = clientX - drag.startX;
    var dy = clientY - drag.startY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) drag.moved = true;

    var margin = 24;
    var fabSize = 56;
    var minX = -(window.innerWidth - margin - fabSize);
    var maxX = 0;
    var minY = -(window.innerHeight - margin - fabSize - 80);
    var maxY = 0;

    state.pos.x = Math.max(minX, Math.min(drag.initialX + dx, maxX));
    state.pos.y = Math.max(minY, Math.min(drag.initialY + dy, maxY));
    applyTransform();
  }

  function endDrag() {
    if (!drag) return;
    state.dragging = false;
    widget.classList.remove("is-dragging");
    if (drag.moved) {
      state.wasDragged = true;
      window.setTimeout(function () {
        state.wasDragged = false;
      }, 100);
    }
    drag = null;
  }

  toggle.addEventListener("click", function (e) {
    if (state.wasDragged) {
      e.preventDefault();
      return;
    }
    if (state.botOpen || state.chatOpen) {
      closeAll();
    } else if (state.menuOpen) {
      closeAll();
    } else {
      openMenu();
    }
  });

  toggle.addEventListener("mousedown", function (e) {
    if (e.button !== 0) return;
    beginDrag(e.clientX, e.clientY);
  });

  toggle.addEventListener(
    "touchstart",
    function (e) {
      var touch = e.touches[0];
      if (!touch) return;
      beginDrag(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  toggle.addEventListener("mouseenter", function () {
    if (isOpen()) return;
    tooltip.hidden = false;
    requestAnimationFrame(function () {
      if (isOpen()) return;
      tooltip.classList.add("is-visible");
    });
  });

  toggle.addEventListener("mouseleave", function () {
    hideTooltip();
  });

  window.addEventListener("mousemove", function (e) {
    if (!state.dragging) return;
    applyDrag(e.clientX, e.clientY);
  });

  window.addEventListener(
    "touchmove",
    function (e) {
      if (!state.dragging || !e.touches[0]) return;
      e.preventDefault();
      applyDrag(e.touches[0].clientX, e.touches[0].clientY);
    },
    { passive: false }
  );

  window.addEventListener("mouseup", endDrag);
  window.addEventListener("touchend", endDrag);
  window.addEventListener("touchcancel", endDrag);

  document.addEventListener("mousedown", function (e) {
    if (!isOpen()) return;
    if (widget.contains(e.target)) return;
    closeAll();
  });

  widget.querySelectorAll("[data-fab-action]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var action = btn.getAttribute("data-fab-action");
      if (action === "scroll") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        closeAll();
      } else if (action === "bot") {
        openBot();
      } else if (action === "chat") {
        openChat();
      }
    });
  });

  widget.querySelectorAll("[data-fab-close]").forEach(function (btn) {
    btn.addEventListener("click", closeAll);
  });

  if (botForm) {
    botForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = (botInput && botInput.value ? botInput.value : "").trim();
      if (!value) return;
      handleUserText(value, "fallback");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetBot);
  }

  window.addEventListener("portfolio:lang", function () {
    if (state.botOpen && messagesEl && messagesEl.children.length) {
      resetBot();
    }
  });

  applyTransform();
  syncOpenClasses();
})();
