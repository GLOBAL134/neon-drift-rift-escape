/**
 * Final release systems: progression, ghost replay, drift, Overdrive,
 * run statistics and release-only HUD behavior.
 */
(function() {
  'use strict';
  const PROGRESS_KEY = 'neondrift.progression.v1', GHOST_KEY = 'neondrift.ghost.v1';
  const $ = id => document.getElementById(id);
  const tr = (key, fallback = key) => window.NeonI18n?.t?.(key) || fallback;
  let progression = {
    level: 1, xp: 0, totalXp: 0, driftHinted: false
  };
  let ghostData = null, ghostMesh = null, currentRun = null, lastState = null, lastView = '', lastSampleAt = -1, lastDrift = false, driftTime = 0, perfectDriftAwarded = false, runFinalized = false;

  function decodeProgression(value) {
    const p = value && typeof value === 'object' ? value : {};
    return {
      level: Math.max(1, Math.floor(Number(p.level) || 1)),
      xp: Math.max(0, Math.floor(Number(p.xp) || 0)),
      totalXp: Math.max(0, Math.floor(Number(p.totalXp) || 0)),
      driftHinted: p.driftHinted === true
    };
  }
  function decodeGhost(value) {
    if (!value || typeof value !== 'object' || !Array.isArray(value.path)) return null;
    const path = value.path.map((point) => Array.isArray(point)
      ? { t: Number(point[0]), d: Number(point[1]), x: Number(point[2]) }
      : { t: Number(point?.t), d: Number(point?.d), x: Number(point?.x) })
      .filter((point) => [point.t, point.d, point.x].every(Number.isFinite));
    if (!path.length) return null;
    return { bestDistance: Math.max(0, Number(value.bestDistance) || 0), car: value.car || 'vector', path };
  }
  function compactGhost(value) {
    if (!value?.path?.length) return null;
    const path = value.path.slice(-2400).map((point) => [
      +(point.t || 0).toFixed(2),
      +(point.d || 0).toFixed(1),
      +(point.x || 0).toFixed(2)
    ]);
    return { bestDistance: Math.max(0, Number(value.bestDistance) || 0), car: value.car || 'vector', path };
  }
  function loadSavedMeta(save) {
    if (!save || typeof save !== 'object') return;
    progression = decodeProgression(save.progression || progression);
    ghostData = decodeGhost(save.ghost);
  }
  function syncMeta() {
    window.__NEON__?.actions?.updateMeta?.({
      progression,
      ghost: compactGhost(ghostData)
    });
  }

  const initialGameSave = window.__NEON__?.saved;
  loadSavedMeta(initialGameSave);
  let migratedLegacyMeta = false;
  try {
    const localProgression = decodeProgression(JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}'));
    if ((initialGameSave?.progression?.totalXp || 0) === 0 && localProgression.totalXp > 0) {
      progression = localProgression;
      migratedLegacyMeta = true;
    }
  } catch {
  }
  try {
    const localGhost = decodeGhost(JSON.parse(localStorage.getItem(GHOST_KEY) || 'null'));
    if (!initialGameSave?.ghost && localGhost) {
      ghostData = localGhost;
      migratedLegacyMeta = true;
    }
  } catch {
  }
  if (migratedLegacyMeta) syncMeta();
  function saveProgress() {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progression));
    } catch {
    }
    syncMeta();
  }
  function xpNeed(level) {
    return 260 + Math.max(0, level - 1) * 140;
  }
  function awardXp(amount) {
    let gained = Math.max(0, Math.floor(amount || 0));
    progression.totalXp = (progression.totalXp || 0) + gained;
    progression.xp = (progression.xp || 0) + gained;
    let leveled = 0;
    while (progression.xp >= xpNeed(progression.level)) {
      progression.xp -= xpNeed(progression.level);
      progression.level++;
      leveled++;
    }
    saveProgress();
    return {
      gained, leveled
    };
  }
  function notify(text, urgent = false) {
    window.NeonUI?.notice?.(text, urgent);
  }
  function ensureHud() {
    const hud = $('hud');
    if (!hud)return;
    if (!$('overdrive-control')) {
      const wrap = document.createElement('div');
      wrap.id = 'overdrive-control';
      wrap.innerHTML = `<div class="od-label"><span>${tr('overdrive','OVERDRIVE')}</span><b id="overdrive-value">0%</b></div><div class="od-track"><i id="overdrive-meter"></i></div><button id="overdrive-button" type="button">R · ${tr('activate','ACTIVATE')}</button>`;
      hud.append(wrap);
      $('overdrive-button').addEventListener('click', activateOverdrive);
    }
    if (!$('drift-fx')) {
      const fx = document.createElement('div');
      fx.id = 'drift-fx';
      hud.append(fx);
    }
    if (!$('ghost-label')) {
      const label = document.createElement('div');
      label.id = 'ghost-label';
      label.hidden = true;
      hud.append(label);
    }
    const hero = document.querySelector('.home-meta');
    if (hero && !$('player-level')) {
      const b = document.createElement('span');
      b.id = 'player-level';
      hero.append(b);
    }
    const hint = document.querySelector('.key-hint');
    if (hint && !hint.dataset.releaseKeys) {
      hint.insertAdjacentHTML('beforeend', ' <span>·</span><kbd>R</kbd> overdrive');
      hint.dataset.releaseKeys = '1';
    }
  }
  function activateOverdrive() {
    const g = window.__NEON__?.state;
    if (!g || g.status !== 'running' || (g.overdrive || 0) > 0 || (g.overdriveCharge || 0) < 100)return false;
    g.overdrive = 6;
    g.overdriveCharge = 0;
    g.overdriveReady = false;
    g.magnet = Math.max(g.magnet || 0, .2);
    g.events?.push?.({
      type: 'overdrive-start'
    });
    return true;
  }
  function updateOverdrive(g) {
    if (!g)return;
    const value = Math.round(Math.max(0, Math.min(100, g.overdriveCharge || 0))), meter = $('overdrive-meter'), label = $('overdrive-value'), button = $('overdrive-button'), touch = innerWidth < 700 || !!window.matchMedia?.('(pointer: coarse)').matches;
    if (meter)meter.style.width = value + '%';
    if (label)label.textContent = (g.overdrive > 0?g.overdrive.toFixed(1) + 's': value + '%');
    if (button) {
      button.classList.toggle('ready', value >= 100 && !(g.overdrive > 0));
      button.classList.toggle('active', g.overdrive > 0);
      button.textContent = g.overdrive > 0 ? (touch ? tr('overdrive','OVERDRIVE') : tr('overdriveActive','OVERDRIVE ACTIVE')) : (touch ? tr('tapOverdrive','TAP OVERDRIVE') : `R · ${tr('activate','ACTIVATE')}`);
      button.disabled = g.overdrive <= 0 && value < 100;
      button.setAttribute('aria-label', button.textContent);
    }
    if (g.overdrive > 0)g.magnet = Math.max(g.magnet || 0, .16);
  }
  function comboAction(g, score, tag) {
    g.combo = (g.combo || 0) + 1;
    g.bestCombo = Math.max(g.bestCombo || 0, g.combo);
    g.comboLeft = 5;
    const mult = Math.min(5, 1 + Math.floor(g.combo / 2));
    g.score = (g.score || 0) + Math.round(score * mult * ((g.doubleScore || 0) > 0?2: 1));
    g.nitro = Math.min(100, (g.nitro || 0) + 3);
    g.overdriveCharge = Math.min(100, (g.overdriveCharge || 0) + 10);
    if (g.overdriveCharge >= 100 && !g.overdriveReady) {
      g.overdriveReady = true;
      g.events?.push?.({
        type: 'overdrive-ready'
      });
    }
    return mult;
  }
  function updateDrift(g, dt) {
    if (!g || g.status !== 'running' || g.air > 0 || g.flight > 0) {
      endDrift(g);
      return;
    }
    const drifting = g.speed * 3.6 > 320 && Math.abs(g.vx || 0) > 2.25 && Math.abs(g.bodyYaw || 0) > .028;
    if (drifting) {
      driftTime += dt;
      document.body.classList.add('drifting');
      if (!lastDrift) {
        perfectDriftAwarded = false;
      }
      if (driftTime > 2.25 && !perfectDriftAwarded) {
        perfectDriftAwarded = true;
        const mult = comboAction(g, 240, 'PERFECT DRIFT');
        g.nitro = Math.min(100, (g.nitro || 0) + 8);
        notify('PERFECT DRIFT · COMBO x' + mult, true);
      }
    } else endDrift(g);
    lastDrift = drifting;
  }
  function endDrift(g) {
    if (lastDrift && driftTime > .55 && g && g.status === 'running') {
      const mult = comboAction(g, 110, 'DRIFT');
      g.nitro = Math.min(100, (g.nitro || 0) + 4);
      if (!perfectDriftAwarded)notify('DRIFT · COMBO x' + mult);
    }
    driftTime = 0;
    perfectDriftAwarded = false;
    lastDrift = false;
    document.body.classList.remove('drifting');
  }
  function disposeGhost() {
    if (ghostMesh?.parent)ghostMesh.parent.remove(ghostMesh);
    if (ghostMesh) {
      ghostMesh.traverse?.(o => {
        if (o.isMesh) {
          const mats = Array.isArray(o.material)?o.material: [o.material];
          mats.forEach(m => m?.dispose?.());
        }
      });
    }
    ghostMesh = null;
    const label = $('ghost-label');
    if (label)label.hidden = true;
  }
  function buildGhost() {
    disposeGhost();
    const neon = window.__NEON__, car = neon?.playerCar, scene = neon?.scene;
    if (!ghostData || !car || !scene || !ghostData.path?.length)return;
    ghostMesh = car.clone(true);
    ghostMesh.name = 'best-run-ghost';
    ghostMesh.traverse(o => {
      if (!o.isMesh)return;
      const mats = (Array.isArray(o.material)?o.material: [o.material]).map(m => {
        const c = m.clone();
        c.transparent = true;
        c.opacity = .18;
        c.depthWrite = false;
        if (c.emissive) {
          c.emissive.setHex(0x62efff);
          c.emissiveIntensity = Math.max(c.emissiveIntensity || 0, 1.2);
        }
        return c;
      });
      o.material = Array.isArray(o.material)?mats: mats[0];
      o.castShadow = false;
      o.receiveShadow = false;
    });
    scene.add(ghostMesh);
    const label = $('ghost-label');
    if (label) {
      label.hidden = false;
      label.textContent = tr('bestRunGhost','BEST RUN GHOST');
    }
  }
  function interpGhost(t) {
    const p = ghostData?.path;
    if (!p?.length)return null;
    if (t <= p[0].t)return p[0];
    if (t >= p[p.length - 1].t)return p[p.length - 1];
    let lo = 0, hi = p.length - 1;
    while (lo + 1 < hi) {
      const m = (lo + hi) >> 1;
      if (p[m].t < t)lo = m;
      else hi = m;
    }
    const a = p[lo], b = p[hi], q = (t - a.t) / Math.max(.001, b.t - a.t);
    return {
      t, d: a.d + (b.d - a.d) * q, x: a.x + (b.x - a.x) * q
    };
  }
  function updateGhost(g) {
    if (!ghostMesh || !g)return;
    const point = interpGhost(g.time || 0);
    if (!point) {
      ghostMesh.visible = false;
      return;
    }
    const dz = point.d - (g.distance || 0);
    ghostMesh.visible = Math.abs(dz) < 180;
    ghostMesh.position.set(point.x, window.__NEON__?.playerCar?.position?.y || 0, 8 - dz);
    ghostMesh.rotation.copy(window.__NEON__?.playerCar?.rotation);
    const label = $('ghost-label');
    if (label && !label.hidden) label.textContent = dz > 3 ? `${tr('ghost','GHOST')} +${Math.round(dz)}m` : dz < -3 ? `${tr('ghost','GHOST')} ${Math.round(dz)}m` : `${tr('ghost','GHOST')} · ${tr('even','EVEN')}`;
  }
  function startRun(g) {
    currentRun = {
      path: [], bestDistance: 0
    };
    lastSampleAt = - 1;
    runFinalized = false;
    buildGhost();
    if (!g.overdriveCharge)g.overdriveCharge = 0;
    g.overdriveReady = (g.overdriveCharge || 0) >= 100;
  }
  function sampleRun(g) {
    if (!currentRun || !g || g.status !== 'running')return;
    if ((g.time || 0) - lastSampleAt < .25)return;
    lastSampleAt = g.time || 0;
    currentRun.path.push({
      t: + (g.time || 0).toFixed(2), d: + (g.distance || 0).toFixed(1), x: + (g.x || 0).toFixed(2)
    });
    if (currentRun.path.length > 2400)currentRun.path.shift();
    currentRun.bestDistance = Math.max(currentRun.bestDistance, g.distance || 0);
  }
  function finalizeRun(g) {
    if (runFinalized || !currentRun || !g)return;
    runFinalized = true;
    endDrift(g);
    const result = awardXp((g.distance || 0) / 24 + (g.near || 0) * 12 + (g.bestCombo || 0) * 7 + (g.smashed || 0) * 10);
    if (!ghostData || currentRun.bestDistance > (ghostData.bestDistance || 0)) {
      ghostData = {
        bestDistance: currentRun.bestDistance, path: currentRun.path.slice(), car: g.car || 'vector'
      };
      try {
        localStorage.setItem(GHOST_KEY, JSON.stringify(ghostData));
      } catch {
      }
      syncMeta();
    }
    const stats = $('result-stats');
    if (stats && !stats.querySelector('[data-release-stats]')) {
      const near = document.createElement('div');
      near.dataset.releaseStats = '1';
      near.innerHTML = `<span>${tr('nearMisses','NEAR MISSES')}</span><b>${Math.floor(g.near || 0)}</b>`;
      stats.append(near);
      const combo = document.createElement('div');
      combo.dataset.releaseStats = '1';
      combo.innerHTML = `<span>${tr('bestCombo','BEST COMBO')}</span><b>x${Math.floor(g.bestCombo || 0)}</b>`;
      stats.append(combo);
      const top = document.createElement('div');
      top.dataset.releaseStats = '1';
      top.innerHTML = `<span>${tr('topSpeed','TOP SPEED')}</span><b>${Math.round((g.maxSpeedSeen || 0) * 3.6)} KM/H</b>`;
      stats.append(top);
      const destroyed = document.createElement('div');
      destroyed.dataset.releaseStats = '1';
      destroyed.innerHTML = `<span>${tr('destroyed','DESTROYED')}</span><b>${Math.floor(g.smashed || 0)}</b>`;
      stats.append(destroyed);
      const level = document.createElement('div');
      level.dataset.releaseStats = '1';
      level.innerHTML = `<span>XP / ${tr('level','LEVEL')}</span><b>+${result.gained} XP · ${tr('lv','LV')} ${progression.level}</b>`;
      stats.append(level);
    }
    if (result.leveled) notify(`${tr('levelUp','LEVEL UP')} · ${tr('lv','LV')} ${progression.level}`, true);
    disposeGhost();
  }
  function updateHome() {
    const el = $('player-level');
    if (el) el.textContent = `${tr('level','LEVEL')} ${progression.level} · ${progression.xp}/${xpNeed(progression.level)} XP`;
  }
  let prev = performance.now();
  function frame(now) {
    ensureHud();
    updateHome();
    const neon = window.__NEON__, g = neon?.state, view = neon?.view, dt = Math.min(.05, Math.max(0, (now - prev) / 1000));
    prev = now;
    if (g !== lastState) {
      if (g && view === 'hud')startRun(g);
      lastState = g;
    }
    if (g && view === 'hud' && !neon.paused) {
      updateOverdrive(g);
      if (!progression.driftHinted && (g.time || 0) > 18 && (g.speed || 0) * 3.6 > 300) {
        progression.driftHinted = true;
        saveProgress();
        notify('DRIFT · SHARP STEER AT SPEED TO BUILD COMBO');
      }
      updateDrift(g, dt);
      sampleRun(g);
      updateGhost(g);
    }
    if (view === 'result' && lastView !== 'result' && g)finalizeRun(g);
    if (view !== 'hud' && lastView === 'hud')document.body.classList.remove('drifting');
    lastView = view;
    requestAnimationFrame(frame);
  }
  window.addEventListener('neondrift:save-loaded', (event) => {
    loadSavedMeta(event.detail);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progression));
      if (ghostData) localStorage.setItem(GHOST_KEY, JSON.stringify(ghostData));
    } catch {
    }
    updateHome();
  });
  window.addEventListener('keydown', e => {
    if (e.repeat)return;
    if (e.code === 'KeyR' && window.__NEON__?.view === 'hud') {
      e.preventDefault();
      activateOverdrive();
    }
  });
  window.addEventListener('neondrift:i18n-applied', () => {
    const wrap = $('overdrive-control');
    if (wrap) {
      const title = wrap.querySelector('.od-label span');
      if (title) title.textContent = tr('overdrive','OVERDRIVE');
      updateHome();
      if (window.__NEON__?.state) updateOverdrive(window.__NEON__.state);
    }
  });
  document.addEventListener('DOMContentLoaded', () => {
    ensureHud();
    requestAnimationFrame(frame);
  });
})();
