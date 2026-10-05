import React from 'react';
export function DepthRuler({marks=['0 m','1,000','2,000','3,000 m'],tone='light',label='Depth',style}){
 const c=tone==='dark'?'rgba(255,255,255,0.85)':'var(--ex-navy)';
 return <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'100%',gap:10,fontFamily:'var(--font-editorial)',color:c,...style}}>
  <span style={{fontSize:10,letterSpacing:'0.16em',textTransform:'uppercase',writingMode:'vertical-rl'}}>{label}</span>
  <div style={{position:'relative',flex:1,width:24,display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
   <span style={{position:'absolute',top:0,bottom:0,left:'50%',width:1,background:c,opacity:0.5}}></span>
   {marks.map(m=><span key={m} style={{position:'relative',display:'flex',alignItems:'center',gap:6}}><span style={{width:9,height:1,background:c}}></span><span style={{position:'absolute',left:14,fontSize:10,whiteSpace:'nowrap',fontVariantNumeric:'tabular-nums'}}>{m}</span></span>)}
  </div>
  <span style={{width:9,height:9,borderRadius:'50%',border:'1px solid '+c}}></span>
 </div>;
}
