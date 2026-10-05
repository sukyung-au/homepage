import React from 'react';
export function OptionChip({label,detail,selected=false,thumb,onClick,style}){
 return <button onClick={onClick} style={{background:'var(--color-canvas)',color:'var(--color-ink)',border:selected?'2px solid var(--color-primary-focus)':'1px solid var(--color-hairline)',borderRadius:'var(--radius-pill)',padding:selected?'11px 15px':'12px 16px',display:'inline-flex',alignItems:'center',gap:10,fontFamily:'var(--font-text)',fontSize:14,lineHeight:1.43,letterSpacing:'-0.224px',cursor:'pointer',textAlign:'left',...style}}>
  {thumb&&<span style={{width:24,height:24,borderRadius:'50%',background:thumb,flex:'none'}}></span>}
  <span style={{flex:1}}>{label}</span>{detail&&<span style={{color:'var(--color-ink-muted-48)'}}>{detail}</span>}
 </button>;
}
