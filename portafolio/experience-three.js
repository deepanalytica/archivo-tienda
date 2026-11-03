/* Deep UI System — Three.js optical model. Progressive, non-critical and GPU-limited. */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js';

export function mountThreeStudio(board,stage){
  const mount=stage.querySelector('#experience-three');
  if(!mount||!board||!stage)return;
  let renderer;
  try{
    renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
  }catch{
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  mount.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden','true');

  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(42,1,.1,70);
  camera.position.set(0,.15,7.1);
  const main=new THREE.Group();
  main.rotation.x=-.20;
  main.rotation.y=.16;
  scene.add(main);

  scene.add(new THREE.AmbientLight(0xcde3ff,1.1));
  const key=new THREE.DirectionalLight(0xe2f9ff,4.2);
  key.position.set(-3,4,6);scene.add(key);
  const rim=new THREE.PointLight(0x95b9ff,22,13);
  rim.position.set(3,-1,3);scene.add(rim);

  const coreMaterial=new THREE.MeshPhysicalMaterial({
    color:0x5979dd,roughness:.27,metalness:.35,
    emissive:0x1b3173,emissiveIntensity:.35,
    transparent:true,opacity:.84,flatShading:true
  });
  const core=new THREE.Mesh(new THREE.IcosahedronGeometry(.87,2),coreMaterial);
  main.add(core);
  const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.13,1),
    new THREE.MeshBasicMaterial({color:0xa6c5ff,wireframe:true,transparent:true,opacity:.27}));
  main.add(wire);

  for(let i=0;i<3;i++){
    const radius=2.12+i*.12;
    const ring=new THREE.Mesh(
      new THREE.TorusGeometry(radius,.007,3,160),
      new THREE.MeshBasicMaterial({color:i===0?0x729ec8:0x4e7397,transparent:true,opacity:i===0?.65:.36})
    );
    ring.rotation.x=[.49,1.14,.95][i];
    ring.rotation.y=[.16,-.44,.81][i];
    main.add(ring);
  }

  const positions=[
    new THREE.Vector3(-1.85,1.13,.42),
    new THREE.Vector3(1.74,1.09,-.33),
    new THREE.Vector3(1.83,-1.14,.56),
    new THREE.Vector3(-1.76,-1.22,-.35)
  ];
  const nodes=positions.map((position,i)=>{
    const group=new THREE.Group();
    group.position.copy(position);
    const halo=new THREE.Mesh(new THREE.SphereGeometry(.40,18,12),
      new THREE.MeshBasicMaterial({color:0x9cceff,transparent:true,opacity:.09,depthWrite:false}));
    const mat=new THREE.MeshPhysicalMaterial({color:0x7cacc8,metalness:.38,roughness:.22,
      emissive:0x243e68,emissiveIntensity:.28});
    const sphere=new THREE.Mesh(new THREE.IcosahedronGeometry(.265,2),mat);
    group.add(halo,sphere);
    main.add(group);
    return {group,sphere,halo,mat};
  });

  const pathVertices=[];
  for(let i=0;i<positions.length;i++){
    const a=positions[i],b=positions[(i+1)%positions.length];
    pathVertices.push(a.x,a.y,a.z,b.x,b.y,b.z);
  }
  const pathGeo=new THREE.BufferGeometry();
  pathGeo.setAttribute('position',new THREE.Float32BufferAttribute(pathVertices,3));
  main.add(new THREE.LineSegments(pathGeo,new THREE.LineBasicMaterial({
    color:0x86b8d4,transparent:true,opacity:.4})));

  const starCount=100;
  const starData=new Float32Array(starCount*3);
  // Deterministic points, not data from a business or a source.
  for(let i=0;i<starCount;i++){
    const a=i*2.3999632297, z=1-2*(i+.5)/starCount;
    const r=Math.sqrt(1-z*z),dist=2.55+(i%7)*.08;
    starData[i*3]=Math.cos(a)*r*dist;
    starData[i*3+1]=Math.sin(a)*r*dist;
    starData[i*3+2]=z*dist;
  }
  const starGeo=new THREE.BufferGeometry();
  starGeo.setAttribute('position',new THREE.BufferAttribute(starData,3));
  const stars=new THREE.Points(starGeo,new THREE.PointsMaterial({
    color:0x84b3de,size:.025,transparent:true,opacity:.45,sizeAttenuation:true
  }));
  main.add(stars);

  let targetStage=0;
  function updateStage(){
    targetStage=Math.max(0,Math.min(3,Number(board.dataset.stage)||0));
    nodes.forEach(({mat,halo},i)=>{
      const active=i===targetStage;
      mat.color.setHex(active?0xd8fa85:0x78a7c8);
      mat.emissive.setHex(active?0x5c7833:0x243e68);
      mat.emissiveIntensity=active?.65:.23;
      halo.material.color.setHex(active?0xd9ff93:0x9cceff);
      halo.material.opacity=active?.18:.06;
    });
  }
  const onStage=()=>updateStage();
  board.addEventListener('deepui:stagechange',onStage);
  updateStage();

  let width=0,height=0;
  function resize(){
    const w=mount.clientWidth,h=mount.clientHeight;
    if(!w||!h||w===width&&h===height)return;
    width=w;height=h;
    camera.aspect=w/h;camera.updateProjectionMatrix();
    renderer.setSize(w,h,false);
  }
  resize();
  const resizeObserver=typeof ResizeObserver!=='undefined'?new ResizeObserver(resize):null;
  resizeObserver?.observe(mount);
  window.addEventListener('resize',resize,{passive:true});

  let visible=false,frame=0,last=0,lastTime=0,alive=true;
  function draw(now){
    if(!alive||!visible||document.hidden)return;
    frame=requestAnimationFrame(draw);
    if(now-last<33)return; // <= 30 fps
    const dt=Math.min(.05,(now-(last||now))/1000);
    last=now;
    lastTime+=dt;
    resize();
    main.rotation.y+=dt*.09;
    main.rotation.x=-.20+Math.sin(lastTime*.35)*.04;
    core.rotation.y+=dt*.17;
    wire.rotation.z+=dt*.10;
    nodes.forEach(({group},i)=>{
      const active=i===targetStage;
      const scale=active?1.08+Math.sin(lastTime*1.6)*.08:1;
      group.scale.setScalar(scale);
    });
    renderer.render(scene,camera);
  }
  function start(){
    if(!alive||visible||document.hidden)return;
    visible=true;
    last=0;frame=requestAnimationFrame(draw);
  }
  function stop(){
    visible=false;
    if(frame)cancelAnimationFrame(frame);
    frame=0;
  }
  const intersection=new IntersectionObserver(entries=>{
    if(entries.some(e=>e.isIntersecting))start();
    else stop();
  },{threshold:.06});
  intersection.observe(stage);
  const onVisibility=()=>{if(document.hidden)stop();else if(stage.getBoundingClientRect().bottom>0&&stage.getBoundingClientRect().top<innerHeight)start();};
  document.addEventListener('visibilitychange',onVisibility);
  const onContextLoss=event=>{event.preventDefault();stop();stage.classList.remove('has-three');};
  renderer.domElement.addEventListener('webglcontextlost',onContextLoss);
  stage.classList.add('has-three');
  stage.dataset.visualEngine='threejs';

  function cleanup(){
    if(!alive)return;
    alive=false;stop();
    intersection.disconnect();resizeObserver?.disconnect();
    board.removeEventListener('deepui:stagechange',onStage);
    window.removeEventListener('resize',resize);
    document.removeEventListener('visibilitychange',onVisibility);
    renderer.domElement.removeEventListener('webglcontextlost',onContextLoss);
    core.geometry.dispose();coreMaterial.dispose();wire.geometry.dispose();wire.material.dispose();
    main.traverse(obj=>{
      if(obj!==core&&obj!==wire&&obj.geometry)obj.geometry.dispose();
      if(obj!==core&&obj!==wire&&obj.material){
        const materials=Array.isArray(obj.material)?obj.material:[obj.material];
        materials.forEach(m=>m.dispose());
      }
    });
    renderer.dispose();renderer.domElement.remove();stage.classList.remove('has-three');
  }
  window.addEventListener('pagehide',cleanup,{once:true});
  return cleanup;
}
