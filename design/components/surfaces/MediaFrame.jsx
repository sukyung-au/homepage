import React from 'react';
export function MediaFrame({src,alt='',label='Image',ratio='16/9',radius=0,shadow=false,tone='light',fit='cover',style}){
 const dark=tone==='dark';
 return <div style={{aspectRatio:ratio,width:'100%',borderRadius:radius,overflow:'hidden',boxShadow:shadow?'var(--shadow-product)':'none',background:dark?'#3a3a3c':'#e8e8ed',display:'flex',alignItems:'center',justifyContent:'center',...style}}>
  {src?<img src={src} alt={alt} style={{width:'100%',height:'100%',objectFit:fit,display:'block'}}/>:<span style={{fontSize:12,letterSpacing:'-0.12px',color:dark?'#a1a1a6':'var(--color-ink-muted-48)',fontFamily:'var(--font-text)'}}>{label}</span>}
 </div>;
}
