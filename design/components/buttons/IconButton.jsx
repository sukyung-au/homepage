import React from 'react';
function usePress(){const [p,setP]=React.useState(false);return [p,{onMouseDown:()=>setP(true),onMouseUp:()=>setP(false),onMouseLeave:()=>setP(false),onTouchStart:()=>setP(true),onTouchEnd:()=>setP(false)}];}
export function IconButton({icon='x',label,size=44,onDark=false,onClick,style}){
 const [p,h]=usePress();
 return <button aria-label={label||icon} onClick={onClick} {...h} style={{width:size,height:size,borderRadius:'var(--radius-full)',border:'none',background:onDark?'rgba(66,66,69,0.72)':'var(--color-surface-chip-translucent-a)',color:onDark?'var(--color-on-dark)':'var(--color-ink)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',backdropFilter:'var(--blur-frosted)',WebkitBackdropFilter:'var(--blur-frosted)',transform:p?'var(--press-scale)':'none',transition:'transform var(--dur-fast) var(--ease-standard)',fontSize:Math.round(size*0.41),...style}}><i className={'icon-'+icon} aria-hidden="true"></i></button>;
}
