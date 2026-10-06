/* Presentation layer for Rift Protocol; authoritative collision/mission rules live in expansion.js. */
(function() {
  'use strict';
  const E = window.NeonExpansion;
  const $ = id => document.getElementById(id);
  const KEY = 'neondrift.rift.v1';
  // The first-run tutorial advances only after witnessed gameplay actions.
  let tutorialReplay = false, replayingTutorial = false, tutorialActive = false, tutorialStage = '', tutorialToneAt = - 1, previousBoost = false, activeCar = null, steerOrigin = 0, manualJump = false, shieldPicked = false, nitroPicked = false, shardCount = 0, flightObserved = false, pendingTutorialEvents = [];
  let saved = {
    completed: {
    }, daily: {
    }, cosmetics: {
    }, equipped: 'standard'
  }, last = null, lastMissionUpdate = - 1, trailTick = 0, lastGoal = '', riftWarned = false, portalHumAt = 0, phaseReadyAnnounced = false;
  try {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (data && typeof data === 'object')saved = {
      ...saved, ...data
    };
  } catch {
  }
  function persist() {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {
    }
  }
  const discoveryCopy = {
    cell: 'HEALTH · REPAIRS YOUR VEHICLE', nitro: 'NITRO · HOLD NITRO TO BOOST', energyShield: 'SHIELD · BLOCKS ONE COLLISION', flight: 'FLIGHT · FLY OVER OBSTACLES', phaseShard: 'PHASE · CHARGE THE RIFT', magnet: 'MAGNET · ATTRACTS CREDITS', scoreBoost: 'SCORE ×2 · DOUBLES SCORE FOR 12 SECONDS', dronePower: 'DRONE POWER · 15 SECONDS · NEXT ATTACK ×2', superNitro: 'SUPER NITRO · MAXIMUM ACCELERATION', coin: 'CREDITS · COLLECT FOR REWARDS'
  };
  function rememberDiscovery(ev) {
    if (ev?.outcome !== 'pickup')return;
    const type = E.normalizePickupType?.(ev.type) || ev.type;
    if (!discoveryCopy[type])return;
    saved.discoveredPickups = saved.discoveredPickups || {
    };
    if (saved.discoveredPickups[type])return;
    saved.discoveredPickups[type] = true;
    persist();
    note(discoveryCopy[type], true);
  }
  function flash(color) {
    const el = $('rift-flash');
    if (!el)return;
    el.style.background = color;
    el.animate([{
      opacity: 0
    }, {
      opacity: .38, offset: .15
    }, {
      opacity: 0
    }], {
      duration: 520
    });
  }
  const noticeQueue = [];
  let noticeActive = false, noticeTimer, creditNoticeTimer;
  function nextNotice() {
    const el = $('rift-notice'), toast = $('toast');
    if (!el)return;
    if (!noticeQueue.length) {
      noticeActive = false;
      if (toast)toast.style.visibility = '';
      return
    }
    noticeActive = true;
    if (toast)toast.style.visibility = 'hidden';
    el.getAnimations().forEach(a => a.cancel());
    el.textContent = noticeQueue.shift();
    el.animate([{
      opacity: 0
    }, {
      opacity: 1, offset: .14
    }, {
      opacity: 1, offset: .8
    }, {
      opacity: 0
    }], {
      duration: 1550
    });
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(nextNotice, 1570);
  }
  function note(text, urgent = false) {
    if (urgent) {
      clearTimeout(noticeTimer);
      noticeQueue.length = 0;
      noticeActive = false;
    }
    if (!urgent && (noticeQueue.at( - 1) === text || noticeActive && $('rift-notice')?.textContent === text))return;
    noticeQueue.push(text);
    if (noticeQueue.length > 5)noticeQueue.shift();
    if (!noticeActive)nextNotice();
  }
  const dimensionTips = {
    gravity: 'LOW GRAVITY · LONGER JUMPS', neon: 'NEON DIMENSION · BONUS COMBO SCORE', hyper: 'HYPER SPEED · ACCELERATION BOOSTED', rush: 'CRYSTAL RUSH · MORE SHARDS & CREDITS', hazard: 'HAZARD DIMENSION · MORE DANGER · MORE REWARDS', mirror: 'MIRROR WORLD · STEERING REVERSES IN 1s', time: 'TIME DISTORTION · TIME & SPEED ALTERED'
  };
  const lessons = (E.tutorialLessons || []).map(x => x.id);
  function saveTutorialProgress(completedStage) {
    if (!tutorialActive || replayingTutorial)return;
    saved.tutorialComplete = false;
    saved.tutorialStage = tutorialStage;
    saved.tutorialCompleted = saved.tutorialCompleted || {
    };
    if (completedStage)saved.tutorialCompleted[completedStage] = true;
    persist();
  }
  function canAdvance(g, stage) {
    return (g.time || 0) >= (E.tutorialPacing?.[stage] || 0);
  }
  function targetContact(ev, g) {
    const target = g?.tutorialTarget;
    if (!target)return true;
    if (ev?.index === target.index)return true;
    if (ev?.type === 'near' && target.lesson === 'dodge') {
      const row = g.rows?.get?.(target.index), gap = row?row.distance - (g.distance || 0): Infinity;
      const obj = row?.objects?.find(o => o.tutorial && o.lesson === 'dodge');
      return !!obj && gap >= - 8 && gap < 95 && Math.abs((ev.x ?? obj.x) - obj.x) < 3;
    }
    return false;
  }
  function advance(g, witnessed) {
    if (!tutorialActive || tutorialStage === 'complete')return false;
    if (!canAdvance(g, tutorialStage)) {
      if (witnessed)pendingTutorialEvents.push({
        stage: tutorialStage, event: witnessed
      });
      return false;
    }
    const completedStage = tutorialStage, next = lessons[lessons.indexOf(tutorialStage) + 1] || 'complete';
    tutorialStage = next;
    if (next === 'flightUse')flightObserved = g.flight > 0;
    g.tutorialTarget = null;
    saveTutorialProgress(completedStage);
    E.scheduleTutorial(g, tutorialStage);
    if (tutorialStage === 'complete') {
      tutorialActive = false;
      g.tutorialMode = false;
      if (!replayingTutorial) {
        saved.tutorialComplete = true;
        saved.tutorialStage = 'complete';
        persist();
      }
      note('TUTORIAL COMPLETE · RIFT PROTOCOL ONLINE', true);
    }
    return true;
  }
  function flushPending(g) {
    const i = pendingTutorialEvents.findIndex(x => x.stage === tutorialStage);
    if (i < 0 || !canAdvance(g, tutorialStage))return false;
    pendingTutorialEvents.splice(i, 1);
    return advance(g);
  }
  function observe(ev, g) {
    if (!tutorialActive)return;
    const stage = tutorialStage;
    const chase = ev.type === 'chase-end' && ev.outcome === 'escaped';
    if (stage === 'steer' && (ev.type === 'steer' || Math.abs(g.x - steerOrigin) > 1.5))advance(g, ev);
    else if (stage === 'dodge' && targetContact(ev, g) && (ev.type === 'dodge' || ev.type === 'near' || ev.outcome === 'dodge' || (ev.type === 'barrier' && ev.outcome === 'clear')))advance(g, ev);
    else if (stage === 'health' && targetContact(ev, g) && (ev.type === 'cell' || ev.type === 'health') && ev.outcome === 'pickup')advance(g, ev);
    else if (stage === 'ramp' && targetContact(ev, g) && ev.type === 'ramp')advance(g, ev);
    else if (stage === 'jump') {
      if (ev.type === 'free-jump')manualJump = true;
      if (targetContact(ev, g) && (ev.type === 'hurdle' || ev.type === 'jump' || ev.type === 'jump-dodge') && ev.outcome === 'jump' && manualJump) {
        manualJump = false;
        advance(g, ev);
      }
    } else if (stage === 'nitro' && targetContact(ev, g) && ev.type === 'nitro' && ev.outcome === 'pickup') {
      nitroPicked = true;
      advance(g, ev);
    } else if (stage === 'nitroUse' && (ev.type === 'nitro-use' || ev.type === 'boost-start' || (ev.type === 'boost' && g.boost)))advance(g, ev);
    else if (stage === 'shield' && targetContact(ev, g) && ev.type === 'energyShield' && ev.outcome === 'pickup') {
      shieldPicked = true;
      advance(g, ev);
    } else if (stage === 'shieldImpact' && shieldPicked && targetContact(ev, g) && (ev.type === 'shield-save' || (ev.outcome === 'protected' && E.hazards?.includes(ev.type))))advance(g, ev);
    else if (stage === 'flight' && targetContact(ev, g) && (ev.type === 'flight' || ev.type === 'flightBoost') && ev.outcome === 'pickup')advance(g, ev);
    else if (stage === 'flightUse' && flightObserved && g.flight === 0 && ev.type === 'flight-ended')advance(g, ev);
    else if (stage === 'shards' && targetContact(ev, g) && (ev.type === 'phaseShard' || ev.type === 'shard') && ev.outcome === 'pickup') {
      shardCount++;
      if (shardCount >= 4)advance(g, ev);
    } else if (stage === 'phase' && targetContact(ev, g) && ((ev.type === 'gate' && ev.outcome === 'phased') || ev.outcome === 'phased'))advance(g, ev);
    else if (stage === 'dronePower' && targetContact(ev, g) && ev.type === 'dronePower' && ev.outcome === 'pickup')advance(g, ev);
    else if (stage === 'pulse' && targetContact(ev, g) && (ev.type === 'pulse-break' || (ev.type === 'drone' && ev.outcome === 'break')))advance(g, ev);
    else if (stage === 'drones' && targetContact(ev, g) && (ev.type === 'drone-shot' || (ev.type === 'pulse-break' && ev.target === 'drone')))advance(g, ev);
    else if (stage === 'chase' && chase)advance(g, ev);
    else if (stage === 'portal' && targetContact(ev, g) && ev.type === 'portal' && ev.outcome === 'portal')advance(g, ev);
  }
  const lessonRank = Object.fromEntries(lessons.map((id, index) => [id, index]));
  function tutorialStepSeen(kind) {
    const steps = saved.tutorialSteps;
    if (!steps)return false;
    if (Array.isArray(steps))return steps.includes(kind);
    if (typeof steps === 'object')return !!steps[kind] || !!steps[kind + 'Shift'] || !!steps[kind + 'Break'];
    return false;
  }
  function abilityIntroduced(kind, g) {
    const threshold = kind === 'phase'?'phase': 'pulse';
    const savedStage = lessonRank[saved.tutorialStage];
    const liveStage = lessonRank[tutorialStage];
    const taught = !!saved.tutorialCompleted?.[threshold] || savedStage >= lessonRank[threshold] || liveStage >= lessonRank[threshold];
    const introduced = !!saved.abilityIntroduced?.[kind] || tutorialStepSeen(kind) || saved.tutorialComplete === true || saved.tutorialStage === 'complete' || g?.tutorialMode === false || taught;
    if (introduced) {
      saved.abilityIntroduced = saved.abilityIntroduced || {
      };
      if (!saved.abilityIntroduced[kind]) {
        saved.abilityIntroduced[kind] = true;
        persist();
      }
    }
    return introduced;
  }
  function learnedHint(stage) {
    if (replayingTutorial)return false;
    const done = saved.tutorialCompleted || {
    };
    return !!saved.tutorialComplete || !!done[stage];
  }
  function consumableCount(kind, te) {
    const bag = te?.boosters || {
    };
    const value = bag?.[kind];
    return Number.isFinite(Number(value))?Math.max(0, Number(value)): 0;
  }
  function paintPowerStatus(g, te) {
    const flight = $('flight-status'), shield = $('shield-status');
    const flightTimer = $('flight-timer'), shieldTimer = $('shield-timer');
    const flightButton = $('flight-owned'), shieldButton = $('shield-owned');
    const flightMobile = $('mobile-flight'), shieldMobile = $('mobile-shield');
    const flightOwned = consumableCount('flight', te), shieldOwned = consumableCount('shield', te);
    const flightActive = (g?.flight || 0) > 0, shieldActive = (g?.timedShield || 0) > 0 || !!g?.shield;
    const set = (el, label, active, timer, owned) => {
      if (!el)return;
      el.querySelector('span')?.replaceChildren(document.createTextNode(label));
      const value = el.querySelector('b');
      if (value)value.textContent = active?timer.toFixed(1) + 's': owned > 0?'READY': 'UNAVAILABLE';
      el.classList.toggle('active', active);
      el.classList.toggle('owned', !active && owned > 0);
      el.classList.toggle('unavailable', !active && owned <= 0);
    };
    set(flight, '↟ FLIGHT', flightActive, g?.flight || 0, flightOwned);
    set(shield, '⬡ SHIELD', shieldActive, g?.timedShield || 0, shieldOwned);
    for (const [timer, active, value] of [[flightTimer, flightActive, g?.flight || 0], [shieldTimer, shieldActive, g?.timedShield || 0]]) {
      if (!timer)continue;
      timer.hidden = !active;
      const label = timer.querySelector('b');
      if (label)label.textContent = value.toFixed(1) + 's';
    }
    for (const [button, active, owned, label] of [[flightButton, flightActive, flightOwned, 'USE FLIGHT'], [shieldButton, shieldActive, shieldOwned, 'USE SHIELD']]) {
      if (!button)continue;
      button.disabled = active || owned < 1;
      button.classList.toggle('active', active);
      button.setAttribute('aria-disabled', String(button.disabled));
      button.querySelector('span')?.replaceChildren(document.createTextNode(label));
      const count = button.querySelector('small');
      if (count)count.textContent = active?(button === flightButton?(g?.flight || 0).toFixed(1) + 's': (g?.timedShield || 0).toFixed(1) + 's'): owned > 0?'READY': '0';
    }
    for (const [button, active, owned, label] of [[flightMobile, flightActive, flightOwned, 'FLIGHT'], [shieldMobile, shieldActive, shieldOwned, 'SHIELD']]) {
      if (!button)continue;
      button.disabled = active || owned < 1;
      button.classList.toggle('active', active);
      button.setAttribute('aria-disabled', String(button.disabled));
      button.textContent = active?`${label} ${(button===flightMobile?(g?.flight||0):(g?.timedShield||0)).toFixed(1)}s`: owned > 0?`${label} READY`: `${label} 0`;
    }
    const state = $('shield-state');
    if (state) {
      state.textContent = shieldActive?'SHIELD ' + (g?.timedShield || 0).toFixed(1) + 's': shieldOwned > 0?'SHIELD READY': 'SHIELD UNAVAILABLE · 0';
      state.classList.toggle('armed', shieldActive || shieldOwned > 0);
    }
  }
  function guide(g, vt) {
    const goal = $('rift-goal'), coach = $('rift-coach');
    if (!goal || !coach)return;
    if (tutorialActive && tutorialStage === 'steer' && Math.abs(g.x - steerOrigin) > 1.5)advance(g);
    if (tutorialActive && tutorialStage === 'flightUse') {
      if (g.flight > 0)flightObserved = true;
      else if (flightObserved && g.flight === 0)advance(g);
    }
    if (tutorialActive && tutorialStage === 'nitroUse' && g.boost)advance(g);
    // A missed/consumed shield requires another real pickup in this same run.
    // Never keep publishing contact targets for an ability the car no longer has.
    if (tutorialActive && tutorialStage === 'shieldImpact' && !(g.shield > 0) && !(g.timedShield > 0)) {
      tutorialStage = 'shield';
      shieldPicked = false;
      g.tutorialTarget = null;
      saveTutorialProgress();
    }
    if (tutorialActive && tutorialStage === 'phase' && !(g.phaseTime > 0) && g.phaseCharge < 4) {
      tutorialStage = 'shards';
      shardCount = Math.max(0, g.phaseCharge || 0);
      g.tutorialTarget = null;
      saveTutorialProgress();
    }
    if (tutorialActive)flushPending(g);
    if (tutorialActive)E.scheduleTutorial(g, tutorialStage);
    const touch = innerWidth < 700 || !!window.matchMedia?.('(pointer: coarse)').matches;
    const labels = {
      steer: ['STEER THROUGH THE CORDON', touch?'HOLD ◀ / ▶ TO STEER': 'HOLD A / D OR ← / → TO STEER'], dodge: ['DODGE THE BARRIER', 'CHANGE LANES BEFORE CONTACT'], health: ['COLLECT HEALTH', 'DRIVE THROUGH THE HEART CELL'], ramp: ['TAKE THE RAMP', 'LINE UP WITH THE RAMP · LAUNCH AUTOMATICALLY'], jump: ['JUMP THE LOW RAIL', touch?'TAP JUMP BEFORE THE RAIL': 'PRESS SPACE BEFORE THE RAIL'], nitro: ['COLLECT NITRO', touch?'COLLECT THE FLAME · THEN HOLD NITRO': 'COLLECT THE FLAME · THEN HOLD SHIFT'], nitroUse: ['USE NITRO', touch?'HOLD NITRO TO BOOST': 'HOLD SHIFT TO BOOST'], shield: ['COLLECT THE BLUE SHIELD', 'BLOCKS ONE COLLISION'], shieldImpact: ['LET THE SHIELD ABSORB THE BLOCK', 'DRIVE THROUGH THE CENTRE BLOCK'], flight: ['COLLECT FLIGHT', 'DRIVE THROUGH THE FLIGHT PICKUP'], flightUse: ['FLY FOR 15 SECONDS', 'FLIGHT IS TEMPORARY · KEEP MOVING'], shards: [`COLLECT RIFT SHARDS · ${Math.min(4,shardCount)}/4`, 'RAINBOW SHARDS CHARGE PHASE SHIFT'], phase: ['PASS THROUGH THE PHASE WALL', touch?'TAP PHASE AS THE WALL APPROACHES · 4.8s': 'PRESS X AS THE WALL APPROACHES · 4.8s'], dronePower: ['COLLECT THE MINI DRONE', '15 SECONDS · NEXT ATTACK ×2'], pulse: ['DESTROY THE ORANGE-CORE DRONE', touch?'TAP PULSE BREAK NEAR THE DRONE': 'PRESS F NEAR THE DRONE'], drones: ['COMPANION DRONES ARE TARGETING', 'YOUR DRONES FOLLOW THE CAR AND CLEAR ORANGE TARGETS'], chase: ['SURVIVE THE CHASE', 'KEEP YOUR LANE · DO NOT WRECK'], portal: ['ENTER THE RIFT PORTAL', 'FOLLOW THE GLOWING ENTRY LANE']
    };
    let text = '', hint = '', tutorialText = '', tutorialHint = '';
    document.body.classList.remove('portal-approach');
    if (tutorialActive && tutorialStage !== 'complete' && !learnedHint(tutorialStage)) {
      [tutorialText, tutorialHint] = labels[tutorialStage] || ['FOLLOW THE RIFT GUIDE', ''];
    } else if (!tutorialActive) {
      const portal = [...g.rows.values()].find(r => r.distance > g.distance && r.distance - g.distance < 950 && r.objects.some(o => o.type === 'portal' && !o.resolved && o.x !== 99));
      const gate = approaching(g, 'gate', 240);
      const drone = approaching(g, 'drone', 220) || approaching(g, 'roadwork', 220);
      if (g.dimension && g.dimensionTime > 0) {
        text = (dimensionTips[g.dimension] || ('RIFT · ' + g.dimension.toUpperCase())) + ' · ' + Math.ceil(g.dimensionTime) + 's';
      } else if (portal) {
        const portalRange = [...g.rows.values()].filter(r => r.distance > g.distance && r.objects.some(o => o.type === 'portal' && !o.resolved && o.x !== 99)).map(r => r.distance - g.distance).sort((a, b) => a - b)[0] || 0;
        document.body.classList.toggle('portal-approach', portalRange <= 350);
        text = portalRange >= 200 && portalRange <= 350?'RIFT PORTAL AHEAD': 'RIFT AHEAD · ENTER THE GLOW';
        hint = portalRange >= 200 && portalRange <= 350?'HOLD YOUR LANE · FOLLOW THE GLOW': 'FOLLOW THE PORTAL LANE';
      } else if (abilityIntroduced('phase', g) && g.phaseCharge >= 4 && gate && !saved.abilityInstructions?.phase) {
        text = 'PHASE WALL AHEAD';
        hint = touch?'TAP PHASE SHIFT BEFORE CONTACT': 'PRESS X BEFORE CONTACT';
        saved.abilityInstructions = {
          ...(saved.abilityInstructions || {
          }), phase: true
        };
        persist();
      } else if (abilityIntroduced('pulse', g) && g.pulseCooldown === 0 && drone && !saved.abilityInstructions?.pulse) {
        text = 'PULSE TARGET AHEAD';
        hint = touch?'TAP PULSE BREAK NEAR THE TARGET': 'PRESS F NEAR THE TARGET';
        saved.abilityInstructions = {
          ...(saved.abilityInstructions || {
          }), pulse: true
        };
        persist();
      }
    }
    if (text !== lastGoal) {
      goal.textContent = text;
      lastGoal = text;
    }
    goal.dataset.hint = hint;
    goal.classList.toggle('visible', !!text);
    goal.setAttribute('aria-hidden', String(!text));
    const tutorialVisible = !!tutorialText;
    coach.textContent = tutorialVisible?(tutorialHint?tutorialText + ' · ' + tutorialHint: tutorialText): '';
    coach.hidden = !tutorialVisible;
    coach.classList.toggle('visible', tutorialVisible);
    coach.setAttribute('aria-hidden', String(!tutorialVisible));
    const legacy = $('tutorial');
    if (legacy) {
      legacy.hidden = true;
      legacy.setAttribute('aria-hidden', 'true');
    }
    const r = [...g.rows.values()].filter(r => r.distance > g.distance && r.objects.some(o => o.type === 'portal' && !o.resolved && o.x !== 99)).sort((a, b) => a.distance - b.distance)[0];
    const range = r?.distance - g.distance, detected = Number.isFinite(range) && range > 0 && range < 950;
    $('rift-horizon')?.style.setProperty('--rift-proximity', detected?String(Math.max(.18, 1 - range / 1050)): '0');
    document.body.classList.toggle('portal-approach', !!(detected && range <= 350 && !g.dimension));
    if (detected && !riftWarned) {
      riftWarned = true;
      note('UNKNOWN SIGNAL DETECTED · PORTAL AHEAD', true);
      vt?.tone?.(380, .65, 'sine', .11, 120);
    }
    if (Number.isFinite(range) && range > 0 && range <= 350 && performance.now() - portalHumAt > 520) {
      portalHumAt = performance.now();
      vt?.tone?.(210 + Math.max(0, 350 - range) * 1.2, .18, 'sawtooth', .035, 110);
    }
  }
  function approaching(g, type, range) {
    return [...g.rows.values()].some(r => r.distance - g.distance > 15 && r.distance - g.distance < range && r.objects.some(o => o.type === type));
  }
  function sparks(color, count = 8) {
    const el = $('rift-sparks');
    if (!el)return;
    for (let i = 0;
    i < Math.min(count, 12);
    i++) {
      const x = document.createElement('i');
      if (!x.style)x.style = {
        setProperty() {
        }
      };
      x.style.setProperty?.('--c', color);
      x.style.setProperty?.('--dx', (Math.random() - .5) * 180 + 'px');
      x.style.setProperty?.('--dy', ( - Math.random() * 140 - 30) + 'px');
      x.style.left = (45 + Math.random() * 10) + '%';
      el.append(x);
      x.addEventListener?.('animationend', () => x.remove?.(), {
        once: true
      });
    }
  }
  function vehicleTrail(car, camera) {
    const el = $('rift-sparks');
    if (!el || !car || !camera)return;
    const width = el.clientWidth, height = el.clientHeight;
    for (const side of [ - 1, 1]) {
      const p = car.position.clone();
      p.x += side * .6;
      p.y += .34;
      p.z += 1.3;
      p.project(camera);
      if (Math.abs(p.x) > 1 || Math.abs(p.y) > 1 || p.z > 1)continue;
      const dot = document.createElement('i');
      dot.dataset.trail = '';
      dot.style.setProperty('--c', saved.equipped === 'prism'?(side < 0?'#ff89df': '#82edff'): '#55eaff');
      dot.style.left = ((p.x + 1) * .5 * width) + 'px';
      dot.style.top = ((1 - p.y) * .5 * height) + 'px';
      el.append(dot);
      dot.addEventListener('animationend', () => dot.remove(), {
        once: true
      });
    }
  }
  function boost(type) {
    const g = window.__NEON__?.state;
    if (!g || window.__NEON__.view !== 'hud' || window.__NEON__.paused || g.status !== 'running')return;
    const yes = type === 'phase'?E.activatePhase(g): E.activatePulse(g);
    if (yes) {
      if (type === 'phase')phaseReadyAnnounced = false;
      note(type === 'phase'?'PHASE SHIFT · YOU ARE INTANGIBLE': 'PULSE BREAK · DESTROY ORANGE-CORE HAZARDS', true);
      flash(type === 'phase'?'#8c6bff': '#ffbf50');
      sparks(type === 'phase'?'#cf8cff': '#ffd376', 12);
      try {
        const context = new (window.AudioContext || window.webkitAudioContext)(), osc = context.createOscillator(), gain = context.createGain();
        osc.type = type === 'phase'?'sine': 'sawtooth';
        osc.frequency.setValueAtTime(type === 'phase'?880: 210, context.currentTime);
        osc.frequency.exponentialRampToValueAtTime(type === 'phase'?220: 840, context.currentTime + .32);
        gain.gain.setValueAtTime(.09, context.currentTime);
        gain.gain.exponentialRampToValueAtTime(.0001, context.currentTime + .4);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + .4);
        osc.onended = () => context.close();
      } catch {
      }
    }
  }
  function paintMissions(g, te) {
    const date = new Date().toISOString().slice(0, 10), list = E.missions;
    const daily = [list[(date.length * 7 + Number(date.replace(/-/g, ''))) % list.length], list[(Number(date.slice( - 2)) + 3) % list.length]];
    const out = $('rift-missions');
    if (!out)return;
    out.replaceChildren();
    for (const m of [...daily.map(v => ({
      ...v, daily: true
    })), ...list.filter(m => !saved.completed?.[m.id]).slice(0, 2)]) {
      const key = m.daily?date + ':' + m.id: m.id, done = m.daily?saved.daily?.[key]: saved.completed?.[key];
      const value = Math.min(m.target, Math.max(0, g?.[m.key] || 0));
      const row = document.createElement('div');
      row.className = done?'done': '';
      const title = document.createElement('span');
      title.textContent = m.label;
      const progress = document.createElement('b');
      progress.textContent = done?'✓': Math.floor(value) + ' / ' + m.target;
      row.append(title, progress);
      out.append(row);
    }
  }
  function updateCosmetics() {
    const box = $('rift-cosmetics'), te = window.__NEON__?.saved;
    if (!box || !te)return;
    box.replaceChildren();
    for (const [id, label, cost] of [['standard', 'STANDARD TRAIL', 0], ['plasma', 'PLASMA TRAIL', 550], ['prism', 'PRISM TRAIL', 900]]) {
      const b = document.createElement('button');
      b.textContent = label + ' · ' + (saved.equipped === id?'EQUIPPED': saved.cosmetics[id] || !cost?'EQUIP': cost + ' CR');
      b.disabled = !!(cost && !saved.cosmetics[id] && te.credits < cost);
      b.onclick = () => {
        if (!saved.cosmetics[id] && cost) {
          if (!window.__NEON__?.purchaseRiftCosmetic(cost))return;
          saved.cosmetics[id] = true;
        }
        saved.equipped = id;
        persist();
        updateCosmetics();
        $('credits').textContent = window.__NEON__.saved.credits;
      };
      box.append(b);
    }
  }
  const api = {
    guide, start(g, te) {
      g.runs = te.runs || 0;
      const replay = tutorialReplay;
      replayingTutorial = replay;
      tutorialActive = replay || !saved.tutorialComplete;
      g.tutorialMode = tutorialActive;
      tutorialReplay = false;
      const restored = saved.tutorialStage && lessons.includes(saved.tutorialStage) && saved.tutorialStage !== 'complete'?saved.tutorialStage: 'steer';
      const prerequisite = {
        shieldImpact: 'shield', flightUse: 'flight', phase: 'shards'
      };
      tutorialStage = tutorialActive?(replay?'steer': (prerequisite[restored] || restored)): 'complete';
      pendingTutorialEvents = [];
      if (Array.isArray(saved.dimensionVisited))g.dimensionVisited = saved.dimensionVisited.slice();
      steerOrigin = g.x;
      manualJump = false;
      shieldPicked = false;
      nitroPicked = false;
      shardCount = 0;
      flightObserved = false;
      g.tutorialTarget = null;
      tutorialToneAt = - 1;
      previousBoost = false;
      last = g;
      lastMissionUpdate = - 1;
      lastGoal = '';
      riftWarned = false;
      portalHumAt = 0;
      phaseReadyAnnounced = false;
      trailTick = - 1;
      noticeQueue.length = 0;
      noticeActive = false;
      clearTimeout(noticeTimer);
      clearTimeout(creditNoticeTimer);
      g._coinTrail = 0;
      $('rift-notice').textContent = '';
      const dimensionCard = $('dimension-card');
      if (dimensionCard) {
        dimensionCard.textContent = '';
        dimensionCard.className = '';
      }
      document.body.classList.remove('rift-active', 'rift-transition', 'dimension-reveal', 'nitro-active', 'shield-active', 'flight-active', 'portal-approach', 'portal-warp', 'portal-exit');
      document.body.dataset.dimension = '';
      document.querySelectorAll('#rift-sparks i,#rift-flash').forEach(e => e.getAnimations().forEach(a => a.cancel()));
      paintMissions(g, te);
      if (tutorialActive && !replay) {
        saved.tutorialComplete = false;
        saved.tutorialStage = tutorialStage;
        persist();
      }
      if (tutorialActive && tutorialStage === 'steer')note('START RUN · STEER TO YOUR SAFE LANE');
    }, finish(g, te) {
      if (!g)return 0;
      const date = new Date().toISOString().slice(0, 10), before = saved.credits || 0;
      if (tutorialActive && !replayingTutorial) {
        saved.tutorialComplete = false;
        saved.tutorialStage = tutorialStage;
        saved.tutorialCompleted = saved.tutorialCompleted || {
        };
        persist();
      }
      saved.dimensionVisited = Array.isArray(g.dimensionVisited)?g.dimensionVisited.slice(): saved.dimensionVisited;
      E.completeMissions(g, saved, date);
      const gained = (saved.credits || 0) - before;
      te.credits += gained;
      persist();
      paintMissions(g, te);
      const stats = $('rift-result');
      if (stats)stats.textContent = `${g.portals} PORTALS · ${g.shards} SHARDS · ${g.near} CLOSE CALLS · ${g.chains} CHAINS · ${g.riskClears} DANGER ROUTES · +${gained} MISSION CR`;
      requestAnimationFrame(() => {
        const copy = $('result-copy');
        if (copy)copy.textContent = `${(g.distance/1000).toFixed(2)} km survived · ${g.portals} rifts escaped · ${g.pulseUses} pulse bursts. ${g.portals?'The pursuit is still hunting you.':'The next rift is waiting farther down the road.'}`;
        const retry = $('retry');
        if (retry)retry.firstChild.textContent = 'RUN AGAIN ';
      });
      return gained;
    }, frame(g, dt, car, camera, vt) {
      if (!g || !$('rift-panel'))return;
      activeCar = car;
      const touch = innerWidth < 700 || matchMedia('(pointer:coarse)').matches;
      const nk = document.querySelector('.nitro .label');
      if (nk && nk.dataset.touch !== String(touch)) {
        nk.innerHTML = touch?'NITRO': '<b>SHIFT</b> / NITRO';
        nk.dataset.touch = String(touch);
      }
      if (g.time - lastMissionUpdate >= 1) {
        paintMissions(g, window.__NEON__?.saved);
        lastMissionUpdate = g.time;
      }
      const phase = $('rift-phase'), pulse = $('rift-pulse'), powers = phase?.parentElement;
      const phaseKnown = abilityIntroduced('phase', g), pulseKnown = abilityIntroduced('pulse', g), phaseVisible = phaseKnown || pulseKnown;
      if (phase) {
        const pct = Math.max(0, Math.min(100, (g.phaseCharge || 0) / 4 * 100));
        phase.querySelector('i').style.width = pct + '%';
        phase.querySelector('b').textContent = g.phaseTime > 0?g.phaseTime.toFixed(1) + 's': g.phaseCharge >= 4?'READY': (g.phaseCharge || 0) + ' / 4';
        phase.classList.toggle('ready', g.phaseCharge >= 4 || g.phaseTime > 0);
        phase.disabled = !phaseKnown || !(g.phaseTime > 0 || g.phaseCharge >= 4);
        phase.hidden = !phaseKnown;
        phase.setAttribute('aria-hidden', String(!phaseKnown));
      }
      if (pulse) {
        const cooldown = Math.max(0, g.pulseCooldown || 0);
        pulse.querySelector('i').style.width = (g.pulseTime > 0?100: 100 * (1 - cooldown / 12)) + '%';
        pulse.querySelector('b').textContent = g.pulseTime > 0?g.pulseTime.toFixed(1) + 's': cooldown > 0?cooldown.toFixed(1) + 's': 'READY';
        pulse.classList.toggle('ready', g.pulseTime > 0 || cooldown === 0);
        pulse.disabled = !pulseKnown || !(g.pulseTime > 0 || cooldown === 0);
        pulse.hidden = !pulseKnown;
        pulse.setAttribute('aria-hidden', String(!pulseKnown));
      }
      if (powers)powers.hidden = !phaseVisible;
      const mobilePhase = $('mobile-phase'), mobilePulse = $('mobile-pulse');
      for (const [button, known, ready] of [[mobilePhase, phaseKnown, g.phaseCharge >= 4 || g.phaseTime > 0], [mobilePulse, pulseKnown, g.pulseCooldown === 0 || g.pulseTime > 0]]) {
        if (!button)continue;
        button.hidden = !known;
        button.disabled = !known || !ready;
        button.setAttribute('aria-hidden', String(!known));
      }
      paintPowerStatus(g, window.__NEON__?.saved);
      const dim = E.dimensions.find(d => d.id === g.dimension);
      document.body.classList.toggle('rift-active', g.phaseTime > 0);
      document.body.dataset.dimension = g.dimension || (g.riskTime > 0?'risk': '');
      document.body.style.setProperty('--dimension-color', dim?.color || '#46f3ff');
      camera.userData = camera.userData || {
      };
      // Yx is the sole owner of projection FOV. Keep UI state diagnostic-only so
      // shield/flight FOV cannot be damped back to the old 58/72 base here.
      camera.userData.neonUiFov = {
        portraitBase: window.innerWidth < 700?72: 58, shield: !!g.shield, flight: !!g.flight, portal: !!g.portalPhase
      };
      const d = g.distance;
      if (g.boost && !previousBoost) {
        if (!saved.tutorialComplete && !saved.tutorialCompleted?.nitroUse && !saved.abilityInstructions?.nitro) {
          note('NITRO BOOST · HOLD TO ACCELERATE');
          saved.abilityInstructions = {
            ...(saved.abilityInstructions || {
            }), nitro: true
          };
          persist();
        }
        flash('#45dcff');
        sparks('#64eaff', 8);
        vt?.tone?.(330, .25, 'sawtooth', .08, 680);
      }
      previousBoost = !!g.boost;
      document.body.classList.toggle('nitro-active', !!g.boost);
      document.body.classList.toggle('shield-active', !!g.shield);
      const upper = $('upper-route-indicator'), onUpper = g.routeLevel === 'UPPER' || g.routePhase === 'ASCEND' || g.routePhase === 'DESCEND';
      if (upper) {
        upper.hidden = !onUpper;
        upper.classList.toggle('transitioning', g.routePhase !== 'UPPER');
        upper.querySelector('b').textContent = g.routePhase === 'ASCEND'?'ASCENDING': g.routePhase === 'DESCEND'?'RETURNING': 'SCORE +25%';
      }
      guide(g, vt);
      if (saved.equipped !== 'standard' && g.time - trailTick >= (innerWidth < 700?.14: .08)) {
        trailTick = g.time;
        vehicleTrail(car, camera);
      }
    }, event(ev, g, vt, fn, pl, removeWorldObject, lt) {
      const retireWorldObject = key => {
        if (typeof removeWorldObject === 'function') {
          removeWorldObject(key);
          return;
        }
        const world = window.__NEON__?.worldObjects, object = world?.get?.(key);
        if (object) {
          object.visible = false;
          world.delete?.(key);
        }
      };
      E.recordEvent?.(g, ev);
      rememberDiscovery(ev);
      observe(ev, g);
      if (ev.type === 'drone-shot') {
        vt.tone(1080, .11, 'sawtooth', .06, 180);
        return true;
      }
      if (ev.type === 'near-reward') {
        const mult = Math.max(1, ev.multiplier || 1);
        note('NEAR MISS' + (mult > 1?' x' + mult: '') + ' · +' + (ev.bonus || 100) + ' SCORE');
        document.body.classList.add('near-miss-pulse');
        setTimeout(() => document.body.classList.remove('near-miss-pulse'), 220);
        vt.tone(610 + mult * 55, .07, 'sine', .055, 820);
        return true;
      }
      if (ev.type === 'perfect-phase') {
        note('PERFECT PHASE · +' + (ev.bonus || 260));
        sparks('#b78cff', 7);
        vt.tone(920, .16, 'sine', .09, 260);
        return true;
      }
      if (ev.type === 'overdrive-ready') {
        note((window.matchMedia?.('(pointer: coarse)').matches?'OVERDRIVE READY · TAP OVERDRIVE': 'OVERDRIVE READY · PRESS R'), true);
        vt.tone(760, .22, 'triangle', .09, 980);
        return true;
      }
      if (ev.type === 'overdrive-start') {
        note('OVERDRIVE · 6 SECONDS', true);
        sparks('#7dfff0', 9);
        vt.tone(330, .5, 'sawtooth', .10, 960);
        return true;
      }
      if (ev.type === 'overdrive-break') {
        note('OVERDRIVE BREAK');
        sparks('#ffd66d', 5);
        return true;
      }
      if (ev.type === 'coin') {
        const count = Math.max(1, Math.min(10, g.rows?.get(ev.index)?.objects?.[ev.j]?.trailCount | 0 || 1)), gained = count * 5;
        g._coinTrail = (g._coinTrail || 0) + gained;
        const total = g._coinTrail;
        vt.tone(520 + Math.min(360, total * 7), .085, 'triangle', .055, Math.min(900, 600 + total * 5));
        sparks('#ffe18b', Math.min(5, 2 + count));
        if (ev.index != null && ev.j != null)retireWorldObject(ev.index + ':' + ev.j);
        clearTimeout(creditNoticeTimer);
        creditNoticeTimer = setTimeout(() => {
          const credits = g._coinTrail || 0;
          if (credits > 0)note('CREDIT TRAIL · +' + credits + ' CR');
          g._coinTrail = 0;
        }, 240);
        return true;
      }
      if (ev.type === 'ramp') {
        const upper = ev.outcome === 'upper-route';
        note(upper?'UPPER ROUTE · SCORE +25%': 'RAMP LAUNCH · AIRBORNE', true);
        flash(upper?'#ffd45b': '#6ceaff');
        sparks(upper?'#ffe990': '#8ceeff', 10);
        vt?.tone?.(upper?260: 170, .38, 'sine', .13, 720);
        if (ev.index != null && ev.j != null)retireWorldObject(ev.index + ':' + ev.j);
        return true;
      }
      if (ev.type === 'nitro') {
        note(learnedHint('nitroUse')?'NITRO REFILLED': 'NITRO REFILLED · ' + ((innerWidth < 700 || window.matchMedia?.('(pointer: coarse)').matches)?'HOLD NITRO': 'HOLD SHIFT'));
        flash('#3ae9ff');
        sparks('#6fefff', 9);
        return false;
      }
      if (ev.type === 'double' || ev.type === 'scoreBoost') {
        vt.fx('cell');
        if (ev.index != null && ev.j != null)retireWorldObject(ev.index + ':' + ev.j);
        note('SCORE ×2 ACTIVE · 12 SECONDS');
        flash('#ffd66d');
        sparks('#ffe18b', 10);
        return true;
      }
      if (ev.type === 'energyShield') {
        note('SHIELD ARMED · ONE HIT BLOCKED');
        flash('#967bff');
        sparks('#bcb1ff', 8);
        return false;
      }
      if (ev.type === 'flight' || ev.type === 'flightBoost') {
        vt.tone(270, .65, 'sine', .12, 980);
        note('FLIGHT ONLINE · 15 SECONDS', true);
        flash('#78e6ff');
        sparks('#92f5ff', 12);
        return false;
      }
      if (ev.type === 'dronePower') {
        note('DRONES OVERCHARGED · 15 SECONDS · DUAL TARGET');
        flash('#ff9e52');
        sparks('#ffc477', 10);
        return false;
      }
      if (ev.type === 'chase-start') {
        vt.tone(780, .5, 'triangle', .15, 260);
        note('WARNING · INTERCEPTOR DETECTED', true);
        flash('#ff536f');
        return false;
      }
      if (ev.type === 'chase-end' && ev.outcome === 'escaped') {
        note('INTERCEPTOR ESCAPED · +' + (ev.credits || 0) + ' CR', true);
        flash('#63f0b0');
        sparks('#8dffc8', 10);
        return false;
      }
      if (ev.type === 'upper-route-cleared') {
        note('UPPER ROUTE CLEARED · +100 SCORE · +20 CR', true);
        flash('#ffd45b');
        sparks('#ffe990', 14);
        vt.tone(840, .35, 'triangle', .15, 220);
        return true;
      }
      if (ev.type === 'dimension-end') {
        const reward = ev.credits || 45, message = 'RIFT ESCAPED · +' + reward + ' CR', card = $('dimension-card');
        if (card) {
          card.textContent = message;
          card.className = 'visible exit';
        }
        note(message, true);
        flash('#64ffc0');
        sparks('#8dffc8', 16);
        vt.tone(560, .55, 'triangle', .16, 180);
        document.body.classList.add('portal-exit');
        setTimeout(() => {
          document.body.classList.remove('portal-exit');
          if (card) {
            card.className = '';
            card.textContent = '';
          }
        }, 1800);
        return true;
      }
      if (ev.type === 'portal') {
        vt.tone(730, .55, 'sine', .11, 110);
        note('RIFT ENTRY', true);
        document.body.classList.add('portal-entry-burst');
        setTimeout(() => document.body.classList.remove('portal-entry-burst'), 760);
        sparks('#a988ff', 8);
        return false;
      }
      if (ev.type === 'run-event' && ['riftStorm', 'meteorShower', 'gravityWave', 'timeFracture'].includes(ev.event)) {
        const names = {
          riftStorm: 'ENERGY STORM · AVOID LASERS', meteorShower: 'METEOR SHOWER · WATCH THE LANES', gravityWave: 'GRAVITY WAVE · LONGER JUMPS', timeFracture: 'TIME FRACTURE · SLOW MOTION'
        };
        note(names[ev.event]);
        flash('#b765ff');
        sparks('#ffad78', 10);
        vt.tone(260, .5, 'sawtooth', .12, 70);
        return true;
      }
      if (ev.type === 'run-event-end')g.eventsSurvived = (g.eventsSurvived || 0) + 1;
      if (ev.type === 'rift-combo') {
        if (ev.multiplier >= 2 && ev.multiplier !== last?.lastAnnounced) {
          last.lastAnnounced = ev.multiplier;
          note('COMBO x' + ev.multiplier + ' · ' + ev.tag);
          vt.tone(520 + ev.multiplier * 85, .12);
        }
        return true;
      }
      if (ev.type === 'dimension-start') {
        const d = E.dimensions.find(x => x.id === ev.dimension), message = dimensionTips[ev.dimension] || ('DIMENSION: ' + ev.label), card = $('dimension-card');
        riftWarned = false;
        if (card) {
          card.textContent = message;
          card.dataset && (card.dataset.dimension = ev.dimension);
          card.className = 'visible entry';
        }
        note(message, true);
        flash(d?.color || '#b767ff');
        sparks(d?.color || '#b767ff', 18);
        const revealMs = 900;
        document.body.classList.add('rift-transition', 'dimension-reveal');
        setTimeout(() => document.body.classList.remove('rift-transition'), 700);
        setTimeout(() => {
          document.body.classList.remove('dimension-reveal');
          if (card) {
            card.className = '';
            card.textContent = '';
            card.dataset && delete card.dataset.dimension;
          }
        }, revealMs);
        vt.tone(930, .7, 'sine', .18, 170);
        return true;
      }
      if (ev.type === 'phase-start') {
        vt.tone(270, .6, 'sine', .14, 920);
        return true;
      }
      if (ev.type === 'pulse-start') {
        vt.tone(160, .35, 'triangle', .18, 65);
        return true;
      }
      if (ev.type === 'phase-end' || ev.type === 'pulse-end')return true;
      if (ev.type === 'risk-start') {
        note('DANGER ROUTE · x2 REWARDS');
        flash('#ff4c65');
        return true;
      }
      if (ev.type === 'risk-failed') {
        note('SAFE ROUTE · BONUS LOST');
        return true;
      }
      if (ev.type === 'risk-end') {
        note('RISK CLEARED · +40 CR');
        vt.tone(790, .2);
        return true;
      }
      if (ev.type === 'pulse-break') {
        const ob = window.__NEON__?.worldObjects?.get(ev.index + ':' + ev.j);
        window.NeonArt?.impact(ob);
        retireWorldObject(ev.index + ':' + ev.j);
        note('PULSE BREAK · TARGET DESTROYED');
        vt.tone(190, .28, 'sawtooth', .14, 80);
        return true;
      }
      if (['portal', 'phaseShard', 'risk', 'chain'].includes(ev.type)) {
        retireWorldObject(ev.index + ':' + ev.j);
        if (ev.type === 'phaseShard') {
          vt.tone(540, .13, 'sine', .08, 810);
          if (g.phaseCharge === 4 && !phaseReadyAnnounced) {
            phaseReadyAnnounced = true;
            note(window.matchMedia?.('(pointer: coarse)').matches?'PHASE SHIFT READY · TAP PHASE BUTTON': 'PHASE SHIFT READY · X TO PHASE THROUGH WALLS');
          } else if (g.shards === 1)note('RAINBOW SHARDS CHARGE THE RIFT ENGINE');
          sparks('#ad6dff', 5);
        }
        if (ev.type === 'chain' && g.chains > 0)note('ENERGY CHAIN · +60 CR');
        return true;
      }
      if (ev.type === 'shield-save') {
        window.NeonArt?.shieldBreak?.(activeCar);
        note('SHIELD SHATTERED · 0 HITS');
        flash('#bc85ff');
        sparks('#dc9dff', 12);
        vt.tone(490, .4, 'square', .16, 70);
        return true;
      }
      if (ev.outcome === 'phased') {
        const wall = window.__NEON__?.worldObjects?.get(ev.index + ':' + ev.j);
        if (wall)window.NeonArt?.phaseContact?.(wall);
        note('YOU PASSED THROUGH MATTER');
        flash('#7458c7');
        return true;
      }
      if (ev.outcome === 'jump') {
        note('PERFECT JUMP · +110');
        vt.tone(660, .1);
        return true;
      }
      if (ev.outcome === 'break') {
        retireWorldObject(ev.index + ':' + ev.j);
        sparks('#ffd66d', 8);
        note('PULSE BREAK');
        return true;
      }
      return false;
    }, boost, notice: note, get saved() {
      return saved;
    }, get tutorialStage() {
      return tutorialStage;
    }
  };
  window.NeonUI = api;
  window.addEventListener('keydown', e => {
    if (e.repeat)return;
    if (e.code === 'KeyX') {
      e.preventDefault();
      boost('phase');
    }
    if (e.code === 'KeyF') {
      e.preventDefault();
      boost('pulse');
    }
  });
  window.addEventListener('DOMContentLoaded', () => {
    const h = $('hud');
    if (!h)return;
    const panel = document.createElement('div');
    panel.id = 'rift-panel';
    panel.innerHTML = '<div id="upper-route-indicator" hidden><span>UPPER ROUTE</span><b>SCORE +25%</b></div><div class="rift-powers"><button id="rift-phase" aria-label="Activate Phase Shift to pass through walls"><span>◇ X · PHASE SHIFT</span><b>0 / 4</b><i></i></button><button id="rift-pulse" aria-label="Activate Pulse Break to destroy orange-core hazards"><span>✦ F · PULSE BREAK</span><b>READY</b><i></i></button></div><div class="ability-statuses" aria-live="polite"><div id="flight-status" class="ability-status"><span>↟ FLIGHT</span><b>UNAVAILABLE</b></div><div id="shield-status" class="ability-status shield"><span>⬡ SHIELD</span><b>UNAVAILABLE</b></div></div><div class="owned-powers" aria-label="Owned boosters"></div>';
    h.append(panel);
    const ownedPowers = panel.querySelector('.owned-powers');
    for (const id of ['flight-owned', 'shield-owned']) {
      const button = $(id);
      if (button && ownedPowers)ownedPowers.append(button);
    }
    $('booster-bar')?.setAttribute('aria-hidden', 'true');
    if (window.matchMedia?.('(pointer: coarse)').matches) {
      $('rift-phase').querySelector('span').textContent = '◇ PHASE SHIFT';
      $('rift-pulse').querySelector('span').textContent = '✦ PULSE BREAK';
    }
    const fx = document.createElement('div');
    fx.id = 'rift-sparks';
    h.append(fx);
    const flashEl = document.createElement('div');
    flashEl.id = 'rift-flash';
    h.append(flashEl);
    const notice = document.createElement('div');
    notice.id = 'rift-notice';
    h.append(notice);
    const dimensionCard = document.createElement('div');
    dimensionCard.id = 'dimension-card';
    dimensionCard.setAttribute('aria-live', 'assertive');
    document.body.append(dimensionCard);
    const goal = document.createElement('div');
    goal.id = 'rift-goal';
    goal.setAttribute('aria-live', 'polite');
    h.append(goal);
    const coach = document.createElement('div');
    coach.id = 'rift-coach';
    h.append(coach);
    const horizon = document.createElement('div');
    horizon.id = 'rift-horizon';
    h.append(horizon);
    $('tutorial-replay-pause')?.addEventListener('click', () => {
      tutorialReplay = true;
      $('abandon')?.click();
      setTimeout(() => $('retry')?.click(), 0);
    });
    $('rift-phase').onclick = () => boost('phase');
    $('rift-pulse').onclick = () => boost('pulse');
    $('mobile-phase')?.addEventListener('click', () => boost('phase'));
    $('mobile-pulse')?.addEventListener('click', () => boost('pulse'));
    const garage = $('garage');
    const title = document.createElement('h3');
    title.textContent = 'RIFT TRAILS · COSMETIC ONLY';
    garage.querySelector('.garage-panel')?.append(title);
    const cosmetics = document.createElement('div');
    cosmetics.id = 'rift-cosmetics';
    garage.querySelector('.garage-panel')?.append(cosmetics);
    $('garage-open')?.addEventListener('click', updateCosmetics);
    $('result-home')?.addEventListener('click', () => requestAnimationFrame(updateCosmetics));
    const result = document.createElement('p');
    result.id = 'rift-result';
    $('result-stats')?.after(result);
  });
})();
