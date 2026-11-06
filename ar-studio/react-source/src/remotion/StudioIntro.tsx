import {AbsoluteFill,interpolate,spring,useCurrentFrame,useVideoConfig} from 'remotion';
export const StudioIntro=()=>{
 const frame=useCurrentFrame(),{fps}=useVideoConfig();
 const opacity=interpolate(frame,[0,10,90,110],[0,1,1,0],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
 const scale=spring({frame,fps,config:{damping:20,stiffness:65,mass:1}});
 return <AbsoluteFill style={{background:'linear-gradient(135deg,#103E30,#193E35 55%,#5B9478)',color:'#F7FFF6',fontFamily:'DM Sans, sans-serif',justifyContent:'center',padding:96}}>
  <div style={{opacity,transform:`translateY(${(1-scale)*55}px)`}}><div style={{fontSize:26,letterSpacing:8,fontFamily:'monospace'}}>AR / STUDIO</div><div style={{fontSize:108,fontWeight:800,letterSpacing:-7,lineHeight:1.05,marginTop:34}}>Ideas que<br/>funcionan<span style={{color:'#B8FC66'}}>.</span></div><div style={{fontSize:25,marginTop:38,opacity:.7}}>Diseño · Datos · Tecnología · Comunicación</div></div>
  <div style={{position:'absolute',right:80,bottom:65,fontFamily:'monospace',opacity:.6}}>DESIGN SYSTEM / 2026</div>
 </AbsoluteFill>;
};