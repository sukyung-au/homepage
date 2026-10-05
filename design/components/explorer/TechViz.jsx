import React from 'react';
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
export function TechViz({kind='seismic',seed=7,fault=true,mask=true,resolution=0.5,label,style}){
 const wrap=React.useRef(null),cv=React.useRef(null);
 React.useEffect(()=>{const el=wrap.current;if(!el)return;let raf;const draw=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const c=cv.current,dpr=Math.min(2,window.devicePixelRatio||1);c.width=Math.round(w*dpr);c.height=Math.round(h*dpr);const ctx=c.getContext('2d');const r=rng(seed);
  if(kind==='log'||kind==='decline'){ctx.setTransform(dpr,0,0,dpr,0,0);R[kind](ctx,w,h,r);return;}
  const W=Math.max(80,Math.round(w*resolution)),H=Math.max(60,Math.round(h*resolution));const off=document.createElement('canvas');off.width=W;off.height=H;R[kind](off.getContext('2d'),W,H,r,{fault,mask});ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality='high';ctx.clearRect(0,0,c.width,c.height);ctx.drawImage(off,0,0,c.width,c.height);};
  const ro=new ResizeObserver(()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(draw);});ro.observe(el);draw();return()=>{ro.disconnect();cancelAnimationFrame(raf);};},[kind,seed,fault,mask,resolution]);
 return <div ref={wrap} role="img" aria-label={label||kind+' visualization'} style={{position:'relative',width:'100%',height:'100%',minHeight:80,...style}}><canvas ref={cv} style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block'}}></canvas></div>;
}
