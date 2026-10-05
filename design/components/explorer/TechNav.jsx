import React from 'react';
export function TechNav({categories=[],topic,onNavigate,position='fixed',defaultOpen=false,label='Technology',style}){
 const flat=[];categories.forEach((c,ci)=>c.topics.forEach(t=>flat.push({...t,ci})));
 const fi=Math.max(0,flat.findIndex(t=>t.id===topic));const curT=flat[fi]||{};const current=curT.ci||0;const cat=categories[current]||{topics:[]};
 const prev=flat[fi-1],next=flat[fi+1];
 const [open,setOpen]=React.useState(defaultOpen);const [view,setView]=React.useState(current);
 const vc=categories[view]||cat;const ti=cat.topics.findIndex(t=>t.id===topic);
 const go=t=>t&&onNavigate&&onNavigate(t);
 const circle=(on)=>({all:'unset',cursor:on?'pointer':'default',width:36,height:36,borderRadius:'50%',display:'inline-flex',alignItems:'center',justifyContent:'center',flex:'none',border:'1px solid var(--ex-line)',color:on?'var(--ex-navy)':'var(--ex-line-strong)',fontSize:15});
 const shell={background:'rgba(255,255,255,0.94)',backdropFilter:'saturate(180%) blur(20px)',WebkitBackdropFilter:'saturate(180%) blur(20px)',border:'1px solid var(--ex-line)',borderRadius:20,boxShadow:'var(--shadow-float)',fontFamily:'var(--font-editorial)',color:'var(--ex-navy)'};
 return <nav aria-label="Technology categories" style={{position,left:0,right:0,bottom:position==='fixed'?16:undefined,zIndex:30,padding:'0 var(--gutter-page)',pointerEvents:'none',...style}}>
  <div style={{position:'relative',maxWidth:1360,margin:'0 auto',pointerEvents:'auto'}}>
   {open&&<div style={{...shell,position:position==='fixed'?'absolute':'relative',left:0,right:0,bottom:position==='fixed'?'calc(100% + 10px)':undefined,marginBottom:position==='fixed'?0:10,padding:'28px 32px 24px'}}>
    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:32,flexWrap:'wrap',paddingBottom:20,borderBottom:'1px solid var(--ex-line)'}}>
     <div style={{display:'flex',flexDirection:'column',gap:8,minWidth:0}}>
      <span style={{fontSize:11,fontWeight:600,letterSpacing:'0.16em',textTransform:'uppercase',color:'var(--ex-faint)'}}>{label} · {vc.num} / {String(categories.length).padStart(2,'0')}</span>
      <span style={{fontSize:28,fontWeight:300,letterSpacing:'-0.02em',lineHeight:1.05}}>{vc.label}</span>
      {vc.kr&&<span style={{fontFamily:'var(--font-kr)',fontSize:14,color:'var(--ex-muted)',lineHeight:1.6}}>{vc.kr}</span>}
     </div>
     <div style={{display:'flex',alignItems:'center',gap:16}}><span style={{fontSize:13,color:'var(--ex-muted)',fontVariantNumeric:'tabular-nums'}}>{vc.topics.length} topics</span><button aria-label="Close" onClick={()=>setOpen(false)} style={circle(true)}><i className="icon-x"></i></button></div>
    </div>
    <ol style={{listStyle:'none',margin:0,padding:0,display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',columnGap:32,maxHeight:'42vh',overflowY:'auto'}}>
     {vc.topics.map(t=>{const on=t.id===topic;return <li key={t.id} style={{borderBottom:'1px solid var(--ex-line)'}}><a onClick={()=>go(t)} style={{display:'grid',gridTemplateColumns:'44px 1fr auto',gap:12,alignItems:'baseline',padding:'16px 0',cursor:'pointer',textDecoration:'none',color:'inherit'}}>
      <span style={{fontSize:12,fontVariantNumeric:'tabular-nums',color:on?'var(--ex-blue)':'var(--ex-faint)'}}>{t.num}</span>
      <span style={{fontSize:15,fontWeight:on?600:400,lineHeight:1.35,color:on?'var(--ex-blue)':'var(--ex-navy)'}}>{t.title}</span>
      {on?<span style={{fontSize:11,fontWeight:600,color:'var(--ex-blue)',background:'var(--ex-tint)',borderRadius:999,padding:'3px 9px',whiteSpace:'nowrap'}}>Reading</span>:<span style={{fontSize:12,color:'var(--ex-faint)',whiteSpace:'nowrap'}}>{t.read}</span>}</a></li>;})}
    </ol>
   </div>}
   <div style={{...shell,height:'var(--stage-nav-h)',display:'flex',alignItems:'center',gap:28,padding:'0 24px'}}>
    <div style={{display:'flex',alignItems:'center',gap:14,flex:'none',minWidth:230}}>
     <span style={{width:36,height:36,borderRadius:'50%',background:'var(--ex-blue)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><span style={{width:8,height:8,borderRadius:'50%',background:'#fff'}}></span></span>
     <div style={{display:'flex',flexDirection:'column',gap:3,minWidth:0}}><span style={{fontSize:11,color:'var(--ex-faint)',letterSpacing:'0.02em',whiteSpace:'nowrap'}}>{label} · Topic {curT.num} of {cat.topics.length}</span><span style={{fontSize:15,fontWeight:600,letterSpacing:'0.04em',textTransform:'uppercase',color:'var(--ex-blue)',whiteSpace:'nowrap',display:'flex',gap:6}}><span style={{fontVariantNumeric:'tabular-nums'}}>{cat.num}</span>{cat.label}</span></div>
    </div>
    <span style={{width:1,height:36,background:'var(--ex-line)',flex:'none'}}></span>
    <div style={{flex:1,minWidth:0,display:'grid',gridTemplateColumns:'repeat('+categories.length+',minmax(0,1fr))',gap:16}}>
     {categories.map((c,i)=>{const on=i===current,viewing=open&&i===view&&!on;return <button key={c.id} onClick={()=>{setView(i);setOpen(o=>!(o&&view===i));}} aria-current={on?'page':undefined} style={{all:'unset',cursor:'pointer',display:'flex',flexDirection:'column',gap:4,paddingTop:10,borderTop:'2px solid '+(on?'var(--ex-blue)':viewing?'var(--ex-navy)':'var(--ex-line)'),minWidth:0}}>
      <span style={{fontSize:11,fontVariantNumeric:'tabular-nums',color:on?'var(--ex-blue)':'var(--ex-faint)',whiteSpace:'nowrap'}}>{c.num} <span style={{marginLeft:4}}>{c.topics.length} topics</span></span>
      <span style={{fontSize:13,fontWeight:on||viewing?600:400,color:on?'var(--ex-blue)':'var(--ex-navy)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.label}</span></button>;})}
    </div>
    <div style={{display:'flex',alignItems:'center',gap:10,flex:'none'}}>
     <button aria-label={prev?'Previous topic: '+prev.title:'No previous topic'} title={prev&&prev.num+' '+prev.title} onClick={()=>go(prev)} style={circle(!!prev)}><i className="icon-arrow-left"></i></button>
     <button aria-label={next?'Next topic: '+next.title:'No next topic'} title={next&&next.num+' '+next.title} onClick={()=>go(next)} style={{...circle(!!next),background:next?'var(--ex-navy)':'transparent',borderColor:next?'var(--ex-navy)':'var(--ex-line)',color:next?'#fff':'var(--ex-line-strong)'}}><i className="icon-arrow-right"></i></button>
     <button onClick={()=>{setView(current);setOpen(o=>!(o&&view===current));}} aria-expanded={open} style={{all:'unset',cursor:'pointer',marginLeft:10,fontSize:13,fontWeight:600,display:'flex',alignItems:'center',gap:6,whiteSpace:'nowrap'}}>All topics<i className={open?'icon-chevron-down':'icon-chevron-up'} style={{fontSize:14}}></i></button>
    </div>
   </div>
  </div></nav>;
}
