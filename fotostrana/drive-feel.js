/* Speed values are metres/second. 1500 KM/H is reserved for explicit maximum-speed boosts only. */
(function(root) {
  'use strict';
  const MAX_SPEED = 1500 / 3.6;
  const NITRO_MAX_SPEED = 1100 / 3.6;
  const HYPER_MAX_SPEED = 900 / 3.6;
  const NORMAL_MAX_SPEED = 700 / 3.6;
  const POWER_SECONDS = 15, DRONE_POWER_SECONDS = 15, DRONE_ATTACK_SECONDS = 15, SCORE_SECONDS = 12;
  const finite = (n, f = 0) => Number.isFinite(n)?n: f;
  const clamp = n => Math.max(0, Math.min(MAX_SPEED, finite(n)));
  const clampNormal = n => Math.max(0, Math.min(NORMAL_MAX_SPEED, finite(n)));
  function accelerate(speed, target, boost, accel = 1) {
    speed = clamp(speed);
    target = clamp(target);
    return clamp(speed + (target - speed) * (boost?.13: .012) * finite(accel, 1));
  }
  function normalCap(g) {
    const fallback = Math.max(finite(g?.stats?.speed, 62), 122);
    return clampNormal(finite(g?.stats?.normalCap, fallback));
  }
  function activateShield(g) {
    g.shield = 1;
    g.timedShield = POWER_SECONDS;
    g.shieldGrace = 0;
    g.powerMode = true;
    // Shield is defensive only: never force the vehicle to boost speed.
    g.events?.push?.({
      type: 'shield-power'
    });
    return true;
  }
  function activateFlight(g) {
    g.flight = POWER_SECONDS;
    g.flightDuration = POWER_SECONDS;
    // Flight changes vertical gameplay, not cruise speed. Nitro remains an optional speed choice.
    g.events?.push?.({
      type: 'flight-start'
    });
    return true;
  }
  function powerTick(g, dt, stageSpeed, legacyCap = MAX_SPEED, boost = false) {
    dt = Math.max(0, Math.min(.1, finite(dt)));
    g.flight = Math.max(0, (g.flight || 0) - dt);
    if (g.shield) {
      if (!(g.timedShield > 0))g.timedShield = POWER_SECONDS;
      g.timedShield = Math.max(0, g.timedShield - dt);
      if (g.timedShield < 1e-6) {
        g.timedShield = 0;
        g.shield = 0;
        g.events?.push?.({
          type: 'shield-ended'
        });
      }
    }
    g.powerMode = !!g.shield;
    const start = Math.max(36, finite(g.stats?.speed, 62));
    const cap = normalCap(g);
    // Distance/time may raise the normal cruise target, but it can never exceed the car + PERFORMANCE cap.
    const progression = start + Math.max(0, finite(g.time)) * .80;
    const stage = Math.min(cap, Math.max(0, finite(stageSpeed, start)));
    const normal = clampNormal(Math.min(cap, Math.max(start, stage, progression)));
    g.normalSpeed = normal;
    g.normalCap = cap;
    // 1500 KM/H is reserved for an explicit maximum-speed boost (Super Nitro while Nitro is held).
    // Regular Nitro is deliberately lower so normal gameplay remains readable.
    const superBoost = !!boost && (g.superNitro || 0) > 0;
    const overdrive = (g.overdrive || 0) > 0;
    const hyper = !boost && !overdrive && g.dimension === 'hyper';
    const overdriveTarget = Math.min(MAX_SPEED, Math.max(normal, 1250 / 3.6));
    const desired = superBoost?MAX_SPEED: overdrive?overdriveTarget: boost?NITRO_MAX_SPEED: hyper?Math.max(normal, Math.min(HYPER_MAX_SPEED, normal * 1.28)): normal;
    if (g._nitroWasActive && !boost) {
      g._nitroWasActive = false;
      g._boostReturn = Math.max(g._boostReturn || 0, 3.0);
    }
    if (boost)g._nitroWasActive = true;
    g.targetSpeed = desired;
    g.speed = clamp(g.speed);
    if (g.speed > desired + .25) {
      // Smoothly shed temporary boost speed instead of snapping down or staying at boost velocity.
      const k = (g._boostReturn || 0) > 0?1.18: .82;
      g.speed = desired + (g.speed - desired) * Math.exp( - k * dt);
      g._boostReturn = Math.max(0, (g._boostReturn || 0) - dt);
      if (Math.abs(g.speed - desired) < .35)g.speed = desired;
    } else {
      const accel = Math.max(.65, finite(g.stats?.accel, 1));
      const rate = (superBoost?105: overdrive?88: boost?72: hyper?25: 13) * accel;
      const delta = desired - g.speed;
      const maxUp = rate * dt, maxDown = rate * 1.35 * dt;
      g.speed = clamp(g.speed + Math.max( - maxDown, Math.min(maxUp, delta)));
    }
    if (!boost && !hyper && g.speed <= normal + .35)g.speed = Math.min(g.speed, normal);
    return g.speed;
  }
  function policeWave(g, next) {
    if (g.wave === next)return;
    const previous = g.wave;
    g.wave = next;
    g.events = g.events || [];
    g.events.push({
      type: next === 'hot'?'heat': next === 'warning'?'warning': 'cool'
    });
    if (next === 'hot') {
      g.chaseActive = true;
      g.chaseSequence = (g.chaseSequence || 0) + 1;
      g.events.push({
        type: 'chase-start', id: g.chaseSequence, time: g.time, heat: g.tier || 0
      });
      const reaction = Math.max(200, clamp(g.speed) * 2.2), horizon = Math.max(reaction + 400, clamp(g.speed) * 8);
      let threats = 0;
      for (const row of [...(g.rows?.values?.() || [])].sort((a, b) => a.distance - b.distance)) {
        if (threats >= 3 || (g.tutorialMode === true || g._tutorial === true) && g.tutorialTarget?.lesson !== 'chase' && g.tutorialPending?.lesson !== 'chase')break;
        const ahead = row.distance - g.distance;
        if (ahead < reaction || ahead > horizon || row.index % 3 !== 0)continue;
        const lane = [ - 5, 0, 5].find(x => x !== row.safeX && !row.objects.some(o => Math.abs(o.x - x) < 2));
        if (lane === undefined)continue;
        row.objects.push({
          type: 'drone', x: lane, police: true, chaseId: g.chaseSequence
        });
        threats++;
      }
      g.chaseThreats = threats;
    } else if (previous === 'hot' && g.chaseActive && g.status === 'running') {
      g.chaseActive = false;
      g.chases = (g.chases || 0) + 1;
      const credits = 75, score = 400 * (g.doubleScore > 0?2: 1);
      g.runCredits = (g.runCredits || 0) + credits;
      g.score = (g.score || 0) + score;
      g.events.push({
        type: 'chase-end', id: g.chaseSequence, time: g.time, outcome: 'escaped', credits, score
      });
    }
  }
  function lookahead(speed) {
    return speed * 3.6 >= 700?Math.min(28, Math.max(14, Math.ceil(speed / 24) + 7)): 10;
  }
  function drawDistance(speed) {
    return Math.max(760, clamp(speed) * 5.2);
  }
  function destroyObstacle(g, target) {
    const object = g.rows?.get(target.index)?.objects?.[target.j];
    if (!object || object.x === 99 || object.destroyed)return false;
    object.destroyed = true;
    object.x = 99;
    return true;
  }
  function confirmedReward(sdk, timeoutMs = 90000) {
    if (!sdk?.ads?.showRewardedVideo)return Promise.resolve(false);
    return new Promise(resolve => {
      let rewarded = false, done = false;
      const onReward = () => {
        rewarded = true;
      };
      const finish = success => {
        if (done)return;
        done = true;
        clearTimeout(timer);
        sdk.ads.off?.('rewarded:reward', onReward);
        sdk.ads.off?.('rewarded:close', onClose);
        resolve(success === true);
      };
      const onClose = success => finish(success === true || rewarded);
      const timer = setTimeout(() => finish(false), timeoutMs);
      sdk.ads.on?.('rewarded:reward', onReward);
      sdk.ads.on?.('rewarded:close', onClose);
      try {
        const promise = sdk.ads.showRewardedVideo({
          onRewarded: onReward, onClose
        });
        if (promise?.then)promise.then(result => finish(result === true || rewarded)).catch (() => finish(false));
      } catch {
        finish(false);
      }
    });
  }
  function biomeAt(distance) {
    return Math.floor(Math.max(0, distance) / 2600) % 5;
  }
  function portalEnter(g) {
    g.portalPhase = 'entry';
    g.portalFx = 1.05;
    g.portalExit = .45;
    g.portalWarp = 1;
    g.events?.push?.({
      type: 'portal-entry'
    });
  }
  function portalTick(g, dt) {
    if (g.portalPhase === 'entry') {
      g.portalFx = Math.max(0, g.portalFx - dt);
      if (g.portalFx === 0) {
        g.portalPhase = 'exit';
        g.portalFx = g.portalExit;
        g.biome = ((g.biome || biomeAt(g.distance)) + 1) % 5;
        g.events?.push?.({
          type: 'portal-exit'
        });
      }
    } else if (g.portalPhase === 'exit') {
      g.portalFx = Math.max(0, g.portalFx - dt);
      if (g.portalFx === 0)g.portalPhase = 'none';
    }
  }
  function consumeShield(g) {
    if (!g.shield)return false;
    g.shield = 0;
    g.timedShield = 0;
    g.powerMode = false;
    g.shieldGrace = .12;
    return true;
  }
  const api = {
    MAX_SPEED, NITRO_MAX_SPEED, HYPER_MAX_SPEED, NORMAL_MAX_SPEED, POWER_SECONDS, DRONE_POWER_SECONDS, DRONE_ATTACK_SECONDS, SCORE_SECONDS, consumeShield, clamp, clampNormal, normalCap, accelerate, activateShield, activateFlight, powerTick, policeWave, lookahead, drawDistance, destroyObstacle, confirmedReward, biomeAt, portalEnter, portalTick
  };
  root.NeonFeel = api;
  if (typeof module === 'object' && module.exports)module.exports = api;
})(typeof globalThis === 'object'?globalThis: this);
