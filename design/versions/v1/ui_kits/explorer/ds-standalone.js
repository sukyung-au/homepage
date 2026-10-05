(function(){
// buttons/Button

function usePress(){const [p,setP]=React.useState(false);return [p,{onMouseDown:()=>setP(true),onMouseUp:()=>setP(false),onMouseLeave:()=>setP(false),onTouchStart:()=>setP(true),onTouchEnd:()=>setP(false)}];}
const base={fontFamily:'var(--font-text)',border:'none',cursor:'pointer',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,whiteSpace:'nowrap',transition:'transform var(--dur-fast) var(--ease-standard)',textDecoration:'none'};
const variants={
 primary:{background:'var(--color-primary)',color:'var(--color-on-primary)',borderRadius:'var(--radius-pill)',padding:'11px 22px',fontSize:17,fontWeight:400,lineHeight:1.18,letterSpacing:'-0.374px'},
 secondary:{background:'transparent',color:'var(--color-primary)',border:'1px solid var(--color-primary)',borderRadius:'var(--radius-pill)',padding:'10px 21px',fontSize:17,fontWeight:400,lineHeight:1.18,letterSpacing:'-0.374px'},
 'dark-utility':{background:'var(--color-ink)',color:'var(--color-on-dark)',borderRadius:'var(--radius-sm)',padding:'8px 15px',fontSize:14,fontWeight:400,lineHeight:1.29,letterSpacing:'-0.224px'},
 pearl:{background:'var(--color-surface-pearl)',color:'var(--color-ink-muted-80)',border:'3px solid var(--color-divider-soft)',borderRadius:'var(--radius-md)',padding:'8px 14px',fontSize:14,fontWeight:400,lineHeight:1.29,letterSpacing:'-0.224px'},
 'store-hero':{background:'var(--color-primary)',color:'var(--color-on-primary)',borderRadius:'var(--radius-pill)',padding:'14px 28px',fontSize:18,fontWeight:300,lineHeight:1},
};
function Button({variant='primary',onDark=false,disabled=false,href,children,style,onClick,type='button',...rest}){
 const [pressed,h]=usePress();const [focus,setFocus]=React.useState(false);
 const v={...variants[variant]};
 if(variant==='secondary'&&onDark){v.color='var(--color-primary-on-dark)';v.borderColor='var(--color-primary-on-dark)';}
 const s={...base,...v,transform:pressed&&!disabled?'var(--press-scale)':'none',outline:focus?'2px solid var(--color-primary-focus)':'none',outlineOffset:2,...(disabled?{opacity:1,cursor:'default',color:'var(--color-ink-muted-48)',background:variant==='secondary'?'transparent':'var(--color-divider-soft)',borderColor:'var(--color-hairline)'}:{}),...style};
 const props={...h,onFocus:()=>setFocus(true),onBlur:()=>setFocus(false),style:s,onClick:disabled?undefined:onClick,...rest};
 return href&&!disabled?<a href={href} {...props}>{children}</a>:<button type={type} disabled={disabled} {...props}>{children}</button>;
}

// buttons/IconButton

function IconButton({icon='x',label,size=44,onDark=false,onClick,style}){
 const [p,h]=usePress();
 return <button aria-label={label||icon} onClick={onClick} {...h} style={{width:size,height:size,borderRadius:'var(--radius-full)',border:'none',background:onDark?'rgba(66,66,69,0.72)':'var(--color-surface-chip-translucent-a)',color:onDark?'var(--color-on-dark)':'var(--color-ink)',display:'inline-flex',alignItems:'center',justifyContent:'center',cursor:'pointer',backdropFilter:'var(--blur-frosted)',WebkitBackdropFilter:'var(--blur-frosted)',transform:p?'var(--press-scale)':'none',transition:'transform var(--dur-fast) var(--ease-standard)',fontSize:Math.round(size*0.41),...style}}><i className={'icon-'+icon} aria-hidden="true"></i></button>;
}

// buttons/TextLink

function TextLink({href='#',onDark=false,chevron=false,underline=false,children,style,onClick}){
 return <a href={href} onClick={onClick} style={{color:onDark?'var(--color-primary-on-dark)':'var(--color-primary)',textDecoration:underline?'underline':'none',display:'inline-flex',alignItems:'center',gap:2,...style}}>{children}{chevron&&<i className="icon-chevron-right" aria-hidden="true" style={{fontSize:'0.85em'}}></i>}</a>;
}

// navigation/GlobalNav

function GlobalNav({brand='Oil & Gas Development',links=[],active,onNavigate,style}){
 const ls={color:'var(--color-on-dark)',opacity:0.8,fontSize:12,letterSpacing:'-0.12px',lineHeight:1,textDecoration:'none',cursor:'pointer',whiteSpace:'nowrap'};
 return <nav style={{background:'var(--color-surface-black)',height:'var(--nav-global-h)',color:'var(--color-on-dark)',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:1024,margin:'0 auto',height:'100%',padding:'0 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20}}>
   <a onClick={()=>onNavigate&&onNavigate('home')} style={{...ls,opacity:1,fontWeight:600,fontSize:13}}>{brand}</a>
   <div style={{display:'flex',gap:20,alignItems:'center',overflow:'hidden'}}>{links.map(l=><a key={l.id||l.label} onClick={()=>onNavigate&&onNavigate(l.id)} style={{...ls,opacity:active===l.id?1:0.8}}>{l.label}</a>)}</div>
   <div style={{display:'flex',gap:20,alignItems:'center'}}><i className="icon-search" style={{fontSize:15,opacity:0.8}}></i><i className="icon-globe" style={{fontSize:15,opacity:0.8}}></i></div>
  </div></nav>;
}

// navigation/SubNav


function SubNav({title,links=[],active,onNavigate,cta,onCta,style}){
 return <div style={{position:'sticky',top:0,zIndex:10,height:'var(--nav-sub-h)',background:'var(--color-surface-frosted)',backdropFilter:'var(--blur-frosted)',WebkitBackdropFilter:'var(--blur-frosted)',borderBottom:'1px solid var(--color-hairline-a)',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:1024,margin:'0 auto',height:'100%',padding:'0 22px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24}}>
   <span style={{fontFamily:'var(--font-display)',fontSize:21,fontWeight:600,letterSpacing:'0.231px',lineHeight:1.19,color:'var(--color-ink)',whiteSpace:'nowrap'}}>{title}</span>
   <div style={{display:'flex',alignItems:'center',gap:24}}>
    {links.map(l=><a key={l.id||l.label} onClick={()=>onNavigate&&onNavigate(l.id)} style={{fontSize:12,letterSpacing:'-0.12px',color:active===l.id?'var(--color-ink-muted-48)':'var(--color-ink)',cursor:'pointer',whiteSpace:'nowrap',textDecoration:'none'}}>{l.label}</a>)}
    {cta&&<Button onClick={onCta} style={{padding:'4px 11px',fontSize:12,letterSpacing:'-0.12px',lineHeight:1.33}}>{cta}</Button>}
   </div></div></div>;
}

// surfaces/MediaFrame

function MediaFrame({src,alt='',label='Image',ratio='16/9',radius=0,shadow=false,tone='light',fit='cover',style}){
 const dark=tone==='dark';
 return <div style={{aspectRatio:ratio,width:'100%',borderRadius:radius,overflow:'hidden',boxShadow:shadow?'var(--shadow-product)':'none',background:dark?'#3a3a3c':'#e8e8ed',display:'flex',alignItems:'center',justifyContent:'center',...style}}>
  {src?<img src={src} alt={alt} style={{width:'100%',height:'100%',objectFit:fit,display:'block'}}/>:<span style={{fontSize:12,letterSpacing:'-0.12px',color:dark?'#a1a1a6':'var(--color-ink-muted-48)',fontFamily:'var(--font-text)'}}>{label}</span>}
 </div>;
}

// surfaces/ProductTile

const tones={light:'var(--color-canvas)',parchment:'var(--color-canvas-parchment)',dark:'var(--color-surface-tile-1)','dark-2':'var(--color-surface-tile-2)','dark-3':'var(--color-surface-tile-3)',black:'var(--color-surface-black)'};
function ProductTile({tone='light',eyebrow,title,tagline,actions,children,hero=false,style}){
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

// surfaces/QuoteCard

function QuoteCard({src,label='Landscape photograph',kicker,title,body,action,style}){
 return <section style={{position:'relative',background:'var(--color-surface-tile-1)',color:'var(--color-on-dark)',padding:'var(--space-section) 22px',textAlign:'center',minHeight:520,display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',fontFamily:'var(--font-text)',...style}}>
  {src?<img src={src} alt="" style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}/>:<span style={{position:'absolute',left:16,bottom:12,fontSize:12,color:'#86868b'}}>{label}</span>}
  <div style={{position:'relative',maxWidth:760}}>
   {kicker&&<div style={{fontSize:14,fontWeight:600,letterSpacing:'-0.224px',marginBottom:16,color:'var(--color-body-muted)'}}>{kicker}</div>}
   <h2 style={{margin:0,fontFamily:'var(--font-display)',fontSize:40,fontWeight:600,lineHeight:1.1,textWrap:'balance'}}>{title}</h2>
   {body&&<p style={{margin:'16px auto 0',fontSize:24,fontWeight:300,lineHeight:1.5,maxWidth:640,color:'var(--color-body-muted)'}}>{body}</p>}
   {action&&<div style={{marginTop:32}}>{action}</div>}
  </div></section>;
}

// surfaces/StickyBar


function StickyBar({label,value,cta='Continue',onCta,position='fixed',style}){
 return <div style={{position,left:0,right:0,bottom:0,zIndex:20,height:'var(--sticky-bar-h)',background:'var(--color-surface-frosted)',backdropFilter:'var(--blur-frosted)',WebkitBackdropFilter:'var(--blur-frosted)',borderTop:'1px solid var(--color-hairline-a)',padding:'12px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,fontFamily:'var(--font-text)',...style}}>
  <div style={{fontSize:17,letterSpacing:'-0.374px',color:'var(--color-ink)'}}>{label&&<span style={{color:'var(--color-ink-muted-48)',marginRight:8}}>{label}</span>}{value}</div>
  <Button onClick={onCta}>{cta}</Button></div>;
}

// cards/UtilityCard


function UtilityCard({src,imageLabel='Image',ratio='1/1',eyebrow,title,meta,link,href='#',onClick,style}){
 return <div onClick={onClick} style={{background:'var(--color-canvas)',border:'1px solid var(--color-hairline)',borderRadius:'var(--radius-lg)',padding:'var(--space-lg)',display:'flex',flexDirection:'column',gap:16,fontFamily:'var(--font-text)',cursor:onClick?'pointer':'default',...style}}>
  <MediaFrame src={src} label={imageLabel} ratio={ratio} radius={8}/>
  <div style={{display:'flex',flexDirection:'column',gap:2}}>
   {eyebrow&&<div style={{fontSize:12,letterSpacing:'-0.12px',color:'var(--color-ink-muted-48)',marginBottom:4}}>{eyebrow}</div>}
   <div style={{fontSize:17,fontWeight:600,lineHeight:1.24,letterSpacing:'-0.374px',color:'var(--color-ink)'}}>{title}</div>
   {meta&&<div style={{fontSize:17,lineHeight:1.47,letterSpacing:'-0.374px',color:'var(--color-ink)'}}>{meta}</div>}
   {link&&<a href={href} style={{fontSize:14,letterSpacing:'-0.224px',color:'var(--color-primary)',marginTop:8,textDecoration:'none'}}>{link} <i className="icon-chevron-right" style={{fontSize:11}}></i></a>}
  </div></div>;
}

// cards/OptionChip

function OptionChip({label,detail,selected=false,thumb,onClick,style}){
 return <button onClick={onClick} style={{background:'var(--color-canvas)',color:'var(--color-ink)',border:selected?'2px solid var(--color-primary-focus)':'1px solid var(--color-hairline)',borderRadius:'var(--radius-pill)',padding:selected?'11px 15px':'12px 16px',display:'inline-flex',alignItems:'center',gap:10,fontFamily:'var(--font-text)',fontSize:14,lineHeight:1.43,letterSpacing:'-0.224px',cursor:'pointer',textAlign:'left',...style}}>
  {thumb&&<span style={{width:24,height:24,borderRadius:'50%',background:thumb,flex:'none'}}></span>}
  <span style={{flex:1}}>{label}</span>{detail&&<span style={{color:'var(--color-ink-muted-48)'}}>{detail}</span>}
 </button>;
}

// forms/SearchInput

function SearchInput({value,onChange,placeholder='Search',style}){
 const [f,setF]=React.useState(false);
 return <label style={{display:'flex',alignItems:'center',gap:10,height:44,padding:'0 20px',background:'var(--color-canvas)',border:'1px solid var(--color-hairline-a)',borderRadius:'var(--radius-pill)',outline:f?'2px solid var(--color-primary-focus)':'none',outlineOffset:1,fontFamily:'var(--font-text)',...style}}>
  <i className="icon-search" style={{fontSize:14,color:'var(--color-ink-muted-48)'}}></i>
  <input value={value} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{border:'none',outline:'none',background:'transparent',flex:1,fontSize:17,letterSpacing:'-0.374px',color:'var(--color-ink)',fontFamily:'inherit'}}/>
 </label>;
}

// footer/Footer

function Footer({columns=[],note,legal,style}){
 return <footer style={{background:'var(--color-canvas-parchment)',color:'var(--color-ink-muted-80)',padding:'64px 22px',fontFamily:'var(--font-text)',...style}}>
  <div style={{maxWidth:980,margin:'0 auto'}}>
   {note&&<p style={{fontSize:12,lineHeight:1.33,letterSpacing:'-0.12px',color:'var(--color-ink-muted-48)',margin:'0 0 24px',paddingBottom:16,borderBottom:'1px solid var(--color-hairline)'}}>{note}</p>}
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:24}}>
    {columns.map(c=><div key={c.title}><div style={{fontSize:14,fontWeight:600,lineHeight:1.29,letterSpacing:'-0.224px',color:'var(--color-ink)',marginBottom:6}}>{c.title}</div>{c.links.map(l=><div key={l} style={{fontSize:12,lineHeight:2.41,letterSpacing:'-0.12px'}}><a href="#" style={{color:'var(--color-ink-muted-80)',textDecoration:'none'}}>{l}</a></div>)}</div>)}
   </div>
   {legal&&<div style={{marginTop:32,paddingTop:16,borderTop:'1px solid var(--color-hairline)',fontSize:12,lineHeight:1,letterSpacing:'-0.12px',color:'var(--color-ink-muted-48)'}}>{legal}</div>}
  </div></footer>;
}

// explorer/TechViz

function rng(seed){let a=seed>>>0;return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
const RAMP=['#0B1F6B','#1F4FD1','#16A3D8','#3CC48C','#E9D43A','#F29A1F','#D6402B'].map(hex);
const SEIS=['#1C3F9E','#6F8FD0','#F4F1EA','#D88A70','#B8322A'].map(hex);
function ramp(stops,t){t=Math.max(0,Math.min(0.9999,t));const p=t*(stops.length-1),i=Math.floor(p),f=p-i,a=stops[i],b=stops[i+1];return[a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f];}
function waves(r,n,amp){const w=[];for(let i=0;i<n;i++)w.push([amp*(r()*0.6+0.4)/(i+1),(i+1)*(1.5+r()*2),r()*6.28]);return u=>w.reduce((s,[a,f,p])=>s+a*Math.sin(u*f+p),0);}
function pixels(ctx,W,H,fn){const img=ctx.createImageData(W,H),d=img.data;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const c=fn(x/W,y/H),i=(y*W+x)*4;d[i]=c[0];d[i+1]=c[1];d[i+2]=c[2];d[i+3]=c[3]==null?255:c[3];}ctx.putImageData(img,0,0);}
function seismic(ctx,W,H,r,opt){const st=waves(r,4,0.05),fq=waves(r,3,4),fx=0.58+r()*0.1,nz=()=>r()*0.16-0.08;
 pixels(ctx,W,H,(u,v)=>{const bump=0.13*Math.exp(-(((u-0.42)/0.2)**2));let t=v+st(u)*0.8+bump*(0.4+v*0.6);if(opt.fault&&u>fx+0.22*(v-0.2))t+=0.045;const f=22+fq(t*3);let a=Math.sin(t*f*6.28)*(0.55+0.45*Math.sin(t*41+u*2.1))*(0.7+0.3*Math.sin(t*9));a+=nz();const c=ramp(SEIS,(a+1)/2);return c;});}
function strata(ctx,W,H,r,opt){const st=waves(r,3,0.025),fx=0.66;
 const L=[[0,'#CFE5F1'],[0.1,'#E8DFCB'],[0.22,'#D5CDBE'],[0.33,'#E3D3AE'],[0.45,'#9DAFC2'],[0.53,'RES'],[0.63,'#7E8C9C'],[0.76,'#4A5160'],[0.9,'#363A44']];
 const cols=L.map(l=>l[1]==='RES'?null:hex(l[1])),oil=hex('#F29A1F'),oil2=hex('#D6402B'),wat=hex('#7FA6C9');
 pixels(ctx,W,H,(u,v)=>{const bump=0.16*Math.exp(-(((u-0.4)/0.22)**2));let t=v;if(v>0.1)t=v+(bump+st(u))*Math.min(1,(v-0.1)*4);if(opt.fault&&u>fx+0.18*(v-0.3)&&v>0.12)t-=0.05;let k=0;for(let i=0;i<L.length;i++)if(t>=L[i][0])k=i;
  if(v<0.1)return cols[0];
  let c;if(L[k][1]==='RES'){const crest=v;c=crest<0.47?ramp([oil2,oil],(crest-0.32)/0.15):wat;}else c=cols[k];
  const lam=0.94+0.06*Math.sin(t*620+Math.sin(u*9)*2);return[c[0]*lam,c[1]*lam,c[2]*lam];});}
function field(r,n){const b=[];for(let i=0;i<n;i++)b.push([r()*0.8+0.1,r()*0.8+0.1,0.08+r()*0.18,(r()*1.4-0.4)]);return(u,v)=>b.reduce((s,[x,y,w,a])=>s+a*Math.exp(-((u-x)**2+(v-y)**2)/(w*w)),0);}
function reservoir(ctx,W,H,r,opt){const fn=field(r,9),edge=waves(r,5,0.06);let mn=1e9,mx=-1e9;for(let i=0;i<400;i++){const q=fn(i%20/20,Math.floor(i/20)/20);mn=Math.min(mn,q);mx=Math.max(mx,q);}const asp=W/H;
 pixels(ctx,W,H,(u,v)=>{const dx=(u-0.5)*asp,dy=v-0.5,ang=Math.atan2(dy,dx),rad=Math.hypot(dx/(asp*0.46),dy/0.42);const lim=1+edge(ang);if(opt.mask!==false&&rad>lim)return[0,0,0,0];let q=(fn(u,v)-mn)/(mx-mn);const c=ramp(RAMP,q);const con=Math.abs((q*12)%1-0.5)<0.035?0.72:1;const gx=(u*W)%14<1||(v*H)%14<1?0.93:1;return[c[0]*con*gx,c[1]*con*gx,c[2]*con*gx];});}
function structure(ctx,W,H,r){const fn=field(r,7);let mn=1e9,mx=-1e9;for(let i=0;i<400;i++){const q=fn(i%20/20,Math.floor(i/20)/20);mn=Math.min(mn,q);mx=Math.max(mx,q);}
 const S=['#0B1F6B','#1F4FD1','#16A3D8','#9AD7EA','#EEF4F8'].map(hex);pixels(ctx,W,H,(u,v)=>{const q=(fn(u,v)-mn)/(mx-mn);const c=ramp(S,q);const con=Math.abs((q*16)%1-0.5)<0.04?0.8:1;return[c[0]*con,c[1]*con,c[2]*con];});}
function wellLog(ctx,w,h,r){ctx.fillStyle='#fff';ctx.fillRect(0,0,w,h);const sand=waves(r,6,1),N=Math.floor(h/2);const tr=[[0,0.12],[0.12,0.34],[0.34,0.56],[0.56,0.78],[0.78,1]].map(([a,b])=>[a*w,b*w]);
 ctx.strokeStyle='#DCE3EC';ctx.lineWidth=1;tr.forEach(([a])=>{ctx.beginPath();ctx.moveTo(a+0.5,0);ctx.lineTo(a+0.5,h);ctx.stroke();});for(let y=0;y<h;y+=h/12){ctx.beginPath();ctx.moveTo(tr[1][0],y);ctx.lineTo(w,y);ctx.stroke();}
 const z=[],gr=[],rs=[],rh=[],nph=[],hc=[];for(let i=0;i<=N;i++){const d=i/N,s=sand(d*8)+0.25*Math.sin(d*90+r()*0.3)+(r()-0.5)*0.35;const isS=s>0.15,isHC=isS&&d>0.38&&d<0.62;z.push(d*h);gr.push(isS?0.18+r()*0.1:0.7+r()*0.18);rs.push(isHC?0.75+r()*0.15:isS?0.3+r()*0.08:0.2+r()*0.08);rh.push(isS?0.4+r()*0.06:0.62+r()*0.06);nph.push(isS?(isHC?0.25:0.38)+r()*0.05:0.7+r()*0.06);hc.push(isHC);}
 const X=(t,v)=>t[0]+8+v*(t[1]-t[0]-16);
 ctx.fillStyle='rgba(242,154,31,0.22)';ctx.beginPath();ctx.moveTo(tr[1][0],0);z.forEach((y,i)=>ctx.lineTo(X(tr[1],gr[i]),y));ctx.lineTo(tr[1][0],h);ctx.fill();
 const line=(t,arr,col,dash)=>{ctx.strokeStyle=col;ctx.lineWidth=1.4;ctx.setLineDash(dash||[]);ctx.beginPath();z.forEach((y,i)=>i?ctx.lineTo(X(t,arr[i]),y):ctx.moveTo(X(t,arr[i]),y));ctx.stroke();ctx.setLineDash([]);};
 line(tr[1],gr,'#C77A10');line(tr[2],rs,'#0A5CDB');
 ctx.fillStyle='rgba(214,64,43,0.16)';z.forEach((y,i)=>{if(hc[i]){ctx.fillRect(X(tr[3],rh[i]),y,X(tr[3],nph[i])-X(tr[3],rh[i]),h/N+0.5);}});line(tr[3],rh,'#D6402B');line(tr[3],nph,'#12A4D9',[4,3]);
 z.forEach((y,i)=>{ctx.fillStyle=hc[i]?'#F29A1F':gr[i]<0.4?'#E3D3AE':'#9DAFC2';ctx.fillRect(tr[4][0]+8,y,tr[4][1]-tr[4][0]-16,h/N+0.5);});
 ctx.fillStyle='#8A98A8';ctx.font='10px Inter, sans-serif';for(let k=1;k<12;k++)ctx.fillText(String(2400+k*25),6,k*h/12+3);}
function decline(ctx,w,h,r){ctx.fillStyle='rgba(0,0,0,0)';ctx.clearRect(0,0,w,h);const p={l:44,r:16,t:16,b:28},W=w-p.l-p.r,H=h-p.t-p.b;ctx.strokeStyle='#DCE3EC';ctx.lineWidth=1;for(let i=0;i<=4;i++){const y=p.t+H*i/4;ctx.beginPath();ctx.moveTo(p.l,y);ctx.lineTo(w-p.r,y);ctx.stroke();}
 const N=120,s=(fn,col,width,dash)=>{ctx.strokeStyle=col;ctx.lineWidth=width;ctx.setLineDash(dash||[]);ctx.beginPath();for(let i=0;i<=N;i++){const x=i/N,y=fn(x);const X=p.l+x*W,Y=p.t+H*(1-y);i?ctx.lineTo(X,Y):ctx.moveTo(X,Y);}ctx.stroke();ctx.setLineDash([]);};
 const noise=()=>(r()-0.5)*0.025;s(x=>Math.min(0.92,x*12)*0.92/(1+3.2*x)**0.9+noise(),'#0A5CDB',2);s(x=>Math.max(0,(x-0.2)*1.05)**0.8*0.85,'#12A4D9',1.6);s(x=>0.88-0.42*x-0.08*Math.sin(x*3),'#0B1A2C',1.2,[5,4]);
 ctx.fillStyle='#8A98A8';ctx.font='10px Inter, sans-serif';['0','5','10','15','20 yr'].forEach((t,i)=>ctx.fillText(t,p.l+W*i/4-(i?8:0),h-8));}
const R={seismic,strata,reservoir,structure,log:wellLog,decline};
function TechViz({kind='seismic',seed=7,fault=true,mask=true,resolution=0.5,label,style}){
 const wrap=React.useRef(null),cv=React.useRef(null);
 React.useEffect(()=>{const el=wrap.current;if(!el)return;let raf;const draw=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const c=cv.current,dpr=Math.min(2,window.devicePixelRatio||1);c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);const ctx=c.getContext('2d');const r=rng(seed);
  if(kind==='log'||kind==='decline'){ctx.setTransform(dpr,0,0,dpr,0,0);R[kind](ctx,w,h,r);return;}
  const W=Math.max(80,Math.round(w*resolution)),H=Math.max(60,Math.round(h*resolution));const off=document.createElement('canvas');off.width=W;off.height=H;R[kind](off.getContext('2d'),W,H,r,{fault,mask});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(off,0,0,c.width,c.height);};
  const ro=new ResizeObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);});ro.observe(el);draw();return()=>{ro.disconnect();cancelAnimationFrame(raf);};},[kind,seed,fault,mask,resolution]);
 return <div ref={wrap} role="img" aria-label={label||kind+' visualization'} style={{position:'relative',width:'100%',height:'100%',minHeight:80,...style}}><canvas ref={cv} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}}></canvas></div>;
}

// explorer/StageNav

function StageNav({stages=[],current=0,onSelect,cta='Explore the Journey',onCta,position='fixed',windowSize=5,style}){
 const box=React.useRef(null);const [ws,setWs]=React.useState(windowSize);
 React.useEffect(()=>{const el=box.current;if(!el)return;const ro=new ResizeObserver(()=>{const w=el.clientWidth;setWs(Math.max(1,Math.min(windowSize,Math.floor(w/150))));});ro.observe(el);return()=>ro.disconnect();},[windowSize]);
 const cur=stages[current]||{};const n=stages.length;let start=Math.max(0,Math.min(current-(ws>2?1:0),n-ws));const vis=stages.slice(start,start+ws);
 return <nav aria-label="Development stages" style={{position,left:0,right:0,bottom:position==='fixed'?16:undefined,zIndex:30,padding:'0 var(--gutter-page)',pointerEvents:'none',...style}}>
  <div style={{pointerEvents:'auto',maxWidth:1360,margin:'0 auto',height:'var(--stage-nav-h)',background:'rgba(255,255,255,0.92)',backdropFilter:'saturate(180%) blur(20px)',WebkitBackdropFilter:'saturate(180%) blur(20px)',border:'1px solid var(--ex-line)',borderRadius:20,boxShadow:'var(--shadow-float)',display:'flex',alignItems:'center',gap:28,padding:'0 24px',fontFamily:'var(--font-editorial)',color:'var(--ex-navy)'}}>
   <div style={{display:'flex',alignItems:'center',gap:14,flex:'none',minWidth:220}}>
    <span style={{width:36,height:36,borderRadius:'50%',background:'var(--ex-blue)',display:'flex',alignItems:'center',justifyContent:'center',flex:'none'}}><span style={{width:8,height:8,borderRadius:'50%',background:'#fff'}}></span></span>
    <div style={{display:'flex',flexDirection:'column',gap:3}}><span style={{fontSize:11,color:'var(--ex-faint)',letterSpacing:'0.02em'}}>Current Stage</span><span style={{fontSize:15,fontWeight:600,letterSpacing:'0.04em',textTransform:'uppercase',color:'var(--ex-blue)',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:6}}><span style={{fontVariantNumeric:'tabular-nums'}}>{cur.num}</span>{cur.label}<i className="icon-arrow-right" style={{fontSize:14}}></i></span></div>
   </div>
   <span style={{width:1,height:36,background:'var(--ex-line)',flex:'none'}}></span>
   <div ref={box} style={{flex:1,minWidth:0,display:'grid',gridTemplateColumns:'repeat('+vis.length+',minmax(0,1fr))',gap:16,overflow:'hidden'}}>
    {vis.map(s=>{const i=stages.indexOf(s),on=i===current,past=i<current;return <button key={s.id} onClick={()=>onSelect&&onSelect(i)} style={{all:'unset',cursor:'pointer',display:'flex',flexDirection:'column',gap:4,paddingTop:10,borderTop:'2px solid '+(on?'var(--ex-blue)':past?'rgba(10,92,219,0.35)':'var(--ex-line)'),minWidth:0}}>
     <span style={{fontSize:11,fontVariantNumeric:'tabular-nums',color:on?'var(--ex-blue)':'var(--ex-faint)'}}>{s.num}</span>
     <span style={{fontSize:13,fontWeight:on?600:400,color:on?'var(--ex-blue)':'var(--ex-navy)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{s.label}</span></button>;})}
   </div>
   <div style={{display:'flex',alignItems:'center',gap:20,flex:'none'}}>
    <div style={{display:'flex',gap:6,alignItems:'center'}} aria-hidden="true">{stages.map((s,i)=><span key={s.id} style={{width:i===current?18:6,height:6,borderRadius:3,background:i<=current?'var(--ex-blue)':'var(--ex-line-strong)',opacity:i<current?0.45:1}}></span>)}</div>
    <a onClick={onCta} style={{fontSize:13,fontWeight:600,color:'var(--ex-navy)',cursor:'pointer',whiteSpace:'nowrap',display:'flex',alignItems:'center',gap:6,textDecoration:'none'}}>{cta}<i className="icon-arrow-right" style={{fontSize:14}}></i></a>
   </div>
  </div></nav>;
}

// explorer/SiteHeader

function SiteHeader({links=[],active,onNavigate,tone='light',position='absolute',style}){
 const dark=tone==='dark',ink=dark?'#fff':'var(--ex-navy)';
 return <header style={{position,top:0,left:0,right:0,zIndex:20,height:72,padding:'0 var(--gutter-page)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:24,fontFamily:'var(--font-editorial)',color:ink,...style}}>
  <a onClick={()=>onNavigate&&onNavigate('home')} style={{cursor:'pointer',display:'flex',gap:6,alignItems:'baseline',fontSize:14,letterSpacing:'0.08em',textTransform:'uppercase',color:ink,textDecoration:'none',whiteSpace:'nowrap'}}><b style={{fontWeight:700}}>Oil &amp; Gas</b><span style={{fontWeight:300}}>Development</span></a>
  <nav style={{display:'flex',gap:32,alignItems:'center'}}>{links.map(l=><a key={l.id} onClick={()=>onNavigate&&onNavigate(l.id)} style={{fontSize:13,cursor:'pointer',color:active===l.id?(dark?'#4DA3FF':'var(--ex-blue)'):ink,fontWeight:active===l.id?600:400,textDecoration:'none',whiteSpace:'nowrap'}}>{l.label}</a>)}</nav>
  <div style={{display:'flex',gap:20,alignItems:'center',fontSize:12}}><i className="icon-search" style={{fontSize:16}}></i><span style={{letterSpacing:'0.06em',whiteSpace:'nowrap'}}><b style={{fontWeight:600}}>KR</b> <span style={{opacity:0.5}}>/ EN</span></span></div>
 </header>;
}

// explorer/ArrowCTA

function ArrowCTA({children='Explore the Journey',onClick,href,tone='navy',direction='right',style}){
 const [p,setP]=React.useState(false);const bg=tone==='blue'?'var(--ex-blue)':tone==='white'?'#fff':'var(--ex-navy)';const fg=tone==='white'?'var(--ex-navy)':'#fff';const lbl=tone==='white'?'#fff':'var(--ex-navy)';
 const Tag=href?'a':'button';
 return <Tag href={href} onClick={onClick} onMouseDown={()=>setP(true)} onMouseUp={()=>setP(false)} onMouseLeave={()=>setP(false)} style={{all:'unset',cursor:'pointer',display:'inline-flex',alignItems:'center',gap:16,fontFamily:'var(--font-editorial)',fontSize:14,fontWeight:600,color:lbl,transform:p?'scale(0.97)':'none',transition:'transform 200ms',...style}}>
  <span style={{width:48,height:48,borderRadius:'50%',background:bg,color:fg,display:'inline-flex',alignItems:'center',justifyContent:'center',flex:'none'}}><i className={'icon-arrow-'+direction} style={{fontSize:18}}></i></span>{children}</Tag>;
}

// explorer/DepthRuler

function DepthRuler({marks=['0 m','1,000','2,000','3,000 m'],tone='light',label='Depth',style}){
 const c=tone==='dark'?'rgba(255,255,255,0.85)':'var(--ex-navy)';
 return <div style={{display:'flex',flexDirection:'column',alignItems:'center',height:'100%',gap:10,fontFamily:'var(--font-editorial)',color:c,...style}}>
  <span style={{fontSize:10,letterSpacing:'0.16em',textTransform:'uppercase',writingMode:'vertical-rl'}}>{label}</span>
  <div style={{position:'relative',flex:1,width:24,display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
   <span style={{position:'absolute',top:0,bottom:0,left:'50%',width:1,background:c,opacity:0.5}}></span>
   {marks.map(m=><span key={m} style={{position:'relative',display:'flex',alignItems:'center',gap:6}}><span style={{width:9,height:1,background:c}}></span><span style={{position:'absolute',left:14,fontSize:10,whiteSpace:'nowrap',fontVariantNumeric:'tabular-nums'}}>{m}</span></span>)}
  </div>
  <span style={{width:9,height:9,borderRadius:'50%',border:'1px solid '+c}}></span>
 </div>;
}

window.OilGasDevelopmentDesignSystem_dcb6ae=Object.assign(window.OilGasDevelopmentDesignSystem_dcb6ae||{},{Button,IconButton,TextLink,GlobalNav,SubNav,MediaFrame,ProductTile,QuoteCard,StickyBar,UtilityCard,OptionChip,SearchInput,Footer,TechViz,StageNav,SiteHeader,ArrowCTA,DepthRuler});
})();
