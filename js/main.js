/* Panificio Sanna dal 1976 — main.js
   PLUMBING_V 1 (da Agenzia/Toolkit/boilerplate) + codice-firma: le linee
   "carta da musica" (carasau) che si disegnano allo scroll. GSAP SUBITO;
   reveal once; watchdog 1,5s; orari con sabato mezza giornata. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO (PLUMBING_V 1) ══════════ */
  var SITE = {
    slug: 'panificio-sanna',
    hours: {
      0: [],
      1: [['07:30', '19:30']],
      2: [['07:30', '19:30']],
      3: [['07:30', '19:30']],
      4: [['07:30', '19:30']],
      5: [['07:30', '19:30']],
      6: [['07:30', '14:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1900,
    inViewClass: 'in-view',
    breakpointMenu: 920,
    EN: {
      'nav.radici': 'Roots', 'nav.trovi': 'What we bake', 'nav.famiglia': 'The family', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.rec': '392 reviews',
      'hero.kicker': 'The Sardinian bread of Via Marghera',
      'hero.sub': 'A family bakery and pastry shop <strong>since 1976</strong>, in the Wagner district. Fresh bread every day, Sardinian carasau and guttiau, focaccia, savoury bites and cakes — with a café corner to stay a while.',
      'hero.cta1': 'Call: 02 481 2072', 'hero.cta2': 'What we bake',
      'tk.1': 'carasau bread', 'tk.2': 'guttiau', 'tk.3': 'focaccia', 'tk.4': 'crisp pizzette', 'tk.5': 'shortcrust pastry', 'tk.6': 'panettone', 'tk.7': 'café corner', 'tk.8': 'since 1976',
      'tk.1b': 'carasau bread', 'tk.2b': 'guttiau', 'tk.3b': 'focaccia', 'tk.4b': 'crisp pizzette', 'tk.5b': 'shortcrust pastry', 'tk.6b': 'panettone', 'tk.7b': 'café corner', 'tk.8b': 'since 1976',
      'rad.kicker': 'Our roots', 'rad.t1': 'Sardinian bread,', 'rad.t2': 'sheet-music thin',
      'rad.p1': 'We honour our homeland: <strong>Sardinia</strong>. That’s why every day you’ll find <strong>carasau bread</strong> — so thin it’s called «carta da musica», sheet music — and <strong>guttiau bread</strong>, made with respect for tradition.',
      'rad.p2': 'Alongside it, fresh bread of many kinds, breadsticks and crisp crackers: the same craft, baked from early morning.',
      'tr.kicker': 'What we bake', 'tr.t1': 'Three counters,', 'tr.t2': 'one family',
      'm1.t': 'The bread', 'm1.p': 'Fresh bread of many kinds, Sardinian carasau and guttiau, olive and walnut loaves, breadsticks and crisp crackers.',
      'm2.t': 'The savoury', 'm2.p': 'Focaccia and focaccine, pizzas and crisp pizzette, savoury tarts, calzoni and treats: perfect for a lunch break at any hour.',
      'm3.t': 'The sweet', 'm3.p': 'Artisan shortcrust pastry, brioches, croissants and the cremonese, caprese cake and carrot cake. And for the holidays panettone, colomba and pastiera.',
      'fam.kicker': 'The Sanna family', 'fam.t1': 'Since 1976,', 'fam.t2': 'from father to son',
      'fam.g1a': 'Ovidio &amp; Antonia', 'fam.g1b': 'the founders, 1976', 'fam.g2a': 'Ivan &amp; William', 'fam.g2b': 'the brothers, today',
      'fam.p': 'The Via Marghera bakery has a history: since 1976 our family — first with Ovidio and Antonia, then with Ivan and William — has carried on tradition and innovation, offering fresh, tasty and genuine products every day. Because this craft is an art, and we put all our passion into it.',
      'caf.kicker': 'The café corner', 'caf.t1': 'Stay in', 'caf.t2': 'or take away',
      'caf.p': 'Enjoy everything on the spot, from early morning until evening, in our cosy café corner with little tables — even with the youngest ones. And if you’re in a hurry: <strong>call, order, pick up!</strong>',
      'caf.cta': 'Order: 02 481 2072',
      'gal.kicker': 'In the window', 'gal.t1': 'A tour', 'gal.t2': 'of the counters',
      'rec.kicker': 'What people say', 'rec.t2': 'from 392 reviews',
      'rec.r1': '«Panificio Sanna is one of those places that, if you’re from Milan, you know for sure. We’re in the Marghera area, and here everyone knows who the Sanna brothers are. And with good reason.»',
      'rec.r2': '«The go-to bakery in the Wagner area, a paradise of baked goods! The pizzette are lovely and crisp, the white focaccia has a dough that melts in your mouth.»',
      'rec.r3': '«The staff are very welcoming and friendly. The puff-pastry pizzette and focaccia with crescenza are excellent. The little pan-gocciolo cake is out of this world: I’d travel an hour just for that.»',
      'rec.r4': '«One of my favourite bakeries. Everything I get from them is delicious. Their cream brioche, filled to order, is something special.»',
      'rec.r5': '«A wide selection of baked goods, sweet and savoury, of excellent quality. There’s also an indoor area with little tables, ideal for a coffee break, even with the little ones.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Marghera,', 'dove.t2': 'the Wagner district',
      'dove.metro': 'Via Marghera 37, 20149 Milan · in the heart of the «Marghera Food District», steps from Wagner and De Angeli',
      'dove.chiama': 'Call 02 481 2072', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'Do you make Sardinian bread?', 'faq.a1': 'Yes. We honour our Sardinian roots: every day you’ll find carasau and guttiau bread, made with respect for tradition, alongside fresh bread of many kinds.',
      'faq.q2': 'What are your opening hours?', 'faq.a2': 'Monday to Friday 7:30am–7:30pm, Saturday 7:30am–2pm. We’re closed on Sundays.',
      'faq.q3': 'Can I have breakfast or a break on site?', 'faq.a3': 'Yes: we have a café corner with little tables where you can enjoy bread, savoury and sweet from morning until evening. If you’re in a hurry you can call, order and pick up.',
      'faq.q4': 'Do you make products for the holidays?', 'faq.a4': 'Yes: panettone, veneziana, savoury panettone, chiacchiere, tortelli, pan meino, Easter colomba and pastiera.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Marghera 37 in Milan, Wagner/De Angeli area. To order, call 02 481 2072.',
      'foot.dove': 'Via Marghera 37, 20149 Milan · <a href="tel:+39024812072">02 481 2072</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Directions'
    },
  };
  /* ═══════════════════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll('.reveal, .reveal-hero');
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) { gsap.set(els, { opacity: 1, y: 0 }); }
    else { els.forEach(function (el) { el.style.opacity = 1; }); }
    document.querySelectorAll('.stave-line').forEach(function (l) { l.style.strokeDashoffset = 0; });
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal:not(.mondo)').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* GESTO-FIRMA: le linee "carta da musica" (carasau) si disegnano */
    var lines = gsap.utils.toArray('.stave-line');
    lines.forEach(function (l) { var len = l.getTotalLength ? l.getTotalLength() : 520; l.style.strokeDasharray = len; l.style.strokeDashoffset = len; });
    if (lines.length) {
      gsap.to(lines, {
        strokeDashoffset: 0, duration: 1.1, stagger: .18, ease: 'power2.inOut',
        scrollTrigger: { trigger: '#radici', start: 'top 70%', once: true },
      });
    }
    /* tre mondi in stagger */
    gsap.fromTo('.mondo', { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: .7, stagger: .14, ease: 'power2.out', immediateRender: false,
      scrollTrigger: { trigger: '.mondi', start: 'top 80%', once: true },
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
    document.querySelectorAll('.stave-line').forEach(function (l) { l.style.strokeDashoffset = 0; });
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-badge', { opacity: 1, y: 0, duration: .5 }, .05)
      .to('.hero-kicker', { opacity: 1, y: 0, duration: .5 }, .15)
      .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .8 }, .25)
      .to('.hero-sub', { opacity: 1, y: 0, duration: .6 }, .55)
      .to('.hero-cta', { opacity: 1, y: 0, duration: .6 }, .75);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 700); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'); var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox'), lightboxImg = document.getElementById('lightboxImg'), lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (fig) {
      fig.setAttribute('tabindex', '0'); fig.setAttribute('role', 'button');
      var img = fig.querySelector('img');
      var go = function () { opener = fig; openLb(fig.getAttribute('data-full'), img ? img.alt : ''); };
      fig.addEventListener('click', go);
      fig.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari dinamici Europe/Rome (PLUMBING_V 1, con scavalco mezzanotte) */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var g = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[g('weekday')], mins: parseInt(g('hour'), 10) * 60 + parseInt(g('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DIT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId), st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours(); setInterval(renderHours, 60000);

  /* i18n overlay (innerHTML per <strong>/<a>) */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    var t = document.getElementById('langToggle'); if (t) t.textContent = lang === 'en' ? 'IT' : 'EN';
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* action-bar mobile */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () { actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6); };
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
