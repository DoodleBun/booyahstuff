(function () {
  function ensureStyles() {
    if (document.getElementById("booyah-community-stats-style")) {
      return;
    }

    var style = document.createElement("style");
    style.id = "booyah-community-stats-style";
    style.textContent =
      ".booyah-community-stats{display:flex;gap:0;width:min(760px,calc(100% - 24px));margin:18px auto 34px;border-radius:14px;overflow:hidden;border:1px solid rgba(100,80,180,0.2);font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:rgba(255,255,255,0.04)}" +
      ".booyah-community-stats .booyah-stat-block{flex:1;padding:28px 12px 24px;text-align:center;position:relative}" +
      ".booyah-community-stats .booyah-stat-block+.booyah-stat-block::before{content:'';position:absolute;left:0;top:18%;height:64%;width:1px;background:rgba(255,255,255,0.08)}" +
      ".booyah-community-stats .booyah-stat-number{font-size:46px;font-weight:700;color:#f5a623;line-height:1;margin-bottom:8px;letter-spacing:-1px}" +
      ".booyah-community-stats .booyah-stat-label{font-size:12px;color:rgba(255,255,255,0.42);line-height:1.3}" +
      ".booyah-community-stats .booyah-stat-sublabel{font-size:10px;color:rgba(255,255,255,0.2);margin-top:2px}" +
      "@media (max-width:900px){.booyah-community-stats{margin-inline:12px}}" +
      "@media (max-width:640px){.booyah-community-stats{flex-direction:column}.booyah-community-stats .booyah-stat-number{font-size:36px}.booyah-community-stats .booyah-stat-block+.booyah-stat-block::before{left:18%;top:0;width:64%;height:1px}}";
    document.head.appendChild(style);
  }

  function animateCount(el, target, duration) {
    var start = performance.now();

    function step(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-GB");
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function mountStats(mount) {
    mount.innerHTML =
      '<article class="booyah-stat-block">' +
        '<div class="booyah-stat-number" data-count-to="14">0</div>' +
        '<div class="booyah-stat-label">Artists Worldwide</div>' +
        '<div class="booyah-stat-sublabel">Live community count</div>' +
      "</article>" +
      '<article class="booyah-stat-block">' +
        '<div class="booyah-stat-number" data-count-to="162">0</div>' +
        '<div class="booyah-stat-label">Unique Cards</div>' +
        '<div class="booyah-stat-sublabel">Current card pool</div>' +
      "</article>";

    var statNumbers = mount.querySelectorAll("[data-count-to]");
    var seen = typeof WeakSet === "function" ? new WeakSet() : null;

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        Array.prototype.forEach.call(entries, function (entry, index) {
          if (!entry.isIntersecting) return;
          if (seen && seen.has(entry.target)) return;
          if (seen) seen.add(entry.target);

          var target = Number(entry.target.getAttribute("data-count-to"));
          setTimeout(function () {
            animateCount(entry.target, target, 1400);
          }, index * 160);

          observer.unobserve(entry.target);
        });
      }, { threshold: 0.45 });

      Array.prototype.forEach.call(statNumbers, function (el) {
        observer.observe(el);
      });
    } else {
      Array.prototype.forEach.call(statNumbers, function (el, index) {
        var target = Number(el.getAttribute("data-count-to"));
        setTimeout(function () {
          animateCount(el, target, 1400);
        }, index * 160);
      });
    }
  }

  window.initBooyahCommunityNumbers = function initBooyahCommunityNumbers(options) {
    var config = options || {};
    var existing = document.querySelector(".booyah-community-stats");
    if (existing) {
      return existing;
    }

    ensureStyles();

    var mount = document.createElement("section");
    mount.className = "booyah-community-stats";
    mount.setAttribute("aria-label", "Booyah community numbers");

    var target = config.target;
    if (!target && config.targetId) {
      target = document.getElementById(config.targetId);
    }

    if (target) {
      target.appendChild(mount);
    } else {
      document.body.appendChild(mount);
    }

    mountStats(mount);
    return mount;
  };
}());
