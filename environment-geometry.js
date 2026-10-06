/* Consolidated, pooled environment geometry for Neon Drift. */
(function (root) {
  'use strict';
  const WORLD_IDS = ['desert', 'tunnel', 'void', 'factory', 'frozen', 'cityviaduct', 'aurora', 'rift'];
  const DIMENSION_WORLD = {
    neon: 'aurora', gravity: 'void', hyper: 'factory', rush: 'frozen', hazard: 'desert', mirror: 'cityviaduct', time: 'tunnel',
  };
  const WORLD_LABELS = {
    desert: 'DESERT // GLASS DUNES', tunnel: 'TUNNEL // RING RUN', void: 'VOID // ANCHOR FIELD', factory: 'FACTORY // IRONWORKS', frozen: 'FROZEN // CRYSTAL PASS', cityviaduct: 'CITY VIADUCT // OVERPASS', aurora: 'AURORA // POLAR VEIL', rift: 'RIFT // EVENT HORIZON',
  };
  const CONFIG = Object.freeze({
    roadCorridorHalfWidth: 9.5, shoulderOuterX: 15, propMinX: 17, terrainWidth: 520, terrainDepth: 2400, repeatLength: 1280, drawDistance: 2600, poolSegments: 4, overheadClearHeight: 7, groundTop: - 0.09, transitionSeconds: 1.8,
  });
  const BACKGROUNDS = {
    desert: 0x24131d, tunnel: 0x07111f, void: 0x050714, factory: 0x0d1725, frozen: 0x102847, cityviaduct: 0x0d1427, aurora: 0x071326, rift: 0x10091e,
  };
  const FOG_COLORS = {
    desert: 0x3a2630, tunnel: 0x132637, void: 0x111029, factory: 0x263746, frozen: 0x253b51, cityviaduct: 0x1c2d48, aurora: 0x173444, rift: 0x291a3a,
  };
  const FOG_DENSITY_FACTOR = {
    desert: 1.15, tunnel: .90, void: .72, factory: 1.05, frozen: .88, cityviaduct: 1, aurora: .82, rift: 1.2,
  };
  const layouts = {
    desert: [ {
      id: 'mesa-west', kind: 'prop', shape: 'mesa', x: - 23, z: 150, size: 1.05
    }, {
      id: 'solar-east', kind: 'prop', shape: 'solar', x: 23, z: 410, size: 1
    }, {
      id: 'dune-west', kind: 'prop', shape: 'dune', x: - 20, z: 670, size: 1.1
    }, {
      id: 'sun-gate', kind: 'overhead', shape: 'sun-gate', x: 0, y: 10.5, z: 930, size: 1
    },], tunnel: [ {
      id: 'ring-01', kind: 'overhead', shape: 'tunnel-ring', x: 0, y: 11, z: 150, size: 1
    }, {
      id: 'buttress-east', kind: 'prop', shape: 'tunnel-buttress', x: 18, z: 410, size: 1
    }, {
      id: 'ring-02', kind: 'overhead', shape: 'tunnel-ring', x: 0, y: 11, z: 670, size: 1
    }, {
      id: 'buttress-west', kind: 'prop', shape: 'tunnel-buttress', x: - 18, z: 930, size: 1
    },], void: [ {
      id: 'anchor-west', kind: 'prop', shape: 'void-anchor', x: - 22, z: 170, size: 1
    }, {
      id: 'anchor-east', kind: 'prop', shape: 'void-orbit', x: 22, z: 430, size: 1.1
    }, {
      id: 'monolith-west', kind: 'prop', shape: 'void-monolith', x: - 24, z: 690, size: 1
    }, {
      id: 'anchor-east-far', kind: 'prop', shape: 'void-anchor', x: 23, z: 950, size: .9
    },], factory: [ {
      id: 'stack-west', kind: 'prop', shape: 'factory-stack', x: - 23, z: 150, size: 1
    }, {
      id: 'gantry-01', kind: 'overhead', shape: 'factory-gantry', x: 0, y: 11.5, z: 410, size: 1
    }, {
      id: 'reactor-east', kind: 'prop', shape: 'reactor', x: 23, z: 670, size: 1
    }, {
      id: 'gantry-02', kind: 'overhead', shape: 'factory-gantry', x: 0, y: 11.5, z: 930, size: 1
    },], frozen: [ {
      id: 'ice-west', kind: 'prop', shape: 'ice-bank', x: - 22, z: 150, size: 1
    }, {
      id: 'ice-east', kind: 'prop', shape: 'ice-bank', x: 22, z: 410, size: 1.1
    }, {
      id: 'glacier-west', kind: 'prop', shape: 'glacier', x: - 24, z: 670, size: 1
    }, {
      id: 'frost-arch', kind: 'overhead', shape: 'frost-arch', x: 0, y: 10.8, z: 930, size: 1
    },], cityviaduct: [ {
      id: 'viaduct-01', kind: 'overhead', shape: 'viaduct', x: 0, y: 12.5, z: 150, size: 1
    }, {
      id: 'tower-west', kind: 'prop', shape: 'city-tower', x: - 23, z: 410, size: .86
    }, {
      id: 'viaduct-02', kind: 'overhead', shape: 'viaduct', x: 0, y: 12.5, z: 670, size: 1
    }, {
      id: 'tower-east', kind: 'prop', shape: 'city-tower', x: 23, z: 930, size: .9
    },], aurora: [ {
      id: 'station-west', kind: 'prop', shape: 'research-station', x: - 23, z: 150, size: 1
    }, {
      id: 'pylon-east', kind: 'prop', shape: 'research-pylon', x: 20, z: 410, size: 1
    }, {
      id: 'snow-rock-west', kind: 'prop', shape: 'snow-rock', x: - 21, z: 670, size: 1.1
    }, {
      id: 'station-east', kind: 'prop', shape: 'research-station', x: 23, z: 930, size: .92
    },], rift: [ {
      id: 'rift-gate-01', kind: 'overhead', shape: 'rift-gate', x: 0, y: 11.5, z: 150, size: 1
    }, {
      id: 'rift-anchor-west', kind: 'prop', shape: 'rift-anchor', x: - 22, z: 410, size: 1
    }, {
      id: 'rift-gate-02', kind: 'overhead', shape: 'rift-gate', x: 0, y: 11.5, z: 670, size: 1.05
    }, {
      id: 'rift-anchor-east', kind: 'prop', shape: 'rift-anchor', x: 22, z: 930, size: .95
    },],
  };
  const landmarkNames = {
    desert: ['mesa', 'solar-pylon', 'dune', 'sun-gate'], tunnel: ['ring-tunnel', 'buttress', 'ring-tunnel', 'buttress'], void: ['anchored-shard', 'gravity-orbit', 'void-monolith', 'anchored-shard'], factory: ['smokestack', 'gantry', 'reactor-tank', 'gantry'], frozen: ['ice-bank', 'ice-bank', 'glacier-wall', 'frost-arch'], cityviaduct: ['viaduct', 'city-tower', 'viaduct', 'city-tower'], aurora: ['research-station', 'magnetic-pylon', 'snow-rock', 'research-station'], rift: ['rift-gate', 'rift-anchor', 'rift-gate', 'rift-anchor'],
  };
  const worlds = WORLD_IDS.map(id => ({
    id, label: WORLD_LABELS[id], landmarks: landmarkNames[id].slice(), layout: layouts[id].map(item => ({
      ...item
    })),
  }));
  let Kit = null;
  let forcedWorld = null;
  let activeWorld = null;
  let attachedScene = null;
  let environmentRoot = null;
  let materials = new Map();
  let geometries = new Map();
  let transition = null;
  const validWorld = id => WORLD_IDS.includes(id) ? id: null;
  const finite = value => Number.isFinite(Number(value));
  const scalar = value => finite(value) ? Number(value): 0;
  function ensureBound() {
    if (!Kit && root.NeonArtKit) Kit = root.NeonArtKit;
    return !!Kit;
  }
  function bind(kit) {
    if (kit) Kit = kit;
    else if (!Kit) Kit = root.NeonArtKit || null;
    return api;
  }
  function material(key, hex, intensity = .25, metalness = .45, roughness = .48, opacity = 1) {
    const cacheKey = [key, hex, intensity, metalness, roughness, opacity].join(':');
    if (materials.has(cacheKey)) return materials.get(cacheKey);
    const m = new Kit.StandardMaterial({
      color: hex, emissive: hex, emissiveIntensity: intensity, metalness, roughness, flatShading: true, transparent: opacity < 1, opacity, depthWrite: opacity >= 1, side: Kit.DoubleSide || 2,
    });
    materials.set(cacheKey, m);
    return m;
  }
  function geometry(Ctor, ...args) {
    const key = (Ctor.name || 'geometry') + ':' + JSON.stringify(args);
    if (geometries.has(key)) return geometries.get(key);
    const g = new Ctor(...args);
    g.userData = {
      ...(g.userData || {
      }), neonShared: true
    };
    geometries.set(key, g);
    return g;
  }
  function group(name, parent) {
    const node = new Kit.Group();
    node.name = name;
    if (parent) parent.add(node);
    return node;
  }
  function setRotation(node, rotation) {
    if (!rotation) return;
    if (node.rotation && typeof node.rotation.set === 'function') node.rotation.set(rotation[0] || 0, rotation[1] || 0, rotation[2] || 0);
    else if (node.rotation) Object.assign(node.rotation, {
      x: rotation[0] || 0, y: rotation[1] || 0, z: rotation[2] || 0
    });
  }
  function mesh(parent, name, geo, mat, x = 0, y = 0, z = 0, rotation) {
    const node = new Kit.Mesh(geo, mat);
    node.name = name;
    node.position.set(x, y, z);
    setRotation(node, rotation);
    node.castShadow = true;
    node.receiveShadow = true;
    parent.add(node);
    return node;
  }
  function box(parent, name, mat, w, h, d, x = 0, y = 0, z = 0, rotation) {
    return mesh(parent, name, geometry(Kit.BoxGeometry, w, h, d), mat, x, y, z, rotation);
  }
  function cylinder(parent, name, mat, rt, rb, h, x = 0, y = 0, z = 0, rotation) {
    return mesh(parent, name, geometry(Kit.CylinderGeometry, rt, rb, h, 12), mat, x, y, z, rotation);
  }
  function cone(parent, name, mat, radius, h, x = 0, y = 0, z = 0, rotation) {
    return mesh(parent, name, geometry(Kit.ConeGeometry, radius, h, 8), mat, x, y, z, rotation);
  }
  function sphere(parent, name, mat, radius, x = 0, y = 0, z = 0) {
    return mesh(parent, name, geometry(Kit.SphereGeometry, radius, 10, 6), mat, x, y, z);
  }
  function torus(parent, name, mat, major, tube, x = 0, y = 0, z = 0, rotation) {
    return mesh(parent, name, geometry(Kit.TorusGeometry, major, tube, 8, 24), mat, x, y, z, rotation);
  }
  function palette(id) {
    const common = {
      ground: material(id + '-ground', 0x111b2a, .04, .8, .85), shoulder: material(id + '-shoulder', 0x1b2b3e, .08, .75, .7), dark: material(id + '-dark', 0x10182a, .08, .8, .52), white: material(id + '-white', 0xd8f5ff, .55, .2, .42), mountain: material(id + '-mountain', 0x101b30, .02, .75, .9),
    };
    if (id === 'desert') return {
      ...common, ground: material(id + '-ground-hot', 0x3a2630, .16, .55, .76), body: material(id + '-body', 0x6b3b36, .22, .5, .58), accent: material(id + '-accent', 0xffb45c, 1.15, .3, .32), glow: material(id + '-glow', 0xffe08a, 2.2, .1, .25)
    };
    if (id === 'tunnel') return {
      ...common, body: material(id + '-body', 0x263a50, .50, .54, .65), accent: material(id + '-accent', 0x34e7ff, 1.75, .55, .3), glow: material(id + '-glow', 0xff4f9a, 1.8, .25, .3)
    };
    if (id === 'void') return {
      ...common, ground: material(id + '-ground-void', 0x090b18, .03, .9, .9), body: material(id + '-body', 0x16132d, .18, .84, .4), accent: material(id + '-accent', 0xa66dff, 2.1, .35, .3), glow: material(id + '-glow', 0x36dfff, 1.8, .22, .25)
    };
    if (id === 'factory') return {
      ...common, body: material(id + '-body', 0x293b50, .22, .9, .42), accent: material(id + '-accent', 0xff753d, 1.5, .4, .32), glow: material(id + '-glow', 0x42d8ff, 1.25, .5, .28)
    };
    if (id === 'frozen') return {
      ...common, ground: material(id + '-ground-ice', 0x203b5c, .16, .62, .66), body: material(id + '-body', 0x325c95, .4, .55, .38), accent: material(id + '-accent', 0x82eaff, 1.7, .4, .25), glow: material(id + '-glow', 0xd6fbff, 1.3, .15, .22)
    };
    if (id === 'cityviaduct') return {
      ...common, body: material(id + '-body', 0x263750, .18, .88, .43), accent: material(id + '-accent', 0x3be7ff, 1.55, .52, .28), glow: material(id + '-glow', 0xff4d9d, 1.4, .3, .3)
    };
    if (id === 'rift') return {
      ...common, ground: material(id + '-ground-rift', 0x151126, .06, .86, .7), body: material(id + '-body', 0x261b44, .2, .7, .4), accent: material(id + '-accent', 0x9e6bff, 2.2, .3, .25), glow: material(id + '-glow', 0x36e5ff, 2.1, .15, .2), veil: material(id + '-veil', 0x754bff, .8, .05, .22, .24)
    };
    return {
      ...common, ground: material(id + '-ground-aurora', 0x10243a, .12, .68, .72), body: material(id + '-body', 0x263d55, .18, .72, .46), accent: material(id + '-accent', 0x6fffd0, 1.35, .3, .3), glow: material(id + '-glow', 0x5fdcff, 1.15, .2, .28), violet: material(id + '-violet', 0x9d82ff, 1.0, .22, .3), snow: material(id + '-snow', 0xb9e9f2, .45, .18, .42), skyGreen: material(id + '-sky-green', 0x2adf9c, .45, .05, .8, .18), skyCyan: material(id + '-sky-cyan', 0x3da8ff, .35, .05, .8, .14), skyViolet: material(id + '-sky-violet', 0x9e74ff, .32, .05, .82, .12)
    };
  }
  function foundation(parent, p, name, x, z, w = 3, d = 3) {
    return box(parent, name + '-foundation', p.dark, w, .18, d, x, 0, z);
  }
  function addTerrain(parent, p, id) {
    const terrain = group('terrain-layer-' + id, parent);
    terrain.userData.environmentSegment = true;
    terrain.userData.distanceObj = 640;
    box(terrain, 'terrain-fill', p.ground, CONFIG.terrainWidth, .28, CONFIG.terrainDepth, 0, - .23, 0);
    box(terrain, 'shoulder-west', p.shoulder, 5.5, .14, CONFIG.terrainDepth, - 12.25, - .16, 0);
    box(terrain, 'shoulder-east', p.shoulder, 5.5, .14, CONFIG.terrainDepth, 12.25, - .16, 0);
    // Subtle roadside reflectors add depth and motion cues without dynamic lights.
    // They live outside the gameplay lane and never participate in collision.
    for (let z = - 620, i = 0;
    z <= 620;
    z += 90, i++) {
      const marker = i % 3 === 0?p.glow: p.accent;
      box(terrain, 'road-edge-reflector-west', marker, .16, .055, 1.15, - 10.25, .035, z);
      box(terrain, 'road-edge-reflector-east', marker, .16, .055, 1.15, 10.25, .035, z);
    }
    if (id === 'cityviaduct' || id === 'factory') {
      for (const side of[ - 1, 1]) {
        box(terrain, 'sidewalk', p.shoulder, 7, .20, CONFIG.terrainDepth, side * 18.5, 0, 0);
        box(terrain, 'service-road', p.dark, 8, .10, CONFIG.terrainDepth, side * 33, - .04, 0);
      }
    }
    if (id === 'aurora' || id === 'frozen')for (const side of[ - 1, 1]) {
      box(terrain, 'icy-edge', id === 'aurora'?p.snow: p.glow, .32, .16, CONFIG.terrainDepth, side * 10.2, .02, 0);
      box(terrain, 'snow-ground', id === 'aurora'?material('polar-snow-ground', 0x244156, .1, .05, .94): p.ground, 242, .12, CONFIG.terrainDepth, side * 139, - .02, 0);
    }
    if (id === 'tunnel') {
      for (const side of[ - 1, 1]) {
        box(terrain, 'tunnel-solid-wall', p.body, .85, 10.5, CONFIG.terrainDepth, side * 12.8, 5.16, 0);
        box(terrain, 'tunnel-wall-panel', p.dark, .12, 3.6, CONFIG.terrainDepth, side * 12.31, 3.0, 0);
        box(terrain, 'tunnel-side-strip', p.accent, .055, .15, CONFIG.terrainDepth, side * 12.25, 1.7, 0);
        box(terrain, 'tunnel-ceiling-strip', p.glow, .10, .06, CONFIG.terrainDepth, side * 8.2, 10.1, 0);
      }
      box(terrain, 'tunnel-enclosed-ceiling', p.body, 26.45, .7, CONFIG.terrainDepth, 0, 10.3, 0);
    }
    terrain.position.z = - 700;
    parent.userData.terrainLayer = terrain;
  }
  function cachedForm(key, vertices) {
    if (geometries.has(key))return geometries.get(key);
    const geo = new Kit.BufferGeometry();
    geo.setAttribute('position', new Kit.Float32BufferAttribute(vertices, 3));
    geo.computeVertexNormals();
    geo.userData.neonShared = true;
    geometries.set(key, geo);
    return geo;
  }
  function terrainForm(key, width, height, depth, seed = 0) {
    const N = 9, levels = [0, .45, .82], v = [], rings = levels.map((y, level) => Array.from({
      length: N
    }, (_, i) => {
      const a = i * Math.PI * 2 / N, noise = .83 + .18 * Math.sin(i * 4.13 + seed);
      const taper = level === 0?1: level === 1?.87: .48;
      return[Math.cos(a) * width * noise * taper, (y + (level?Math.sin(i * 1.9 + seed) * .05: 0)) * height, Math.sin(a) * depth * noise * taper];
    }));
    const tri = (a, b, c) => v.push(...a, ...b, ...c);
    for (let level = 0;
    level < 2;
    level++)for (let i = 0;
    i < N;
    i++) {
      const j = (i + 1) % N;
      tri(rings[level][i], rings[level][j], rings[level + 1][i]);
      tri(rings[level][j], rings[level + 1][j], rings[level + 1][i]);
    }
    for (let i = 0;
    i < N;
    i++)tri(rings[2][i], rings[2][(i + 1) % N], [width * .11, height, depth * - .06]);
    return cachedForm(key, v);
  }
  function addHorizon(parent, p, id) {
    if (id === 'tunnel')return;
    const horizon = group('distant-landscape-' + id, parent);
    horizon.userData.horizon = true;
    if (id === 'cityviaduct') {
      for (let i = 0;
      i < 30;
      i++) {
        const x = (i - 14.5) * 16, h = 18 + (i * 29 % 54);
        box(horizon, 'distant-city-tower', p.mountain, 9 + (i % 3) * 3, h, 13, x, h * .5, - 410 - (i % 4) * 40);
        box(horizon, 'distant-roof-light', i % 3?p.accent: p.glow, 7, .12, 9, x, h, - 410 - (i % 4) * 40);
      }
    } else if (id === 'void' || id === 'rift') {
      for (const side of[ - 1, 1]) {
        const far = mesh(horizon, 'dimensional-citadel', terrainForm('cosmic-form', 22, 70, 24, 3), p.body, side * 110, 13, - 320);
        far.rotation.z = side * .26;
        torus(horizon, 'cosmic-energy-orbit', p.accent, 36, .18, side * 110, 43, - 325, [.18, side * .28, side * .33]);
      }
    } else {
      for (let i = 0;
      i < 8;
      i++) {
        const x = (i - 3.5) * 65, h = id === 'aurora' || id === 'frozen'?60 + (i * 31 % 56): 25 + (i * 19 % 34);
        mesh(horizon, 'mountain-ridge-' + i, terrainForm('ridge-' + id + '-' + i, 44, h, 52, i + 2), p.mountain, x, - .1, - 490 - (i % 3) * 24);
        if (id === 'aurora' || id === 'frozen') {
          const cap = mesh(horizon, 'snow-summit-' + i, terrainForm('snow-cap-' + i, 22, h * .35, 27, i + 2), id === 'aurora'?p.snow: p.glow, x + 4, h * .65 - .1, - 493 - (i % 3) * 24);
          cap.material = material('distant-snow', 0x4d6c84, .14, .05, .9);
        }
      }
    }
    // Stars stay in the sky, not down in the driving corridor.
    const stars = group('sky-stars', parent), starMat = material('night-stars', 0xa2bfd1, .8, .0, .9);
    for (let i = 0;
    i < 42;
    i++)sphere(stars, 'star', starMat, .17, - 300 + (i * 127 % 600), 72 + (i * 37 % 190), - 600 - (i * 71 % 420));
  }
  function addAuroraSky(parent, p) {
    const sky = group('polar-aurora-curtains', parent);
    sky.userData.skyLayer = true;
    for (let layer = 0;
    layer < 4;
    layer++) {
      const v = [], N = 48, y = 88 + layer * 22;
      for (let i = 0;
      i < N;
      i++) {
        const point = j => {
          const x = - 320 + j * 640 / N;
          return[x, y + Math.sin(j * .24 + layer * 1.8) * 18, - 650 + Math.sin(j * .13 + layer) * 35 - layer * 28];
        };
        const a = point(i), b = point(i + 1), at = [a[0], a[1] + 22 + Math.sin(i * .31) * 9, a[2]], bt = [b[0], b[1] + 22 + Math.sin((i + 1) * .31) * 9, b[2]];
        v.push(...a, ...b, ...at, ...b, ...bt, ...at);
      }
      const ribbon = mesh(sky, 'aurora-curtain-' + layer, cachedForm('aurora-curtain-' + layer, v), [p.skyGreen, p.skyCyan, p.skyViolet, p.skyGreen][layer]);
      ribbon.userData.auroraRibbon = true;
      ribbon.userData.baseRotation = 0;
      ribbon.userData.phase = layer;
      ribbon.castShadow = false;
      ribbon.receiveShadow = false;
      ribbon.material.fog = false;
      ribbon.material.opacity = .28;
    }
  }
  function addDesertSun(parent, p) {
    const sky = group('desert-sky-disc', parent);
    const sun = sphere(sky, 'desert-sun', p.glow, 16, 0, 88, - 500);
    sun.scale.set(1, .72, .18);
    sun.castShadow = false;
    torus(sky, 'desert-sun-halo', p.accent, 18, .22, 0, 88, - 500, [Math.PI / 2, 0, 0]).scale.set(1, .72, 1);
  }
  function addFoundationProp(parent, p, x, z, name, w = 3.5, d = 3) {
    foundation(parent, p, name, x, z, w, d);
  }
  function addMesa(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'mesa', 6 * s, 5 * s);
    box(parent, 'mesa-base', p.body, 5.2 * s, 3.2 * s, 4.2 * s, x, 1.7 * s, z);
    box(parent, 'mesa-step', p.body, 4.1 * s, 2.3 * s, 3.3 * s, x + .25 * s, 4.45 * s, z + .08 * s);
    box(parent, 'mesa-cap', p.accent, 4.6 * s, .16 * s, 3.1 * s, x + .25 * s, 5.68 * s, z);
  }
  function addSolar(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'solar', 4 * s, 3 * s);
    box(parent, 'solar-house', p.body, 3.2 * s, 1.8 * s, 2.4 * s, x, .99 * s, z);
    cylinder(parent, 'solar-pylon', p.accent, .22 * s, .3 * s, 7 * s, x, 4.5 * s, z);
    box(parent, 'solar-crossarm', p.glow, 4.5 * s, .16 * s, .18 * s, x, 7.9 * s, z);
    box(parent, 'solar-panel', p.accent, 2.8 * s, .08 * s, 1.4 * s, x, 7.65 * s, z - .4 * s, [0, .32, 0]);
  }
  function addDune(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'dune', 7 * s, 4 * s);
    box(parent, 'dune-low', p.body, 6.6 * s, 1.05 * s, 3.2 * s, x, .62 * s, z, [0, 0, - .1]);
    box(parent, 'dune-ridge', p.accent, 4.5 * s, 1.45 * s, 2.1 * s, x + .6 * s, 1.3 * s, z + .15 * s, [0, 0, - .18]);
  }
  function addSunGate(parent, p, s) {
    foundation(parent, p, 'sun-gate-west', - 16.5, 0, 2.2 * s, 2.4 * s);
    foundation(parent, p, 'sun-gate-east', 16.5, 0, 2.2 * s, 2.4 * s);
    box(parent, 'sun-gate-pillar-west', p.body, 1.2 * s, 10.6 * s, 1.4 * s, - 16.5, 5.3 * s, 0);
    box(parent, 'sun-gate-pillar-east', p.body, 1.2 * s, 10.6 * s, 1.4 * s, 16.5, 5.3 * s, 0);
    box(parent, 'sun-gate-beam', p.accent, 34 * s, .65 * s, 1.2 * s, 0, 10.6 * s, 0);
    box(parent, 'sun-gate-light', p.glow, 26 * s, .11 * s, .12 * s, 0, 10.18 * s, - .63 * s);
  }
  function addTunnelRing(parent, p, s) {
    foundation(parent, p, 'tunnel-ring-west', - 17.2, 0, 2.2 * s, 2.4 * s);
    foundation(parent, p, 'tunnel-ring-east', 17.2, 0, 2.2 * s, 2.4 * s);
    box(parent, 'tunnel-wall-west', p.body, 1.25 * s, 11 * s, 1.6 * s, - 17.2, 5.5 * s, 0);
    box(parent, 'tunnel-wall-east', p.body, 1.25 * s, 11 * s, 1.6 * s, 17.2, 5.5 * s, 0);
    box(parent, 'tunnel-ring-beam', p.body, 34.4 * s, .7 * s, 1.6 * s, 0, 11 * s, 0);
    const ring = torus(parent, 'tunnel-ring-light', p.accent, 9.3 * s, .2 * s, 0, 11 * s, - .72 * s);
    ring.scale.y = .42;
    box(parent, 'tunnel-ring-marker', p.glow, 15 * s, .1 * s, .12 * s, 0, 10.48 * s, - .88 * s);
  }
  function addTunnelButtress(parent, p, x, s) {
    addFoundationProp(parent, p, x, 0, 'tunnel-buttress', 2.4 * s, 2.4 * s);
    box(parent, 'tunnel-buttress-body', p.body, 2.1 * s, 8.4 * s, 2.2 * s, x, 4.3 * s, 0, [0, 0, x < 0 ? - .12: .12]);
    box(parent, 'tunnel-buttress-light', p.accent, .12 * s, 6.4 * s, .1 * s, x + (x < 0 ? .95: - .95) * s, 4.1 * s, - 1.15 * s);
  }
  function addVoidAnchor(parent, p, x, z, s, orbit) {
    addFoundationProp(parent, p, x, z, 'void-anchor', 3.5 * s, 3 * s);
    box(parent, 'void-anchor-body', p.body, 2.5 * s, 5.2 * s, 1.5 * s, x, 2.7 * s, z, [.12, .16, - .08]);
    box(parent, 'void-anchor-face', p.accent, .14 * s, 4.4 * s, 1.25 * s, x - 1.3 * s, 2.7 * s, z - .2 * s, [.12, .16, - .08]);
    box(parent, 'void-anchor-seam', p.glow, .12 * s, 4 * s, .12 * s, x, 2.7 * s, z - .8 * s, [.12, .16, - .08]);
    if (orbit) {
      const ring = torus(parent, 'void-grounded-orbit', p.accent, 2.6 * s, .13 * s, x, 4.4 * s, z, [.45, .2, 0]);
      ring.userData.voidOrbit = true;
      ring.userData.phase = x < 0 ? 0: 1.7;
      sphere(parent, 'void-orbit-core', p.glow, .46 * s, x, 4.4 * s, z);
    }
  }
  function addVoidMonolith(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'void-monolith', 4 * s, 3.2 * s);
    box(parent, 'void-monolith-body', p.body, 3.2 * s, 9 * s, 2.4 * s, x, 4.55 * s, z, [.08, .16, .06]);
    box(parent, 'void-monolith-face', p.accent, .18 * s, 7.3 * s, 1.8 * s, x - 1.66 * s, 4.55 * s, z - .15 * s, [.08, .16, .06]);
    box(parent, 'void-monolith-break', p.glow, 2.2 * s, .13 * s, .13 * s, x, 5.6 * s, z - 1.25 * s, [.08, .16, .06]);
  }
  function addFactoryStack(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'factory-stack', 6 * s, 4.6 * s);
    box(parent, 'factory-hall', p.body, 5.4 * s, 2.5 * s, 4 * s, x, 1.35 * s, z);
    box(parent, 'factory-roof', p.dark, 5.8 * s, .22 * s, 4.4 * s, x, 2.65 * s, z);
    cylinder(parent, 'factory-stack', p.dark, 1.1 * s, 1.35 * s, 7.6 * s, x - 1.55 * s, 5.1 * s, z + .35 * s);
    cylinder(parent, 'factory-stack-small', p.dark, .7 * s, .86 * s, 5.2 * s, x + 1.55 * s, 3.9 * s, z + .35 * s);
    torus(parent, 'factory-stack-warning', p.accent, 1.15 * s, .1 * s, x - 1.55 * s, 4.2 * s, z + .35 * s, [Math.PI / 2, 0, 0]);
  }
  function addFactoryGantry(parent, p, s) {
    foundation(parent, p, 'factory-gantry-west', - 17.2, 0, 2.2 * s, 2.2 * s);
    foundation(parent, p, 'factory-gantry-east', 17.2, 0, 2.2 * s, 2.2 * s);
    box(parent, 'factory-gantry-leg-west', p.body, 1.1 * s, 11.5 * s, 1.25 * s, - 17.2, 5.75 * s, 0);
    box(parent, 'factory-gantry-leg-east', p.body, 1.1 * s, 11.5 * s, 1.25 * s, 17.2, 5.75 * s, 0);
    box(parent, 'factory-gantry-beam', p.body, 34.4 * s, .68 * s, 1.25 * s, 0, 11.5 * s, 0);
    box(parent, 'factory-gantry-light', p.accent, 28 * s, .12 * s, .12 * s, 0, 11.05 * s, - .67 * s);
    box(parent, 'factory-gantry-sign', p.glow, 7 * s, .46 * s, .08 * s, 0, 10.35 * s, - .7 * s);
  }
  function addReactor(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'reactor', 4 * s, 3.4 * s);
    cylinder(parent, 'reactor-tank', p.body, 1.55 * s, 1.55 * s, 3.2 * s, x, 1.7 * s, z);
    torus(parent, 'reactor-ring', p.accent, 1.65 * s, .1 * s, x, 1.7 * s, z, [Math.PI / 2, 0, 0]);
    for (const side of [ - 1, 1]) box(parent, 'reactor-leg', p.dark, .3 * s, 1.8 * s, .34 * s, x + side * 1.05 * s, .9 * s, z);
    box(parent, 'reactor-pipe', p.glow, .14 * s, 2.8 * s, .14 * s, x + 1.7 * s, 2.1 * s, z - .8 * s, [0, 0, .18]);
  }
  function addIceBank(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'ice-bank', 5.5 * s, 4 * s);
    box(parent, 'ice-bank-base', p.body, 5.2 * s, 2.2 * s, 3.5 * s, x, 1.2 * s, z, [0, 0, - .1]);
    cone(parent, 'ice-bank-spire', p.accent, 1.7 * s, 6.4 * s, x + .7 * s, 4.1 * s, z - .15 * s, [0, .12, - .08]);
    box(parent, 'ice-bank-vein', p.glow, .12 * s, 4.8 * s, .1 * s, x - 1.4 * s, 2.7 * s, z - 1.75 * s, [0, 0, - .1]);
  }
  function addGlacier(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'glacier', 6 * s, 4.5 * s);
    box(parent, 'glacier-wall', p.body, 5.3 * s, 6.3 * s, 3.8 * s, x, 3.25 * s, z, [0, 0, - .12]);
    box(parent, 'glacier-cap', p.accent, 3.7 * s, 2.8 * s, 3 * s, x + .5 * s, 7.2 * s, z - .15 * s, [0, 0, - .18]);
    box(parent, 'glacier-vein', p.glow, .12 * s, 5.4 * s, .12 * s, x - 1.5 * s, 2.8 * s, z - 1.9 * s, [0, 0, - .12]);
  }
  function addFrostArch(parent, p, s) {
    foundation(parent, p, 'frost-arch-west', - 16.7, 0, 2.3 * s, 2.4 * s);
    foundation(parent, p, 'frost-arch-east', 16.7, 0, 2.3 * s, 2.4 * s);
    box(parent, 'frost-arch-pillar-west', p.body, 1.25 * s, 10.4 * s, 1.5 * s, - 16.7, 5.2 * s, 0);
    box(parent, 'frost-arch-pillar-east', p.body, 1.25 * s, 10.4 * s, 1.5 * s, 16.7, 5.2 * s, 0);
    box(parent, 'frost-arch-beam', p.accent, 33.4 * s, .72 * s, 1.3 * s, 0, 10.4 * s, 0);
    box(parent, 'frost-arch-light', p.glow, 25 * s, .12 * s, .1 * s, 0, 9.95 * s, - .68 * s);
  }
  function addViaduct(parent, p, s) {
    foundation(parent, p, 'viaduct-west', - 17.5, 0, 2.5 * s, 2.8 * s);
    foundation(parent, p, 'viaduct-east', 17.5, 0, 2.5 * s, 2.8 * s);
    box(parent, 'viaduct-column-west', p.body, 1.5 * s, 12.5 * s, 2 * s, - 17.5, 6.25 * s, 0);
    box(parent, 'viaduct-column-east', p.body, 1.5 * s, 12.5 * s, 2 * s, 17.5, 6.25 * s, 0);
    box(parent, 'viaduct-deck', p.body, 35 * s, 1.15 * s, 3 * s, 0, 12.5 * s, 0);
    box(parent, 'viaduct-light', p.accent, 29 * s, .14 * s, .12 * s, 0, 11.83 * s, - 1.52 * s);
    box(parent, 'viaduct-underlight', p.glow, 20 * s, .1 * s, .1 * s, 0, 11.75 * s, 1.52 * s);
  }
  function addCityTower(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'city-tower', 4.5 * s, 4 * s);
    box(parent, 'city-tower-base', p.body, 4 * s, 2.2 * s, 3.5 * s, x, 1.15 * s, z);
    box(parent, 'city-tower-shaft', p.body, 2.8 * s, 7.2 * s, 2.7 * s, x + .18 * s, 5.8 * s, z);
    box(parent, 'city-tower-crown', p.accent, 3.4 * s, .16 * s, 3.1 * s, x + .18 * s, 9.5 * s, z);
    box(parent, 'city-tower-window', p.glow, .12 * s, 6.2 * s, .1 * s, x - 1.45 * s, 5.4 * s, z - 1.4 * s);
  }
  function addResearchStation(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'research-station', 6 * s, 4.5 * s);
    box(parent, 'research-station-body', p.body, 5.2 * s, 2.25 * s, 3.5 * s, x, 1.22 * s, z);
    box(parent, 'research-station-roof', p.snow, 4.8 * s, .18 * s, 3.2 * s, x, 2.42 * s, z);
    cylinder(parent, 'research-dish-mast', p.accent, .16 * s, .2 * s, 4.6 * s, x, 4.6 * s, z);
    torus(parent, 'research-dish', p.glow, 1.05 * s, .1 * s, x, 6.8 * s, z, [Math.PI / 2, 0, 0]);
    box(parent, 'research-window', p.accent, 3.4 * s, .12 * s, .1 * s, x, 1.55 * s, z - 1.78 * s);
    addResearchPylon(parent, p, x - 4.5 * s, z + .15 * s, .72 * s);
    addResearchPylon(parent, p, x + 4.5 * s, z - .15 * s, .72 * s);
  }
  function addResearchPylon(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'research-pylon', 1.6 * s, 1.6 * s);
    cylinder(parent, 'research-pylon-mast', p.body, .28 * s, .38 * s, 8.2 * s, x, 4.2 * s, z);
    box(parent, 'research-pylon-light', p.accent, 2.4 * s, .16 * s, .16 * s, x, 7.9 * s, z);
    sphere(parent, 'research-pylon-beacon', p.glow, .22 * s, x, 8.35 * s, z);
  }
  function addSnowRock(parent, p, x, z, s) {
    const body = mesh(parent, 'snow-rock-formation', terrainForm('snow-rock-shape', 2.8, 2.7, 2.2, 4), p.body, x, - .02, z);
    const cap = mesh(parent, 'snow-rock-cap', terrainForm('snow-rock-snow', 1.40, .7, 1.15, 4), p.snow, x + s * .25, 2.0 * s, z);
    body.scale.setScalar(s);
    cap.scale.setScalar(s);
    body.userData.decorationOnly = true;
    body.userData.gameplayHazard = false;
    cap.userData.decorationOnly = true;
    cap.userData.gameplayHazard = false;
  }
  function addRiftGate(parent, p, s) {
    foundation(parent, p, 'rift-gate-west', - 16.5, 0, 2.5 * s, 2.5 * s);
    foundation(parent, p, 'rift-gate-east', 16.5, 0, 2.5 * s, 2.5 * s);
    box(parent, 'rift-gate-pillar-west', p.body, 1.35 * s, 11.1 * s, 1.5 * s, - 16.5, 5.55 * s, 0);
    box(parent, 'rift-gate-pillar-east', p.body, 1.35 * s, 11.1 * s, 1.5 * s, 16.5, 5.55 * s, 0);
    box(parent, 'rift-gate-beam', p.accent, 33 * s, .7 * s, 1.35 * s, 0, 11.5 * s, 0);
    const ring = torus(parent, 'rift-gate-ring', p.glow, 9.4 * s, .2 * s, 0, 11.5 * s, - .68 * s);
    ring.scale.y = .44;
    ring.userData.riftOrbit = true;
    ring.userData.phase = s;
    const veil = box(parent, 'rift-gate-veil', p.veil, 14.5 * s, 7.2 * s, .08 * s, 0, 7.15 * s, - .7 * s);
    veil.castShadow = false;
    veil.receiveShadow = false;
    box(parent, 'rift-gate-threshold', p.glow, 14 * s, .08 * s, 1.1 * s, 0, .15 * s, .8 * s);
  }
  function addRiftAnchor(parent, p, x, z, s) {
    addFoundationProp(parent, p, x, z, 'rift-anchor', 3.8 * s, 3.2 * s);
    box(parent, 'rift-anchor-body', p.body, 2.8 * s, 6.2 * s, 1.5 * s, x, 3.15 * s, z, [.12, .18, - .08]);
    box(parent, 'rift-anchor-plate', p.accent, .28 * s, 4.8 * s, 2.3 * s, x - 1.5 * s, 3.25 * s, z + .15 * s, [.18, .2, .16]);
    const orbit = torus(parent, 'rift-anchor-orbit', p.glow, 2.5 * s, .12 * s, x, 4.1 * s, z, [.4, .2, 0]);
    orbit.userData.riftOrbit = true;
    orbit.userData.phase = x < 0 ? 0: 1.5;
  }
  function addSetPiece(parent, p, item) {
    const s = item.size || 1;
    switch (item.shape) {
      case 'mesa': addMesa(parent, p, item.x, 0, s);
      break;
      case 'solar': addSolar(parent, p, item.x, 0, s);
      break;
      case 'dune': addDune(parent, p, item.x, 0, s);
      break;
      case 'sun-gate': addSunGate(parent, p, s);
      break;
      case 'tunnel-ring': addTunnelRing(parent, p, s);
      break;
      case 'tunnel-buttress': addTunnelButtress(parent, p, item.x, s);
      break;
      case 'void-anchor': addVoidAnchor(parent, p, item.x, 0, s, false);
      break;
      case 'void-orbit': addVoidAnchor(parent, p, item.x, 0, s, true);
      break;
      case 'void-monolith': addVoidMonolith(parent, p, item.x, 0, s);
      break;
      case 'factory-stack': addFactoryStack(parent, p, item.x, 0, s);
      break;
      case 'factory-gantry': addFactoryGantry(parent, p, s);
      break;
      case 'reactor': addReactor(parent, p, item.x, 0, s);
      break;
      case 'ice-bank': addIceBank(parent, p, item.x, 0, s);
      break;
      case 'glacier': addGlacier(parent, p, item.x, 0, s);
      break;
      case 'frost-arch': addFrostArch(parent, p, s);
      break;
      case 'viaduct': addViaduct(parent, p, s);
      break;
      case 'city-tower': addCityTower(parent, p, item.x, 0, s);
      break;
      case 'research-station': addResearchStation(parent, p, item.x, 0, s);
      break;
      case 'research-pylon': addResearchPylon(parent, p, item.x, 0, s);
      break;
      case 'snow-rock': addSnowRock(parent, p, item.x, 0, s);
      break;
      case 'rift-gate': addRiftGate(parent, p, s);
      break;
      case 'rift-anchor': addRiftAnchor(parent, p, item.x, 0, s);
      break;
      default: box(parent, item.id, p.accent, 1, 1, 1, item.x, .5, 0);
    }
  }
  function roadsideWorld(world, p, id) {
    const count = id === 'cityviaduct'?24: id === 'tunnel'?24: 18;
    for (let i = 0;
    i < count;
    i++) {
      const segment = group('grounded-streetscape-' + id + '-' + i, world);
      segment.userData.distanceObj = i * CONFIG.repeatLength / count;
      world.userData.dynamicSegments.push(segment);
      const side = i % 2?1: - 1, x = side * (id === 'cityviaduct'?25 + (i % 3) * 11: 24 + (i % 3) * 7);
      if (id === 'cityviaduct') {
        const h = 12 + (i * 17 % 35), w = 8 + (i % 3) * 2, z = 0;
        foundation(segment, p, 'city-block', x, z, w + 3, 18);
        if (i % 3 === 0) {
          mesh(segment, 'angular-city-tower', terrainForm('angular-tower', w * .52, h, 6, i % 3), p.body, x, .09, z);
        } else {
          box(segment, 'city-lower-block', p.body, w + 2, 4, 13, x, 2.09, z);
          box(segment, 'city-main-tower', p.body, w, h - 4, 10, x + (i % 2?.8: - .8), 4.09 + (h - 4) * .5, z);
          if (i % 3 === 1)box(segment, 'city-terraced-crown', p.body, w * .66, 5, 8, x, h + 2.5, z);
        }
        for (let floor = 0;
        floor < 4;
        floor++)for (const sx of[ - 1, 1])box(segment, 'city-window-row', floor % 2?p.accent: p.glow, w * .72, .17, .09, x, 4 + floor * (h - 5) / 4, sx * 6.51);
        box(segment, 'city-door', p.glow, 1.4, 2, .08, x, 1.15, 6.52);
        box(segment, 'city-holographic-sign', i % 2?p.glow: p.accent, .08, 2.4, 2.7, x - side * (w * .5 + .2), h * .65, 2.3);
        box(segment, 'city-lamp-post', p.body, .15, 7.8, .15, side * 16.5, 3.9, 14);
        box(segment, 'city-lamp-arm', p.body, 2.2, .15, .18, side * 15.4, 7.8, 14);
        box(segment, 'city-lamp-light', p.accent, 1.45, .06, .30, side * 15.3, 7.68, 14);
        box(segment, 'cross-street', p.dark, 72, .05, 7, side * 54, - .015, 25);
        box(segment, 'foundation-building-lot', p.ground, 35, .1, 44, side * 42, - .02, 0);
      } else if (id === 'factory') {
        foundation(segment, p, 'industrial-slab', x, 0, 18, 22);
        if (i % 3 === 0) {
          addFactoryStack(segment, p, x, 0, 1.8);
          for (let j = 0;
          j < 3;
          j++) {
            const steam = sphere(segment, 'chimney-steam', material('factory-steam', 0x69808b, .05, .0, .9, .10), 1.5 + j * .45, x - 2.8, 18 + j * 2.2, .65);
            steam.userData.steam = true;
            steam.userData.baseY = steam.position.y;
            steam.userData.phase = j;
          }
        } else if (i % 3 === 1) {
          addReactor(segment, p, x - 3, 0, 1.75);
          addReactor(segment, p, x + 3, 0, 1.75);
        } else {
          box(segment, 'factory-processing-hall', p.body, 12, 5, 16, x, 2.6, 0);
          box(segment, 'factory-angled-roof', p.dark, 13, .7, 17, x, 5.3, 0);
          for (let j = 0;
          j < 4;
          j++)box(segment, 'factory-hall-window', p.accent, 1.4, .7, .08, x - 4.5 + j * 3, 3.1, 8.05);
        }
        cylinder(segment, 'industrial-pipe', p.dark, .40, .40, 20, x, 2, 0, [Math.PI / 2, 0, 0]);
        torus(segment, 'industrial-pipe-collar', p.accent, .47, .06, x, 2, 3);
        box(segment, 'industrial-warning-sign', p.accent, .08, 1.4, 1.2, side * 17, 1.6, 4);
      } else if (id === 'aurora') {
        if (i % 6 === 0)addResearchStation(segment, p, x, 0, 1.8);
        else if (i % 3 === 0)addResearchPylon(segment, p, side * 19, 0, .85);
        else {
          addSnowRock(segment, p, x, 0, 1.4 + (i % 3) * .25);
        }
        mesh(segment, 'soft-snowbank', terrainForm('snowbank-shape', 5.5, 1.2, 12, 3), p.snow, side * 15.5, - .05, 8);
      } else if (id === 'frozen') {
        mesh(segment, 'ice-cliff', terrainForm('ice-cliff-shape', 5.7, 8 + (i % 3) * 3, 9, 4), p.body, x, - .03, 0);
        mesh(segment, 'glacial-snowbank', terrainForm('frost-snowbank', 5, 1.8, 12, 1), p.ground, side * 17, - .04, 8);
      } else if (id === 'desert') {
        mesh(segment, 'eroded-sandstone', terrainForm('sandstone-' + i % 3, 6, 3 + (i % 3) * 4, 8, i % 3), p.body, x, - .04, 0);
        mesh(segment, 'sand-dune', terrainForm('low-dune', 9, 1.8, 16, 2), p.ground, side * 18, - .05, 12);
      } else if (id === 'tunnel') {
        for (const sign of[ - 1, 1]) {
          box(segment, 'tunnel-support', p.dark, .25, 9.8, .35, sign * 12.25, 4.9, 0);
          box(segment, 'tunnel-energy-panel', p.accent, .045, 1.8, 2.4, sign * 12.20, 4.5, - 4);
          box(segment, 'tunnel-energy-panel-frame', p.dark, .08, 2.2, 3, sign * 12.24, 4.5, - 4);
        }
        box(segment, 'tunnel-ceiling-support', p.dark, 24.6, .24, .35, 0, 9.95, 0);
      } else {
        const island = mesh(segment, 'fractured-platform', terrainForm('rift-platform', 11, 3, 9, 5), p.body, x, - 3, 0);
        box(segment, 'dimensional-platform-light', p.accent, 6, .09, .13, x, .06, 3);
        mesh(segment, 'fractured-rock', terrainForm('floating-rift-rock', 2.5, 3.6, 2.7, 4), p.body, x + side * 4, 5 + (i % 3) * 2, 0);
        if (i % 3 === 0)torus(segment, 'anchor-energy-halo', p.glow, 5.5, .08, x, 6, 0, [0, .2, .35]);
      }
    }
  }
  function bakeBatches(world) {
    if (!Kit.InstancedMesh || !Kit.Matrix4)return;
    const candidates = [];
    world.traverse(node => {
      if (node.isMesh && !node.material.transparent && !node.userData.steam && !node.userData.riftOrbit && !node.userData.voidOrbit)candidates.push(node);
    });
    const pools = new Map(), unit = geometry(Kit.BoxGeometry, 1, 1, 1);
    for (const node of candidates) {
      node.updateMatrix();
      let geo = node.geometry, local = node.matrix.clone();
      if (geo.type === 'BoxGeometry') {
        const params = geo.parameters;
        geo = unit;
        local.scale({
          x: params.width, y: params.height, z: params.depth
        });
      }
      const key = geo.uuid + ':' + node.material.uuid;
      if (!pools.has(key))pools.set(key, {
        geo, mat: node.material, items: []
      });
      pools.get(key).items.push({
        parent: node.parent, local
      });
      node.parent.remove(node);
    }
    world.userData.batches = [];
    for (const batch of pools.values()) {
      const inst = new Kit.InstancedMesh(batch.geo, batch.mat, batch.items.length);
      inst.name = 'environment-batch';
      inst.frustumCulled = false;
      world.add(inst);
      world.userData.batches.push({
        ...batch, mesh: inst
      });
    }
    updateBatches(world);
  }
  function updateBatches(world) {
    world.updateMatrixWorld(true);
    const temp = new Kit.Matrix4();
    for (const batch of world.userData.batches || []) {
      batch.items.forEach((item, i) => {
        temp.copy(item.parent.matrixWorld).multiply(item.local);
        batch.mesh.setMatrixAt(i, temp);
      });
      batch.mesh.instanceMatrix.needsUpdate = true;
    }
  }
  function wrapDistance(value) {
    const half = CONFIG.repeatLength / 2;
    let result = ((value + half) % CONFIG.repeatLength + CONFIG.repeatLength) % CONFIG.repeatLength - half;
    if (result === - half) result = half;
    return result;
  }
  function placeDistance(distanceObj, distance) {
    return 8 - wrapDistance(distanceObj - distance);
  }
  function buildWorld(id) {
    const descriptor = worlds.find(world => world.id === id);
    const world = group('environment-world-' + id);
    const p = palette(id);
    world.userData.environmentWorld = id;
    world.userData.decorationOnly = true;
    world.userData.gameplayHazard = false;
    world.userData.label = descriptor.label;
    world.userData.landmarks = descriptor.landmarks.slice();
    world.userData.layout = descriptor.layout.map(item => ({
      ...item
    }));
    world.userData.backgroundColor = BACKGROUNDS[id];
    world.userData.terrainWidth = CONFIG.terrainWidth;
    world.userData.terrainDepth = CONFIG.terrainDepth;
    world.userData.dynamicSegments = [];
    addTerrain(world, p, id);
    addHorizon(world, p, id);
    if (id === 'aurora') addAuroraSky(world, p);
    if (id === 'desert') addDesertSun(world, p);
    descriptor.layout.forEach((item, index) => {
      const segment = group('environment-segment-' + id + '-' + index, world);
      segment.userData.environmentSegment = true;
      segment.userData.segmentIndex = index;
      segment.userData.distanceObj = item.z;
      segment.userData.layout = {
        ...item
      };
      segment.position.z = placeDistance(item.z, 0);
      addSetPiece(segment, p, item);
      world.userData.dynamicSegments.push(segment);
    });
    roadsideWorld(world, p, id);
    bakeBatches(world);
    return world;
  }
  function buildWorlds() {
    const rootNode = new Kit.Group();
    rootNode.name = 'neon-environment-geometry';
    rootNode.userData.environmentRoot = true;
    rootNode.userData.config = CONFIG;
    rootNode.userData.worldIds = WORLD_IDS.slice();
    rootNode.userData.sceneBackgrounds = {
      ...BACKGROUNDS
    };
    const groups = WORLD_IDS.map(buildWorld);
    groups.forEach(child => rootNode.add(child));
    rootNode.userData.groups = groups;
    return {
      root: rootNode, groups
    };
  }
  function ensureScene(scene) {
    if (!scene || !ensureBound()) return null;
    if (attachedScene !== scene) {
      attachedScene = scene;
      if (environmentRoot && environmentRoot.parent && environmentRoot.parent !== scene) environmentRoot.parent.remove(environmentRoot);
      if (!environmentRoot) environmentRoot = buildWorlds().root;
      scene.add(environmentRoot);
      scene.traverse?.(child => {
        if (child !== environmentRoot && child.userData?.environmentLegacy === true) child.visible = false;
      });
    }
    return environmentRoot;
  }
  function resolve(state) {
    if (forcedWorld) return forcedWorld;
    const explicit = validWorld(state?.environmentWorld) || validWorld(state?.biome);
    if (explicit) return explicit;
    const dimensionWorld = DIMENSION_WORLD[state?.dimension];
    if (dimensionWorld) return dimensionWorld;
    if (finite(state?.environmentZone)) return ['cityviaduct', 'factory', 'void', 'tunnel', 'desert', 'frozen', 'aurora', 'rift'][Math.abs(Math.floor(Number(state.environmentZone))) % WORLD_IDS.length];
    const indexValue = state?.dimensionIndex ?? state?.portalIndex ?? state?.biomeIndex ?? state?.portals ?? state?.biome;
    const index = Math.max(0, Math.floor(Number(indexValue) || 0));
    return WORLD_IDS[index % WORLD_IDS.length];
  }
  function applyBackground(scene, world) {
    const color = BACKGROUNDS[world];
    if (!scene || !Number.isFinite(color)) return;
    if (scene.background && typeof scene.background.setHex === 'function') scene.background.setHex(color);
    else if (!scene.background && Kit?.Color) scene.background = new Kit.Color(color);
    if (scene.userData) scene.userData.environmentBackground = color;
  }
  function snapshotColor(value, fallback) {
    if (value?.clone) return value.clone();
    if (typeof value?.getHex === 'function') return value.getHex();
    return fallback;
  }
  function colorHex(value) {
    return typeof value === 'number' ? value: value?.getHex?.();
  }
  function lerpHex(from, to, amount) {
    const a = colorHex(from) ?? 0;
    const b = colorHex(to) ?? a;
    const channel = shift => Math.round(((a >> shift) & 255) + ((((b >> shift) & 255) - ((a >> shift) & 255)) * amount));
    return (channel(16) << 16) | (channel(8) << 8) | channel(0);
  }
  function writeColor(target, from, to, amount) {
    if (!target) return;
    if (typeof target.copy === 'function' && typeof target.lerp === 'function' && from?.isColor && to?.isColor) {
      target.copy(from).lerp(to, amount);
    } else if (typeof target.setHex === 'function') {
      target.setHex(lerpHex(from, to, amount));
    }
  }
  function worldColor(world, map) {
    const hex = map[world];
    return Kit?.Color && Number.isFinite(hex) ? new Kit.Color(hex): hex;
  }
  function beginTransition(scene, from, to) {
    const fogDensity = Number(scene?.fog?.density);
    transition = {
      from, to, elapsed: 0, duration: CONFIG.transitionSeconds, backgroundFrom: snapshotColor(scene?.background, BACKGROUNDS[from]), fogFrom: snapshotColor(scene?.fog?.color, FOG_COLORS[from]), fogDensityFrom: Number.isFinite(fogDensity) ? fogDensity: .008,
    };
  }
  function transitionProgress(state) {
    const linear = Math.max(0, Math.min(1, state.elapsed / state.duration));
    return linear * linear * (3 - 2 * linear);
  }
  function applySceneTransition(scene, state, progress) {
    if (!scene) return;
    const backgroundTo = worldColor(state.to, BACKGROUNDS);
    if (!scene.background && Kit?.Color) scene.background = new Kit.Color(colorHex(state.backgroundFrom) ?? BACKGROUNDS[state.from]);
    writeColor(scene.background, state.backgroundFrom, backgroundTo, progress);
    if (scene.fog) {
      writeColor(scene.fog.color, state.fogFrom, worldColor(state.to, FOG_COLORS), progress);
      const factor = FOG_DENSITY_FACTOR[state.to] || 1;
      scene.fog.density = state.fogDensityFrom + (state.fogDensityFrom * factor - state.fogDensityFrom) * progress;
    }
    if (scene.userData) scene.userData.environmentTransition = {
      from: state.from, to: state.to, progress
    };
  }
  function materialBase(material) {
    if (!material) return null;
    material.userData ||= {
    };
    if (!material.userData.environmentBase) material.userData.environmentBase = {
      opacity: Number.isFinite(material.opacity) ? material.opacity: 1, transparent: !!material.transparent, depthWrite: material.depthWrite !== false,
    };
    return material.userData.environmentBase;
  }
  function applyWorldWeights(rootNode, weights) {
    const materialWeights = new Map();
    for (const world of rootNode.children || []) {
      const id = world.userData?.environmentWorld;
      const weight = weights.get(id) || 0;
      world.visible = weight > .001;
      world.userData.transitionWeight = weight;
      if (!weight) continue;
      world.traverse(node => {
        for (const material of (Array.isArray(node.material) ? node.material: [node.material])) {
          if (!material) continue;
          materialWeights.set(material, Math.max(materialWeights.get(material) || 0, weight));
        }
      });
    }
    for (const [material, weight] of materialWeights) {
      const base = materialBase(material);
      material.transparent = base.transparent || weight < .999;
      material.opacity = base.opacity * weight;
      material.depthWrite = base.depthWrite && weight >= .999;
      material.needsUpdate = true;
    }
  }
  function animate(world, time) {
    const t = scalar(time);
    world.traverse(node => {
      if (node.userData?.steam) {
        node.position.y = node.userData.baseY + Math.sin(t * .8 + node.userData.phase) * .7;
        node.material.opacity = .11 + Math.sin(t * .4 + node.userData.phase) * .025;
      }
      if (node.userData?.auroraRibbon) {
        setRotation(node, [0, 0, node.userData.baseRotation + Math.sin(t * .08 + node.userData.phase) * .018]);
      }
      if (node.userData?.voidOrbit || node.userData?.riftOrbit) {
        if (node.rotation) node.rotation.z = t * (node.userData.voidOrbit ? .16: .22) + (node.userData.phase || 0);
      }
    });
  }
  function update(state, dt, scene) {
    if (!ensureBound()) return null;
    const rootNode = ensureScene(scene);
    if (!rootNode) return null;
    const selected = resolve(state || {
    });
    const distance = scalar(state?.distance);
    if (!activeWorld) activeWorld = selected;
    if (selected !== activeWorld && (!transition || transition.to !== selected)) {
      beginTransition(scene, activeWorld, selected);
      activeWorld = selected;
    }
    const weights = new Map();
    if (transition) {
      transition.elapsed = Math.min(transition.duration, transition.elapsed + Math.max(0, scalar(dt)));
      const progress = transitionProgress(transition);
      weights.set(transition.from, 1 - progress);
      weights.set(transition.to, progress);
      applySceneTransition(scene, transition, progress);
      if (progress >= 1) {
        transition = null;
        weights.clear();
        weights.set(selected, 1);
      }
    } else {
      weights.set(selected, 1);
    }
    for (const world of rootNode.children || []) {
      const weight = weights.get(world.userData?.environmentWorld) || 0;
      world.visible = weight > .001;
      world.userData.transitionWeight = weight;
      if (!weight) continue;
      world.rotation.y = 0;
      for (const segment of world.userData.dynamicSegments || []) {
        segment.position.z = placeDistance(segment.userData.distanceObj, distance);
        segment.visible = true;
      }
      if (world.userData.terrainLayer) {
        world.userData.terrainLayer.position.z = - 700;
      }
      world.userData.lastDistance = distance;
      world.userData.lastFrameTime = scalar(state?.time);
      world.userData.lastDt = scalar(dt);
      animate(world, state?.time);
      updateBatches(world);
    }
    applyWorldWeights(rootNode, weights);
    return selected;
  }
  function reset() {
    forcedWorld = null;
    activeWorld = null;
    transition = null;
    return null;
  }
  function setWorld(id) {
    const next = validWorld(id);
    if (!next) throw new Error('Unknown environment world: ' + id);
    forcedWorld = next;
    return next;
  }
  function dispose() {
    const disposed = new Set();
    if (environmentRoot) {
      if (environmentRoot.parent) environmentRoot.parent.remove(environmentRoot);
      environmentRoot.traverse(node => {
        if (node.geometry && !disposed.has(node.geometry)) {
          disposed.add(node.geometry);
          node.geometry.dispose?.();
        }
        if (node.material && !disposed.has(node.material)) {
          disposed.add(node.material);
          node.material.dispose?.();
        }
      });
    }
    for (const resource of [...geometries.values(), ...materials.values()]) {
      if (!resource || disposed.has(resource)) continue;
      disposed.add(resource);
      resource.dispose?.();
    }
    geometries.clear();
    materials.clear();
    environmentRoot = null;
    attachedScene = null;
    activeWorld = null;
    transition = null;
  }
  const api = {
    config: CONFIG, worlds, bind, update, frame: (scene, state, dt) => update(state, dt, scene), resolve, setWorld, reset, clearWorld: reset, dispose, get activeWorld() {
      return activeWorld;
    }, get transition() {
      return transition && {
        ...transition, progress: transitionProgress(transition)
      };
    }, get environmentRoot() {
      return environmentRoot;
    },
  };
  root.NeonEnvironmentGeometry = api;
  root.__NEON_ENVIRONMENT__ = api;
})(typeof window !== 'undefined' ? window: globalThis);
