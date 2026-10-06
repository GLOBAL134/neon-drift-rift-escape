/* Optional upper-road state machine. Loaded before expansion.js. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.NeonUpperRoute = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const PHASES = ['FLAT', 'ASCEND', 'UPPER', 'DESCEND'];
  const TYPES = ['credit', 'speed', 'danger'];
  const lanes = [-5, 0, 5];
  const hazards = new Set(['barrier', 'rock', 'truck', 'police', 'laser', 'gate', 'traffic', 'hurdle', 'drone', 'roadwork', 'falling']);
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, Number(n) || 0));
  const copy = value => value && JSON.parse(JSON.stringify(value));
  const ease = n => n * n * (3 - 2 * n);
  const seedOf = state => ((((state.seed || 0) >>> 0) ^ Math.imul((state.upperRuns || 0) + 1, 2654435761)) >>> 0);
  const pick = (n, list) => list[Math.abs(n) % list.length];

  function scheduleDistance(state) {
    const speed = Math.max(20, Number(state.speed || state.stats?.speed || 62));
    const seconds = 45 + (seedOf(state) % 46);
    return (state.distance || 0) + clamp(speed * seconds, 900, 5600);
  }

  function makePlan(state, distance, difficulty) {
    const speed = Math.max(20, Number(state.speed || state.stats?.speed || 62));
    const stage = Math.max(0, Number(difficulty?.stage) || 0);
    const duration = 10 + (seedOf(state) + stage * 3) % 9;
    const cruise = Math.min(speed, Number(state.stats?.normalCap) || speed);
    const length = clamp(cruise * duration, 1100, 3200);
    const ascent = distance + length * 0.25;
    const flat = distance + length * 0.73;
    const exit = distance + length;
    const type = pick(seedOf(state) + stage, TYPES);
    const height = type === 'danger' ? 14 : type === 'speed' ? 12 : 10;
    return {
      id: `upper-${(state.upperRuns || 0) + 1}-${Math.floor(distance)}`,
      type,
      entryDistance: distance,
      start: distance,
      ascentEnd: ascent,
      flatEnd: flat,
      exitDistance: exit,
      end: exit,
      duration,
      routeY: height,
      stage,
      entryIndex: null
    };
  }

  function roadY(plan, distance) {
    if (!plan) return 0;
    const d = Number(distance) || 0;
    if (d <= plan.entryDistance || d >= plan.exitDistance) return 0;
    if (d < plan.ascentEnd) return plan.routeY * ease((d - plan.entryDistance) / Math.max(1, plan.ascentEnd - plan.entryDistance));
    if (d <= plan.flatEnd) return plan.routeY;
    return plan.routeY * (1 - ease((d - plan.flatEnd) / Math.max(1, plan.exitDistance - plan.flatEnd)));
  }

  function phaseAt(plan, distance) {
    if (!plan) return 'FLAT';
    const d = Number(distance) || 0;
    if (d < plan.ascentEnd) return 'ASCEND';
    if (d <= plan.flatEnd) return 'UPPER';
    if (d < plan.exitDistance) return 'DESCEND';
    return 'FLAT';
  }

  function surfaceY(source, distance = source?.distance) {
    if (!source || source.routeLevel !== 'UPPER') return 0;
    const plan = source.upperPlan || source.routePlan;
    return plan ? roadY(plan, distance) : Number(source.routeY) || 0;
  }

  function init(state) {
    state = state || {};
    if (!PHASES.includes(state.routePhase)) state.routePhase = 'FLAT';
    if (state.routeLevel !== 'UPPER') state.routeLevel = 'MAIN';
    if (!Object.prototype.hasOwnProperty.call(state, 'upperPlan')) state.upperPlan = null;
    state.routeY = surfaceY(state);
    if (!Number.isFinite(state.upperRuns)) state.upperRuns = 0;
    if (!Number.isFinite(state.nextUpperDistance)) {
      const distance = Math.max(0, Number(state.distance) || 0);
      state.nextUpperDistance = distance < 3000 ? 3000 : scheduleDistance(state);
    }
    return state;
  }

  function markMain(object) {
    object.routeLevel = 'MAIN';
    object.routeY = 0;
    object.elevation = 0;
    return object;
  }

  function laneFree(row, lane) {
    return !row.objects.some(object => object.x === lane && hazards.has(object.type));
  }

  function upperObject(state, row, type, x, extra = {}) {
    const plan = state.upperPlan, offset = Number(extra.distanceOffset) || 0, y = roadY(plan, row.distance + offset);
    return {
      x,
      type,
      routeLevel: 'UPPER',
      routeY: y,
      elevation: y,
      upperType: plan.type,
      ...extra
    };
  }

  function addUpperCoinTrail(state, row, laneA, laneB, pattern, count = 7) {
    const spacing = 5.8;
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1);
      let x = laneA;
      if (pattern === 'lane-change') x = laneA + (laneB - laneA) * t;
      else if (pattern === 'S') x = laneA + Math.sin(t * Math.PI * 2) * 2.6;
      else if (pattern === 'double') {
        row.objects.push(upperObject(state, row, 'coin', laneB, { authored: true, coinPattern: pattern, patternStep: i, distanceOffset: i * spacing, trailCount: 1 }));
      }
      row.objects.push(upperObject(state, row, 'coin', x, { authored: true, coinPattern: pattern, patternStep: i, distanceOffset: i * spacing, trailCount: 1 }));
    }
  }

  function addUpperPattern(state, row) {
    const plan = state.upperPlan;
    const step = Math.max(0, row.index - (plan.entryIndex || row.index));
    const safe = row.safeX ?? 0;
    row.upperSafeX = safe;
    const other = lanes.find(lane => lane !== safe && laneFree(row, lane)) ?? (safe === 0 ? -5 : 0);
    const third = lanes.find(lane => lane !== safe && lane !== other) ?? other;
    const pattern = ['straight', 'double', 'lane-change', 'S', 'straight', 'double'][step % 6];
    row.upperPattern = pattern;

    // Upper road is a real risk/reward route: more readable hazards plus richer Credit lines.
    if (step > 1 && step % 2 === 0) {
      const hazardLane = step % 4 === 0 ? other : third;
      const hazardType = plan.type === 'danger' && step % 4 === 0 ? 'laser' : step % 3 === 0 ? 'hurdle' : 'barrier';
      if (laneFree(row, hazardLane)) row.objects.push(upperObject(state, row, hazardType, hazardLane, { moving: false, authored: true, jumpable: hazardType === 'hurdle', obstacleTemplate: 'upper-gauntlet' }));
    }
    if (plan.type === 'danger' && step % 5 === 2 && laneFree(row, third)) row.objects.push(upperObject(state, row, 'hurdle', third, { authored: true, jumpable: true, obstacleTemplate: 'upper-danger-jump' }));
    if (plan.type === 'speed' && step % 7 === 0) row.objects.push(upperObject(state, row, 'superNitro', safe, { authored: true, distanceOffset: 2 }));

    const coinCount = plan.type === 'credit' ? 6 : plan.type === 'danger' ? 4 : 4;
    addUpperCoinTrail(state, row, safe, other, pattern, coinCount);
  }

  function decorateRow(state, row, difficulty) {
    init(state);
    row.objects = Array.isArray(row.objects) ? row.objects : [];
    for (const object of row.objects) {
      if (object.routeLevel !== 'UPPER') markMain(object);
    }
    const distance = Number(row.distance) || 0;
    if (!state.upperPlan && distance >= state.nextUpperDistance && distance >= 3000) {
      state.upperPlan = makePlan(state, distance, difficulty);
      state.upperPlan.entryIndex = row.index;
      state.nextUpperDistance = Infinity;
    }
    const plan = state.upperPlan;
    if (!plan || distance < plan.entryDistance - 1 || distance > plan.exitDistance) return row;
    row.objects = row.objects.filter(object => object.type !== 'portal');
    row.upperPlan = copy(plan);
    if (row.index === plan.entryIndex && !row.objects.some(object => object.routeAction === 'ENTER_UPPER')) {
      const entry = markMain({
        x: row.safeX ?? 0,
        type: 'ramp',
        routeAction: 'ENTER_UPPER',
        specialRamp: true,
        routePlan: copy(plan)
      });
      row.objects = row.objects.filter(object => object.x !== entry.x);
      row.objects.push(entry);
      return row;
    }
    if (distance <= plan.entryDistance || distance >= plan.exitDistance || roadY(plan, distance) <= 0) return row;
    addUpperPattern(state, row);
    return row;
  }

  function take(state, rampObject) {
    init(state);
    const plan = rampObject?.routePlan || state.upperPlan;
    if (!plan || rampObject?.routeAction !== 'ENTER_UPPER' || state.routeLevel === 'UPPER') return false;
    if (state.upperPlan && plan.id !== state.upperPlan.id) return false;
    state.upperPlan = copy(plan);
    state.routeLevel = 'UPPER';
    state.routePhase = 'ASCEND';
    state.routeY = roadY(plan, Number(state.distance) || plan.entryDistance);
    state.upperStarted = true;
    state.events = state.events || [];
    state.events.push({ type: 'upper-route-entered', routePlan: copy(plan) });
    return true;
  }

  function finish(state, plan) {
    state.routeLevel = 'MAIN';
    state.routePhase = 'FLAT';
    state.routeY = 0;
    state.runCredits = (state.runCredits || 0) + 20;
    state.score = (state.score || 0) + 100;
    state.upperRuns = (state.upperRuns || 0) + 1;
    state.events = state.events || [];
    state.events.push({ type: 'upper-route-cleared', routeType: plan.type, credits: 20, score: 100 });
    state.upperPlan = null;
    state.upperStarted = false;
    state.nextUpperDistance = scheduleDistance(state);
  }

  function tick(state, dt) {
    init(state);
    const plan = state.upperPlan;
    if (!plan) { state.routeY = 0; return state; }
    const distance = Number(state.distance) || 0;
    if (state.routeLevel === 'UPPER') {
      state.routePhase = phaseAt(plan, distance);
      state.routeY = surfaceY(state, distance);
      if (distance >= plan.exitDistance) finish(state, plan);
    } else {
      state.routeY = 0;
      if (distance > plan.exitDistance + 1) {
        state.upperPlan = null;
        state.nextUpperDistance = scheduleDistance(state);
      }
    }
    state.upperRouteTime = (state.upperRouteTime || 0) + Math.max(0, Number(dt) || 0);
    return state;
  }

  function objectY(object) {
    return object?.routeLevel === 'UPPER' ? Number(object.routeY) || 0 : 0;
  }

  function activeFor(state, object) {
    if (!object || object.x === 99) return false;
    if (object.routeAction === 'ENTER_UPPER') return state?.routeLevel !== 'UPPER';
    if (object.routeLevel === 'UPPER') return state?.routeLevel === 'UPPER' && !!state.upperPlan;
    return state?.routeLevel !== 'UPPER';
  }

  function scoreMultiplier(state) {
    return state?.routeLevel === 'UPPER' ? 1.25 : 1;
  }

  function getVisualPlan(state) {
    if (!state?.upperPlan) return null;
    return { ...copy(state.upperPlan), phase: state.routePhase || 'FLAT', routeLevel: state.routeLevel || 'MAIN', routeY: surfaceY(state) };
  }

  return { PHASES, TYPES, init, decorateRow, take, tick, roadY, surfaceY, objectY, activeFor, scoreMultiplier, getVisualPlan };
});
