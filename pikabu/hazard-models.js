/* Reusable authored roadside/road hazard rock; physical centre is explicit. */
(function(root) {
  'use strict';
  let geometry, rockMaterial, warningMaterial, reflectorMaterial, shadowMaterial, steelMaterial;
  const detailGeometries = new Map();
  function sharedMaterial(factory) {
    const material = factory();
    material.userData ||= {
    };
    material.userData.neonShared = true;
    return material;
  }
  function detailBox(g, name, material, key, w, h, d, x, y, z, rotation) {
    let geo = detailGeometries.get(key);
    if (!geo) {
      geo = new root.NeonArtKit.BoxGeometry(w, h, d);
      geo.userData.neonShared = true;
      detailGeometries.set(key, geo);
    }
    return root.NeonArtKit.mesh(g, name, geo, material, x, y, z, rotation);
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
  function rock(g) {
    clearGroup(g);
    const K = root.NeonArtKit;
    if (!geometry) {
      const positions = [], indices = [], rings = [[0, 1.08], [.42, 1.28], [1.18, 1.16], [1.86, .76], [2.15, .28]], N = 9;
      rings.forEach(([y, r], j) => {
        for (let i = 0;
        i < N;
        i++) {
          const a = i * Math.PI * 2 / N + .16 * j, f = .90 + .1 * Math.sin(i * 4.1 + j * 3.7);
          positions.push(Math.cos(a) * r * f, y + ((j === 0)?0: Math.sin(i * 2.9 + j) * .075), Math.sin(a) * r * f * .85);
        }
      });
      for (let j = 0;
      j < rings.length - 1;
      j++)for (let i = 0;
      i < N;
      i++) {
        const a = j * N + i, b = j * N + (i + 1) % N, c = (j + 1) * N + i, d = (j + 1) * N + (i + 1) % N;
        indices.push(a, c, b, b, c, d);
      }
      for (let i = 1;
      i < N - 1;
      i++)indices.push(0, i, i + 1, (rings.length - 1) * N, (rings.length - 1) * N + i + 1, (rings.length - 1) * N + i);
      const raw = new K.BufferGeometry();
      raw.setAttribute('position', new K.Float32BufferAttribute(positions, 3));
      raw.setIndex(indices);
      geometry = raw.toNonIndexed();
      raw.dispose();
      geometry.computeVertexNormals();
      const colors = [], c = new K.Color();
      for (let i = 0;
      i < geometry.attributes.position.count;
      i += 3) {
        c.setHex([0x77838f, 0xa8b0b7, 0x626d78, 0xc7cdd1][Math.floor(i / 3) % 4]);
        for (let j = 0;
        j < 3;
        j++)colors.push(c.r, c.g, c.b);
      }
      geometry.setAttribute('color', new K.Float32BufferAttribute(colors, 3));
      geometry.userData.neonShared = true;
    }
    rockMaterial ||= sharedMaterial(() => new K.StandardMaterial({
      color: 0xffffff, vertexColors: true, emissive: 0x101820, emissiveIntensity: .12, roughness: .88, metalness: .06, flatShading: true
    }));
    warningMaterial ||= sharedMaterial(() => {
      const m = new K.StandardMaterial({
        color: 0xff6d18, emissive: 0xff3c00, emissiveIntensity: 5.4, roughness: .18, metalness: .08, depthTest: false
      });
      m.toneMapped = false;
      return m;
    });
    reflectorMaterial ||= sharedMaterial(() => new K.StandardMaterial({
      color: 0x62efff, emissive: 0x36dfff, emissiveIntensity: 2.2, metalness: .25, roughness: .22
    }));
    shadowMaterial ||= sharedMaterial(() => new K.StandardMaterial({
      color: 0x05080c, transparent: true, opacity: .36, depthWrite: false
    }));
    steelMaterial ||= sharedMaterial(() => new K.StandardMaterial({
      color: 0x343b43, emissive: 0x101820, emissiveIntensity: .18, metalness: .86, roughness: .30
    }));
    K.mesh(g, 'solid-rock', geometry, rockMaterial);
    // Secondary fractured masses create the approved debris-block silhouette.
    const chunkGeo = detailGeometries.get('rock-chunk') || (() => {
      const geo = new K.IcosahedronGeometry(.72, 0);
      geo.userData.neonShared = true;
      detailGeometries.set('rock-chunk', geo);
      return geo;
    })();
    for (const [x, y, z, sx, sy, sz] of [[ - .82, .62, .22, .90, .78, .82], [.78, .56, .18, .80, .66, .76], [ - .28, .52, - .68, .72, .58, .64], [.42, 1.28, .36, .68, .82, .62]]) {
      const c = K.mesh(g, 'rock-fragment', chunkGeo, rockMaterial, x, y, z);
      c.scale.set(sx, sy, sz);
      c.rotation.set(.18 * x, .34 * z, .22 * x);
    }
    // Embedded metal plates and molten energy cracks, matching the concept image without making the collider larger.
    detailBox(g, 'rock-metal-plate-left', steelMaterial, 'rock-metal-plate', .58, .72, .12, - .72, .78, .86, [0, .12, - .16]);
    detailBox(g, 'rock-metal-plate-right', steelMaterial, 'rock-metal-plate', .58, .72, .12, .72, .96, .78, [0, - .14, .16]);
    detailBox(g, 'rock-metal-vent', steelMaterial, 'rock-metal-vent', .78, .30, .14, .48, .52, .96, [0, 0, .08]);
    detailBox(g, 'rock-magma-main', warningMaterial, 'rock-magma-main', .16, 1.18, .09, - .18, 1.14, 1.02, [0, 0, - .34]);
    detailBox(g, 'rock-magma-branch-a', warningMaterial, 'rock-magma-branch', .14, .76, .09, .32, .88, 1.03, [0, 0, .58]);
    detailBox(g, 'rock-magma-branch-b', warningMaterial, 'rock-magma-branch', .14, .64, .09, - .55, .55, .96, [0, 0, .72]);
    detailBox(g, 'rock-cyan-rim-left', reflectorMaterial, 'rock-cyan-rim', .10, .74, .08, - 1.02, .86, .72, [0, 0, - .28]);
    detailBox(g, 'rock-cyan-rim-right', reflectorMaterial, 'rock-cyan-rim', .10, .66, .08, 1.01, .70, .68, [0, 0, .24]);
    const shadowGeo = detailGeometries.get('ground-shadow') || (() => {
      const geo = new K.CylinderGeometry(1.28, 1.08, .035, 10);
      geo.userData.neonShared = true;
      detailGeometries.set('ground-shadow', geo);
      return geo;
    })();
    const shadow = K.mesh(g, 'rock-ground-shadow', shadowGeo, shadowMaterial, 0, .02, 0);
    shadow.castShadow = false;
    shadow.receiveShadow = false;
    // Strong ground warning frame makes the rock readable at speed.
    detailBox(g, 'rock-hazard-front', warningMaterial, 'hazard-perimeter-front', 2.44, .055, .12, 0, .075, 1.21);
    detailBox(g, 'rock-hazard-left', warningMaterial, 'hazard-perimeter-side', .12, .055, 1.88, - 1.20, .075, .08);
    detailBox(g, 'rock-hazard-right', warningMaterial, 'hazard-perimeter-side', .12, .055, 1.88, 1.20, .075, .08);
    detailBox(g, 'rock-warning-lamp-left', warningMaterial, 'warning-lamp', .28, .28, .16, - .82, 1.08, .80);
    detailBox(g, 'rock-warning-lamp-right', warningMaterial, 'warning-lamp', .28, .28, .16, .82, 1.08, .80);
    g.scale.set(1.14, 1.18, 1.10);
    g.userData.visualFamily = 'dodge';
    g.userData.silhouette = 'rock';
    g.userData.gameplayHazard = true;
    g.userData.decorationOnly = false;
    g.userData.hazardCueCount = 5;
    g.userData.visualFootprint = {
      width: 2.95, height: 2.55
    };
    g.userData.boostBreakable = true;
    g.userData.referenceModel = 'molten-debris-block';
    return g;
  }
  root.NeonHazards = {
    rock
  };
})(window);
