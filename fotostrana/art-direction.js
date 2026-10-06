/* The escape's visual grammar: warning hardware, useful salvage, anomalous energy. */
(function(root){
  'use strict';
  const K=()=>root.NeonArtKit;
  const hex={danger:0xff425a,warning:0xffb34a,ink:0x0d1424,steel:0x293a50,
    cyan:0x4df2ff,green:0x71ffb7,gold:0xffd466,violet:0xb88aff,white:0xf6fbff};
  function mat(color,glow=0,metalness=.35,opacity=1){
    return new (K().StandardMaterial)({color,emissive:color,emissiveIntensity:glow,
      metalness,roughness:.31,transparent:opacity<1,opacity,depthWrite:opacity===1,side:2});
  }
  function box(g,name,c,w,h,d,x=0,y=0,z=0,rot){return K().box(g,name,c,w,h,d,x,y,z,rot)}
  function mesh(g,name,geometry,c,x=0,y=0,z=0,rot){return K().mesh(g,name,geometry,c,x,y,z,rot)}
  function ring(g,name,r,tube,c,x=0,y=0,z=0){return mesh(g,name,new (K().TorusGeometry)(r,tube,5,34),c,x,y,z)}
  function clearGroup(g){
    const meshes=[],geometries=new Set(),materials=new Set();
    while(g.children.length){
      const child=g.children[0];g.remove(child);
      child.traverse(o=>{if(o.isMesh)meshes.push(o);});
    }
    for(const o of meshes){
      const geometry=o.geometry;
      if(geometry&&!geometry.userData?.neonShared&&!geometries.has(geometry)){geometries.add(geometry);geometry.dispose();}
      for(const material of(Array.isArray(o.material)?o.material:[o.material])){
        if(material&&!material.userData?.neonShared&&!materials.has(material)){materials.add(material);material.dispose();}
      }
    }
  }
  function materialOf(o){return Array.isArray(o?.material)?o.material[0]:o?.material;}
  function recolor(o,color){if(!o)return;const m=materialOf(o);if(m){o.material=mat(color,3,.12);}}
  function prism(g,name,c,x,y,z,size=1){
    mesh(g,name+'-point',new (K().ConeGeometry)(.29*size,.92*size,5),c,x,y+.28*size,z);
    mesh(g,name+'-tail',new (K().ConeGeometry)(.29*size,.74*size,5),c,x,y-.53*size,z,[Math.PI,0,0]);
  }
  function strobe(g,color,x,y,z){
    const lens=mat(color,3.6,.05);box(g,'warning-lamp',lens,.42,.17,.16,x,y,z);
    box(g,'warning-housing',mat(hex.ink),.54,.05,.23,x,y-.12,z);
  }
  function chevron(g,color,y=1,z=-.44){
    const m=mat(color,2,.05);
    box(g,'direction-up',m,.12,.74,.08,0,y,z);
    for(const side of [-1,1])box(g,'direction-up-wing',m,.12,.55,.08,side*.21,y+.31,z,[0,0,-side*.72]);
  }
  function signX(g,y,z,width=1.2){
    const c=mat(hex.danger,2.7,.08);
    for(const side of [-1,1])box(g,'stop-cross',c,.13,width*1.15,.12,0,y,z,[0,0,side*.72]);
  }
  function portal(g){
    // The parent factory may have already attached a stock portal rig. Replace
    // it instead of hiding it beneath a second visual layer.
    clearGroup(g);
    const frame=mat(hex.violet,2.3,.2), plasma=mat(hex.cyan,3,.05), gold=mat(hex.gold,2,.1);
    const rotor=new (K().Group)();rotor.name='rift-rotating-coils';rotor.position.y=2.35;g.add(rotor);
    for(let i=0;i<10;i++){
      const a=i*Math.PI/5, x=Math.sin(a)*2.18,y=Math.cos(a)*2.18;
      const crystal=mesh(rotor,'rift-fracture',new (K().ConeGeometry)(.15,.65,4),i%2?plasma:frame,x,y,-.12,[0,0,-a]);
      crystal.castShadow=false;
    }
    ring(rotor,'violet-coil',2.13,.12,frame);
    ring(rotor,'cyan-coil',1.72,.085,plasma,0,0,.05);
    ring(g,'outer-warning',2.48,.055,gold,0,2.35,.1);
    const vortex=mesh(g,'rift-vortex-core',new (K().SphereGeometry)(1.15,16,10),mat(0x24124f,1.5,.05,.72),0,2.35,.12);
    vortex.scale.set(.82,.82,.08);
    for(let i=0;i<6;i++){
      const a=i*Math.PI/3;
      const arm=box(g,'rift-vortex-arm',mat(i%2?hex.cyan:hex.violet,2.6,.05),.08,1.32,.08,Math.sin(a)*.66,2.35+Math.cos(a)*.66,.26,[0,0,-a]);
      arm.scale.y=.55+((i+1)%3)*.18;
    }
    for(let side of [-1,1]){
      box(g,'anchored-spine',mat(hex.ink,.1),.26,4.45,.48,side*2.35,2.25,.3);
      strobe(g,hex.cyan,side*2.35,4.25,.04);
    }
    const edge=mat(hex.cyan,2.9,.05),arrow=mat(hex.violet,2.1,.05);
    // Keep the readable arch/vortex as the portal; approach runway markings
    // compete with the opening and are not part of the collider.
    g.userData.artRotor=rotor;
    g.userData.visualFamily='rift';
  }
  function lowBarrier(g){
    // Premium jump hurdle: visually substantial but gameplay collider remains deliberately low.
    clearGroup(g);
    const white=mat(0xf2f5f7,.35,.62),orange=mat(0xff7a1f,2.8,.18),amber=mat(0xffb13b,3.1,.10),
      cyan=mat(0x58efff,3.3,.08),dark=mat(0x101722,.08,.75),steel=mat(0x334354,.10,.80);
    for(const side of [-1,1]){
      box(g,'jump-base',dark,.74,.24,.90,side*1.78,.12,.04);
      box(g,'jump-foot-armor',steel,.60,.34,.70,side*1.78,.31,.02);
      box(g,'jump-side-post',white,.42,1.28,.48,side*1.78,.84,-.02);
      box(g,'jump-post-orange',orange,.12,.88,.08,side*1.78,.88,-.29);
      box(g,'jump-post-cyan',cyan,.08,.72,.09,side*(1.78-.17*side),.89,-.30);
      strobe(g,amber,side*1.78,1.62,-.22);
    }
    box(g,'jump-main-beam',white,4.25,.62,.56,0,.86,0);
    box(g,'jump-front-dark',dark,3.96,.40,.07,0,.83,-.32);
    for(let i=-3;i<=3;i++){
      const x=i*.55;
      box(g,'jump-chevron',i%2?orange:amber,.32,.30,.075,x,.83,-.365,[0,0,i%2?-.58:.58]);
    }
    box(g,'jump-top-light',cyan,4.18,.13,.13,0,1.22,-.31);
    box(g,'jump-lower-light',amber,2.85,.07,.075,0,.48,-.34);
    // Road approach cues are non-colliding and intentionally low-profile.
    for(const z of [8,14,20]){
      for(const x of [-1.15,0,1.15])box(g,'jump-approach-chevron',z===14?cyan:orange,.48,.014,.17,x,.014,z,[0,0,x===0?0:(x<0?-.25:.25)]);
    }
    box(g,'jump-top-cap',white,4.05,.12,.12,0,1.47,-.28);
    g.scale.set(1.18,1.10,1.18);
    g.userData.visualFamily='jump';
    g.userData.referenceModel='premium-jump-hurdle';
  }
  function roadBlock(g){
    // Heavy armored barricade inspired by the approved concept: unmistakably solid and non-jumpable.
    clearGroup(g);
    const white=mat(0xe9edf0,.15,.76),steel=mat(0x313945,.06,.88),dark=mat(0x0d121a,.06,.78),
      orange=mat(0xff721c,2.2,.16),red=mat(0xff334f,3.5,.08),cyan=mat(0x4eefff,2.4,.08);
    box(g,'heavy-wall-core',white,4.28,1.62,.56,0,1.14,-.46);
    box(g,'heavy-top-tube',cyan,3.72,.14,.14,0,2.02,-.16);
    for(let i=-2;i<=2;i++){
      box(g,'heavy-panel-seam',steel,.07,1.52,.06,i*.86,1.18,-.73);
      box(g,'heavy-chevron',orange,.36,.74,.07,i*.82,1.12,-.76,[0,0,i%2?.42:-.42]);
    }
    for(const side of [-1,1]){
      box(g,'heavy-end-tower',white,.70,2.24,.92,side*1.90,1.08,-.20);
      box(g,'heavy-end-dark',dark,.36,1.62,.88,side*1.90,.96,-.16);
      box(g,'heavy-side-cyan',cyan,.10,1.12,.09,side*(1.90-.18*side),1.02,-.63);
      box(g,'heavy-foot',steel,1.08,.34,1.42,side*1.72,.17,.14);
      box(g,'heavy-foot-hazard',orange,.48,.16,.08,side*1.72,.23,-.55);
      strobe(g,orange,side*1.89,2.28,-.55);
      box(g,'heavy-side-amber',orange,.10,.86,.09,side*1.90,1.08,-.52);
    }
    for(const x of [-1.25,-.42,.42,1.25])box(g,'heavy-top-warning',red,.42,.12,.16,x,2.10,-.64);
    box(g,'heavy-lower-cyan',cyan,2.95,.08,.08,0,.36,-.73);
    box(g,'heavy-roof-cap',white,3.55,.10,.18,0,2.34,-.58);
    g.scale.set(1.10,1.18,1.06);
    g.userData.visualFamily='dodge';
    g.userData.referenceModel='heavy-armored-barrier';
  }
  function phaseWall(g){
    // Mechanical sliding phase gate: a real machine, not a generic fence.
    clearGroup(g);
    const white=mat(0xeef1f3,.12,.76),steel=mat(0x343d49,.08,.86),dark=mat(0x101621,.05,.78),
      orange=mat(0xff7a1f,2.0,.14),cyan=mat(0x50efff,2.7,.08),violet=mat(0xa56cff,3.1,.06),field=mat(0x8b55ff,2.2,.04,.30);
    for(const side of [-1,1]){
      box(g,'phase-gate-base',steel,.96,.32,1.10,side*1.78,.16,.05);
      box(g,'phase-gate-column',white,.62,3.18,.68,side*1.78,1.62,0);
      box(g,'phase-gate-inner-rail',dark,.22,2.46,.74,side*1.54,1.58,-.02);
      box(g,'phase-gate-cyan',cyan,.09,1.78,.08,side*(1.78-.18*side),1.66,-.39);
      box(g,'phase-gate-orange',orange,.10,.72,.08,side*1.78,2.48,-.40);
      strobe(g,hex.danger,side*1.78,3.16,-.35);
    }
    box(g,'phase-gate-top-rail',steel,4.18,.34,.54,0,3.12,.04);
    box(g,'phase-gate-panel',white,3.16,1.92,.24,0,1.62,-.10);
    box(g,'phase-gate-panel-inner',dark,2.78,1.46,.10,0,1.62,-.23);
    box(g,'phase-gate-cyan-band',cyan,2.34,.10,.10,0,2.34,-.32);
    box(g,'phase-gate-cyan-band-lower',cyan,2.34,.10,.10,0,.92,-.32);
    for(let i=-2;i<=2;i++)box(g,'phase-gate-chevron',orange,.34,.56,.09,i*.54,1.62,-.29,[0,0,i%2?.54:-.54]);
    // Phase energy window and symbol make the special mechanic readable.
    box(g,'phase-field-window',field,2.24,1.05,.06,0,1.63,-.35);
    ring(g,'phase-symbol-ring',.46,.08,violet,0,1.63,-.44);
    box(g,'phase-symbol-slash',violet,.10,.78,.08,0,1.63,-.51,[0,0,.55]);
    box(g,'phase-gate-bottom-light',cyan,2.64,.08,.08,0,.57,-.33);
    box(g,'phase-gate-top-cap',white,3.28,.10,.14,0,3.40,-.28);
    g.scale.set(1.06,1.14,1.04);
    g.userData.visualFamily='phase';
    g.userData.referenceModel='mechanical-phase-gate';
  }
  function drone(g){
    clearGroup(g);
    return root.NeonDrones.decorate(g,'enemy');
  }
  function fragileRoadwork(g){
    // Futuristic service/work-zone hazard with flood lights and modular safety hardware.
    clearGroup(g);
    const white=mat(0xf0f2f2,.10,.68),steel=mat(0x313a44,.06,.84),dark=mat(0x111722,.05,.75),
      orange=mat(0xff9a24,3.0,.10),cyan=mat(0x4cecff,2.6,.08);
    box(g,'work-barrier-core',white,3.54,.78,.38,0,.74,-.34);
    box(g,'work-sign-face',dark,3.18,.50,.08,0,.75,-.58);
    for(let i=-2;i<=2;i++)box(g,'work-led-chevron',orange,.40,.36,.08,i*.62,.75,-.64,[0,0,-.65]);
    for(const side of [-1,1]){
      box(g,'work-base',steel,.78,.24,.92,side*1.48,.12,.04);
      box(g,'work-post',white,.34,1.16,.44,side*1.48,.69,-.10);
      box(g,'work-post-cyan',cyan,.08,.66,.08,side*1.48,.72,-.35);
      strobe(g,orange,side*1.48,1.33,-.27);
      // Large cone-like marker, highly visible and non-spiky.
      mesh(g,'work-bollard',new (K().ConeGeometry)(.24,.92,8),orange,side*2.05,.47,.25);
      box(g,'work-bollard-base',steel,.58,.12,.58,side*2.05,.06,.25);
    }
    // Compact service module behind the barricade.
    box(g,'work-service-box',white,1.18,.74,.72,.60,1.24,.20);
    box(g,'work-cable-reel',orange,.55,.55,.20,-.34,1.22,.48,[0,Math.PI/2,0]);
    box(g,'work-light-mast',steel,.18,1.70,.18,1.05,1.92,.28);
    box(g,'work-floodlight',orange,.94,.38,.18,1.05,2.73,.20);
    box(g,'work-top-cap',white,2.82,.10,.12,0,1.70,-.46);
    g.scale.set(1.08,1.12,1.04);
    g.userData.visualFamily='breakable';
    g.userData.referenceModel='futuristic-roadwork-hazard';
  }
  function movingTraffic(g){
    // Compact autonomous blocker vehicle from the approved traffic-blocker concept.
    clearGroup(g);
    const white=mat(0xe9edf1,.12,.72),steel=mat(0x323b47,.08,.84),dark=mat(0x10151d,.05,.76),
      orange=mat(0xff7b20,2.4,.12),red=mat(0xff3b3b,3.4,.08),cyan=mat(0x4ceeff,2.8,.08);
    mesh(g,'traffic-body',K().wedge([[-1.85,1.22,.34,.68],[-1.05,1.38,.34,.94],[1.32,1.28,.34,.82],[1.88,1.06,.34,.62]]),white,0,.18,0);
    box(g,'traffic-rear-panel',dark,2.34,.86,.16,0,.78,1.58);
    box(g,'traffic-bumper',steel,2.52,.18,.24,0,.32,1.68);
    for(let i=-2;i<=2;i++)box(g,'traffic-chevron',orange,.34,.62,.08,i*.42,.78,1.68,[0,0,-.66]);
    box(g,'traffic-tailbar',red,1.86,.16,.12,0,1.16,1.60);
    box(g,'traffic-tailbar-cyan',cyan,1.24,.08,.08,0,.42,1.67);
    box(g,'traffic-roof-module',steel,1.24,.36,.92,0,1.30,.05);
    strobe(g,orange,-.38,1.60,-.02);
    strobe(g,orange,.38,1.60,-.02);
    box(g,'traffic-roof-cyan',cyan,.78,.10,.10,0,1.43,-.08);
    for(const side of [-1,1]){
      const wheel=mesh(g,'traffic-wheel',new (K().CylinderGeometry)(.54,.54,.30,14),dark,side*1.18,.54,-.82,[0,0,Math.PI/2]);
      ring(g,'traffic-wheel-neon',.40,.06,cyan,side*1.34,.54,-.82).rotation.y=Math.PI/2;
      mesh(g,'traffic-wheel-rear',new (K().CylinderGeometry)(.50,.50,.30,14),dark,side*1.16,.52,.96,[0,0,Math.PI/2]);
      box(g,'traffic-side-marker',orange,.12,.34,.10,side*1.31,.85,.72);
    }
    box(g,'traffic-roof-cap',white,1.44,.10,.14,0,1.62,-.02);
    g.scale.set(1.08,1.14,1.05);
    g.userData.visualFamily='dodge';
    g.userData.referenceModel='autonomous-traffic-blocker';
  }
  function fallingDebris(g){
    // Highly visible falling debris pod; replaces the old anonymous low-poly chunk.
    clearGroup(g);
    const rock=mat(0x7c8792,.08,.18),steel=mat(0x343d48,.08,.84),orange=mat(0xff6d18,3.5,.08),cyan=mat(0x4cefff,2.4,.08);
    const core=mesh(g,'falling-debris-core',new (K().IcosahedronGeometry)(1.05,1),rock,0,1.18,0);
    core.scale.set(1.04,.94,1.02);
    for(const [x,y,z,rz] of [[-.62,1.25,.52,-.32],[.63,1.12,.44,.34],[-.40,.72,-.66,.42],[.46,1.52,-.40,-.36]]){
      box(g,'falling-armor-plate',steel,.62,.48,.13,x,y,z,[0,0,rz]);
      box(g,'falling-energy-seam',orange,.10,.42,.08,x*.90,y+.02,z+.08,[0,0,rz]);
    }
    ring(g,'falling-warning-ring',1.18,.08,orange,0,1.15,.02).rotation.x=Math.PI/2;
    box(g,'falling-cyan-rim',cyan,1.20,.08,.08,0,1.86,.18);
    box(g,'falling-top-cap',steel,.86,.08,.10,0,2.12,.12);
    g.scale.set(1.12,1.16,1.08);
    g.userData.visualFamily='dodge';
    g.userData.referenceModel='armored-falling-debris';
  }
  function policeBlocker(g){
    // Armored police roadblock vehicle with unmistakable emergency-light identity.
    clearGroup(g);
    const white=mat(0xe8ecef,.12,.74),steel=mat(0x323b47,.07,.88),dark=mat(0x10151d,.05,.80),
      orange=mat(0xff7a1f,2.0,.12),red=mat(0xff3648,3.8,.06),blue=mat(0x377dff,3.8,.06),cyan=mat(0x4ceeff,2.2,.08);
    mesh(g,'police-body',K().wedge([[-1.90,1.22,.32,.70],[-1.05,1.34,.32,1.02],[1.18,1.30,.32,.90],[1.82,1.12,.32,.68]]),white,0,.18,0);
    box(g,'police-front-ram',steel,2.82,1.02,.48,0,.66,-1.58);
    box(g,'police-front-cyan',cyan,1.62,.10,.10,0,.28,-1.76);
    for(let i=-2;i<=2;i++)box(g,'police-ram-stripe',orange,.30,.56,.08,i*.49,.55,-1.82,[0,0,i%2?.48:-.48]);
    box(g,'police-visor',dark,1.88,.42,.12,0,1.26,-1.35);
    box(g,'police-chevron-panel',orange,1.96,.54,.10,0,.74,-1.84);
    box(g,'police-light-red',red,.72,.14,.22,-.43,1.62,-.12);
    strobe(g,red,-.54,1.74,-.08);
    strobe(g,blue,.54,1.74,-.08);
    box(g,'police-light-blue',blue,.72,.14,.22,.43,1.62,-.12);
    for(const side of [-1,1]){
      mesh(g,'police-wheel',new (K().CylinderGeometry)(.54,.54,.32,14),dark,side*1.17,.53,-.80,[0,0,Math.PI/2]);
      mesh(g,'police-wheel-rear',new (K().CylinderGeometry)(.50,.50,.32,14),dark,side*1.15,.51,.98,[0,0,Math.PI/2]);
      box(g,'police-side-cyan',cyan,.10,.62,.10,side*1.28,.90,.35);
      box(g,'police-side-warning',side<0?red:blue,.12,.38,.10,side*1.30,1.13,.78);
    }
    box(g,'police-roof-cap',white,1.62,.10,.14,0,1.82,-.10);
    g.scale.set(1.08,1.14,1.05);
    g.userData.visualFamily='dodge';
    g.userData.referenceModel='armored-police-blocker';
  }
  function armoredTruck(g){
    // Large cargo blocker: same visual family as the traffic concept, but unmistakably heavy.
    clearGroup(g);
    const white=mat(0xe4e8eb,.10,.76),steel=mat(0x303945,.06,.86),dark=mat(0x10151d,.04,.78),
      orange=mat(0xff7a1f,2.1,.12),red=mat(0xff3b3b,3.2,.08),cyan=mat(0x4ceeff,2.4,.08);
    box(g,'truck-cargo',white,3.05,2.36,3.52,0,1.58,.72);
    box(g,'truck-side-cyan',cyan,.10,1.24,3.06,1.56,1.54,.82);
    box(g,'truck-side-cyan',cyan,.10,1.24,3.06,-1.56,1.54,.82);
    box(g,'truck-cargo-dark',dark,2.62,1.72,.10,0,1.52,2.47);
    for(let i=-3;i<=3;i++)box(g,'truck-rear-chevron',orange,.30,.74,.08,i*.37,1.52,2.54,[0,0,-.60]);
    mesh(g,'truck-cab',K().wedge([[-2.50,1.36,.38,1.10],[-1.90,1.44,.38,2.10],[-.82,1.48,.38,2.42]]),steel,0,.12,0);
    box(g,'truck-windscreen',dark,2.25,.54,.08,0,2.08,-2.08);
    for(const side of [-1,1]){
      for(const z of [-1.55,1.42]){
        mesh(g,'truck-wheel',new (K().CylinderGeometry)(.52,.52,.32,14),dark,side*1.38,.55,z,[0,0,Math.PI/2]);
        const rr=ring(g,'truck-wheel-neon',.39,.055,cyan,side*1.55,.55,z);rr.rotation.y=Math.PI/2;
      }
      box(g,'truck-rear-light',red,.16,.66,.10,side*1.32,1.58,2.55);
      box(g,'truck-side-marker',orange,.12,.32,.10,side*1.49,1.08,.35);
    }
    box(g,'truck-roof-cyan',cyan,1.42,.10,.16,0,2.80,.05);
    box(g,'truck-top-cap',white,2.52,.12,.16,0,3.12,.06);
    g.scale.set(1.04,1.14,1.03);
    g.userData.visualFamily='dodge';
    g.userData.referenceModel='armored-cargo-blocker';
  }
  function ramp(g){
    const steel=mat(hex.steel,.12,.8),orange=mat(hex.warning,3,.08),dark=mat(hex.ink,.1,.7);
    // Profiles are [z, half-width, underside, surface]. +Z faces the chase camera.
    const profiles=[[-2.55,1.82,.055,1.43],[2.45,1.82,.055,.115]];
    mesh(g,'ramp-wedge',K().wedge(profiles),steel);
    // Compatibility name retained for QA tooling; this is the visible sloped deck.
    mesh(g,'ramp-deck',K().wedge(profiles),steel).position.y=.012;
    box(g,'ramp-apron',orange,3.7,.08,.9,0,.065,2.9);
    box(g,'ramp-launch-lip',orange,3.72,.14,.16,0,1.46,-2.53);
    for(const side of [-1,1]){
      box(g,'ramp-guide',orange,.14,.17,5.2,side*1.73,.86,-.05,[.256,0,0]);
      mesh(g,'ramp-side-cheek',K().wedge(profiles.map(([z,w,b,t])=>[z,.13,b,t+.17])),dark,side*1.87);
      strobe(g,hex.warning,side*1.6,.27,2.44);
    }
    for(const z of [1.7,.4,-.9])box(g,'ramp-traction',orange,2.9,.035,.12,0,.76-z*.263,z);
    g.scale.set(1.16,1.12,1.16);
    g.userData.visualFamily='jump';
  }
  function laser(g){
    // Premium dual-pylon laser gate inspired by the approved concept image.
    clearGroup(g);
    const white=mat(0xebeff2,.12,.72),steel=mat(0x313a45,.08,.86),dark=mat(0x0f151f,.05,.76),
      orange=mat(0xff7d20,2.4,.12),cyan=mat(0x4cefff,3.0,.08),pink=mat(0xff38c7,4.2,.04,.88);
    for(const side of [-1,1]){
      box(g,'laser-base',steel,.96,.32,1.12,side*1.75,.16,.04);
      box(g,'laser-pylon',white,.64,2.30,.70,side*1.75,1.27,-.22);
      box(g,'laser-pylon-dark',dark,.40,1.70,.76,side*1.75,1.28,-.18);
      box(g,'laser-pylon-cyan',cyan,.10,1.12,.08,side*(1.75-.18*side),1.28,-.62);
      box(g,'laser-pylon-orange',orange,.12,.52,.09,side*1.75,.58,-.61);
      const aperture=ring(g,'laser-aperture',.31,.09,cyan,side*1.75,1.25,-.64); aperture.rotation.y=Math.PI/2;
      const core=ring(g,'laser-core-ring',.18,.07,pink,side*1.75,1.25,-.69); core.rotation.y=Math.PI/2;
      strobe(g,hex.danger,side*1.75,2.43,-.42);
    }
    // Three clearly readable energy bars preserve existing gameplay collider heights.
    for(const y of [.77,1.23,1.69])box(g,'laser-beam',pink,3.18,.13,.11,0,y,-.67);
    box(g,'laser-top-cap',white,2.62,.10,.14,0,2.76,-.44);
    g.scale.set(1.08,1.14,1.04);
    g.userData.visualFamily='dodge';
    g.userData.referenceModel='dual-pylon-laser-gate';
  }
  function decorateObject(g,type){
    if(type==='ramp')return ramp(g);
    if(type==='laser')return laser(g);
    if(type==='portal')return portal(g);
    if(root.NeonPickups?.has(type))return root.NeonPickups.create(g,type);
    if(type==='hurdle')return lowBarrier(g);
    if(type==='barrier')return roadBlock(g);
    if(type==='gate')return phaseWall(g);
    if(type==='drone')return drone(g);
    if(type==='roadwork')return fragileRoadwork(g);
    if(type==='traffic')return movingTraffic(g);
    if(type==='police')return policeBlocker(g);
    if(type==='truck')return armoredTruck(g);
    if(type==='falling')return fallingDebris(g);
    // Legacy spike/mine hazards are intentionally removed from the release track.
    // If an old row somehow requests one, replace it with the readable rock family.
    if(type==='mine'){ clearGroup(g); return root.NeonHazards?.rock?.(g); }
    if(type==='risk'){
      g.traverse(o=>{if(o.isMesh&&o.name==='danger-gate'){o.material.color.setHex(hex.gold);o.material.emissive.setHex(hex.gold);}});
      g.userData.visualFamily='optional-risk';
    }
  }
  function decorateVehicle(g,id,skin){
    g.userData.vehicleSilhouette=id;
    // Final cosmetic pass: a lightweight underglow and rear light signature make
    // every chassis read better against dark roads without changing collision.
    const accentHex=skin==='pink'?0xff5bd8:skin==='gold'?0xffc85f:hex.cyan;
    const under=new (K().Group)();under.name='vehicle-underglow';g.add(under);
    const glowMat=mat(accentHex,2.35,.04,.18), glowCore=mat(accentHex,3.1,.04,.34), rearHot=mat(0xff5a9d,3.2,.04,.72);
    box(under,'underglow-bed',glowMat,2.45,.025,3.85,0,.055,.10);
    box(under,'underglow-left',glowCore,.10,.045,2.55,-1.03,.12,.15);
    box(under,'underglow-right',glowCore,.10,.045,2.55,1.03,.12,.15);
    box(under,'rear-light-signature',rearHot,1.55,.08,.08,0,.58,1.58);
    under.userData.cosmeticOnly=true;
    g.userData.artUnderglow=under;
    const waves=[];
    for(let i=0;i<3;i++){
      const w=ring(g,'pulse-shockwave',1.13+i*.16,.09,mat(i===1?hex.gold:hex.cyan,3,.05,.8),0,.87,-1.25);
      w.visible=false;waves.push(w);
    }
    g.userData.artWaves=waves;
    const shield=new (K().Group)();shield.name='vehicle-shield';g.add(shield);
    const dome=mesh(shield,'shield-dome',new (K().SphereGeometry)(1,24,14),mat(hex.cyan,1.7,.05,.16),0,.82,0);
    dome.scale.set(1.65,.92,2.62);
    for(const z of [-1.5,0,1.5]){
      const rib=ring(shield,'shield-rib',1.53,.025,mat(hex.cyan,2,.1,.53),0,.8,z);
      rib.scale.y=.57;
    }
    shield.visible=false;g.userData.artShield=shield;
    const flight=new (K().Group)();flight.name='vehicle-flight';flight.visible=false;g.add(flight);
    for(const side of [-1,1]){
      const blade=mesh(flight,'flight-deployed-wing',K().wedge([[-1.5,.15,.03,.13],[-.55,1.1,.03,.16],[.8,.67,.03,.11],[1.25,.16,.03,.08]]),mat(0x9b8aff,1.1,.65),side*1.95,.83,.2);
      blade.rotation.y=side*.12;
      box(flight,'flight-wing-tip',mat(hex.cyan,2.4,.1),.12,.09,1.5,side*2.9,.99,.25);
      box(flight,'flight-wing-spar',mat(hex.white,.45,.55),1.75,.075,.11,side*1.96,.99,.15,[0,side*.12,0]);
      mesh(flight,'flight-lift-jet',new (K().ConeGeometry)(.15,.95,7),mat(hex.cyan,2.6,.05,.75),side*1.9,.3,.1,[Math.PI,0,0]);
    }
    g.userData.artFlight=flight;
  }
  function shieldBreak(car){
    if(!car?.userData?.artShield)return;
    car.userData.artShield.visible=false;
    car.userData.artShieldBroken=true;
    car.userData.artShieldArmed=false;
  }
  function phaseVehicle(car,active){
    if(car.userData.artPhase===active)return;
    car.userData.artPhase=active;
    const seen=new Set();car.traverse(o=>{
      if(!o.isMesh)return;
      for(const m of Array.isArray(o.material)?o.material:[o.material]){
        if(!m||seen.has(m))continue;seen.add(m);
        if(!m.userData.phaseOriginal)m.userData.phaseOriginal={opacity:m.opacity,transparent:m.transparent,depthWrite:m.depthWrite};
        const base=m.userData.phaseOriginal;
        m.transparent=active||base.transparent;m.opacity=active?.35:base.opacity;m.depthWrite=active?false:base.depthWrite;m.needsUpdate=true;
      }
    });
  }
  function framePickup(o,time){root.NeonPickups?.frame(o,time);}
  function frame(s,car,objects){
    if(!car)return;
    if(car.userData.artFlight){car.userData.artFlight.visible=s.flight>0;car.userData.artFlight.rotation.z=Math.sin((s.time||0)*2)*.012;}
    if(car.userData.artUnderglow){
      const pulse=1+Math.sin((s.time||0)*4.2)*.035;
      car.userData.artUnderglow.scale.set(pulse,1,1);
      car.userData.artUnderglow.position.y=s.flight>0?.08:0;
    }
    if(car.userData.artShield){
      if(s.shield<=0)car.userData.artShieldArmed=true;
      if(s.shield>0&&car.userData.artShieldArmed)car.userData.artShieldBroken=false;
      car.userData.artShield.visible=s.shield>0&&!car.userData.artShieldBroken;
      car.userData.artShield.scale.setScalar(1+Math.sin((s.time||0)*5)*.018);
    }
    phaseVehicle(car,s.phaseTime>0);
    for(let i=0;i<(car.userData.artWaves?.length||0);i++){
      const w=car.userData.artWaves[i],progress=(.9-s.pulseTime)/.9-i*.24;
      w.visible=s.pulseTime>0&&progress>=0&&progress<1;
      if(w.visible){w.position.z=-1.2-progress*145;w.scale.setScalar(1+progress*2.1);w.material.opacity=Math.max(.05,1-progress);}
    }
    for(const o of objects?.values()||[]){
      framePickup(o,s.time||0);
      if(o.userData.type==='portal'&&o.userData.artRotor){
        o.userData.artRotor.rotation.z=s.time*.5;
        o.userData.artRotor.scale.setScalar(1+Math.sin(s.time*3)*.035);
      }
      if(o.userData.type==='drone')o.rotation.z=Math.sin(s.time*3+o.userData.index)*.05;
    }
  }
  function impact(g,color=hex.warning){
    if(!g?.parent)return;
    const scene=g.parent,group=new (K().Group)();
    group.position.copy(g.position);scene.add(group);
    for(let i=0;i<7;i++){
      const a=i*Math.PI*2/7;
      const p=box(group,'pulse-debris',mat(i%2?color:hex.white,2),.14,.38,.15,0,1.4,0,[a,.2,a]);
      p.userData.v={x:Math.cos(a)*(2+i*.12),y:2.2+i*.22,z:Math.sin(a)*2};
    }
    const start=performance.now();function animate(now){
      const age=(now-start)/1000;
      if(age>=.65){group.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose();}});scene.remove(group);return;}
      for(const p of group.children){p.position.x+=p.userData.v.x/60;p.position.y+=p.userData.v.y/60-age*.02;p.position.z+=p.userData.v.z/60;p.scale.setScalar(1-age/.65);}
      requestAnimationFrame(animate);
    }requestAnimationFrame(animate);
  }
  function phaseContact(g){
    if(!g)return;
    g.userData.phaseContacts=(g.userData.phaseContacts||0)+1;
    const THREE=K(),geometry=new THREE.TorusGeometry(1.2,.085,6,28);
    const material=mat(hex.cyan,3,.05,.84);
    const ripple=new THREE.Mesh(geometry,material);ripple.name='phase-contact';
    ripple.position.set(0,1.65,.85);ripple.scale.set(1.5,1.12,1);g.add(ripple);
    const start=performance.now();
    function fade(){
      const t=Math.min(1,(performance.now()-start)/480);
      if(t>=1){g.remove(ripple);geometry.dispose();material.dispose();return;}
      ripple.scale.set(1.5+t*.85,1.12+t*.65,1);material.opacity=.84*(1-t);
      requestAnimationFrame(fade);
    }
    requestAnimationFrame(fade);
  }
  root.NeonArt={decorateObject,decorateVehicle,frame,impact,phaseContact,shieldBreak};
})(window);
