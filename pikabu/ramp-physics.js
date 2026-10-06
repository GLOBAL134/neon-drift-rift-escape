/* Ramp contact is measured at the car's front bumper, not the row centre. */
(function(root,factory){
  const api=factory();
  if(typeof module!=='undefined' && module.exports)module.exports=api;
  if(root)root.NeonRamp=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const frontOffset=5; // 2.2m bonnet + 2.8m leading ramp deck in world Z.
  function launchAtFrontContact(state,previousDistance,nextDistance,onLaunch){
    let count=0;
    for(const row of state.rows?.values()||[]){
      const previousFront=previousDistance+frontOffset,nextFront=nextDistance+frontOffset;
      const crossed=previousFront<row.distance&&nextFront>=row.distance;
      const onDeck=nextFront>=row.distance-.65&&nextFront<=row.distance+4;
      if(!crossed&&!onDeck)continue;
      row.objects.forEach((object,index)=>{
        if(object.type!=='ramp'||object.launched||Math.abs(state.x-object.x)>2.05||
          (globalThis.NeonUpperRoute&&!globalThis.NeonUpperRoute.activeFor(state,object)))return;
        object.launched=true;
        count++;
        onLaunch(row,object,index);
      });
    }
    return count;
  }
  function jumpHeight(remaining,duration){
    if(remaining<=0||duration<=0)return 0;
    const progress=1-Math.min(1,remaining/duration);
    return Math.sin(Math.PI*progress)*3.1;
  }
  return {frontOffset,launchAtFrontContact,jumpHeight};
});
