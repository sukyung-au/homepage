import React from 'react';
export function SiteHeader({links=[],active,onNavigate,tone='light',position='absolute',style}){
 const dark=tone==='dark',ink=dark?'#fff':'var(--ex-navy)';
 return <header style={{position,top:0,left:0,right:0,zIndex:20,height:72,padding:'0 var(--gutter-page)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,fontFamily:'var(--font-editorial)',color:ink,...style}}>
  <a onClick={()=>onNavigate&&onNavigate('home')} style={{cursor:'pointer',display:'flex',gap:6,alignItems:'baseline',fontSize:14,letterSpacing:'0.08em',textTransform:'uppercase',color:ink,textDecoration:'none',whiteSpace:'nowrap'}}><b style={{fontWeight:700}}>Oil &amp; Gas</b><span style={{fontWeight:300}}>Development</span></a>
  <nav style={{display:'flex',gap:32,alignItems:'center'}}>{links.map(l=><a key={l.id} onClick={()=>onNavigate&&onNavigate(l.id)} style={{fontSize:13,cursor:'pointer',color:active===l.id?(dark?'#4DA3FF':'var(--ex-blue)'):ink,fontWeight:active===l.id?600:400,textDecoration:'none',whiteSpace:'nowrap'}}>{l.label}</a>)}</nav>
  <div style={{display:'flex',gap:20,alignItems:'center',fontSize:12}}><i className="icon-search" style={{fontSize:16}}></i><span style={{letterSpacing:'0.06em',whiteSpace:'nowrap'}}><b style={{fontWeight:600}}>KR</b> <span style={{opacity:0.5}}>/ EN</span></span></div>
 </header>;
}
