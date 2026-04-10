// Booyah! Header — initialisation
// Teleports the header elements to the top of <body> so that
// position:fixed is anchored to the real browser viewport,
// not Carrd's nested container.

(function () {

  // ── Grab elements ──────────────────────────────────────────
  var bar     = document.querySelector('.bh-bar');
  var spacer  = document.querySelector('.bh-spacer');
  var overlay = document.getElementById('bhOverlay');
  var drawer  = document.getElementById('bhDrawer');
  var burger  = document.getElementById('bhBurger');
  var close   = document.getElementById('bhClose');

  // ── Move to top of <body> ──────────────────────────────────
  // Insert in reverse order so they end up in the right sequence
  // at the top: bar → spacer → overlay → drawer
  document.body.insertBefore(drawer,  document.body.firstChild);
  document.body.insertBefore(overlay, document.body.firstChild);
  document.body.insertBefore(spacer,  document.body.firstChild);
  document.body.insertBefore(bar,     document.body.firstChild);

  // Move any inline <style> blocks into <head> so they apply globally
  document.querySelectorAll('style').forEach(function (style) {
    document.head.appendChild(style);
  });

  // ── Drawer logic ───────────────────────────────────────────
  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  burger.addEventListener('click', openDrawer);
  close.addEventListener('click', closeDrawer);
  overlay.addEventListener('click', closeDrawer);

  // Close drawer when any nav link is tapped
  drawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

})();
