/* ============================================================
   OBSIDIAN Landing — behavior
   ============================================================ */

(function () {
  'use strict';

  document.documentElement.classList.add('js');

  /* ----- 1. Mobile nav toggle ----- */
  var burger = document.getElementById('navBurger');
  var navMobile = document.getElementById('navMobile');
  if (burger && navMobile) {
    burger.addEventListener('click', function () {
      var open = !navMobile.hasAttribute('hidden');
      if (open) navMobile.setAttribute('hidden', '');
      else navMobile.removeAttribute('hidden');
    });
    // Close on link tap
    navMobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { navMobile.setAttribute('hidden', ''); });
    });
  }

  /* ----- 2. Reveal on scroll (subtle fade-in) ----- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    // Safety fallback — reveal anything still hidden after 2s
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.is-in)').forEach(function (el) { el.classList.add('is-in'); });
    }, 2000);

    /* ----- 2b. Analytics events for sections ----- */
    var seen = {};
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var id = e.target.id;
        if (seen[id]) return;
        seen[id] = true;
        if (id === 'how') track('how_it_works_viewed');
        if (id === 'features') track('features_section_viewed');
      });
    }, { threshold: 0.6 });
    ['how', 'features'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) sio.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ----- 3. Hero "Rebalanced by AI" animation loop ----- */
  var dash = document.getElementById('dash');
  var callout = document.getElementById('callout');
  if (dash && callout) {
    var row = dash.querySelector('[data-row="1"]');
    function position() {
      if (!row) return;
      var dRect = dash.getBoundingClientRect();
      var rRect = row.getBoundingClientRect();
      callout.style.top = (rRect.top - dRect.top - 18) + 'px';
      callout.style.left = (rRect.right - dRect.left - callout.offsetWidth - 8) + 'px';
    }
    function playOnce() {
      if (!row) return;
      row.classList.add('is-on');
      callout.hidden = false;
      position();
      setTimeout(function () {
        callout.hidden = true;
        row.classList.remove('is-on');
      }, 2800);
    }
    // Wait a beat after load, then loop every 6s
    setTimeout(function () {
      playOnce();
      setInterval(playOnce, 6000);
    }, 1400);
    window.addEventListener('resize', position);
  }

  /* ----- 4. Form -----
     [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
     This block is a portfolio/demo prototype, not a production
     integration. It implements the full client-side UX (focus
     tracking, validation, corporate-email check, success state)
     that a real product needs, but intentionally does NOT send
     data anywhere — no fetch/XHR, no CRM, no webhook. Kept in
     code as the logical shape of what "Request Early Access"
     should do end-to-end; see landing_tz.md §7 for the intended
     real backend (Typeform/Tally/custom endpoint → Notion/Airtable). */
  var form = document.getElementById('accessForm');
  var emailField = document.getElementById('emailField');
  var emailHelp = document.getElementById('emailHelp');
  var aumField = document.getElementById('aumField');
  var success = document.getElementById('formSuccess');

  var freeMail = /@(gmail|googlemail|yahoo|hotmail|outlook|icloud|aol|protonmail|proton|live|me|mail|gmx|yandex)\./i;

  if (form) {
    var started = false;
    form.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('focus', function () {
        if (started) return;
        started = true;
        track('form_started');
      });
    });

    if (aumField) {
      aumField.addEventListener('change', function () {
        track('aum_selected', { value: aumField.value });
      });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var ok = true;

      // Strip prior error states
      form.querySelectorAll('.input--error').forEach(function (el) { el.classList.remove('input--error'); });
      if (emailHelp) {
        emailHelp.classList.remove('field__help--err');
        emailHelp.textContent = "Use your corporate domain — we don't accept generic mailboxes.";
      }

      form.querySelectorAll('[required]').forEach(function (el) {
        if (!el.value) {
          el.classList.add('input--error');
          ok = false;
        }
      });

      var email = (data.get('email') || '').trim();
      if (email && (!/^.+@.+\..+$/.test(email) || freeMail.test(email))) {
        if (emailField) emailField.classList.add('input--error');
        if (emailHelp) {
          emailHelp.classList.add('field__help--err');
          emailHelp.textContent = freeMail.test(email)
            ? 'Please use a corporate email address — not a personal mailbox.'
            : 'Please enter a valid email address.';
        }
        ok = false;
      }

      if (!ok) return;

      track('form_submitted', {
        org: data.get('org'),
        aum: data.get('aum')
      });

      if (success) success.hidden = false;
    });
  }

  /* ----- 5. Track helper (console + dataLayer if present) -----
     [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
     Stands in for real analytics (Mixpanel/Segment/GA4 per
     landing_tz.md §9). Fires into window.dataLayer if something
     external happens to be listening, otherwise just logs to the
     console — no real event ingestion. The event names/props
     here ARE the intended analytics contract (landing_viewed,
     hero_cta_clicked, form_submitted, etc.), just not connected
     to a live collector in this prototype. */
  function track(name, props) {
    try {
      if (window.dataLayer) window.dataLayer.push({ event: name, props: props || {} });
    } catch (_) {}
    console.log('[obsidian.track]', name, props || {});
  }
  window.__obsidianTrack = track;

  // Bind explicit click events
  document.querySelectorAll('[data-evt]').forEach(function (el) {
    el.addEventListener('click', function () { track(el.dataset.evt); });
  });

  /* ----- 6. Landing view event ----- */
  track('landing_viewed');

  /* ----- 7. Calendly placeholder -----
     [LOGICAL SCHEMA — NOT WIRED TO A BACKEND]
     Represents the "Prefer to talk first?" booking flow. No real
     Calendly embed here — intentionally, this is a demo prototype
     with no scheduling backend. Real integration target noted
     inline below and in landing_tz.md §5 (S7 Access). */
  var cal = document.getElementById('calendlyLink');
  if (cal) {
    cal.addEventListener('click', function (e) {
      e.preventDefault();
      alert('[Logical schema] Calendly popup would open here — integrate calendly.com/obsidian-team/30min');
    });
  }

  /* ============================================================ */
  /* HOW IT WORKS — interactive demo + timeline scroll progress   */
  /* ============================================================ */

  // --- Live demo carousel
  var howdemo = document.getElementById('howdemo');
  if (howdemo) {
    var tabs = Array.prototype.slice.call(howdemo.querySelectorAll('.howtab'));
    var panels = Array.prototype.slice.call(howdemo.querySelectorAll('.howpanel'));
    var DURATION = 8000;
    var active = 0;
    var raf = null;
    var startTs = 0;
    var paused = false;
    var inView = false;

    function setActive(i, fromUser) {
      active = i;
      howdemo.setAttribute('data-active', String(i));
      tabs.forEach(function (t, idx) {
        t.classList.toggle('is-active', idx === i);
        t.classList.toggle('is-done', idx < i);
        var bar = t.querySelector('.howtab__bar i');
        if (bar) {
          if (idx < i) bar.style.width = '100%';
          else if (idx > i) bar.style.width = '0%';
          // bar for idx === i is animated by the raf loop
        }
      });
      // Re-trigger panel animations
      panels.forEach(function (p, idx) {
        if (idx === i) {
          p.classList.remove('is-active');
          // force reflow so animations restart
          // eslint-disable-next-line no-unused-expressions
          p.offsetHeight;
          p.classList.add('is-active');
          runTicks(p);
        } else {
          p.classList.remove('is-active');
        }
      });
      if (fromUser) restartTimer();
    }

    function tick(ts) {
      if (!startTs) startTs = ts;
      var dt = ts - startTs;
      var pct = Math.min(1, dt / DURATION);
      var bar = tabs[active] && tabs[active].querySelector('.howtab__bar i');
      if (bar) bar.style.width = (pct * 100) + '%';
      if (pct >= 1) {
        startTs = 0;
        setActive((active + 1) % tabs.length, false);
      }
      raf = inView && !paused ? requestAnimationFrame(tick) : null;
    }

    function restartTimer() {
      if (raf) cancelAnimationFrame(raf);
      startTs = 0;
      var bar = tabs[active] && tabs[active].querySelector('.howtab__bar i');
      if (bar) bar.style.width = '0%';
      if (inView && !paused) raf = requestAnimationFrame(tick);
    }

    function play() {
      if (raf || !inView || paused) return;
      raf = requestAnimationFrame(tick);
    }
    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = null;
    }

    tabs.forEach(function (t, idx) {
      t.addEventListener('click', function () { setActive(idx, true); });
    });

    howdemo.addEventListener('mouseenter', function () { paused = true; stop(); });
    howdemo.addEventListener('mouseleave', function () { paused = false; play(); });

    // Tick counters within active panel
    function runTicks(panel) {
      panel.querySelectorAll('.tick').forEach(function (el) {
        var from = parseFloat(el.dataset.from || '0');
        var to   = parseFloat(el.dataset.to   || '0');
        var dec  = parseInt(el.dataset.decimals || '0', 10);
        if (from === to) { el.textContent = to.toFixed(dec); return; }
        var dur = 1400;
        var t0 = performance.now();
        function step(now) {
          var p = Math.min(1, (now - t0) / dur);
          // ease-out cubic
          p = 1 - Math.pow(1 - p, 3);
          var v = from + (to - from) * p;
          el.textContent = dec ? v.toFixed(dec) : Math.round(v).toString();
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    // Only animate when in viewport
    if ('IntersectionObserver' in window) {
      var dio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          inView = e.isIntersecting;
          if (inView) {
            // first time entering: also run ticks for the initial active panel
            var p = panels[active];
            if (p && !p.dataset.kicked) { p.dataset.kicked = '1'; runTicks(p); }
            play();
          } else {
            stop();
          }
        });
      }, { threshold: 0.25 });
      dio.observe(howdemo);
    } else {
      inView = true;
      play();
      runTicks(panels[active]);
    }
  }

  // --- Timeline progress (variant B)
  var howline = document.getElementById('howline');
  var howlineFill = document.getElementById('howlineFill');
  if (howline && howlineFill) {
    var steps = Array.prototype.slice.call(howline.querySelectorAll('.howline__step'));
    function updateTimeline() {
      if (document.documentElement.getAttribute('data-how') !== 'timeline') return;
      var rect = howline.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      var totalH = rect.height;
      var scrolledIn = Math.max(0, vh * 0.55 - rect.top);
      var pct = Math.max(0, Math.min(1, scrolledIn / totalH));
      howlineFill.style.height = (pct * 100) + '%';
      // Mark steps active when their node passes the line tip
      steps.forEach(function (s, idx) {
        var sr = s.getBoundingClientRect();
        var nodeCenter = (sr.top + 28) - rect.top;
        var fillPx = pct * totalH;
        s.classList.toggle('is-active', nodeCenter <= fillPx + 8);
      });
    }
    window.addEventListener('scroll', updateTimeline, { passive: true });
    window.addEventListener('resize', updateTimeline);
    updateTimeline();
    // Update again whenever data-how changes (handled via setTweak below)
    window.__updateHowTimeline = updateTimeline;
  }

  /* ============================================================ */
  /* TWEAKS                                                       */
  /* ============================================================ */
  var TWEAKS = Object.assign({ hero: 'dark', rhythm: 'subtle', density: 'standard', how: 'demo' }, window.__TWEAK_DEFAULTS || {});
  var panel = document.getElementById('tweaks');
  var closeBtn = document.getElementById('tweaksClose');

  function applyTweaks() {
    var html = document.documentElement;
    html.setAttribute('data-hero', TWEAKS.hero);
    html.setAttribute('data-rhythm', TWEAKS.rhythm);
    html.setAttribute('data-density', TWEAKS.density);
    html.setAttribute('data-how', TWEAKS.how);
    if (window.__updateHowTimeline) setTimeout(window.__updateHowTimeline, 60);
    if (!panel) return;
    panel.querySelectorAll('[data-tweak-group]').forEach(function (group) {
      var key = group.dataset.tweakGroup;
      group.querySelectorAll('.tweaks__opt').forEach(function (b) {
        b.classList.toggle('is-on', b.dataset.value === TWEAKS[key]);
      });
    });
  }

  function setTweak(key, val) {
    TWEAKS[key] = val;
    applyTweaks();
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: (function () { var o = {}; o[key] = val; return o; })() }, '*');
    } catch (_) {}
  }

  if (panel) {
    panel.querySelectorAll('.tweaks__opt').forEach(function (b) {
      b.addEventListener('click', function () {
        var group = b.closest('[data-tweak-group]');
        if (!group) return;
        setTweak(group.dataset.tweakGroup, b.dataset.value);
      });
    });
  }

  // Apply defaults on load (so the page reflects EDITMODE state)
  applyTweaks();
  function showPanel() { if (panel) panel.hidden = false; }
  function hidePanel() { if (panel) panel.hidden = true; }

  window.addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.type === '__activate_edit_mode') showPanel();
    if (d.type === '__deactivate_edit_mode') hidePanel();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', function () {
      hidePanel();
      try { window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*'); } catch (_) {}
    });
  }

  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}
})();
