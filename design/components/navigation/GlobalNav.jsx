import React from 'react';
export function GlobalNav({brand='Oil & Gas Development',links=[],active,onNavigate,style}){
 const ls={color:'var(--color-on-dark)',opacity:0.8,fontSize:12,letterSpacing:'-0.12px',lineHeight:1,textDecoration:'none',cursor:'pointer',whiteSpace:'nowrap'};
 return <nav style={{background:'var(--color-surface-black)',height:'var(--nav-global-h)',color:'var(--color-on-dark)',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:1024,margin:'0 auto',height:'100%',padding:'0 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
   <a onClick={()=>onNavigate&&onNavigate('home')} style={{...ls,opacity:1,fontWeight:600,fontSize:13}}>{brand}</a>
   <div style={{display:'flex',gap:20,alignItems:'center',overflow:'hidden'}}>{links.map(l=><a key={l.id||l.label} onClick={()=>onNavigate&&onNavigate(l.id)} style={{...ls,opacity:active===l.id?1:0.8}}>{l.label}</a>)}</div>
   <div style={{display:'flex',gap:20,alignItems:'center'}}><i className="icon-search" style={{fontSize:15,opacity:0.8}}></i><i className="icon-globe" style={{fontSize:15,opacity:0.8}}></i></div>
  </div></nav>;
}
