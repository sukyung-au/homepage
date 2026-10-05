import React from 'react';
export function StageNav({stages=[],current=0,onSelect,cta='Explore the Journey',onCta,position='fixed',windowSize=5,style}){
 const box=React.useRef(null);const [ws,setWs]=React.useState(windowSize);
 React.useEffect(()=>{const el=box.current;if(!el)return;const ro=new ResizeObserver(()=>{const w=el.clientWidth;setWs(Math.max(1,Math.min(windowSize,Math.floor(w/150))));});ro.observe(el);return()=>ro.disconnect();},[windowSize]);
 const cur=stages[current]||{};const n=stages.length;let start=Math.max(0,Math.min(current-(ws>2?1:0),n-ws));const vis=stages.slice(start,start+ws);
 return <nav aria-label="Development stages" style={{position,left:0,right:0,bottom:position==='fixed'?16:undefined,zIndex:30,padding:'0 var(--gutter-page)',pointerEvents:'none',...style}}>
  <div style={{pointerEvents:'auto',maxWidth:1360,margin:'0 auto',height:'var(--stage-nav-h)',background:'rgba(255,255,255,0.92)',backdropFilter:'saturate(180%) blur(20px)',WebkitBackdropFilter:'saturate(180%) blur(20px)',border:'1px solid var(--ex-line)',borderRadius:20,boxShadow:'var(--shadow-float)',display:'flex',alignItems:'center',gap:28,padding:'0 24px',fontFamily:'var(--font-editorial)',color:'var(--ex-navy)'}}>
   <div style={{display:'flex',alignItems:'center',gap:14,flex:'none',minWidth:220}}>
    <span style={{width:36,height:36,borderRadius:'50%',background:'var(--ex-blue)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><span style={{width:8,height:8,borderRadius:'50%',background:'#fff'}}></span></span>
    <div style={{display:'flex',flexDirection:'column',gap:3}}><span style={{fontSize:11,color:'var(--ex-faint)',letterSpacing:'0.02em'}}>Current Stage</span><span style={{fontSize:15,fontWeight:600,letterSpacing:'0.04em',textTransform:'uppercase',color:'var(--ex-blue)',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:6}}><span style={{fontVariantNumeric:'tabular-nums'}}>{cur.num}</span>{cur.label}<i className="icon-arrow-right" style={{fontSize:14}}></i></span></div>
   </div>
   <span style={{width:1,height:36,background:'var(--ex-line)',flex:'none'}}></span>
   <div ref={box} style={{flex:1,minWidth:0,display:'grid',gridTemplateColumns:'repeat('+vis.length+',minmax(0,1fr))',gap:16,overflow:'hidden'}}>
    {vis.map(s=>{const i=stages.indexOf(s),on=i===current,past=i<current;return <button key={s.id} onClick={()=>onSelect&&onSelect(i)} style={{all:'unset',cursor:'pointer',display:'flex',flexDirection:'column',gap:4,paddingTop:10,borderTop:'2px solid '+(on?'var(--ex-blue)':past?'rgba(10,92,219,0.35)':'var(--ex-line)'),minWidth:0}}>
     <span style={{fontSize:11,fontVariantNumeric:'tabular-nums',color:on?'var(--ex-blue)':'var(--ex-faint)'}}>{s.num}</span>
     <span style={{fontSize:13,fontWeight:on?600:400,color:on?'var(--ex-blue)':'var(--ex-navy)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.label}</span></button>;})}
   </div>
   <div style={{display:'flex',alignItems:'center',gap:20,flex:'none'}}>
    <div style={{display:'flex',gap:6,alignItems:'center'}} aria-hidden="true">{stages.map((s,i)=><span key={s.id} style={{width:i===current?18:6,height:6,borderRadius:3,background:i<=current?'var(--ex-blue)':'var(--ex-line-strong)',opacity:i<current?0.45:1}}></span>)}</div>
    <a onClick={onCta} style={{fontSize:13,fontWeight:600,color:'var(--ex-navy)',cursor:'pointer',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:6,textDecoration:'none'}}>{cta}<i className="icon-arrow-right" style={{fontSize:14}}></i></a>
   </div>
  </div></nav>;
}
