(function () {
  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));

  function setMenu(open) {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  btn.addEventListener('click', function () {
    setMenu(btn.getAttribute('aria-expanded') !== 'true');
  });

  links.forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); btn.focus(); }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 720) setMenu(false);
  });

  // Highlight the link for the section currently in view
  var sections = links.map(function (a) {
    return document.querySelector(a.getAttribute('href'));
  });

  function setActive() {
    var y = window.scrollY + 120;
    var current = null;
    sections.forEach(function (s, i) {
      if (s && s.offsetTop <= y) current = i;
    });
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
      current = sections.length - 1;
    }
    links.forEach(function (a, i) {
      var on = i === current;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () { setActive(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });
  setActive();

  // Back to top: scroll to the real top of the page
  var toTop = document.querySelector('a[href="#top"]');
  if (toTop) {
    toTop.addEventListener('click', function (e) {
      e.preventDefault();
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      if (history.replaceState) history.replaceState(null, '', window.location.pathname);
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();
})();
