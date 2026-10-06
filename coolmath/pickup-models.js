/* Shared gameplay pickup factory: intentional extruded/faceted sculptures. */
(function(root) {
  'use strict';
  const K = () => root.NeonArtKit;
  const geometryCache = new Map(), coinMaterialCache = new Map();
  function mat(color, emissive = .3, metalness = .45, opacity = 1) {
    return new (K().StandardMaterial)({
      color, emissive: color, emissiveIntensity: emissive, metalness, roughness: .28, transparent: opacity < 1, opacity, depthWrite: opacity >= 1
    });
  }
  function coinMat(key, color, emissive = .3, metalness = .45) {
    let material = coinMaterialCache.get(key);
    if (!material) {
      material = mat(color, emissive, metalness);
      material.userData.neonShared = true;
      coinMaterialCache.set(key, material);
    }
    return material;
  }
  function mesh(g, name, geo, m, x = 0, y = 0, z = 0) {
    return K().mesh(g, name, geo, m, x, y, z);
  }
  function clearGroup(g) {
    const meshes = [], geometries = new Set(), materials = new Set();
    while (g.children.length) {
      const child = g.children[0];
      g.remove(child);
      child.traverse(o => {
        if (o.isMesh)meshes.push(o);
      });
    }
    for (const o of meshes) {
      const geometry = o.geometry;
      if (geometry && !geometry.userData?.neonShared && !geometries.has(geometry)) {
        geometries.add(geometry);
        geometry.dispose();
      }
      for (const material of(Array.isArray(o.material)?o.material: [o.material])) {
        if (material && !material.userData?.neonShared && !materials.has(material)) {
          materials.add(material);
          material.dispose();
        }
      }
    }
  }
  // Authored, bevelled arcade sculptures. Each primary mesh is a continuous
  // deliberately drawn surface; hardware/particles support, never replace it.
  function pathShape(commands) {
    const s = new (K().Shape)();
    for (const [op, ...p] of commands)s[({
      M: 'moveTo', L: 'lineTo', C: 'bezierCurveTo', Q: 'quadraticCurveTo', Z: 'closePath'
    })[op]](...p);
    return s;
  }
  function polygon(points) {
    return pathShape([['M', ...points[0]], ...points.slice(1).map(p => ['L', ...p]), ['Z']]);
  }
  function sculpt(g, name, shape, material, x = 0, y = 0, z = 0, depth = .3, bevel = .07) {
    const key = name + JSON.stringify(shape.curves.map(c => c.toJSON())) + depth + ':' + bevel;
    let geo = geometryCache.get(key);
    if (!geo) {
      geo = new (K().ExtrudeGeometry)(shape, {
        depth, bevelEnabled: bevel > 0, bevelSize: bevel, bevelThickness: bevel, bevelSegments: 2, steps: 1, curveSegments: 10
      });
      geo.translate(0, 0, - depth / 2);
      geo.userData.neonShared = true;
      geometryCache.set(key, geo);
    }
    const o = mesh(g, name, geo, material, x, y, z);
    o.userData.authoredSurface = true;
    return o;
  }
  const HEART = [['M', 0, .54], ['C', - .2, .99, - .68, 1.08, - .99, .7], ['C', - 1.47, .1, - .66, - .53, 0, - 1.04], ['C', .66, - .53, 1.47, .1, .99, .7], ['C', .68, 1.08, .2, .99, 0, .54], ['Z']];
  const FIRE = [['M', 0, - 1.12], ['C', - 1.11, - 1.01, - 1.25, - .16, - .73, .56], ['C', - .8, .12, - .46, .19, - .36, .47], ['C', - .2, .91, - .22, 1.23, .14, 1.63], ['C', .09, .91, .82, .63, .63, .07], ['C', .97, .3, .96, .57, .98, .79], ['C', 1.54, .02, 1.03, - 1.04, 0, - 1.12], ['Z']];
  const SHIELD = [['M', 0, 1.15], ['Q', - .55, .88, - 1.09, .88], ['L', - 1.06, .05], ['C', - 1.04, - .46, - .66, - .91, 0, - 1.28], ['C', .66, - .91, 1.04, - .46, 1.06, .05], ['L', 1.09, .88], ['Q', .55, .88, 0, 1.15], ['Z']];
  const WING = [['M', .08, .04], ['Q', .65, .86, 2.02, 1.12], ['L', 1.73, .62], ['L', 1.08, .29], ['L', 1.63, .47], ['L', 1.36, .08], ['L', .72, - .08], ['L', 1.13, - .05], ['L', .92, - .4], ['L', .4, - .32], ['L', .12, - .2], ['Z']];
  const MAGNET = [['M', - 1.04, 1.07], ['L', - .53, 1.07], ['L', - .53, - .15], ['C', - .53, - .88, .53, - .88, .53, - .15], ['L', .53, 1.07], ['L', 1.04, 1.07], ['L', 1.04, - .14], ['C', 1.04, - 1.48, - 1.04, - 1.48, - 1.04, - .14], ['Z']];
  const TIMES = [[ - .67, .63], [ - .4, .84], [0, .29], [.4, .84], [.67, .63], [.23, 0], [.67, - .63], [.4, - .84], [0, - .29], [ - .4, - .84], [ - .67, - .63], [ - .23, 0]];
  const TWO = [['M', - .61, .46], ['C', - .62, 1.13, 1.02, 1.14, .87, .37], ['C', .78, - .04, .08, - .17, - .11, - .56], ['L', .89, - .56], ['L', .89, - .95], ['L', - .67, - .95], ['L', - .67, - .59], ['C', - .59, - .06, .5, .12, .5, .49], ['C', .5, .84, - .22, .84, - .24, .46], ['Z']];
  function discShape(radius = 1, segments = 32) {
    return polygon(Array.from({
      length: segments
    }, (_, i) => [Math.cos(i * Math.PI * 2 / segments) * radius, Math.sin(i * Math.PI * 2 / segments) * radius]));
  }
  function ringShape(r, inner, n = 24) {
    const shape = discShape(r, n);
    shape.holes.push(discShape(inner, n));
    return shape;
  }
  function canonicalPickup(type) {
    return ['flight', 'flightPower', 'flightBoost', 'booster'].includes(type)?'flight': type === 'double'?'scoreBoost': type;
  }
  function pickupHardware(g, type) {
    const rig = new (K().Group)();
    rig.name = 'pickup-sculpt';
    rig.position.y = 0;
    g.add(rig);
    g.userData.artRig = rig;
    const steel = mat(0x172737, .03, .78), silver = mat(0xa9d7e8, .08, .85), gold = mat(0xffbd39, .5, .65), cyan = mat(0x43e9ff, .6, .35);
    const luminous = mat(0xb0fbff, 1.2, .16), pink = mat(0xe82438, .22, .28), softPink = mat(0xff3548, .3, .2);
    if (type === 'cell') {
      sculpt(rig, 'health-heart', pathShape(HEART), pink, 0, 0, 0, .52, .13);
      const rim = sculpt(rig, 'heart-repair-rim', pathShape(HEART), softPink, 0, 0, - .13, .24, .12);
      rim.scale.set(1.07, 1.07, 1);
      // A polished raised highlight follows the heart, it cannot erase its notch.
      const core = sculpt(rig, 'heart-core', pathShape(HEART), mat(0xf54451, .10, .4), 0, 0, .29, .04, .03);
      core.scale.set(.84, .84, 1);
      // The silhouette carries the read; avoid a cloud of competing motes.
      g.userData.healingMotes = [];
      g.userData.artIdle = 'heart';
    } else if (type === 'nitro' || type === 'superNitro') {
      const twin = type === 'superNitro', red = mat(0xff4b12, .7, .16), yellow = mat(0xffe163, 1, .12), white = mat(0xbaf9ff, 1.25, .05);
      const flames = [];
      for (const x of twin?[ - .91, .91]: [0]) {
        const group = new (K().Group)();
        group.name = twin?(x < 0?'super-flame-left': 'super-flame-right'): 'nitro-flame';
        group.position.x = x;
        rig.add(group);
        group.position.y = twin?.65: 0;
        group.scale.set(twin?.60: .87, twin?.58: .87, 1);
        flames.push(group);
        sculpt(group, 'flame-sculpture', pathShape(FIRE), red, 0, .03, 0, .34, .085);
        const inner = sculpt(group, 'flame-hot-core', pathShape(FIRE), yellow, 0, - .2, .22, .08, .045);
        inner.scale.set(.54, .68, 1);
        const hot = sculpt(group, 'flame-blue-root', pathShape(FIRE), white, 0, - .57, .3, .05, .025);
        hot.scale.set(.2, .27, 1);
      }
      if (twin) {
        sculpt(rig, 'super-reactor', polygon([[ - .65, - .48], [ - .43, .2], [.43, .2], [.65, - .48], [.42, - 1.12], [ - .42, - 1.12]]), silver, 0, 0, .14, .55, .09);
        const reactor = sculpt(rig, 'super-reactor-lens', discShape(.4, 16), cyan, 0, - .49, .49, .12, .035);
        const halo = sculpt(rig, 'super-reactor-core', discShape(.24, 12), luminous, 0, - .49, .6, .04, .025);
        for (const side of [ - 1, 1]) {
          const x = side * .91;
          sculpt(rig, 'twin-exhaust-housing', polygon([[ - .34, - 1.1], [ - .38, .03], [ - .25, .24], [.25, .24], [.38, .03], [.34, - 1.1]]), silver, x, - .06, .07, .55, .055);
          sculpt(rig, 'twin-exhaust-ring', ringShape(.28, .2, 16), cyan, x, - .66, .41, .055, .018);
        }
        sculpt(rig, 'reactor-energy-ring', ringShape(.57, .5, 24), cyan, 0, - .49, .44, .035, .012);
        const aura = sculpt(rig, 'twin-reactor-aura', ringShape(1.26, 1.215, 24), mat(0x43e9ff, .7, .1, .17), 0, - .13, - .28, .024, .006);
        aura.scale.y = .82;
        aura.userData.pickupSecondary = true;
        g.userData.artReactor = reactor;
      }
      g.userData.artFlames = flames;
      g.userData.artIdle = 'flame';
      g.userData.artMotes = [];
    } else if (type === 'energyShield') {
      const outline = sculpt(rig, 'shield-crest-outline', pathShape(SHIELD), luminous, 0, 0, 0, .35, .08);
      outline.scale.set(1.08, 1.08, 1);
      sculpt(rig, 'shield-crest', pathShape(SHIELD), mat(0x146bc2, .35, .58), 0, 0, .14, .3, .08);
      const inset = sculpt(rig, 'shield-energy-face', pathShape(SHIELD), cyan, 0, - .02, .35, .06, .05);
      inset.scale.set(.76, .76, 1);
      sculpt(rig, 'shield-hex-pattern', polygon([[0, .35], [.28, .18], [.28, - .18], [0, - .35], [ - .28, - .18], [ - .28, .18]]), silver, 0, .02, .45, .07, .025);
      for (let i = 0;
      i < 6;
      i++) {
        const a = i * Math.PI / 3;
        const hex = polygon([[0, .14], [.12, .07], [.12, - .07], [0, - .14], [ - .12, - .07], [ - .12, .07]]);
        const hole = polygon([[0, .105], [.09, .052], [.09, - .052], [0, - .105], [ - .09, - .052], [ - .09, .052]]);
        hex.holes.push(hole);
        sculpt(rig, 'shield-hex-lattice', hex, luminous, Math.cos(a) * .45, Math.sin(a) * .45 + .05, .42, .02, .004);
      }
      // Thin, restrained shell is secondary; the crest remains opaque and dominant.
      const bubble = mesh(rig, 'shield-bubble', new (K().SphereGeometry)(1.1, 16, 10), mat(0x55dcff, .12, .05, .055));
      bubble.scale.set(1.18, 1.36, .62);
      bubble.userData.pickupSecondary = true;
      sculpt(rig, 'shield-energy-ring', ringShape(.94, .915, 24), mat(0x43e9ff, .7, .1, .22), 0, .03, - .42, .022, .004);
      g.userData.artIdle = 'shield';
    } else if (type === 'flight') {
      const wingMat = mat(0xc8dbf5, .12, .6), wingEdge = mat(0x855bff, .55, .45);
      for (const side of [ - 1, 1]) {
        const wing = sculpt(rig, side < 0?'flight-wing-left': 'flight-wing-right', pathShape(WING), wingMat, side * .05, .04, 0, .25, .045);
        wing.scale.x = side;
        const trim = sculpt(rig, 'flight-leading-edge', polygon([[.05, .21], [.58, .51], [1.83, .68], [1.75, .54], [.6, .37]]), wingEdge, side * .05, .04, .18, .035, .015);
        trim.scale.x = side;
        trim.visible = false;
      }
      sculpt(rig, 'anti-gravity-core', polygon([[ - .34, .33], [.34, .33], [.4, - .12], [.2, - .39], [ - .2, - .39], [ - .4, - .12]]), steel, 0, - .04, .04, .38, .06).scale.set(.64, .83, 1);
      sculpt(rig, 'flight-energy-core', polygon([[ - .14, .2], [.14, .2], [.16, - .1], [0, - .26], [ - .16, - .1]]), cyan, 0, 0, .36, .04, .02);
      const lift = sculpt(rig, 'flight-upward-energy', polygon([[ - .13, .4], [0, .65], [.13, .4], [.055, .4], [.055, .08], [ - .055, .08], [ - .055, .4]]), luminous, 0, .47, 0, .03, .015);
      lift.userData.pickupSecondary = true;
      g.userData.liftMotes = [];
      g.userData.artIdle = 'flight';
    } else if (type === 'magnet') {
      sculpt(rig, 'magnet-u-body', pathShape(MAGNET), mat(0xd83449, .20, .50), 0, 0, 0, .30, .055);
      for (const side of [ - 1, 1])sculpt(rig, 'magnet-pole', polygon([[ - .27, - .42], [.27, - .42], [.27, .15], [ - .27, .15]]), side < 0?silver: cyan, side * .79, .96, .02, .34, .035);
      g.userData.artCredits = [];
      g.userData.artIdle = 'magnet';
    } else if (type === 'scoreBoost') {
      const xOutline = sculpt(rig, 'multiplier-cyan-outline', polygon(TIMES), cyan, - .89, .02, - .07, .25, .05);
      xOutline.scale.set(1.1, 1.1, 1);
      const twoOutline = sculpt(rig, 'two-cyan-outline', pathShape(TWO), cyan, .52, .02, - .07, .25, .05);
      twoOutline.scale.set(1.08, 1.08, 1);
      const times = sculpt(rig, 'multiplier-times', polygon(TIMES), gold, - .89, .02, 0, .35, .075);
      const two = sculpt(rig, 'multiplier-two', pathShape(TWO), gold, .52, .02, 0, .35, .065);
      // Raised hot faces, no plate/star that would obscure the literal ×2.
      for (const o of [sculpt(rig, 'multiplier-times-face', polygon(TIMES), mat(0xffe997, .35, .4), - .89, .02, .22, .035, .025), sculpt(rig, 'multiplier-two-face', pathShape(TWO), mat(0xffe997, .35, .4), .52, .02, .22, .035, .025)])o.scale.set(.87, .87, 1);
      g.userData.artIdle = 'score';
    } else if (type === 'phaseShard') {
      // An authored skewed gemstone, a single faceted polyhedron, not twin cones.
      const outline = [[ - .47, .59], [ - .02, 1.46], [.64, .77], [.56, - .37], [ - .37, - 1.25], [ - .66, - .3]], front = [.03, .08, .46], back = [ - .06, .04, - .38];
      const vertices = [], colors = [];
      const palette = [[.1, .75, 1], [.42, .16, 1], [1, .12, .66], [1, .66, .1], [.15, 1, .69], [.28, .46, 1]];
      for (let i = 0;
      i < outline.length;
      i++) {
        const a = outline[i], b = outline[(i + 1) % outline.length];
        for (const [p, q, r] of [[front, [...a, 0], [...b, 0]], [back, [...b, 0], [...a, 0]]]) {
          vertices.push(...p, ...q, ...r);
          for (let j = 0;
          j < 3;
          j++)colors.push(...palette[i]);
        }
      }
      const geo = new (K().BufferGeometry)();
      geo.setAttribute('position', new (K().Float32BufferAttribute)(vertices, 3));
      geo.setAttribute('color', new (K().Float32BufferAttribute)(colors, 3));
      geo.computeVertexNormals();
      mesh(rig, 'phase-chromatic-crystal', geo, new (K().StandardMaterial)({
        color: 0xffffff, vertexColors: true, metalness: .52, roughness: .17, emissive: 0x6256aa, emissiveIntensity: .18, side: 2
      }));
      const glints = [];
      for (let i = 0;
      i < 2;
      i++) {
        const o = sculpt(rig, 'phase-glitch-sliver', polygon([[ - .26, - .025], [.26, - .025], [.26, .025], [ - .26, .025]]), i?cyan: softPink, (i - .5) * 1.08, i?.57: - .48, .12, .02, .004);
        o.userData.pickupSecondary = true;
        glints.push(o);
      }
      g.userData.artGlitch = glints;
      g.userData.artIdle = 'phase';
    } else if (type === 'dronePower') {
      // Reuse the combat drone silhouette so the pickup reads as hardware,
      // not as a second abstract icon language.
      root.NeonDrones.decorate(rig, 'ally');
      rig.scale.setScalar(.88);
      rig.traverse(o => {
        if (o.name === 'drone-armored-hull') {
          o.material.color.setHex(0x36657a);
          o.material.emissive.setHex(0x163b53);
          o.material.emissiveIntensity = .45;
        }
      });
      g.userData.artRotors = rig.userData.rotors || [];
      g.userData.artIdle = 'drone-power';
    } else if (type === 'coin') {
      sculpt(rig, 'coin-face', discShape(.79, 32), coinMat('face', 0xffd45a, .72, .72), 0, 0, 0, .3, .055);
      sculpt(rig, 'coin-stamped-face', discShape(.64, 32), coinMat('stamp', 0xf1a01e, .06, .88), 0, 0, .185, .035, .035);
      const insignia = pathShape([['M', .23, .39], ['C', - .42, .72, - .67, - .61, .23, - .39], ['L', .23, - .2], ['C', - .24, - .4, - .3, .42, .23, .22], ['Z']]);
      sculpt(rig, 'credit-emblem', insignia, coinMat('emblem', 0xffea9c, .28, .62), 0, 0, .235, .045, .018);
      g.userData.artIdle = 'coin';
    }
  }
  function useful(g, type) {
    const canonical = canonicalPickup(type);
    clearGroup(g);
    pickupHardware(g, canonical);
    const scale = canonical === 'flight'?1.22: canonical === 'superNitro'?1.48: canonical === 'coin'?1.46: canonical === 'dronePower'?1.48: canonical === 'scoreBoost'?1.52: 1.58;
    g.scale.setScalar(scale);
    g.userData.pickupScale = scale;
    g.userData.pickupCanonical = canonical;
    g.userData.artLowestLocalY = {
      cell: - 1.12, nitro: - 1.2, superNitro: - 1.42, energyShield: - 1.38, flight: - .58, magnet: - 1.58, scoreBoost: - 1.05, phaseShard: - 1.35, dronePower: - 1.08, coin: - .88
    }[canonical] ?? - 1.2;
    g.userData.artFloor = {
      coin: .06, cell: .10, nitro: .08, superNitro: .10, energyShield: .14, flight: .12, magnet: .12, scoreBoost: .12, phaseShard: .12, dronePower: .14
    }[canonical] ?? .10;
    g.userData.artRig.position.y = g.userData.artFloor / scale - g.userData.artLowestLocalY;
    g.userData.visualFamily = canonical === 'cell'?'health-heart': canonical === 'flight'?'flight-module': canonical === 'dronePower'?'mini-drone': 'helpful';
    g.userData.artReadability = {
      master: 'final-sculpted-v1', labelIndependent: true, silhouette: canonical
    };
    return g;
  }
  function framePickup(o, time) {
    const mode = o.userData?.artIdle;
    if (!mode)return;
    const rig = o.userData.artRig;
    if (o.userData.artBaseY === undefined)o.userData.artBaseY = rig?.position.y || 0;
    const bob = Math.sin(time * 1.8 + (o.userData.index || 0)) * ((mode === 'drone-power' || mode === 'flight')?.06: .035);
    if (rig)rig.position.y = o.userData.artBaseY + bob / o.scale.y;
    // Keep every icon readable face-on; only a restrained yaw sells motion.
    const yaw = mode === 'phase'?.16: mode === 'coin'?.12: .1;
    o.rotation.y = Math.sin(time * .55 + (o.userData.index || 0) * .1) * yaw;
    if (mode === 'heart') {
      rig.scale.setScalar(1 + Math.sin(time * 5.4) * .035);
      (o.userData.healingMotes || []).forEach((p, i) => {
        const a = (time * .5 + i / 3) % 1;
        p.position.set(Math.sin(i * 2.2) * 1.22, - .5 + a * 2.3, - .3);
        p.material.opacity = Math.sin(a * Math.PI) * .6;
        p.material.transparent = true;
      });
    }
    if (mode === 'flame') {
      for (const [i, f] of (o.userData.artFlames || []).entries()) {
        const twin = o.userData.pickupCanonical === 'superNitro';
        f.scale.y = (twin?.58: .87) * (1 + Math.sin(time * 8 + i * 2) * .055);
        f.rotation.z = Math.sin(time * 5 + i) * .035;
      }
      for (const [i, p] of (o.userData.artMotes || []).entries()) {
        const a = (time * .8 + i / 3) % 1;
        p.position.set(Math.sin(i * 2.7) * (.3 + a * .5), .1 + a * 1.9, - .25);
        p.material.opacity = 1 - a;
        p.material.transparent = true;
      }
    }
    if (mode === 'flight')for (const [i, p]of(o.userData.liftMotes || []).entries()) {
      const a = (time * .45 + i / 3) % 1;
      p.position.set((i - 1) * .8, - .15 + a * 1.7, - .17);
      p.material.transparent = true;
      p.material.opacity = Math.sin(a * Math.PI) * .65;
    }
    if (mode === 'magnet')for (const [i, c] of (o.userData.artCredits || []).entries()) {
      const a = (time * .65 + i / 3) % 1;
      c.position.set(Math.cos(i * 2.1) * (1 - a) * 1.5, .21 + (1 - a) * .7, .16);
      c.scale.setScalar(.65 + .35 * (1 - a));
    }
    if (mode === 'drone-power')for (const r of o.userData.artRotors || [])r.rotation.z = time * 14;
    if (mode === 'phase')for (const [i, p] of (o.userData.artGlitch || []).entries()) {
      p.visible = Math.sin(time * 12 + i * 2) > .15;
      p.position.x = (i - .5) * 1.08 + Math.sin(time * 8 + i) * .1;
    }
  }
  const types = new Set(['cell', 'nitro', 'coin', 'magnet', 'double', 'energyShield', 'superNitro', 'dronePower', 'scoreBoost', 'flight', 'flightPower', 'flightBoost', 'booster', 'phaseShard']);
  root.NeonPickups = {
    has: type => types.has(type), create: useful, frame: framePickup
  };
})(window);
