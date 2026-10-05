import React from 'react';
export function QuoteCard({src,label='Landscape photograph',kicker,title,body,action,style}){
 return <section style={{position:'relative',background:'var(--color-surface-tile-1)',color:'var(--color-on-dark)',padding:'var(--space-section) 22px',textAlign:'center',minHeight:520,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',fontFamily:'var(--font-text)',...style}}>
  {src?<img src={src} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>:<span style={{position:'absolute',left:16,bottom:12,fontSize:12,color:'#86868b'}}>{label}</span>}
  <div style={{position:'relative',maxWidth:760}}>
   {kicker&&<div style={{fontSize:14,fontWeight:600,letterSpacing:'-0.224px',marginBottom:16,color:'var(--color-body-muted)'}}>{kicker}</div>}
   <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:40,fontWeight:600,lineHeight:1.1,textWrap:'balance'}}>{title}</h2>
   {body&&<p style={{margin:'16px auto 0',fontSize:24,fontWeight:300,lineHeight:1.5,maxWidth:640,color:'var(--color-body-muted)'}}>{body}</p>}
   {action&&<div style={{marginTop:32}}>{action}</div>}
  </div></section>;
}
