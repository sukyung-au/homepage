import React from 'react';
import { MediaFrame } from '../surfaces/MediaFrame.jsx';
export function UtilityCard({src,imageLabel='Image',ratio='1/1',eyebrow,title,meta,link,href='#',onClick,style}){
 return <div onClick={onClick} style={{background:'var(--color-canvas)',border:'1px solid var(--color-hairline)',borderRadius:'var(--radius-lg)',padding:'var(--space-lg)',display:'flex',flexDirection:'column',gap:16,fontFamily:'var(--font-text)',cursor:onClick?'pointer':'default',...style}}>
  <MediaFrame src={src} label={imageLabel} ratio={ratio} radius={8}/>
  <div style={{display:'flex',flexDirection:'column',gap:2}}>
   {eyebrow&&<div style={{fontSize:12,letterSpacing:'-0.12px',color:'var(--color-ink-muted-48)',marginBottom:4}}>{eyebrow}</div>}
   <div style={{fontSize:17,fontWeight:600,lineHeight:1.24,letterSpacing:'-0.374px',color:'var(--color-ink)'}}>{title}</div>
   {meta&&<div style={{fontSize:17,lineHeight:1.47,letterSpacing:'-0.374px',color:'var(--color-ink)'}}>{meta}</div>}
   {link&&<a href={href} style={{fontSize:14,letterSpacing:'-0.224px',color:'var(--color-primary)',marginTop:8,textDecoration:'none'}}>{link} <i className="icon-chevron-right" style={{fontSize:11}}></i></a>}
  </div></div>;
}
