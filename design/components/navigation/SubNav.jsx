import React from 'react';
import { Button } from '../buttons/Button.jsx';
export function SubNav({title,links=[],active,onNavigate,cta,onCta,style}){
 return <div style={{position:'sticky',top:0,zIndex:10,height:'var(--nav-sub-h)',background:'var(--color-surface-frosted)',backdropFilter:'var(--blur-frosted)',WebkitBackdropFilter:'var(--blur-frosted)',borderBottom:'1px solid var(--color-hairline-a)',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:1024,margin:'0 auto',height:'100%',padding:'0 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
   <span style={{fontFamily:'var(--font-display)',fontSize:21,fontWeight:600,letterSpacing:'0.231px',lineHeight:1.19,color:'var(--color-ink)',whiteSpace:'nowrap'}}>{title}</span>
   <div style={{display:'flex',alignItems:'center',gap:24}}>
    {links.map(l=><a key={l.id||l.label} onClick={()=>onNavigate&&onNavigate(l.id)} style={{fontSize:12,letterSpacing:'-0.12px',color:active===l.id?'var(--color-ink-muted-48)':'var(--color-ink)',cursor:'pointer',whiteSpace:'nowrap',textDecoration:'none'}}>{l.label}</a>)}
    {cta&&<Button onClick={onCta} style={{padding:'4px 11px',fontSize:12,letterSpacing:'-0.12px',lineHeight:1.33}}>{cta}</Button>}
   </div></div></div>;
}
