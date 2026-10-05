import React from 'react';
const tones={light:'var(--color-canvas)',parchment:'var(--color-canvas-parchment)',dark:'var(--color-surface-tile-1)','dark-2':'var(--color-surface-tile-2)','dark-3':'var(--color-surface-tile-3)',black:'var(--color-surface-black)'};
export function ProductTile({tone='light',eyebrow,title,tagline,actions,children,hero=false,style}){
 const dark=tone.startsWith('dark')||tone==='black';
 return <section style={{background:tones[tone],color:dark?'var(--color-on-dark)':'var(--color-ink)',padding:'var(--space-section) 22px 0',textAlign:'center',overflow:'hidden',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:980,margin:'0 auto'}}>
   {eyebrow&&<div style={{fontSize:21,fontWeight:600,letterSpacing:'0.231px',lineHeight:1.19,marginBottom:8,color:dark?'var(--color-body-muted)':'var(--color-ink)'}}>{eyebrow}</div>}
   <h2 style={{margin:0,fontFamily:'var(--font-display)',fontWeight:600,fontSize:hero?56:40,lineHeight:hero?1.07:1.1,letterSpacing:hero?'-0.28px':0,textWrap:'balance'}}>{title}</h2>
   {tagline&&<p style={{margin:'6px 0 0',fontSize:28,fontWeight:400,lineHeight:1.14,letterSpacing:'0.196px',textWrap:'balance'}}>{tagline}</p>}
   {actions&&<div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap',marginTop:24}}>{actions}</div>}
  </div>
  <div style={{maxWidth:1200,margin:'0 auto',paddingTop:children?48:0,paddingBottom:children?0:'var(--space-section)'}}>{children}</div>
 </section>;
}
