/* Authoritative gameplay-only colliders. No scene/group bounds or effect nodes. */
(function(root) {
  'use strict';
  const cars = {
    vector: [.82, .65, 2.08, .80], spectre: [1.02, .60, 2.22, .76], phantom: [.70, .51, 2.30, .65], nightfall: [1.10, .69, 2.06, .86], cyberx: [.91, .55, 2.22, .71], interceptor: [.91, .77, 2.02, .93], vortex: [.48, .45, 2.05, .59], titan: [1.20, .85, 2.02, 1.03], nova: [.86, .49, 2.28, .64]
  };
  const box = (x, y, z, hx, hy, hz) => ({
    x, y, z, hx, hy, hz
  });
  const specs = {
    barrier: {
      scale: .80, parts: [box(0, 1.22, - .57, 1.94, .86, .18), box(0, .12, .09, 1.91, .10, .49), box( - 1.55, .90, .05, .22, .80, .34), box(1.55, .90, .05, .22, .80, .34)]
    },
    // Keep the damaging body deliberately low: the visual hurdle is larger/brighter, but a normal Jump clears it.
    hurdle: {
      scale: .90, parts: [box(0, .55, .01, 1.73, .20, .22), box( - 1.59, .5, 0, .20, .4, .30), box(1.59, .5, 0, .20, .4, .30)]
    }, truck: {
      scale: .92, parts: [box(0, 1.56, 0, 1.30, 1.17, 2.27)]
    }, traffic: {
      scale: 1.03, parts: [box(0, .54, 0, 1.07, .29, 1.79)]
    }, police: {
      scale: .92, parts: [box(0, .54, 0, 1.02, .29, 1.79)]
    }, gate: {
      scale: .86, parts: [box(0, 1.35, 0, 1.50, 1.02, .06), box( - 1.8, 1.4, 0, .15, 1.25, .17), box(1.8, 1.4, 0, .15, 1.25, .17), box(0, 2.70, 0, 1.89, .15, .17)]
    }, laser: {
      scale: .86, parts: [box(0, .77, - .55, 1.55, .075, .065), box(0, 1.23, - .55, 1.55, .075, .065), box(0, 1.69, - .55, 1.55, .075, .065), box( - 1.75, 1, - .30, .18, .79, .25), box(1.75, 1, - .30, .18, .79, .25)]
    }, roadwork: {
      scale: .92, parts: [box(0, .70, - .47, 1.47, .32, .12), box( - 1.38, .62, - .42, .075, .49, .13), box(1.38, .62, - .42, .075, .49, .13), box( - 1.36, .11, .02, .25, .075, .32), box(1.36, .11, .02, .25, .075, .32)]
    }, drone: {
      scale: .90, parts: [box(0, 1.4, 0, .61, .31, .57), box( - 1.05, 1.4, 0, .40, .10, .44), box(1.05, 1.4, 0, .40, .10, .44)]
    }, rock: {
      scale: .88, parts: [box(0, .75, 0, .65, .65, .60), box( - .70, .60, 0, .24, .48, .34), box(.70, .60, 0, .24, .48, .34), box(0, .55, - .54, .42, .42, .22), box(0, .55, .54, .42, .42, .22), box(0, 1.47, 0, .46, .31, .39)]
    }, falling: {
      scale: .90, parts: [box(0, 1.25, 0, .90, .88, .90)]
    }
  };
  const danger = Object.keys(specs);
  const collectibles = new Set(['cell', 'health', 'nitro', 'coin', 'magnet', 'double', 'scoreBoost', 'energyShield', 'shield', 'superNitro', 'flight', 'flightBoost', 'dronePower', 'phaseShard', 'chain', 'risk']);
  function chassis(id) {
    const p = cars[id] || cars.vector;
    return box(0, p[3], 0, p[0], p[1], p[2]);
  }
  function roadSurfaceY(s) {
    return root.NeonUpperRoute?.surfaceY?root.NeonUpperRoute.surfaceY(s, s?.distance): s?.routeLevel === 'UPPER'?Number(s.routeY) || 0: 0;
  }
  function height(s) {
    const road = roadSurfaceY(s);
    return road + (s.flight > 0?3.8 + Math.sin((s.time || 0) * 5) * .18: root.NeonRamp.jumpHeight(s.air, s._rampAir?1.9: 1.55));
  }
  function capture(s) {
    return {
      x: s.x, y: height(s), distance: s.distance, time: s.time, yaw: s.bodyYaw || 0
    };
  }
  function collider(o) {
    if (!specs[o.type])return null;
    if (o.collider?.type === o.type)return o.collider;
    const cfg = specs[o.type], rot = ['barrier', 'traffic', 'police'].includes(o.type)? - 1: 1;
    o.collider = {
      type: o.type, parts: cfg.parts.map(b => box(b.x * cfg.scale, b.y * cfg.scale, b.z * cfg.scale * rot, b.hx * cfg.scale, b.hy * cfg.scale, b.hz * cfg.scale)), maxZ: Math.max(...cfg.parts.map(b => Math.abs(b.z * cfg.scale) + b.hz * cfg.scale))
    };
    return o.collider;
  }
  function objectDistance(row, o) {
    return Number(row?.distance || 0) + Number(o?.distanceOffset || 0);
  }
  function objectX(s, row, o, time = s?.time || 0) {
    return o.type === 'traffic'?o.x + Math.sin(time * .8 + row.index) * 2.1: o.x;
  }
  function objectY(o, time, index, s) {
    const road = o?.routeLevel === 'UPPER'?Number(o.routeY) || 0: 0;
    if (o?.type === 'falling')return road + 1.2 + Math.abs(Math.sin(time * 1.6 + index)) * 3;
    // During Flight, upcoming collectibles on the active route rise to the car instead of remaining useless below it.
    const sameRoute = !s || !root.NeonUpperRoute?.activeFor || root.NeonUpperRoute.activeFor(s, o);
    if (s?.flight > 0 && sameRoute && collectibles.has(o?.type))return road + 3.8 + Math.sin((time || 0) * 5) * .12;
    return road;
  }
  function sweep(p0, p1, body, ob0, ob1, b, yaw) {
    const c = Math.cos(yaw), q = Math.sin(yaw), dx0 = p0.x - ob0.x - b.x, dz0 = p0.distance - ob0.distance + b.z, dy0 = p0.y + body.y - ob0.y - b.y;
    const dx1 = p1.x - ob1.x - b.x, dz1 = p1.distance - ob1.distance + b.z, dy1 = p1.y + body.y - ob1.y - b.y;
    let lo = 0, hi = 1;
    const axes = [[1, 0, 0, Math.abs(c) * body.hx + Math.abs(q) * body.hz + b.hx], [0, 0, 1, Math.abs(q) * body.hx + Math.abs(c) * body.hz + b.hz], [0, 1, 0, body.hy + b.hy], [c, 0, - q, body.hx + Math.abs(c) * b.hx + Math.abs(q) * b.hz], [q, 0, c, body.hz + Math.abs(q) * b.hx + Math.abs(c) * b.hz]];
    for (const[a, y, z, r]of axes) {
      const start = dx0 * a + dy0 * y + dz0 * z, end = dx1 * a + dy1 * y + dz1 * z, v = end - start;
      if (Math.abs(v) < 1e-9) {
        if (Math.abs(start) >= r)return null;
        continue;
      }
      let enter = ( - r - start) / v, exit = (r - start) / v;
      if (enter > exit)[enter, exit] = [exit, enter];
      lo = Math.max(lo, enter);
      hi = Math.min(hi, exit);
      if (lo >= hi)return null;
    }
    return lo >= 0 && lo <= 1?lo: null;
  }
  function contact(s, previous, row, o) {
    const cfg = collider(o);
    if (!cfg || o.x === 99)return null;
    const body = chassis(s.car), now = capture(s), start = {
      ...previous
    }, z = objectDistance(row, o), ob0 = {
      x: objectX(s, row, o, previous.time), y: objectY(o, previous.time, row.index, s), distance: z
    }, ob1 = {
      x: objectX(s, row, o), y: objectY(o, s.time, row.index, s), distance: z
    };
    let first = null;
    for (const b of cfg.parts) {
      const t = sweep(start, now, body, ob0, ob1, b, (previous.yaw + now.yaw) * .5);
      if (t !== null && (first === null || t < first))first = t;
    }
    return first;
  }
  function crossed(previous, s, distance, offset = 0) {
    return previous.distance + offset < distance && s.distance + offset >= distance;
  }
  function trigger(s, previous, row, o) {
    if (o.x === 99)return false;
    const z = objectDistance(row, o);
    if (!crossed(previous, s, z))return false;
    const t = (z - previous.distance) / Math.max(.001, s.distance - previous.distance), x = previous.x + (s.x - previous.x) * t, y = previous.y + (height(s) - previous.y) * t;
    const oy = objectY(o, s.time, row.index, s), vertical = Math.abs(y - oy);
    if (o.type === 'portal')return Math.abs(x - o.x) < 1.67 && vertical < 3.9;
    const range = (s.stats?.pickupRange || 1.4) + (s.magnet > 0?3.5: 0);
    return Math.abs(x - o.x) < range && vertical < (s.flight > 0?2.75: 2.1);
  }
  function near(s, previous, row, o) {
    const cfg = collider(o), body = chassis(s.car), z = objectDistance(row, o);
    if (!cfg || !crossed(previous, s, z + cfg.maxZ + body.hz))return false;
    const dx = Math.abs(s.x - objectX(s, row, o));
    let closest = Infinity;
    for (const b of cfg.parts) {
      if (height(s) + body.y - body.hy >= objectY(o, s.time, row.index, s) + b.y + b.hy)continue;
      closest = Math.min(closest, Math.abs(s.x - objectX(s, row, o) - b.x) - body.hx - b.hx);
    }
    return dx < 5 && closest > 0 && closest < .72;
  }
  function fairRow(s, row) {
    const body = chassis(s.car), previous = s.rows?.get(row.index - 1), lanes = [ - 5, 0, 5], level = o => o.routeLevel || 'MAIN';
    if (previous && Math.abs(row.safeX - previous.safeX) > 5)row.safeX = 0;
    const overlaps = (o, x) => {
      const cfg = collider(o);
      if (!cfg)return false;
      const motion = o.type === 'traffic'?1.7: 0;
      return cfg.parts.some(b => Math.abs(x - o.x - b.x) < body.hx + b.hx + motion + .25);
    };
    for (const routeLevel of ['MAIN', 'UPPER']) {
      const safe = routeLevel === 'UPPER'?(row.upperSafeX ?? row.safeX): row.safeX;
      row.objects = row.objects.filter(o => level(o) !== routeLevel || !danger.includes(o.type) || !overlaps(o, safe) || o.tutorial === true || o.jumpable === true);
      if (lanes.every(x => row.objects.some(o => level(o) === routeLevel && danger.includes(o.type) && overlaps(o, x) && o.jumpable !== true)))row.objects = row.objects.filter(o => level(o) !== routeLevel || !danger.includes(o.type) || !overlaps(o, safe) || o.jumpable === true);
    }
    for (const o of row.objects) {
      if (danger.includes(o.type) || o.type === 'ramp' || o.type === 'risk' || o.type === 'chain' || o.type === 'portal' || o.x === 99)continue;
      const routeLevel = level(o), safe = routeLevel === 'UPPER'?(row.upperSafeX ?? row.safeX): row.safeX;
      const blocked = x => row.objects.some(h => level(h) === routeLevel && danger.includes(h.type) && h.jumpable !== true && overlaps(h, x)) || (previous && row.distance - previous.distance < Math.max(28, (s.speed || 62) * .28) && previous.objects.some(h => h.x !== 99 && level(h) === routeLevel && danger.includes(h.type) && h.jumpable !== true && overlaps(h, x)));
      if (blocked(o.x) && !blocked(safe))o.x = safe;
    }
    row.objects = row.objects.filter(o => o.type === 'ramp' || !row.objects.some(r => r.type === 'ramp' && level(r) === level(o) && Math.abs(r.x - o.x) < 2.2 && Math.abs(Number(o.distanceOffset || 0)) < 4));
    return row;
  }
  function debug(scene, car, objects, s, on) {
    const K = root.NeonArtKit;
    if (!K)return;
    function show(parent, name, b, enabled) {
      let m = parent.getObjectByName(name);
      if (!enabled) {
        if (m) {
          parent.remove(m);
          m.geometry.dispose();
          m.material.dispose();
        }
        return;
      }
      if (!m) {
        m = new K.Mesh(new K.BoxGeometry(1, 1, 1), new K.StandardMaterial({
          color: 0x4dff80, emissive: 0x4dff80, emissiveIntensity: 1, wireframe: true, depthTest: false
        }));
        m.name = name;
        parent.add(m);
      }
      m.position.set(b.x, b.y, b.z);
      m.scale.set(b.hx * 2, b.hy * 2, b.hz * 2);
    }
    show(car, 'debug-chassis', chassis(s.car), on);
    for (const obj of objects.values()) {
      const cfg = collider(obj.userData);
      if (cfg)cfg.parts.forEach((b, i) => {
        const scale = obj.scale.x || 1;
        show(obj, 'debug-solid-' + i, box(b.x / scale, b.y / scale, b.z / scale * (obj.rotation.y? - 1: 1), b.hx / scale, b.hy / scale, b.hz / scale), on);
      });
    }
  }
  root.NeonCollision = {
    danger, chassis, height, capture, collider, contact, trigger, crossed, near, fairRow, debug, objectDistance, objectX, objectY
  };
})(window);
