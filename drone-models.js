/* Authored combat drone hardware, shared ally/enemy visual language. */
(function(root){
  'use strict';
  const cached=new Map();
  const K=()=>root.NeonArtKit;
  function material(color,glow=0,metal=.6){return new (K().StandardMaterial)({color,emissive:color,emissiveIntensity:glow,metalness:metal,roughness:.32});}
  function geo(name,make){if(!cached.has(name)){const g=make();g.userData.neonShared=true;cached.set(name,g);}return cached.get(name);}
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
  function mesh(g,name,geometry,m,x=0,y=0,z=0,rot){return K().mesh(g,name,geometry,m,x,y,z,rot);}
  function panel(points,depth){const shape=new (K().Shape)();shape.moveTo(...points[0]);points.slice(1).forEach(p=>shape.lineTo(...p));shape.closePath();return new (K().ExtrudeGeometry)(shape,{depth,bevelEnabled:true,bevelSize:.03,bevelThickness:.02,bevelSegments:1,steps:1,curveSegments:5});}
  function decorate(g,role='ally'){
    // Remove inherited abstract enemy meshes, not merely paint over them.
    clearGroup(g);
    const ally=role==='ally',frame=new (K().Group)();frame.name='combat-drone-chassis';frame.position.y=ally?0:1.4;g.add(frame);
    const shell=material(ally?0x182b3b:0x1a2028,.12,.72),dark=material(0x08111c,.02,.72),silver=material(ally?0x315064:0x40515a,.05,.8),energy=material(0x38cfff,1.1,.18),sensor=material(ally?0x67f4ff:0xff8a32,.9,.15);
    mesh(frame,'drone-armored-hull',geo('hull',()=>K().wedge([[-.79,.28,-.16,.08],[-.47,.52,-.23,.26],[.39,.43,-.22,.24],[.70,.29,-.16,.09]])),shell);
    mesh(frame,'drone-upper-panel',geo('upper',()=>K().wedge([[-.4,.30,.23,.27],[.30,.31,.23,.27]])),dark);
    const rotors=[];
    for(const side of [-1,1])for(const fore of [-1,1]){
      const arm=mesh(frame,'drone-swept-arm',geo('arm',()=>panel([[.20,-.12],[.90,-.27],[1.12,-.17],[1.0,.0],[.45,.15]],.09)),shell,0,.03,fore*.30,[-Math.PI/2,0,0]);arm.scale.x=side;arm.scale.y=fore;
      const x=side*1.03,z=fore*.51;
      K().box(frame,'drone-arm-energy-strip',energy,.43,.025,.035,side*.66,.10,fore*.38,[0,side*fore*.25,0]);
      mesh(frame,'drone-thruster-duct',geo('duct',()=>new (K().TorusGeometry)(.32,.065,5,16)),silver,x,.02,z,[Math.PI/2,0,0]);
      mesh(frame,'drone-thruster-light',geo('engine',()=>new (K().TorusGeometry)(.258,.022,4,14)),energy,x,-.042,z,[Math.PI/2,0,0]);
      const blade=mesh(frame,'drone-turbine',geo('blade',()=>panel([[-.24,-.035],[.22,-.062],[.25,.028],[-.22,.055]],.017)),dark,x,.005,z,[-Math.PI/2,0,0]);rotors.push(blade);
      mesh(frame,'drone-lift-exhaust',geo('jet',()=>K().wedge([[-.12,.08,-.15,0],[.12,.06,-.17,-.02]])),energy,x,-.06,z);
    }
    mesh(frame,'drone-sensor-housing',geo('sensor',()=>new (K().CylinderGeometry)(.20,.24,.17,12)),dark,0,-.07,-.70,[Math.PI/2,0,0]);
    mesh(frame,'drone-front-camera',geo('lens',()=>new (K().CylinderGeometry)(.13,.13,.02,12)),sensor,0,-.07,-.802,[Math.PI/2,0,0]);
    mesh(frame,'drone-camera-pupil',geo('pupil',()=>new (K().CylinderGeometry)(.055,.055,.023,10)),dark,0,-.07,-.818,[Math.PI/2,0,0]);
    mesh(frame,'drone-laser-emitter',geo('emitter',()=>K().wedge([[-.78,.08,-.1,.10],[-.50,.12,-.12,.12]])),silver,.24,-.22,0);
    mesh(frame,'drone-laser-aperture',geo('muzzle',()=>new (K().CylinderGeometry)(.047,.047,.06,10)),energy,.24,-.22,-.82,[Math.PI/2,0,0]);
    for(const side of[-1,1])K().box(frame,'drone-status-strip',energy,.17,.035,.34,side*.34,.255,.16);
    if(!ally)K().box(frame,'drone-warning-marker',material(0xff8a32,1.35,.12),.48,.08,.16,0,.31,.16);
    g.name=ally?'player-combat-drone':'obstacle-drone';g.userData.droneRole=role;g.userData.rotors=rotors;g.userData.energyMaterial=energy;g.userData.visualFamily=ally?'player-support':'breakable';g.scale.setScalar(ally?.52:1);return g;
  }
  function create(role='ally'){return decorate(new (K().Group)(),role);}
  const COLLIDER_HX={vector:.82,spectre:1.02,phantom:.70,nightfall:1.10,cyberx:.91,interceptor:.91,vortex:.48,titan:1.20,nova:.86};
  function formation(drones,car,s,dt,shots){
    if(!car)return;
    const body=car.userData?.bodyCollider||car.userData?.collider;
    const bodyHx=body?.hx??body?.parts?.[0]?.hx??COLLIDER_HX[car.userData?.id]??(car.userData?.profile?.width||2)/2;
    const quarter=bodyHx+.75;
    const attackList=Array.isArray(shots)?shots:[];
    for(let i=0;i<drones.length;i++){
      const d=drones[i],side=i?1:-1,time=s.time||0;d.visible=true;
      const attack=attackList.find(t=>t.drone===d),advance=attack?Math.min(1,Math.max(0,attack.life/.26)):0;
      // Subordinate rear quarters: clear of the car's silhouette until a shot.
      const x=car.position.x+side*(quarter+.8*advance);
      const y=car.position.y+1.65+Math.sin(time*2.5+i)*.06;
      const z=car.position.z+1.5-1.5*advance;
      const lerp=1-Math.exp(-dt*15);d.position.x+=(x-d.position.x)*lerp;d.position.y+=(y-d.position.y)*lerp;d.position.z+=(z-d.position.z)*lerp;
      const target=attack?.target;
      const yaw=target?Math.atan2(d.position.x-target.position.x,d.position.z-target.position.z):car.rotation.y;
      let delta=((yaw-d.rotation.y+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;d.rotation.y+=delta*(1-Math.exp(-dt*14));d.rotation.z=Math.sin(time*2+i)*.025;
      for(const rotor of d.userData.rotors||[])rotor.rotation.z=time*32+i;
      if(d.userData.energyMaterial)d.userData.energyMaterial.emissiveIntensity=s.dronePower>0?1.8:1.1;
    }
  }
  root.NeonDrones={create,decorate,formation};
})(window);
