/* Neon Drift: Rift Protocol — deterministic gameplay rules. Browser global + CommonJS. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NeonExpansion = api;
})(typeof globalThis !== 'undefined' ? globalThis: this, function () {
  'use strict';
  const Feel = typeof NeonFeel !== 'undefined' ? NeonFeel: require('./drive-feel.js');
  const Upper = typeof NeonUpperRoute !== 'undefined' ? NeonUpperRoute: (typeof require === 'function' ? require('./upper-route.js'): null);
  const MAX_SPEED = Feel.MAX_SPEED;
  const reactionSeconds = 416.666 / 1000;
  const lanes = [ - 5, 0, 5];
  const hazards = ['barrier', 'rock', 'truck', 'police', 'laser', 'gate', 'traffic', 'hurdle', 'drone', 'roadwork', 'falling'];
  const sightlinePickups = new Set(['coin', 'cell', 'health', 'nitro', 'magnet', 'scoreBoost', 'double', 'energyShield', 'shield', 'superNitro', 'flight', 'flightBoost', 'dronePower', 'phaseShard']);
  const pulseBreakable = ['drone', 'roadwork'];
  const dimensions = [ {
    id: 'neon', label: 'NEON DIMENSION', color: '#45f7ff', length: 11
  }, {
    id: 'gravity', label: 'LOW GRAVITY', color: '#a789ff', length: 13
  }, {
    id: 'hyper', label: 'HYPER SPEED', color: '#ffe475', length: 9
  }, {
    id: 'rush', label: 'CRYSTAL RUSH', color: '#74ffbc', length: 12
  }, {
    id: 'hazard', label: 'HAZARD DIMENSION', color: '#ff536f', length: 10
  }, {
    id: 'mirror', label: 'MIRROR WORLD', color: '#ffa2dd', length: 11
  }, {
    id: 'time', label: 'TIME DISTORTION', color: '#8dabff', length: 12
  }];
  const tutorialLessons = [ {
    id: 'steer', label: 'STEER THROUGH THE CORDON', unlock: 0
  }, {
    id: 'dodge', label: 'DODGE THE BARRIER', unlock: 5, object: 'barrier'
  }, {
    id: 'health', label: 'COLLECT HEALTH', unlock: 10, object: 'cell'
  }, {
    id: 'ramp', label: 'TAKE THE RAMP', unlock: 16, object: 'ramp'
  }, {
    id: 'jump', label: 'MANUAL SPACE JUMP', unlock: 22, object: 'hurdle'
  }, {
    id: 'nitro', label: 'COLLECT NITRO', unlock: 28, object: 'nitro'
  }, {
    id: 'nitroUse', label: 'USE NITRO', unlock: 34
  }, {
    id: 'shield', label: 'COLLECT SHIELD', unlock: 42, object: 'energyShield'
  }, {
    id: 'shieldImpact', label: 'BLOCK ONE IMPACT', unlock: 50, object: 'barrier'
  }, {
    id: 'flight', label: 'COLLECT FLIGHT', unlock: 58, object: 'flight'
  }, {
    id: 'flightUse', label: 'FLY FOR 15 SECONDS', unlock: 65
  }, {
    id: 'shards', label: 'COLLECT FOUR SHARDS', unlock: 72, object: 'phaseShard'
  }, {
    id: 'phase', label: 'PHASE THROUGH THE WALL', unlock: 82, object: 'gate'
  }, {
    id: 'dronePower', label: 'COLLECT DRONE POWER', unlock: 92, object: 'dronePower'
  }, {
    id: 'pulse', label: 'DESTROY A DRONE WITH F', unlock: 102, object: 'drone'
  }, {
    id: 'drones', label: 'COMPANION DRONE ATTACK', unlock: 110, object: 'drone'
  }, {
    id: 'chase', label: 'SURVIVE THE CHASE', unlock: 120
  }, {
    id: 'portal', label: 'ENTER THE PORTAL', unlock: 135, object: 'portal'
  }, {
    id: 'complete', label: 'RIFT PROTOCOL ONLINE', unlock: 0
  }];
  const tutorialById = Object.fromEntries(tutorialLessons.map(lesson => [lesson.id, lesson]));
  const missions = [ {
    id: 'distance', label: 'Drive 3.0 km', key: 'distance', target: 3000, reward: 180
  }, {
    id: 'near', label: 'Perform 10 Near Misses', key: 'near', target: 10, reward: 180
  }, {
    id: 'phase', label: 'Use Phase Shift 3 times', key: 'phaseUses', target: 3, reward: 170
  }, {
    id: 'portals', label: 'Enter 2 portals', key: 'portals', target: 2, reward: 170
  }, {
    id: 'jump', label: 'Jump over 15 obstacles', key: 'jumpDodges', target: 15, reward: 190
  }, {
    id: 'shards', label: 'Collect 12 Phase Shards', key: 'shards', target: 12, reward: 130
  }, {
    id: 'clean', label: 'Survive 60 seconds without damage', key: 'cleanSeconds', target: 60, reward: 200
  }, {
    id: 'events', label: 'Survive 2 random events', key: 'eventsSurvived', target: 2, reward: 160
  }, {
    id: 'combo', label: 'Reach x10 combo', key: 'bestCombo', target: 10, reward: 210
  }, {
    id: 'chains', label: 'Complete 2 energy chains', key: 'chains', target: 2, reward: 140
  }, {
    id: 'risk', label: 'Finish 2 danger routes', key: 'riskClears', target: 2, reward: 170
  }, {
    id: 'health', label: 'Collect 3 health cells', key: 'healthPickups', target: 3, reward: 120
  }, {
    id: 'nitroUse', label: 'Use Nitro 5 times', key: 'nitroUses', target: 5, reward: 140
  }, {
    id: 'shieldImpact', label: 'Block 3 impacts with Shield', key: 'shieldImpacts', target: 3, reward: 180
  }, {
    id: 'flight', label: 'Use Flight 2 times', key: 'flightUses', target: 2, reward: 160
  }, {
    id: 'dronePower', label: 'Collect Drone Power twice', key: 'dronePowerPickups', target: 2, reward: 150
  }, {
    id: 'drones', label: 'Destroy 8 obstacles with drones', key: 'dronesDestroyed', target: 8, reward: 220
  }, {
    id: 'chase', label: 'Survive a chase', key: 'chases', target: 1, reward: 170
  }, {
    id: 'speedrun', label: 'Travel 3 km above 700 km/h', key: 'highSpeedDistance', target: 3000, reward: 240
  }];
  function rand(seed) {
    let x = seed >>> 0;
    return () => {
      x = (Math.imul(x, 1664525) + 1013904223) >>> 0;
      return x / 4294967296;
    };
  }
  function reactionDistance(speed) {
    return Math.max(0, Number(speed) || 0) * reactionSeconds;
  }
  function mobileAssist(state) {
    if (state && typeof state.mobileAssist === 'boolean') return state.mobileAssist;
    const mm = typeof globalThis !== 'undefined' ? globalThis.matchMedia: undefined;
    try {
      return !!((typeof mm === 'function' && mm('(pointer: coarse)').matches) || (typeof globalThis !== 'undefined' && typeof globalThis.innerWidth === 'number' && globalThis.innerWidth < 700));
    } catch {
      return false;
    }
  }
  function difficulty(distance = 0, baseSpeed = 62, time = 0) {
    const d = Math.max(0, Number(distance) || 0), speed = Math.min(MAX_SPEED, Math.max(0, Number(baseSpeed) || 0)), t = Math.max(0, Number(time) || 0);
    // Release curve: active within the first 500 m, then progressively denser at 2/5/10 km.
    const progress = d + Math.min(500, t * 1.25), bounds = [500, 2000, 5000, 10000];
    let stage = 0;
    while (stage < bounds.length && progress >= bounds[stage]) stage++;
    const start = stage === 0 ? 0: bounds[stage - 1], end = bounds[stage] ?? 16000;
    const stageProgress = Math.min(1, Math.max(0, (progress - start) / Math.max(1, end - start)));
    const normalRef = Math.min(speed, 700 / 3.6), speedPressure = Math.min(1, Math.max(0, (normalRef - 62) / (700 / 3.6 - 62)));
    const complexity = Math.min(1, (stage + stageProgress + speedPressure * .45) / 4.45);
    const hazardRate = Math.min(.80, [.30, .42, .55, .66, .74][stage] + speedPressure * .035);
    const beatSeconds = [1.12, 1.00, .90, .82, .76][stage];
    const reaction = reactionDistance(speed) * (speed * 3.6 > 900 ? 1.10: 1.0);
    // Density is distance-driven so a faster car does not make 500 m of highway feel empty.
    // Nitro/Flight can still widen spacing through the reaction-distance floor for fairness.
    const targetDistance = [205, 195, 185, 175, 165][stage];
    const baseGap = Math.max([136, 132, 128, 124, 120][stage], reaction, targetDistance);
    // Touch steering needs a little more reaction room. This is intentionally modest:
    // about 10% fewer generated gameplay rows on mobile, while desktop density is unchanged.
    let touchRuntime = false;
    try {
      touchRuntime = !!((typeof globalThis !== 'undefined' && typeof globalThis.matchMedia === 'function' && globalThis.matchMedia('(pointer: coarse)').matches) || (typeof globalThis !== 'undefined' && Number(globalThis.innerWidth) > 0 && Number(globalThis.innerWidth) < 700));
    } catch (_) {}
    const gap = baseGap * (touchRuntime ? 1.10 : 1);
    return {
      stage, stageProgress, progress, speed, beatSeconds, gap, readAhead: Math.round(Math.min(34, 12 + speed / 23 + stage * 1.2)), complexity, hazards: hazardRate, interaction: hazardRate, emptyRoad: [.20, .14, .09, .055, .035][stage], movingHazards: 0, rockChance: speed * 3.6 >= 900 ? 0: [.16, .20, .22, .18, .12][stage], reward: [1, 1.25, 1.45, 1.65, 1.9][stage]
    };
  }
  function multiplier(state) {
    return Math.min(5, 1 + Math.floor((state.combo || 0) / 2));
  }
  function normalizePickupType(type) {
    return type === 'double' || type === 'scoreBoost' ? 'scoreBoost': type;
  }
  function scoreFactor(state) {
    return state.doubleScore > 0 || state.scoreMultiplier >= 2 ? 2: 1;
  }
  function emit(state, event) {
    (state.events || (state.events = [])).push(event);
  }
  function applyScoreBoost(state, bonus = 0) {
    state.doubleScore = Feel.SCORE_SECONDS;
    state.scoreMultiplier = 2;
    state.score = (state.score || 0) + Math.max(0, bonus);
    emit(state, {
      type: 'scoreBoost', outcome: 'pickup', duration: Feel.SCORE_SECONDS, bonus: Math.max(0, bonus)
    });
    return 'pickup';
  }
  function streak(state, base, tag) {
    state.combo = (state.combo || 0) + 1;
    state.comboLeft = 5;
    state.bestCombo = Math.max(state.bestCombo || 0, state.combo);
    state.bestMultiplier = Math.max(state.bestMultiplier || 1, multiplier(state));
    const dimension = state.dimension === 'hazard' ? 2: state.dimension === 'rush' ? 1.5: state.dimension === 'neon' ? 1.25: 1, upper = Upper?.scoreMultiplier?.(state) || 1;
    const gain = Math.round(base * multiplier(state) * scoreFactor(state) * dimension * upper * (state.riskTime > 0 ? 2: 1) * difficulty(state.distance, state.stats?.speed).reward);
    state.score = (state.score || 0) + gain;
    state.runCredits = (state.runCredits || 0) + Math.round((state.riskTime > 0 ? 2: 1) * 2 * difficulty(state.distance, state.stats?.speed).reward);
    state.overdriveCharge = Math.min(100, (state.overdriveCharge || 0) + (tag === 'NEAR MISS'?12: tag === 'PERFECT PHASE'?14: 7));
    if (state.overdriveCharge >= 100 && !state.overdriveReady) {
      state.overdriveReady = true;
      emit(state, {
        type: 'overdrive-ready'
      });
    }
    emit(state, {
      type: 'rift-combo', tag, gain, multiplier: multiplier(state)
    });
  }
  function init(state) {
    const prior = Array.isArray(state.dimensionVisited) ? state.dimensionVisited.filter(id => dimensions.some(d => d.id === id)): [];
    Object.assign(state, {
      phaseCharge: 0, phaseTime: 0, phaseUses: 0, shards: 0, portals: 0, pulseTime: 0, pulseCooldown: 0, pulseUses: 0, dimension: null, dimensionTime: 0, dimensionCount: 0, dimensionVisited: prior, eventsSurvived: 0, jumpDodges: 0, chains: 0, chainProgress: null, riskTime: 0, riskClears: 0, cleanDistance: 0, cleanOrigin: state.distance || 0, cleanSeconds: 0, highSpeedDistance: 0, bestMultiplier: 1, healthPickups: 0, nitroPickups: 0, nitroUses: 0, shieldImpacts: 0, flightPickups: 0, flightUses: 0, dronePowerPickups: 0, dronesDestroyed: 0, chases: 0, completedEvents: 0, phaseTrail: 0, tutorialTarget: null, flight: 0, flightDuration: Feel.POWER_SECONDS, dronePower: 0, timedShield: 0, shieldGrace: 0, _flightWas: false, _powerWasActive: false, _nitroWasActive: false, _boostRamp: 0, mobileAssist: mobileAssist(state)
    });
    Upper?.init?.(state);
    return state;
  }
  function removeTutorialObjects(state, except) {
    for (const row of state.rows?.values() || []) row.objects = (row.objects || []).filter(object => !object.tutorial || object.lesson === except);
  }
  function laneHasHazard(row, x) {
    return row.objects.some(object => hazards.includes(object.type) && object.x === x);
  }
  function openLane(row, preferred) {
    const free = lanes.filter(x => !laneHasHazard(row, x));
    return free.includes(preferred) ? preferred: free[0] ?? preferred;
  }
  function placeTutorial(row, lesson) {
    const config = tutorialById[lesson];
    if (!config?.object) return false;
    const type = config.object, danger = ['dodge', 'jump', 'shieldImpact', 'phase', 'pulse'].includes(lesson);
    let x = danger && lesson === 'dodge' ? lanes.find(lane => lane !== row.safeX && !laneHasHazard(row, lane)): row.safeX;
    if (x === undefined) x = openLane(row, row.safeX);
    row.objects = (row.objects || []).filter(object => !(object.tutorial || (hazards.includes(object.type) && object.x === x)));
    row.objects.push({
      x, type, tutorial: true, lesson, routeLevel: 'MAIN', routeY: 0, elevation: 0
    });
    if (hazards.includes(type) && lanes.every(lane => laneHasHazard(row, lane))) {
      const escape = lanes.find(lane => lane !== x);
      row.objects = row.objects.filter(object => !(hazards.includes(object.type) && object.x === escape));
    }
    return true;
  }
  function tutorialMinDistance(state) {
    return (state.distance || 0) + Math.max(2.2 * Math.max(0, state.speed || state.stats?.speed || 62), 200);
  }
  function scheduleTutorial(state, lesson) {
    const config = tutorialById[lesson];
    if (!config || !state.rows) return false;
    if (!config.object) {
      removeTutorialObjects(state);
      state.tutorialTarget = null;
      state.tutorialPending = {
        lesson, minDistance: tutorialMinDistance(state)
      };
      return true;
    }
    const paced = state.tutorialMode === true, min = paced ? tutorialMinDistance(state): (state.distance || 0);
    if (paced && (state.time || 0) < config.unlock) {
      removeTutorialObjects(state);
      state.tutorialTarget = null;
      state.tutorialPending = {
        lesson, minDistance: min, unlock: config.unlock
      };
      return false;
    }
    const old = state.tutorialTarget;
    if (old && old.lesson === lesson) {
      const row = state.rows.get(old.index);
      if (row && row.distance > (state.distance || 0) - 14) return row.objects.some(object => object.tutorial && object.lesson === lesson) ? true: placeTutorial(row, lesson);
      if (row) row.objects = row.objects.filter(object => !object.tutorial || object.lesson !== lesson);
      state.tutorialTarget = null;
    } else if (old) {
      const row = state.rows.get(old.index);
      if (row) row.objects = row.objects.filter(object => !object.tutorial);
      state.tutorialTarget = null;
    }
    removeTutorialObjects(state);
    const target = [...state.rows.values()].filter(row => row && row.index >= (state.next ?? 0) && row.distance >= min).sort((a, b) => a.distance - b.distance)[0];
    if (!target) {
      state.tutorialPending = {
        lesson, minDistance: min, unlock: config.unlock
      };
      return false;
    }
    const preceding = [...state.rows.values()].filter(row => row.index < target.index && row.distance > (state.distance || 0)).at( - 1);
    target.distance = Math.max(min, (preceding?.distance || state.distance || 0) + 35);
    state.tutorialTarget = {
      lesson, index: target.index, minDistance: min
    };
    state.tutorialPending = null;
    return placeTutorial(target, lesson);
  }
  function authoredObject(type, x, template, step, extra = {
  }) {
    return {
      x, type, authored: true, obstacleTemplate: template, sequenceStep: step, routeLevel: 'MAIN', routeY: 0, elevation: 0, ...extra
    };
  }
  function pushCoin(row, x, distanceOffset, pattern, step) {
    row.objects.push({
      x, type: 'coin', routeLevel: 'MAIN', routeY: 0, elevation: 0, distanceOffset, authored: true, coinPattern: pattern, patternStep: step, trailCount: 1
    });
  }
  function addCoinPattern(row, pattern, step, safe, available) {
    if (!available.length) return;
    const primary = available.includes(safe) ? safe: available[0], other = available.find(x => x !== primary) ?? primary;
    const spacing = 6.6, count = pattern === 'straight' ? 4: pattern === 'double' ? 2: pattern === 'triple' ? 2: pattern === 'multi-row' ? 3: 4;
    if (pattern === 'double') {
      for (let i = 0;
      i < count;
      i++) {
        pushCoin(row, primary, i * spacing, pattern, i);
        pushCoin(row, other, i * spacing, pattern, i);
      }
      return;
    }
    if (pattern === 'triple') {
      for (let i = 0;
      i < count;
      i++) for (const x of available.slice(0, 3)) pushCoin(row, x, i * spacing, pattern, i);
      return;
    }
    if (pattern === 'lane-change') {
      for (let i = 0;
      i < count;
      i++) {
        const t = i / Math.max(1, count - 1);
        pushCoin(row, primary + (other - primary) * t, i * spacing, pattern, i);
      }
      return;
    }
    if (pattern === 'S') {
      const amp = Math.min(5, Math.max(2.5, Math.abs(other - primary) || 5));
      for (let i = 0;
      i < count;
      i++) pushCoin(row, primary + Math.sin(i / Math.max(1, count - 1) * Math.PI * 2) * amp * .55, i * spacing, pattern, i);
      return;
    }
    if (pattern === 'multi-row') {
      for (let i = 0;
      i < count;
      i++) pushCoin(row, i % 2 ? primary: other, i * spacing, pattern, i);
      return;
    }
    for (let i = 0;
    i < count;
    i++) pushCoin(row, primary, i * spacing, pattern, i);
  }
  function preserveHazardSightlines(state, rowData) {
    // Keep a clean visual approach before real hazards. Dense glowing pickups are fun,
    // but they must never mask a barrier/rock/hurdle directly behind them.
    const currentHazards = (rowData.objects || []).filter(object => hazards.includes(object.type) && object.x !== 99);
    if (!currentHazards.length || !state.rows) return;
    for (const hazard of currentHazards) {
      const hazardDistance = rowData.distance + Number(hazard.distanceOffset || 0);
      const routeLevel = hazard.routeLevel || 'MAIN';
      for (const prior of state.rows.values()) {
        if (!prior || prior.index === rowData.index || prior.distance > hazardDistance || hazardDistance - prior.distance > 140) continue;
        prior.objects = (prior.objects || []).filter(object => {
          if (object.tutorial || object.x === 99 || !sightlinePickups.has(normalizePickupType(object.type))) return true;
          if ((object.routeLevel || 'MAIN') !== routeLevel) return true;
          const objectDistance = prior.distance + Number(object.distanceOffset || 0);
          const gap = hazardDistance - objectDistance;
          if (gap <= 0 || gap > 60) return true;
          // Same-lane pickups are the ones that can visually cover the obstacle from the chase camera.
          return Math.abs(Number(object.x || 0) - Number(hazard.x || 0)) >= 2.35;
        });
      }
    }
  }
  function sanitizeRow(state, rowData) {
    if (!rowData || !Array.isArray(rowData.objects)) return rowData;
    // Preserve obstacle count, but stagger any illegal three-lane wall along Z.
    // This keeps the same gameplay content while guaranteeing at least one open lane
    // at every longitudinal slice.
    for (let pass = 0;
    pass < 4;
    pass++) {
      const grouped = new Map();
      for (let i = 0;
      i < rowData.objects.length;
      i++) {
        const object = rowData.objects[i];
        if (!object || object.x === 99 || !hazards.includes(object.type)) continue;
        const level = object.routeLevel || 'MAIN';
        const offset = Math.round((Number(object.distanceOffset) || 0) / 3) * 3;
        const key = `${level}:${offset}`;
        if (!grouped.has(key)) grouped.set(key, []);
        grouped.get(key).push({
          object, index: i, offset
        });
      }
      let changed = false;
      for (const group of grouped.values()) {
        const laneMap = new Map();
        for (const entry of group) {
          const lane = lanes.reduce((best, value) => Math.abs(value - entry.object.x) < Math.abs(best - entry.object.x) ? value: best, lanes[0]);
          if (!laneMap.has(lane)) laneMap.set(lane, []);
          laneMap.get(lane).push(entry);
        }
        if (laneMap.size < 3) continue;
        const safe = lanes.reduce((best, value) => Math.abs(value - (rowData.safeX ?? 0)) < Math.abs(best - (rowData.safeX ?? 0)) ? value: best, lanes[0]);
        const safeEntries = laneMap.get(safe) || [];
        const safeJump = safeEntries.find(entry => entry.object.jumpable || entry.object.type === 'hurdle');
        // If the planned lane contains a jumpable hurdle, keep that readable choice and
        // stagger an outer hazard. Otherwise stagger the safe-lane hazard to leave it open.
        const laneToStagger = safeJump ? lanes.filter(lane => lane !== safe).sort((a, b) => Math.abs(b - safe) - Math.abs(a - safe))[0]: safe;
        const entry = (laneMap.get(laneToStagger) || [])[0];
        if (!entry) continue;
        const baseOffset = Number(entry.object.distanceOffset) || 0;
        entry.object.distanceOffset = baseOffset + 52 + pass * 8;
        entry.object.staggeredForFairness = true;
        changed = true;
      }
      if (!changed) break;
    }
    // Final safety pass: never allow all three lanes to be blocked within the same
    // short manoeuvre window. Keep every obstacle, but push one farther down-track.
    for (let pass = 0;
    pass < 5;
    pass++) {
      const entries = rowData.objects.filter(object => object && object.x !== 99 && hazards.includes(object.type)).map(object => ({
        object, lane: lanes.reduce((best, value) => Math.abs(value - object.x) < Math.abs(best - object.x) ? value: best, lanes[0]), z: Number(object.distanceOffset) || 0
      })).sort((a, b) => a.z - b.z);
      let shifted = false;
      for (let i = 0;
      i < entries.length;
      i++) {
        const window = entries.filter(entry => entry.z >= entries[i].z && entry.z - entries[i].z <= 34);
        const laneSet = new Set(window.map(entry => entry.lane));
        if (laneSet.size < 3) continue;
        const safe = lanes.reduce((best, value) => Math.abs(value - (rowData.safeX ?? 0)) < Math.abs(best - (rowData.safeX ?? 0)) ? value: best, lanes[0]);
        let candidate = window.find(entry => entry.lane === safe && !(entry.object.jumpable || entry.object.type === 'hurdle'));
        if (!candidate) candidate = window.slice().sort((a, b) => Math.abs(b.lane - safe) - Math.abs(a.lane - safe))[0];
        if (!candidate) continue;
        candidate.object.distanceOffset = (Number(candidate.object.distanceOffset) || 0) + 58 + pass * 10;
        candidate.object.staggeredForFairness = true;
        shifted = true;
        break;
      }
      if (!shifted) break;
    }
    return rowData;
  }
  function row(state, rowData) {
    const index = rowData.index, distance = rowData.distance, diff = difficulty(distance, state.speed || state.stats?.speed || 62, state.time || 0), rng = rand((state.seed || 0) + index * 4711), mobileMode = mobileAssist(state);
    if (state.tutorialMode === true) {
      rowData.safeX = 0;
      rowData.objects = [];
      rowData.rhythm = 'lesson';
      if (state.tutorialTarget?.index === index) placeTutorial(rowData, state.tutorialTarget.lesson);
      return rowData;
    }
    const slot = ((index - 1) % 36 + 36) % 36, chapter = Math.floor((index - 1) / 36), previous = state.rows?.get(index - 1), last = previous?.safeX ?? 0, shiftEvery = [6, 5, 4, 3, 3][diff.stage], requested = slot % shiftEvery === 0 ? lanes[Math.floor(rng() * lanes.length)]: last;
    rowData.safeX = Math.abs(requested - last) > 5 ? 0: requested;
    rowData.objects = [];
    const put = (type, x = rowData.safeX, extra = {
    }) => {
      if (x === undefined || rowData.objects.some(object => Math.abs(object.x - x) < .35 && Math.abs(Number(object.distanceOffset || 0)) < 3)) return false;
      if (type === 'hurdle') extra = {
        ...extra, jumpable: true
      };
      rowData.objects.push(authoredObject(type, x, extra.obstacleTemplate || rowData.rhythm || 'drive', slot, extra));
      return true;
    };
    const outside = lanes.filter(x => x !== rowData.safeX), dangerLane = outside[Math.floor(rng() * outside.length)];
    let pool = diff.stage === 0 ? ['barrier', 'hurdle', 'hurdle', 'rock']: diff.stage === 1 ? ['barrier', 'hurdle', 'hurdle', 'traffic', 'rock', 'hurdle']: ['barrier', 'barrier', 'hurdle', 'hurdle', 'hurdle', 'hurdle', 'rock', 'traffic', 'barrier', 'laser', 'gate', 'roadwork'];
    if (diff.rockChance === 0) pool = pool.filter(type => type !== 'rock');
    else if (pool.includes('rock') && rng() > diff.rockChance) pool = pool.filter(type => type !== 'rock');
    const hazard = (x = dangerLane, template = 'single-lane') => pool.length && put(pool[Math.floor(rng() * pool.length)], x, {
      obstacleTemplate: template
    });
    const sparseHazard = (offset, minStage = 1, template = 'weave') => {
      if (diff.stage < minStage || !pool.length) return;
      const x = outside[(chapter + offset) % outside.length];
      put((chapter + slot + offset) % 5 === 0 ? 'hurdle': pool[(chapter + slot + offset) % pool.length], x, {
        obstacleTemplate: template
      });
    };
    rowData.rhythm = slot < 6 ? 'drive': slot < 10 ? 'pattern': slot < 17 ? 'supply': slot < 20 ? 'ramp': slot < 24 ? 'speed': slot < 30 ? 'chase': slot < 32 ? 'portal': 'recovery';
    if (rowData.rhythm === 'drive') {
      if (slot === 1) sparseHazard(0, 0, 'drive-cordon');
      if (slot === 3 && diff.stage > 0) hazard(dangerLane, 'drive-cordon');
      if (slot === 5) sparseHazard(1, 2, 'drive-cordon');
    } else if (rowData.rhythm === 'pattern') {
      hazard(dangerLane, 'weave-pair');
      if (diff.stage >= 2 && slot % 2 === 1) hazard(outside.find(x => x !== dangerLane), 'weave-pair');
      if (slot % 2 === 0) put('phaseShard');
    } else if (rowData.rhythm === 'supply') {
      const supply = ['cell', 'nitro', 'phaseShard', chapter % 2 === 0 ? 'coin': 'energyShield', 'coin', 'cell', 'nitro'][slot - 10];
      put(supply);
      if (slot === 10) sparseHazard(0, 0, 'supply-cover');
      if ((slot === 11 || slot === 15) && diff.stage > 0) hazard(dangerLane, 'supply-cover');
    } else if (rowData.rhythm === 'ramp') {
      put(slot === 17 ? 'ramp': slot === 18 ? 'coin': chapter % 4 === 0 ? 'flight': chapter % 4 === 2 ? 'magnet': 'coin');
      if (slot === 17 && diff.stage > 1) hazard(dangerLane, 'ramp-cover');
      if (slot === 18) sparseHazard(1, 2, 'ramp-cover');
    } else if (rowData.rhythm === 'speed') {
      put(slot === 20 ? 'superNitro': slot === 22 ? (chapter % 2 === 0 ? 'scoreBoost': 'coin'): 'coin');
      if (slot === 21) sparseHazard(0, 0, 'speed-gate');
      if (slot === 23 && diff.stage > 1) hazard(dangerLane, 'speed-gate');
    } else if (rowData.rhythm === 'chase') {
      hazard(dangerLane, 'chase-pair');
      if (slot % 2 === 0 && diff.stage > 0) put('police', outside.find(x => x !== dangerLane), {
        moving: false, obstacleTemplate: 'static-pursuit-blocker'
      });
      if (slot % 2) put('phaseShard');
    } else if (rowData.rhythm === 'portal') {
      if (slot === 31) put('portal');
      else put('nitro');
    } else {
      if (slot === 33) sparseHazard(1, 1, 'recovery-cover');
      put(slot === 32 ? 'cell': slot === 34 ? 'phaseShard': 'coin');
    }
    if (state.event?.type === 'roadblock') for (const x of outside) if (!rowData.objects.some(object => object.x === x)) put('barrier', x, {
      obstacleTemplate: 'roadblock'
    });
    if (state.event?.type === 'nitroRush' && slot % 2 === 0) {
      rowData.objects = rowData.objects.filter(object => object.x !== rowData.safeX);
      put('nitro');
    }
    if (state.event?.type === 'bonusZone' && slot % 2 === 0) {
      rowData.objects = rowData.objects.filter(object => object.x !== rowData.safeX);
      put(slot % 4 === 0 ? 'scoreBoost': 'coin');
    }
    if (state.dimension === 'rush' && slot % 2 === 0) {
      rowData.objects = rowData.objects.filter(object => object.x !== rowData.safeX);
      put('phaseShard');
    }
    // Balanced release density: clearly busier than the original build, but with breathing room.
    // Do not fill every generated row. Difficulty now comes from authored sequences, not wall-to-wall clutter.
    const denseEligible = !['portal'].includes(rowData.rhythm) && !(rowData.objects.some(object => object.type === 'ramp'));
    const recoveryLight = rowData.rhythm === 'recovery';
    let hazardCount = rowData.objects.filter(object => hazards.includes(object.type)).length;
    let desiredHazards = hazardCount;
    if (denseEligible && !(recoveryLight && diff.stage < 3)) {
      if (diff.stage === 0) {
        if (hazardCount === 0 && index % (mobileMode ? 4: 3) === 0) desiredHazards = 1;
      } else if (diff.stage === 1) {
        if (hazardCount === 0 && index % (mobileMode ? 3: 2) === 0) desiredHazards = 1;
        if (hazardCount === 1 && index % (mobileMode ? 15: 11) === 0) desiredHazards = 2;
      } else if (diff.stage === 2) {
        if (hazardCount === 0 && index % (mobileMode ? 5: 4) !== 1) desiredHazards = 1;
        if (hazardCount === 1 && index % (mobileMode ? 11: 8) === 0) desiredHazards = 2;
      } else if (diff.stage === 3) {
        if (hazardCount === 0 && index % (mobileMode ? 6: 5) !== 1) desiredHazards = 1;
        if (hazardCount === 1 && index % (mobileMode ? 7: 5) === 0) desiredHazards = 2;
      } else {
        if (hazardCount === 0 && index % (mobileMode ? 7: 6) !== 1) desiredHazards = 1;
        if (hazardCount === 1 && index % (mobileMode ? 4: 3) === 0) desiredHazards = 2;
      }
    }
    if (mobileMode && desiredHazards > hazardCount) {
      const extra = desiredHazards - hazardCount;
      const reduceOne = extra > 1 || ((index + slot + chapter) % 3 === 0);
      if (reduceOne) desiredHazards = Math.max(hazardCount, desiredHazards - 1);
    }
    const releaseTypes = diff.stage === 0 ? ['hurdle', 'barrier', 'rock', 'hurdle']: diff.stage === 1 ? ['barrier', 'hurdle', 'traffic', 'rock', 'hurdle']: ['barrier', 'hurdle', 'traffic', 'rock', 'roadwork', 'hurdle'];
    let releaseStep = 0;
    for (const lane of outside) {
      if (hazardCount >= desiredHazards) break;
      if (rowData.objects.some(object => Math.abs(object.x - lane) < .35)) continue;
      let type = releaseTypes[((index + chapter + releaseStep++) % releaseTypes.length + releaseTypes.length) % releaseTypes.length];
      if (type === 'rock' && diff.rockChance === 0) type = 'hurdle';
      put(type, lane, {
        obstacleTemplate: diff.stage >= 3 ? 'release-gauntlet': 'release-cordon', jumpable: type === 'hurdle'
      });
      hazardCount++;
    }
    // Regular Jump decisions: a bright low hurdle may occupy the planned route, while another lane remains a steering alternative.
    if (denseEligible && diff.stage >= 1 && index % (mobileMode ? (diff.stage >= 4 ? 4: diff.stage >= 2 ? 5: 6): (diff.stage >= 4 ? 3: diff.stage >= 2 ? 4: 5)) === 1 && !rowData.objects.some(object => Math.abs(object.x - rowData.safeX) < .35)) put('hurdle', rowData.safeX, {
      obstacleTemplate: 'jump-line', jumpable: true
    });
    const pattern = ['straight', 'double', 'lane-change', 'S', 'multi-row', 'straight'][(chapter + Math.floor(slot / 6)) % 6], patternStep = slot % 6, patternEligible = slot <= 6 || (slot >= 8 && slot <= 16) || (slot >= 19 && slot <= 25) || (slot >= 27 && slot <= 35);
    const coinPatternBeat = rowData.rhythm === 'ramp' ? slot === 18: rowData.rhythm === 'speed' ? slot === 20 || slot === 22: ((index + chapter + slot) % 6 !== 0 && slot % 3 !== 1);
    if (patternEligible && coinPatternBeat) addCoinPattern(rowData, pattern, patternStep, rowData.safeX, lanes.filter(x => !laneHasHazard(rowData, x)));
    if (diff.stage >= 2 && !rowData.objects.some(object => hazards.includes(object.type)) && (index + chapter) % Math.max(4, Math.round(1 / Math.max(.02, diff.emptyRoad))) !== 0) sparseHazard(0, 2, 'recovery-cover');
    if (diff.stage >= 3 && (slot === 5 || slot === 23) && (index + chapter * 3) % 5 === 0) {
      const x = outside.find(lane => !rowData.objects.some(object => object.x === lane));
      if (x !== undefined) put(diff.stage >= 4 ? 'police': 'traffic', x, {
        moving: false, obstacleTemplate: 'static-weave-block'
      });
    }
    if (chapter > 0 && slot >= 2 && slot <= 4) {
      rowData.objects = rowData.objects.filter(object => object.x !== rowData.safeX);
      put('chain', rowData.safeX, {
        chainId: chapter, step: slot - 2
      });
    }
    if (chapter > 0 && slot === 8) {
      const free = outside.find(x => !rowData.objects.some(object => object.x === x));
      if (free !== undefined) put('risk', free);
    }
    for (const object of rowData.objects) if (object.routeLevel !== 'UPPER') {
      object.routeLevel = 'MAIN';
      object.routeY = 0;
      object.elevation = 0;
    }
    preserveHazardSightlines(state, rowData);
    Upper?.decorateRow?.(state, rowData, diff);
    if (state.tutorialTarget?.index === index) placeTutorial(rowData, state.tutorialTarget.lesson);
    sanitizeRow(state, rowData);
    return rowData;
  }
  function applyRunEvent(state, mode) {
    const type = mode === 'meteorShower' ? 'falling': mode === 'riftStorm' ? 'laser': null;
    if (!type) return [];
    const changed = [];
    for (const rowData of state.rows?.values() || []) {
      if (rowData.index % 2 || rowData.distance < state.distance + 45 || rowData.distance > state.distance + 800) continue;
      const x = rowData.safeX === - 5 ? 5: - 5, index = rowData.objects.findIndex(object => object.x === x && hazards.includes(object.type));
      if (index >= 0) {
        if (rowData.objects[index].type !== type) {
          rowData.objects[index] = {
            ...rowData.objects[index], type
          };
          changed.push(`${rowData.index}:${index}`);
        }
      } else if (!rowData.objects.some(object => object.x === x)) rowData.objects.push({
        x, type, routeLevel: 'MAIN', routeY: 0, elevation: 0
      });
      sanitizeRow(state, rowData);
    }
    return changed;
  }
  function enrichUpcoming(state, mode) {
    for (const rowData of state.rows?.values() || []) {
      if (rowData.distance < state.distance + 45 || rowData.distance > state.distance + (mode === 'risk' ? 600: 800)) continue;
      if (mode === 'risk' || mode === 'hazard') {
        const x = mode === 'risk' && state.riskLane !== rowData.safeX && !rowData.objects.some(object => object.x === state.riskLane) ? state.riskLane: lanes.find(lane => lane !== rowData.safeX && !rowData.objects.some(object => lane === object.x));
        if (x !== undefined && rowData.index % 2 === 0) rowData.objects.push({
          x, type: rowData.index % 4 === 0 ? 'hurdle': 'rock', routeLevel: 'MAIN', routeY: 0, elevation: 0
        });
      } else if (mode === 'rush' && rowData.index % 2 === 0) rowData.objects.push({
        x: rowData.safeX, type: rowData.index % 4 === 0 ? 'phaseShard': 'coin', routeLevel: 'MAIN', routeY: 0, elevation: 0
      });
      sanitizeRow(state, rowData);
    }
  }
  function activatePhase(state) {
    if (!state || state.status === 'wrecked' || state.phaseCharge < 4 || state.phaseTime > 0) return false;
    state.phaseCharge = 0;
    state.phaseTime = state.car === 'phantom' ? 3.35: 2.8;
    state.phaseUses++;
    state._phaseStartedAt = state.time || 0;
    emit(state, {
      type: 'phase-start', duration: state.phaseTime
    });
    return true;
  }
  function activatePulse(state) {
    if (!state || state.status === 'wrecked' || state.pulseTime > 0 || state.pulseCooldown > 0) return false;
    state.pulseTime = .9;
    state.pulseCooldown = 12;
    state.pulseUses++;
    emit(state, {
      type: 'pulse-start'
    });
    return true;
  }
  function activateFlight(state) {
    return Feel.activateFlight(state);
  }
  function activateShield(state) {
    return Feel.activateShield(state);
  }
  function sweepPulse(state, reach) {
    for (const rowData of state.rows?.values() || []) {
      if (rowData.distance <= state.distance || rowData.distance > state.distance + reach) continue;
      rowData.objects.forEach((object, j) => {
        if (!pulseBreakable.includes(object.type) || Math.abs(object.x - state.x) > 2.8) return;
        const type = object.type;
        object.x = 99;
        state.smashed = (state.smashed || 0) + 1;
        streak(state, 130, 'PULSE BREAK');
        emit(state, {
          type: 'pulse-break', index: rowData.index, j, target: type
        });
      });
    }
  }
  function tick(state, dt) {
    if (state.status && state.status !== 'running') return;
    Upper?.tick?.(state, dt);
    const pulseWas = state.pulseTime || 0;
    for (const name of ['phaseTime', 'pulseTime', 'pulseCooldown', 'dimensionTime', 'riskTime', 'nearTimer']) state[name] = Math.max(0, (state[name] || 0) - dt);
    if ((state.nearTimer || 0) === 0) state.nearStreak = 0;
    if (pulseWas > 0) sweepPulse(state, 145 * (1 - state.pulseTime / .9));
    if (state.phaseTime === 0 && state._phaseWasActive) {
      state._phaseWasActive = false;
      emit(state, {
        type: 'phase-end'
      });
    } else if (state.phaseTime > 0) state._phaseWasActive = true;
    if (state.pulseTime === 0 && state._pulseWasActive) {
      state._pulseWasActive = false;
      emit(state, {
        type: 'pulse-end'
      });
    } else if (state.pulseTime > 0) state._pulseWasActive = true;
    if (state.dimensionTime === 0 && state.dimension) {
      state.eventsSurvived++;
      state.runCredits = (state.runCredits || 0) + 45;
      emit(state, {
        type: 'dimension-end', dimension: state.dimension
      });
      state.dimension = null;
    }
    if (state.riskTime > 0 && state.riskLane !== undefined) {
      state.riskOutside = Math.abs(state.x - state.riskLane) > 2.5 ? (state.riskOutside || 0) + dt: Math.max(0, (state.riskOutside || 0) - dt);
      if (state.riskOutside > 1.2) {
        state.riskTime = 0;
        state._riskWasActive = false;
        emit(state, {
          type: 'risk-failed'
        });
      }
    }
    if (state.riskTime === 0 && state._riskWasActive) {
      state._riskWasActive = false;
      state.riskClears++;
      state.runCredits = (state.runCredits || 0) + 40;
      emit(state, {
        type: 'risk-end'
      });
    } else if (state.riskTime > 0) state._riskWasActive = true;
    state.cleanDistance = Math.max(state.cleanDistance || 0, (state.distance || 0) - (state.cleanOrigin || 0));
    state.cleanSeconds = Math.max(state.cleanSeconds || 0, (state.time || 0) - (state._lastDamageTime || 0));
    if ((state.speed || 0) * 3.6 > 700) state.highSpeedDistance = (state.highSpeedDistance || 0) + (state.speed || 0) * dt;
    /* Hyper speed target is centralized in NeonFeel.powerTick. */
    if ((state.dimension === 'gravity' || state.event?.type === 'gravityWave') && state.air > 0) state.air += dt * .25;
    if (state.dimension === 'time' || state.event?.type === 'timeFracture') state.speed = Math.min(state.speed, 74);
  }
  function recordEvent(state, event = {
  }) {
    const type = event.type;
    if (type === 'cell' || type === 'health') state.healthPickups = (state.healthPickups || 0) + 1;
    if (type === 'nitro' && event.outcome === 'pickup') state.nitroPickups = (state.nitroPickups || 0) + 1;
    if (type === 'nitro-use' || type === 'boost-start') state.nitroUses = (state.nitroUses || 0) + 1;
    if (type === 'energyShield' && event.outcome === 'pickup') state.shieldPickups = (state.shieldPickups || 0) + 1;
    if (type === 'shield-save') state.shieldImpacts = (state.shieldImpacts || 0) + 1;
    if (type === 'flight' || type === 'flightBoost') {
      if (event.outcome === 'pickup') state.flightPickups = (state.flightPickups || 0) + 1;
      if (event.outcome === 'active' || event.outcome === 'use') state.flightUses = (state.flightUses || 0) + 1;
    }
    if (type === 'flight-start') state.flightUses = (state.flightUses || 0) + 1;
    if (type === 'dronePower' && event.outcome === 'pickup') state.dronePowerPickups = (state.dronePowerPickups || 0) + 1;
    if (type === 'drone-shot' || (type === 'pulse-break' && event.target === 'drone')) {
      state.dronesDestroyed = (state.dronesDestroyed || 0) + 1;
      if (state.car === 'interceptor') state.overdriveCharge = Math.min(100, (state.overdriveCharge || 0) + 8);
    }
    if (type === 'ramp') state.ramps = (state.ramps || 0) + 1;
    if (type === 'free-jump') state.manualJumps = (state.manualJumps || 0) + 1;
    if (type === 'upper-route-cleared') state.upperRoutes = (state.upperRoutes || 0) + 1;
    return state;
  }
  function nearMiss(state) {
    state.near = (state.near || 0) + 1;
    state.nearStreak = (state.nearTimer || 0) > 0 ? Math.min(5, (state.nearStreak || 0) + 1): 1;
    state.nearTimer = 2.6;
    const bonus = 100 * state.nearStreak;
    streak(state, bonus, 'NEAR MISS');
    emit(state, {
      type: 'near-reward', multiplier: state.nearStreak, bonus
    });
  }
  function nextDimension(state) {
    let visited = new Set(Array.isArray(state.dimensionVisited) ? state.dimensionVisited: []);
    if (visited.size >= dimensions.length) {
      visited = new Set();
      state.dimensionVisited = [];
    }
    let pool = dimensions.filter(d => !visited.has(d.id));
    if ((state.portals || 0) === 0 && !visited.has('gravity')) pool = [dimensions.find(d => d.id === 'gravity')];
    const index = (Math.imul((state.seed || 0) >>> 0, 7) + (state.portals || 0) * 3 + Math.floor((state.distance || 0) / 350)) >>> 0, dimension = pool[index % pool.length];
    state.dimensionVisited.push(dimension.id);
    return dimension;
  }
  function hit(state, object = {
  }) {
    const type = normalizePickupType(object.type);
    if (type === 'ramp' && object.routeAction === 'ENTER_UPPER') return Upper?.take?.(state, object) ? 'upper-route': null;
    if (type === 'scoreBoost') return applyScoreBoost(state);
    if (type === 'cell' || type === 'health') {
      state.health = Math.min(100, (state.health || 0) + (state.stats?.repair || state.repair || 6));
      streak(state, 100, 'HEALTH REPAIR');
      return 'pickup';
    }
    if (type === 'nitro') {
      state.nitro = Math.min(100, (state.nitro || 0) + 45);
      streak(state, 120, 'NITRO REFILL');
      return 'pickup';
    }
    if (type === 'energyShield' || type === 'shield') {
      activateShield(state);
      streak(state, 150, 'SHIELD');
      return 'pickup';
    }
    if (type === 'flight' || type === 'flightBoost') {
      activateFlight(state);
      streak(state, 220, 'FLIGHT');
      return 'pickup';
    }
    if (type === 'dronePower') {
      state.dronePower = Feel.DRONE_POWER_SECONDS;
      streak(state, 220, 'DRONE POWER');
      return 'pickup';
    }
    if (type === 'phaseShard') {
      state.shards = (state.shards || 0) + 1;
      state.phaseCharge = Math.min(4, (state.phaseCharge || 0) + 1);
      streak(state, 25, 'PHASE SHARD');
      return 'pickup';
    }
    if (type === 'portal') {
      const dimension = nextDimension(state);
      state.dimension = dimension.id;
      state.dimensionTime = dimension.length;
      state.dimensionCount = (state.dimensionCount || 0) + 1;
      state.portals = (state.portals || 0) + 1;
      if (dimension.id === 'rush' || dimension.id === 'hazard') enrichUpcoming(state, dimension.id);
      emit(state, {
        type: 'dimension-start', dimension: dimension.id, label: dimension.label
      });
      streak(state, 160, 'PORTAL');
      return 'portal';
    }
    if (type === 'risk') {
      state.riskTime = 8;
      state.riskLane = object.x;
      state.riskOutside = 0;
      enrichUpcoming(state, 'risk');
      emit(state, {
        type: 'risk-start'
      });
      return 'pickup';
    }
    if (type === 'chain') {
      const progress = state.chainProgress;
      if (object.step === 0) state.chainProgress = {
        id: object.chainId, next: 1
      };
      else if (progress && progress.id === object.chainId && progress.next === object.step) state.chainProgress = {
        id: object.chainId, next: object.step + 1
      };
      else state.chainProgress = null;
      if (object.step === 2 && state.chainProgress?.next === 3) {
        state.chains++;
        state.runCredits = (state.runCredits || 0) + 60;
        streak(state, 220, 'ENERGY CHAIN');
        state.chainProgress = null;
      } else streak(state, 30, 'CHAIN');
      return 'pickup';
    }
    if (!hazards.includes(type)) return null;
    if (state.phaseTime > 0) {
      const perfect = (state.time || 0) - (state._phaseStartedAt || - 99) <= 0.75;
      streak(state, perfect?260: 90, perfect?'PERFECT PHASE': 'PHASE DODGE');
      if (perfect) emit(state, {
        type: 'perfect-phase', bonus: 260
      });
      return 'phased';
    }
    if (state.overdrive > 0 && ['hurdle', 'roadwork', 'drone'].includes(type)) {
      state.smashed = (state.smashed || 0) + 1;
      streak(state, 150, 'OVERDRIVE BREAK');
      emit(state, {
        type: 'overdrive-break', target: type
      });
      return 'break';
    }
    if (state.pulseTime > 0 && pulseBreakable.includes(type)) {
      state.smashed = (state.smashed || 0) + 1;
      streak(state, 130, 'PULSE BREAK');
      return 'break';
    }
    if (state.invulnerable > 0) return 'protected';
    if (state.shield) {
      state.shield = 0;
      state.timedShield = 0;
      state.shieldGrace = 0;
      emit(state, {
        type: 'shield-save'
      });
      return 'protected';
    }
    const grace = (state.runs || 0) === 0 && ((state.time || 0) < 60 || (state.portals === 1 && state.dimension !== null)), damage = Math.ceil((grace ? 12: 26) * (state.stats?.damageScale || 1));
    state.combo = 0;
    state.comboLeft = 0;
    state.nearStreak = 0;
    state.nearTimer = 0;
    state.cleanOrigin = state.distance;
    state._lastDamageTime = state.time || 0;
    state.cleanSeconds = 0;
    state.cleanDistance = 0;
    state.health = Math.max(0, (state.health || 0) - damage);
    state.damageTaken = (state.damageTaken || 0) + damage;
    state.speed = (state.speed || 0) * .66;
    if (state.health <= 0) state.status = 'wrecked';
    return 'damage';
  }
  function completeMissions(state, store, date) {
    store.completed = store.completed || {
    };
    store.daily = store.daily || {
    };
    const daily = [missions[(date.length * 7 + Number(date.replace(/-/g, ''))) % missions.length], missions[(Number(date.slice( - 2)) + 3) % missions.length]], result = [];
    for (const [dailyMode, list] of [[false, missions], [true, daily]]) for (const mission of list) {
      const bucket = dailyMode ? store.daily: store.completed, key = dailyMode ? `${date}:${mission.id}`: mission.id;
      if (bucket[key] || (state[mission.key] || 0) < mission.target) continue;
      bucket[key] = true;
      store.credits = (store.credits || 0) + mission.reward;
      result.push({
        ...mission, daily: dailyMode
      });
    }
    return result;
  }
  return {
    MAX_SPEED, reactionSeconds, reactionDistance, lanes, hazards, dimensions, missions, tutorialLessons, tutorialPacing: Object.fromEntries(tutorialLessons.map(lesson => [lesson.id, lesson.unlock])), difficulty, init, row, sanitizeRow, tick, hit, nearMiss, recordEvent, activatePhase, activatePulse, activateFlight, activateShield, applyRunEvent, completeMissions, multiplier, scheduleTutorial, normalizePickupType, applyScoreBoost, upperRoute: Upper
  };
});
