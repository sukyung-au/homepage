import React from 'react';
export function Footer({columns=[],note,legal,style}){
 return <footer style={{background:'var(--color-canvas-parchment)',color:'var(--color-ink-muted-80)',padding:'64px 22px',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:980,margin:'0 auto'}}>
   {note&&<p style={{fontSize:12,lineHeight:1.33,letterSpacing:'-0.12px',color:'var(--color-ink-muted-48)',margin:'0 0 24px',paddingBottom:16,borderBottom:'1px solid var(--color-hairline)'}}>{note}</p>}
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:24}}>
    {columns.map(c=><div key={c.title}><div style={{fontSize:14,fontWeight:600,lineHeight:1.29,letterSpacing:'-0.224px',color:'var(--color-ink)',marginBottom:6}}>{c.title}</div>{c.links.map(l=><div key={l} style={{fontSize:12,lineHeight:2.41,letterSpacing:'-0.12px'}}><a href="#" style={{color:'var(--color-ink-muted-80)',textDecoration:'none'}}>{l}</a></div>)}</div>)}
   </div>
   {legal&&<div style={{marginTop:32,paddingTop:16,borderTop:'1px solid var(--color-hairline)',fontSize:12,lineHeight:1,letterSpacing:'-0.12px',color:'var(--color-ink-muted-48)'}}>{legal}</div>}
  </div></footer>;
}
