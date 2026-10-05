import React from 'react';
export function ArrowCTA({children='Explore the Journey',onClick,href,tone='navy',direction='right',style}){
 const [p,setP]=React.useState(false);const bg=tone==='blue'?'var(--ex-blue)':tone==='white'?'#fff':'var(--ex-navy)';const fg=tone==='white'?'var(--ex-navy)':'#fff';const lbl=tone==='white'?'#fff':'var(--ex-navy)';
 const Tag=href?'a':'button';
 return <Tag href={href} onClick={onClick} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)} onMouseLeave={()=>setP(false)} style={{all:'unset',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:16,fontFamily:'var(--font-editorial)',fontSize:14,fontWeight:600,color:lbl,transform:p?'scale(0.97)':'none',transition:'transform 200ms',...style}}>
  <span style={{width:48,height:48,borderRadius:'50%',background:bg,color:fg,display:'inline-flex',alignItems:'center',justifyContent:'center',flex:'none'}}><i className={'icon-arrow-'+direction} style={{fontSize:18}}></i></span>{children}</Tag>;
}
