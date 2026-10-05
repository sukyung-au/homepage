import React from 'react';
import { Button } from '../buttons/Button.jsx';
export function StickyBar({label,value,cta='Continue',onCta,position='fixed',style}){
 return <div style={{position,left:0,right:0,bottom:0,zIndex:20,height:'var(--sticky-bar-h)',background:'var(--color-surface-frosted)',backdropFilter:'var(--blur-frosted)',WebkitBackdropFilter:'var(--blur-frosted)',borderTop:'1px solid var(--color-hairline-a)',padding:'12px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,fontFamily:'var(--font-text)',...style}}>
  <div style={{fontSize:17,letterSpacing:'-0.374px',color:'var(--color-ink)'}}>{label&&<span style={{color:'var(--color-ink-muted-48)',marginRight:8}}>{label}</span>}{value}</div>
  <Button onClick={onCta}>{cta}</Button></div>;
}
