import {Canvas} from '@react-three/fiber';
import {useMemo} from 'react';
import * as THREE from 'three';
function Lines(){
 const lineGroups=useMemo(()=>{
  const groups:THREE.Vector3[][]=[];
  for(let row=0;row<=24;row++){
   const points:THREE.Vector3[]=[];
   for(let col=0;col<=72;col++){
    const x=(col/72-.5)*7,z=(row/24-.5)*3.4;
    const height=Math.exp(-((x-1.1)**2/3+(z+.12)**2/.75))*.94 + Math.exp(-((x+1.6)**2/.8+(z-.25)**2/.32))*.47;
    points.push(new THREE.Vector3(x,height,z));
   }
   groups.push(points);
  }
  return groups;
 },[]);
 return <group rotation={[-0.18,0,0]}>{lineGroups.map((points,i)=><primitive key={i} object={new THREE.Line(new THREE.BufferGeometry().setFromPoints(points),new THREE.LineBasicMaterial({color:i%3===0?'#98F46F':'#3FA981',transparent:true,opacity:.7}))}/>)}</group>;
}
export default function TerrainScene(){return <div className="terrain-canvas" role="img" aria-label="Relieve topográfico generativo, demostración Three.js"><Canvas camera={{position:[0,2.3,6],fov:52}} dpr={[1,1.5]} frameloop="demand" gl={{antialias:true,alpha:true}}><ambientLight intensity={.4}/><Lines/></Canvas></div>}