/* Production chassis factory for Neon Drift. */
(function(root){
  'use strict';

  const IDS = ['vector','spectre','phantom','nightfall','cyberx','interceptor','vortex','titan','nova'];
  const SKIN_COLORS = {
    cyan: 0x4df2ff,
    pink: 0xff74d9,
    gold: 0xffd466,
    green: 0x71ffb7,
    violet: 0xb88aff,
    white: 0xf6fbff
  };
  const HEX = {
    ink: 0x0d1424,
    steel: 0x293a50,
    rubber: 0x090d16,
    glass: 0x86dff0,
    cyan: 0x4df2ff,
    red: 0xff425a,
    blue: 0x3d8cff,
    white: 0xf6fbff,
    gold: 0xffd466,
    violet: 0xb88aff,
    green: 0x71ffb7
  };

  const SPECS = {
    vector: {
      wheelbase: 2.86, track: 2.10, radius: .35,
      body: [[-2.42,.76,.27,.83],[-1.92,.94,.29,1.02],[-.92,1.00,.30,1.18],[.75,.96,.30,1.13],[1.82,.88,.29,1.02],[2.42,.70,.28,.84]],
      cabin: [[-.78,.72,1.00,1.28],[.03,.66,1.02,1.49],[.82,.61,1.02,1.32],[1.28,.52,.98,1.18]],
      nose: -2.42, rear: 2.42, canopy: true
    },
    spectre: {
      wheelbase: 3.28, track: 2.53, radius: .37,
      body: [[-2.58,.82,.29,.72],[-2.15,1.05,.30,.88],[-1.10,1.27,.30,1.00],[.42,1.25,.30,1.03],[1.58,1.14,.29,.94],[2.58,.95,.28,.76]],
      cabin: [[-.66,.86,.88,1.16],[.02,.78,.92,1.30],[.73,.70,.90,1.17],[1.12,.61,.86,1.05]],
      nose: -2.58, rear: 2.58, canopy: true
    },
    phantom: {
      wheelbase: 3.24, track: 1.98, radius: .33,
      body: [[-2.68,.54,.28,.64],[-2.18,.76,.29,.79],[-1.10,.88,.30,.91],[.52,.84,.29,.91],[1.68,.76,.28,.82],[2.68,.62,.27,.70]],
      cabin: [[-.72,.63,.83,1.06],[-.05,.60,.86,1.22],[.68,.54,.84,1.12],[1.20,.44,.81,1.01]],
      nose: -2.68, rear: 2.68, canopy: true
    },
    nightfall: {
      wheelbase: 2.74, track: 2.78, radius: .42,
      body: [[-2.40,1.2,.30,.97],[-2.18,1.29,.30,1.13],[-1.12,1.34,.32,1.21],[.38,1.34,.32,1.17],[1.54,1.28,.31,1.12],[2.40,1.22,.30,.95]],
      cabin: [[-.54,.83,1.18,1.48],[.12,.78,1.20,1.62],[.74,.73,1.18,1.49],[1.18,.64,1.13,1.38]],
      nose: -2.40, rear: 2.40, canopy: true
    },
    cyberx: {
      wheelbase: 3.08, track: 2.44, radius: .36,
      body: [[-2.62,.88,.25,.40],[-2.12,1.08,.27,.57],[-1.24,1.17,.29,.77],[.26,1.10,.29,1.04],[1.54,1.12,.28,1.00],[2.55,1.10,.27,.91]],
      cabin: [[-1.03,.70,.76,.78],[.15,.67,.90,1.27],[.86,.64,.94,1.27],[1.40,.59,.94,1.02]],
      nose: -2.62, rear: 2.55, canopy: true
    },
    interceptor: {
      wheelbase: 2.86, track: 2.32, radius: .39,
      body: [[-2.34,.90,.28,.93],[-1.90,1.05,.29,1.12],[-1.10,1.08,.30,1.23],[.58,1.08,.30,1.27],[1.52,1.02,.29,1.21],[2.35,.90,.28,1.01]],
      cabin: [[-1.03,.80,1.11,1.22],[-.55,.80,1.13,1.75],[.77,.80,1.11,1.75],[1.27,.76,1.10,1.21]],
      nose: -2.34, rear: 2.35, canopy: true
    },
    vortex: {
      wheelbase: 3.16, track: 2.52, radius: .34,
      body: [[-2.38,.23,.23,.48],[-1.94,.35,.26,.58],[-1.10,.57,.29,.80],[.76,.60,.29,.83],[1.68,.44,.27,.75],[2.38,.33,.25,.65]],
      cabin: null,
      nose: -2.38, rear: 2.38, canopy: false
    },
    titan: {
      wheelbase: 2.74, track: 2.96, radius: .47,
      body: [[-2.34,1.32,.36,1.28],[-2.10,1.42,.36,1.42],[-1.12,1.45,.38,1.42],[.64,1.44,.38,1.42],[1.96,1.42,.36,1.40],[2.38,1.33,.36,1.25]],
      cabin: [[-.88,.92,1.35,1.53],[-.52,.94,1.40,2.06],[.75,.94,1.38,2.06],[1.18,.90,1.35,1.61]],
      nose: -2.34, rear: 2.38, canopy: true
    },
    nova: {
      wheelbase: 3.38, track: 2.56, radius: .34,
      body: [[-2.66,.62,.27,.59],[-2.18,.92,.28,.76],[-1.24,1.08,.29,.88],[.50,1.05,.29,.87],[1.72,.92,.28,.76],[2.66,.68,.27,.62]],
      cabin: [[-.70,.61,.74,.99],[-.08,.55,.78,1.12],[.58,.51,.76,1.02],[1.10,.43,.71,.91]],
      nose: -2.66, rear: 2.66, canopy: true
    }
  };

  const geometryCache=new Map();
  function getKit(){
    const K = root.NeonArtKit;
    if(!K) throw new Error('NeonArtKit must be injected before NeonVehicles.create()');
    return K;
  }

  function material(K, color, emissiveIntensity, metalness, roughness, opacity){
    const translucent = opacity !== undefined && opacity < 1;
    return new K.StandardMaterial({
      color: color,
      emissive: color,
      emissiveIntensity: emissiveIntensity || 0,
      metalness: metalness === undefined ? .55 : metalness,
      roughness: roughness === undefined ? .31 : roughness,
      transparent: translucent,
      opacity: opacity === undefined ? 1 : opacity,
      depthWrite: !translucent,
      side: 2
    });
  }

  function addMesh(K, parent, name, geometry, mat, x, y, z, rotation){
    const object = K.mesh(parent, name, geometry, mat, x || 0, y || 0, z || 0, rotation);
    object.castShadow = true;
    object.receiveShadow = true;
    return object;
  }

  function addBox(K, parent, name, mat, width, height, depth, x, y, z, rotation){
    return K.box(parent, name, mat, width, height, depth, x || 0, y || 0, z || 0, rotation);
  }

  /* Closed octagonal station rings keep the chassis a real panelled surface. */
  function loftGeometry(K, stations, openCockpit=false){
    const key=JSON.stringify(stations)+openCockpit;if(geometryCache.has(key))return geometryCache.get(key);
    const vertices = [];
    const indices = [];
    const ringSize = 8;
    for(const station of stations){
      const z = station[0], width = station[1], bottom = station[2], top = station[3];
      const bevel = Math.min(.16, Math.max(.06, width * .13));
      vertices.push(
        -width, bottom + bevel, z,
        -width * .80, bottom, z,
         width * .80, bottom, z,
         width, bottom + bevel, z,
         width, top - bevel, z,
         width * .72, top, z,
        -width * .72, top, z,
        -width, top - bevel, z
      );
    }
    for(let s=0; s<stations.length-1; s++){
      const a = s * ringSize, b = (s + 1) * ringSize;
      for(let p=0; p<ringSize; p++){
        if(openCockpit&&s===2&&p===5)continue;
        const n = (p + 1) % ringSize;
        if((s + p) % 2){
          indices.push(a+p, b+p, a+n, a+n, b+p, b+n);
        }else{
          indices.push(a+p, b+p, b+n, a+p, b+n, a+n);
        }
      }
    }
    const front = 0, back = (stations.length - 1) * ringSize;
    for(let p=1; p<ringSize-1; p++){
      indices.push(front, p + 1, p);
      indices.push(back, back + p, back + p + 1);
    }
    const geometry = new K.BufferGeometry();
    geometry.setAttribute('position', new K.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    geometry.userData = {topology: 'octagonal-vehicle-rings', stations: stations.length,neonShared:true};geometryCache.set(key,geometry);
    return geometry;
  }

  function cachedGeometry(K, key, factory){
    if(geometryCache.has(key)) return geometryCache.get(key);
    const geometry=factory();
    geometry.userData={...(geometry.userData||{}),neonShared:true};
    geometryCache.set(key,geometry);
    return geometry;
  }

  function panelGeometry(K, points){
    const vertices = [];
    const indices = [];
    for(const p of points) vertices.push(p[0], p[1], p[2]);
    for(let i=1; i<points.length-1; i++) indices.push(0, i, i+1);
    const geometry = new K.BufferGeometry();
    geometry.setAttribute('position', new K.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
  }

  function wedge(K, parent, name, mat, points, x, y, z, rotation){
    return addMesh(K, parent, name, K.wedge(points), mat, x, y, z, rotation);
  }

  function addWheelSet(K, rootGroup, spec, tire, hub, brake, accent){
    const wheels = new K.Group();
    wheels.name = 'wheels';
    rootGroup.add(wheels);
    const wheelMeshes = [];
    const hubMeshes = [];
    const zPositions = [-spec.wheelbase / 2, spec.wheelbase / 2];
    for(const z of zPositions){
      for(const side of [-1, 1]){
        const x = side * spec.track / 2;
        const tireMesh = addMesh(K, wheels, 'tire', new K.CylinderGeometry(spec.radius, spec.radius, .27, 14), tire, x, spec.radius, z, [0, 0, Math.PI / 2]);
        tireMesh.userData.wheelSide = side;
        tireMesh.userData.axleZ = z;
        wheelMeshes.push(tireMesh);
        const hubMesh = addMesh(K, wheels, 'hub', new K.CylinderGeometry(spec.radius * .54, spec.radius * .54, .045, 10), hub, x + side * .145, spec.radius, z, [0, 0, Math.PI / 2]);
        hubMeshes.push(hubMesh);
        addMesh(K, wheels, 'brake-disc', new K.CylinderGeometry(spec.radius * .70, spec.radius * .70, .035, 16), brake, x - side * .142, spec.radius, z, [0, 0, Math.PI / 2]);
      }
    }
    wheels.userData.wheels = wheelMeshes;
    wheels.userData.hubs = hubMeshes;
    wheels.userData.track = spec.track;
    wheels.userData.wheelbase = spec.wheelbase;
    rootGroup.userData.wheels = wheelMeshes;
    rootGroup.userData.wheelGroup = wheels;
    for(const side of [-1, 1]){
      addBox(K, rootGroup, 'side-sill', accent, .075, .11, spec.wheelbase + .92, side * (spec.track / 2 + .07), .39, 0);
    }
    return wheels;
  }

  function addLights(K, group, spec, accent, dark, red, blue, police){
    for(const side of [-1, 1]){
      addBox(K, group, 'front-lamp', accent, .43, .09, .08, side * .57, .66, spec.nose + .07, [0, side * .08, 0]);
      addBox(K, group, 'rear-lamp', red, .52, .11, .09, side * .56, .67, spec.rear - .06, [0, side * .05, 0]);
    }
    addBox(K, group, 'nose-lamp-strip', accent, .10, .035, .62, 0, .69, spec.nose + .12);
    addBox(K, group, 'rear-lamp-strip', red, .09, .045, .74, 0, .71, spec.rear - .08);
    if(police){
      addBox(K, group, 'interceptor-red-lamp', red, .54, .14, .28, -.38, 1.89, .05);
      addBox(K, group, 'interceptor-blue-lamp', blue, .54, .14, .28, .38, 1.89, .05);
      addBox(K, group, 'interceptor-lightbar-base', dark, 1.58, .08, .30, 0, 1.80, .05);
    }
  }

  function addExhaust(K, group, spec, exhaust, flameMaterial, count){
    const flames = [];
    const outlets = count || 2;
    const spread = outlets === 4 ? .48 : .55;
    for(let i=0; i<outlets; i++){
      const x = outlets === 1 ? 0 : (i - (outlets - 1) / 2) * (spread * 2 / Math.max(1, outlets - 1));
      addMesh(K, group, 'exhaust', new K.CylinderGeometry(.10, .14, .26, 10), exhaust, x, .39, spec.rear + .13, [Math.PI / 2, 0, 0]);
      const flame = addMesh(K, group, 'boost-flame', new K.CylinderGeometry(.025, .15, .68, 8), flameMaterial, x, .39, spec.rear + .45, [Math.PI / 2, 0, 0]);
      flame.visible = false;
      flames.push(flame);
    }
    group.userData.flames = flames;
    return flames;
  }

  function addRearDetails(K, group, spec, dark, steel, accent, red, blue, exhaust, vehicleId){
    const style = {
      vector: 'split', spectre: 'wide', phantom: 'blade', nightfall: 'bar',
      cyberx: 'arrow', interceptor: 'police', vortex: 'reactor', titan: 'bulwark', nova: 'delta'
    }[vehicleId] || 'split';
    addBox(K, group, 'rear-fascia', dark, spec.track * .90, .28, .18, 0, .57, spec.rear - .04);
    addBox(K, group, 'rear-panel', steel, spec.track * .66, .26, .06, 0, .79, spec.rear - .13);
    addBox(K, group, 'rear-window', dark, spec.track * .58, .22, .055, 0, 1.06, spec.rear - .10);
    for(const side of [-1,1]){
      const wheelX=side*spec.track/2;
      const arch=addMesh(K, group, 'rear-wheel-arch', cachedGeometry(K,'rear-arch-'+spec.radius,()=>new K.TorusGeometry(spec.radius*.98,.045,6,16)), accent, wheelX, spec.radius+.02, spec.wheelbase/2, [0,Math.PI/2,0]);
      arch.userData.rearReadability=true;
      addBox(K, group, 'rear-lamp-housing', dark, .66, .18, .12, side*spec.track*.29, .76, spec.rear - .17);
      addBox(K, group, 'rear-lamp-detail', red, style==='wide' ? .50 : .38, .10, .05, side*spec.track*.29, .78, spec.rear - .24);
      addBox(K, group, 'exhaust-panel', steel, .34, .22, .07, side*(vehicleId==='vortex'?.62:.48), .42, spec.rear + .08);
    }
    addBox(K, group, 'rear-light-bar', red, style==='wide' ? spec.track*.72 : spec.track*.54, .075, .055, 0, .86, spec.rear - .22);
    switch(style){
      case 'split':
        addBox(K, group, 'rear-center-split', accent, .10, .18, .08, 0, .78, spec.rear - .23);
        addBox(K, group, 'rear-diffuser-fin', dark, .12, .34, .30, 0, .46, spec.rear + .02);
        break;
      case 'wide':
        addBox(K, group, 'wide-tail-wing', dark, spec.track*1.12, .12, .36, 0, 1.25, spec.rear - .02);
        addBox(K, group, 'wide-tail-strut', accent, .12, .42, .12, -spec.track*.38, 1.04, spec.rear - .02);
        addBox(K, group, 'wide-tail-strut', accent, .12, .42, .12, spec.track*.38, 1.04, spec.rear - .02);
        break;
      case 'blade':
        addBox(K, group, 'blade-tail-left', accent, .12, .42, .42, -spec.track*.28, .96, spec.rear - .02, [0,-.18,0]);
        addBox(K, group, 'blade-tail-right', accent, .12, .42, .42, spec.track*.28, .96, spec.rear - .02, [0,.18,0]);
        break;
      case 'bar':
        addBox(K, group, 'nightfall-tailgate', steel, spec.track*.78, .42, .10, 0, .78, spec.rear - .10);
        addBox(K, group, 'nightfall-tailbar', red, spec.track*.68, .12, .06, 0, .90, spec.rear - .19);
        break;
      case 'arrow':
        addBox(K, group, 'cyberx-tail-chevron', accent, .12, .10, .70, 0, .94, spec.rear - .19, [0,0,.18]);
        addBox(K, group, 'cyberx-diffuser', dark, spec.track*.76, .16, .26, 0, .34, spec.rear + .03);
        break;
      case 'police':
        addBox(K, group, 'police-tail-panel', steel, spec.track*.72, .24, .08, 0, .82, spec.rear - .14);
        addBox(K, group, 'police-tail-stripe', blue, spec.track*.62, .08, .05, 0, .91, spec.rear - .20);
        break;
      case 'reactor':
        addMesh(K, group, 'reactor-tail-hoop', cachedGeometry(K,'reactor-tail-hoop',()=>new K.TorusGeometry(.52,.075,8,20)), accent, 0, .88, spec.rear - .10, [Math.PI/2,0,0]);
        addBox(K, group, 'reactor-tail-core', red, .18, .18, .08, 0, .88, spec.rear - .18);
        break;
      case 'bulwark':
        addBox(K, group, 'titan-rear-bumper', steel, spec.track*1.02, .38, .22, 0, .55, spec.rear + .01);
        addBox(K, group, 'titan-tail-plate', accent, spec.track*.72, .12, .08, 0, .88, spec.rear - .16);
        break;
      case 'delta':
        addBox(K, group, 'nova-tail-delta', accent, spec.track*.88, .10, .62, 0, .98, spec.rear - .02, [0,0,.10]);
        addBox(K, group, 'nova-center-exhaust-panel', dark, .42, .20, .08, 0, .43, spec.rear + .08);
        break;
    }
    group.userData.rearSignature=style;
    group.userData.rearReadable=true;
  }

  function addCanopy(K, group, stations, glass, frame, openCockpit){
    if(!stations){
      addBox(K, group, 'cockpit-floor', frame, .76, .12, 1.20, 0, .42, .25);
      addBox(K, group, 'cockpit-seat', frame, .52, .36, .59, 0, .66, .43);
      for(const side of [-1, 1]){
        addBox(K, group, 'roll-hoop', frame, .11, .86, .13, side * .46, 1.00, .58);
      }
      return;
    }
    const canopy = addMesh(K, group, 'canopy', loftGeometry(K, stations), glass, 0, .02, 0);
    canopy.userData.canopy = true;
    const f=stations[1],r=stations[2];addMesh(K,group,'roof-panel',panelGeometry(K,[[-f[1]*.72,f[3]+.04,f[0]],[f[1]*.72,f[3]+.04,f[0]],[r[1]*.72,r[3]+.04,r[0]],[-r[1]*.72,r[3]+.04,r[0]]]),frame);
    for(const a of [f,r])for(const side of [-1,1])addBox(K,group,'canopy-pillar',frame,.075,a[3]-a[2]+.06,.08,side*a[1]*.76,(a[2]+a[3])/2,a[0]);
    if(openCockpit) canopy.visible = false;
  }

  function signatureVector(K, g, m, dark, accent, spec){
    addBox(K, g, 'vector-keel', accent, .09, .12, 1.74, 0, .42, -.02);
    addBox(K, g, 'vector-split-fin', accent, .12, .38, .76, 0, 1.10, -1.30);
    wedge(K, g, 'vector-nose-vee', dark, [[-1.70,.08,.58,.02],[-.72,.34,.66,.08],[.18,.08,.54,.02]], 0, .63, -.56);
  }

  function signatureSpectre(K, g, m, dark, accent, spec){
    addBox(K, g, 'spectre-rear-wing', dark, 2.48, .11, .42, 0, 1.34, 1.86);
    for(const side of [-1, 1]){
      addBox(K, g, 'spectre-wing-endplate', accent, .12, .54, .52, side * 1.17, 1.25, 1.86);
      wedge(K, g, 'spectre-delta-canard', accent, [[-1.15,.06,.34,.02],[-.40,.28,.48,.07],[.42,.06,.36,.02]], side * 1.03, .83, -.96, [0, side * .16, 0]);
      addBox(K, g, 'spectre-side-pod', dark, .23, .26, 1.46, side * 1.14, .63, .22, [0, side * .08, 0]);
    }
    addBox(K, g, 'spectre-spine', accent, .13, .16, 1.78, 0, 1.16, .22);
  }

  function signaturePhantom(K, g, m, dark, accent, spec){
    wedge(K, g, 'phantom-needle-nose', accent, [[-2.05,.05,.18,.02],[-.62,.36,.38,.11],[.86,.07,.22,.03]], 0, .78, -.70);
    addBox(K, g, 'phantom-gt-wing', dark, 1.75, .08, .34, 0, 1.16, 1.84);
    for(const side of [-1, 1]) addBox(K, g, 'phantom-tail-fin', accent, .10, .48, .72, side * .82, .93, 1.42, [0, side * .16, side * .18]);
  }

  function signatureNightfall(K, g, m, dark, accent, spec){
    addBox(K, g, 'nightfall-squared-hood', dark, .68, .21, .96, 0, 1.26, -1.28);
    addBox(K, g, 'nightfall-ram', dark, 2.12, .23, .42, 0, .52, -2.24);
    for(const side of [-1, 1]){
      addBox(K, g, 'nightfall-shoulder', dark, .34, .46, 1.75, side * 1.18, .85, -.08);
      addBox(K, g, 'nightfall-crease', accent, .10, .12, 1.48, side * 1.36, 1.16, -.05);
      addBox(K, g, 'nightfall-shoulder-fin', accent, .17, .50, .98, side * 1.22, 1.02, .62, [0, side * .18, 0]);
    }
  }

  function signatureCyberx(K, g, m, dark, accent, spec){
    addBox(K, g, 'cyberx-front-splitter', accent, 2.18, .11, .48, 0, .31, -2.34);
    for(const side of [-1, 1]){
      wedge(K, g, 'cyberx-arrow-canard', accent, [[-1.58,.10,.48,.03],[-.83,.38,.52,.06],[-.08,.08,.45,.02]], side * 1.05, .76, -.22, [0, side * .22, 0]);
      addBox(K, g, 'cyberx-blade', dark, .08, .34, 1.34, side * 1.16, .70, -.47, [0, side * .28, 0]);
      addBox(K, g, 'cyberx-tunnel-wall', dark, .14, .25, 1.52, side * .52, .48, .78);
    }
    addBox(K, g, 'cyberx-rear-wing', dark, 2.26, .09, .36, 0, 1.13, 1.72);
  }

  function signatureInterceptor(K, g, m, dark, accent, spec){
    const white=material(K,HEX.white,.1,.65,.35,1);for(const side of [-1,1])addMesh(K,g,'police-white-door',panelGeometry(K,[[side*1.085,.57,-.62],[side*1.085,.98,-.62],[side*1.085,1,.69],[side*1.085,.57,.83]]),white);
    addBox(K, g, 'interceptor-push-bar', dark, 1.92, .20, .48, 0, .54, -2.12);
    for(const side of [-1, 1]){
      addBox(K, g, 'interceptor-door-stripe', accent, .06, .12, 1.86, side * 1.09, .92, .12);
      addBox(K, g, 'interceptor-rear-fin', dark, .12, .42, .88, side * 1.13, 1.00, -.66, [0, side * .23, 0]);
    }
  }

  function signatureVortex(K, g, m, dark, accent, spec){
    addBox(K, g, 'vortex-side-sponson', dark, .30, .23, 1.66, .77, .52, .20);
    addBox(K, g, 'vortex-side-sponson', dark, .30, .23, 1.66, -.77, .52, .20);
    for(const side of [-1, 1]){
      addBox(K, g, 'vortex-rear-fin', accent, .16, .80, 1.54, side * 1.30, 1.07, 1.06, [0, side * .20, 0]);
      addBox(K, g, 'vortex-orbital-fin', accent, .09, .58, 1.30, side * 1.24, 1.02, .25, [0, side * .34, 0]);
    }
    const ring = addMesh(K, g, 'vortex-reactor-hoop', new K.TorusGeometry(.58, .075, 8, 28), accent, 0, 1.04, 1.92, [Math.PI / 2, 0, 0]);
    ring.userData.signature = 'open-cockpit';
  }

  function signatureTitan(K, g, m, dark, accent, spec){
    addBox(K, g, 'titan-bulwark', dark, 2.58, .44, .84, 0, .84, .62);
    addBox(K, g, 'titan-high-hood', dark, 1.72, .32, 1.10, 0, 1.48, -1.18);
    for(const side of [-1, 1]){
      wedge(K, g, 'titan-guard', accent, [[-.66,.08,.30,.02],[.02,.54,.46,.12],[.70,.08,.30,.02]], side * 1.18, .79, -.28);
      addBox(K, g, 'titan-wheel-guard', dark, .32, .48, 1.62, side * 1.30, .75, -.02);
    }
  }

  function signatureNova(K, g, m, dark, accent, spec){
    addBox(K, g, 'nova-delta-wing', accent, 2.72, .08, .70, 0, .95, .86);
    addBox(K, g, 'nova-spine', accent, .10, .17, 1.92, 0, 1.03, .32);
    for(const side of [-1, 1]){
      addBox(K, g, 'nova-tunnel-rail', dark, .18, .25, 2.12, side * .68, .48, .54);
      wedge(K, g, 'nova-arrow-canard', accent, [[-1.72,.10,.46,.025],[-.88,.38,.52,.06],[-.10,.08,.43,.02]], side * 1.02, .68, -.26, [0, side * .18, 0]);
      addBox(K, g, 'nova-wing-endplate', accent, .10, .33, .58, side * 1.28, .95, .88);
    }
    addBox(K, g, 'nova-rear-diffuser', dark, 2.28, .12, .48, 0, .36, 2.17);
  }

  const SIGNATURES = {
    vector: signatureVector,
    spectre: signatureSpectre,
    phantom: signaturePhantom,
    nightfall: signatureNightfall,
    cyberx: signatureCyberx,
    interceptor: signatureInterceptor,
    vortex: signatureVortex,
    titan: signatureTitan,
    nova: signatureNova
  };

  function create(id, skin){
    const K = getKit();
    const vehicleId = IDS.includes(id) ? id : 'vector';
    const vehicleSkin = skin || 'cyan';
    const spec = SPECS[vehicleId];
    const group = new K.Group();
    group.name = 'vehicle-' + vehicleId;

    const paint = material(K, K.skinColors?.[vehicleSkin] ?? SKIN_COLORS[vehicleSkin] ?? SKIN_COLORS.cyan, .22, .68, .30, 1);
    const paintAccent = material(K, K.skinColors?.[vehicleSkin] ?? SKIN_COLORS[vehicleSkin] ?? SKIN_COLORS.cyan, 1.8, .42, .24, 1);
    const dark = material(K, HEX.ink, .08, .88, .24, 1);
    const steel = material(K, HEX.steel, .10, .86, .28, 1);
    const glass = material(K, 0x173447, .16, .55, .18, 1);
    const tire = material(K, HEX.rubber, .02, .35, .62, 1);
    const hub = material(K, K.skinColors?.[vehicleSkin] ?? SKIN_COLORS[vehicleSkin] ?? SKIN_COLORS.cyan, 1.2, .78, .18, 1);
    const brake = material(K, HEX.red, 1.5, .24, .24, 1);
    const frontLight = material(K, HEX.cyan, 3.2, .12, .16, 1);
    const rearLight = material(K, HEX.red, 3.0, .12, .18, 1);
    const blueLight = material(K, HEX.blue, 3.5, .10, .18, 1);
    const exhaust = material(K, HEX.steel, .12, .90, .25, 1);
    const flame = material(K, HEX.cyan, 3.3, .08, .18, 1);

    group.userData = {type: 'vehicle', id: vehicleId, skin: vehicleSkin, bodyMaterial: paint};
    group.userData.chassisSpec = {
      wheelbase: spec.wheelbase,
      track: spec.track,
      wheelRadius: spec.radius,
      nose: spec.nose,
      rear: spec.rear
    };

    addMesh(K, group, 'body-core', loftGeometry(K, spec.body,vehicleId==='vortex'), paint);
    addMesh(K, group, 'body-undertray', loftGeometry(K, [
      [spec.nose + .20, spec.body[0][1] * .74, .20, .43],
      [-.92, spec.body[2][1] * .78, .20, .48],
      [.94, spec.body[3][1] * .78, .20, .50],
      [spec.rear - .18, spec.body[spec.body.length - 1][1] * .74, .20, .43]
    ]), dark, 0, -.01, 0);

    if(spec.canopy) addCanopy(K, group, spec.cabin, glass, paint, false);
    else addCanopy(K, group, null, glass, steel, true);

    addWheelSet(K, group, spec, tire, hub, brake, paintAccent);
    addLights(K, group, spec, frontLight, dark, rearLight, blueLight, vehicleId === 'interceptor');
    addExhaust(K, group, spec, exhaust, flame, vehicleId === 'vortex' || vehicleId === 'nightfall' || vehicleId === 'titan' ? 4 : 2);
    addRearDetails(K, group, spec, dark, steel, paintAccent, rearLight, blueLight, exhaust, vehicleId);

    addBox(K, group, 'front-splitter', dark, spec.track + .12, .09, .34, 0, .31, spec.nose + .10);
    addBox(K, group, 'rear-diffuser', dark, spec.track * .88, .13, .28, 0, .32, spec.rear - .02);

    SIGNATURES[vehicleId](K, group, paint, dark, paintAccent, spec);

    group.userData.vehicleSilhouette = vehicleId;
    group.userData.profile = {
      width: spec.track + spec.radius * .48,
      length: spec.rear - spec.nose + .52,
      height: vehicleId === 'titan' ? 1.92 : vehicleId === 'nova' ? 1.34 : 1.78
    };
    group.userData.wheelMeshes = group.userData.wheels;
    return group;
  }

  root.NeonVehicles = {create: create, ids: IDS.slice()};
})(window);
