const { TechViz, StageNav, SiteHeader, ArrowCTA, DepthRuler, TextLink, Button, SearchInput } = window.OilGasDevelopmentDesignSystem_dcb6ae;
const S=window.OGD_STAGES;
const sceneType={
 eyebrow:{display:'flex',alignItems:'center',gap:12,fontFamily:'var(--font-editorial)',fontSize:12,letterSpacing:'0.16em',textTransform:'uppercase'},
 title:{fontFamily:'var(--font-editorial)',fontSize:'var(--type-editorial-lg)',fontWeight:300,lineHeight:1,letterSpacing:'-0.02em',margin:'28px 0 0',textWrap:'balance'},
 body:{fontFamily:'var(--font-kr)',fontSize:17,lineHeight:1.75,letterSpacing:'-0.01em',margin:'28px 0 0',maxWidth:460,textWrap:'pretty'},
 wrap:{maxWidth:1360,margin:'0 auto',display:'flex',flexWrap:'wrap',gap:'48px 64px',alignItems:'center'},
};
function SceneHead({s,children}){const d=s.dark;return <div>
 <div style={{...sceneType.eyebrow,color:d?'rgba(255,255,255,0.6)':'var(--ex-faint)'}}><span style={{fontVariantNumeric:'tabular-nums'}}>{s.num}</span><span style={{width:32,height:1,background:'currentColor'}}></span><span style={{fontWeight:600,color:d?'#4DA3FF':'var(--ex-blue)'}}>{s.label}</span></div>
 <h2 style={{...sceneType.title,color:d?'#fff':'var(--ex-navy)'}}>{s.title}</h2>
 <p style={{...sceneType.body,color:d?'rgba(255,255,255,0.72)':'var(--ex-muted)'}}>{s.kr}</p>{children}</div>;}
function Scene({s,children,style}){return <section id={'scene-'+s.id} data-stage={s.id} data-scene={s.num} data-depth={s.depth} data-transition-in={s.t.in} data-transition-out={s.t.out} data-persist={s.t.persist} style={{position:'relative',background:s.bg,color:s.dark?'#fff':'var(--ex-navy)',minHeight:'var(--scene-min-h)',padding:'140px var(--gutter-page)',overflow:'hidden',display:'flex',flexDirection:'column',justifyContent:'center',...style}}>{children}</section>;}
function Fact({v,l,dark}){return <div style={{display:'flex',flexDirection:'column',gap:6,paddingTop:16,borderTop:'1px solid '+(dark?'rgba(255,255,255,0.18)':'var(--ex-line)')}}><span style={{fontFamily:'var(--font-editorial)',fontSize:36,fontWeight:300,letterSpacing:'-0.02em',lineHeight:1,fontVariantNumeric:'tabular-nums'}}>{v}</span><span style={{fontFamily:'var(--font-kr)',fontSize:13,color:dark?'rgba(255,255,255,0.6)':'var(--ex-muted)'}}>{l}</span></div>;}
function Callout({x,y,label,sub,side='right',dark}){return <div style={{position:'absolute',left:x,top:y,display:'flex',alignItems:'center',gap:8,flexDirection:side==='left'?'row-reverse':'row',transform:side==='left'?'translate(-100%,-50%)':'translateY(-50%)',pointerEvents:'none'}}>
 <span style={{width:9,height:9,borderRadius:'50%',background:'#fff',border:'2px solid var(--ex-navy)',flex:'none'}}></span><span style={{width:40,height:1,background:dark?'#fff':'var(--ex-navy)'}}></span>
 <span style={{background:'rgba(255,255,255,0.94)',padding:'6px 10px',borderRadius:6,fontFamily:'var(--font-editorial)',fontSize:12,fontWeight:600,color:'var(--ex-navy)',whiteSpace:'nowrap'}}>{label}{sub&&<span style={{display:'block',fontWeight:400,color:'var(--ex-muted)',fontSize:11}}>{sub}</span>}</span></div>;}

function Hero({go}){return <section data-stage="surface" data-scene="00" data-transition-out="Sea level seam moves to viewport center; descent begins" style={{position:'relative',minHeight:940,background:'var(--ex-bg)',overflow:'hidden'}}>
 <SiteHeader links={window.OGD_LINKS} active="journey" onNavigate={window.OGD_GO}/>
 <div style={{position:'absolute',top:0,right:0,bottom:0,width:'64%'}}>
  <div style={{position:'absolute',left:0,right:0,top:0,height:'60%'}}><image-slot id="hero-surface" shape="rect" placeholder="Hero photo — offshore platform, open sea, bright sky"></image-slot></div>
  <div style={{position:'absolute',left:0,right:0,top:'60%',bottom:0}}><TechViz kind="strata" seed={11}/></div>
  <div style={{position:'absolute',left:24,top:'60%',transform:'translateY(-50%)',background:'#fff',borderRadius:999,padding:'6px 12px',fontFamily:'var(--font-editorial)',fontSize:11,letterSpacing:'0.08em',textTransform:'uppercase',color:'var(--ex-navy)',display:'flex',gap:8,alignItems:'center'}}><span style={{width:6,height:6,borderRadius:'50%',background:'var(--ex-cyan)'}}></span>Sea level · ±0 m</div>
  <div style={{position:'absolute',right:36,top:'64%',bottom:'6%'}}><DepthRuler marks={['0 m','1,000','2,000','3,000 m']}/></div>
 </div>
 <div style={{position:'relative',zIndex:2,padding:'200px var(--gutter-page) 120px',maxWidth:900}}>
  <div style={{...sceneType.eyebrow,color:'var(--ex-muted)'}}><span style={{fontWeight:600}}>A scientific exploration in nine stages</span></div>
  <h1 style={{fontFamily:'var(--font-editorial)',fontSize:'var(--type-editorial-xl)',fontWeight:300,lineHeight:0.92,letterSpacing:'-0.025em',textTransform:'uppercase',margin:'32px 0 0',color:'var(--ex-navy)'}}>Oil &amp; Gas<br/>Development</h1>
  <p style={{fontFamily:'var(--font-editorial)',fontSize:30,fontWeight:400,lineHeight:1.2,letterSpacing:'-0.01em',margin:'36px 0 0',color:'var(--ex-navy)'}}>From Subsurface<br/>to Field Development</p>
  <p style={{...sceneType.body,color:'var(--ex-muted)',maxWidth:380}}>지표에서 저류층까지, 그리고 생산과 개발까지. 석유개발의 전 과정을 하나의 과학적 여정으로 탐색합니다.</p>
  <div style={{marginTop:44}}><ArrowCTA onClick={()=>go(0)}>Explore the Journey</ArrowCTA></div>
 </div></section>;}

function StageIndex({go}){return <section style={{background:'#fff',padding:'40px var(--gutter-page) 48px'}}><div style={{maxWidth:1360,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(132px,1fr))',gap:'28px 20px'}}>
 {S.map((s,i)=><a key={s.id} onClick={()=>go(i)} style={{cursor:'pointer',display:'flex',flexDirection:'column',gap:8,paddingTop:14,borderTop:'1px solid var(--ex-line)',textDecoration:'none',fontFamily:'var(--font-editorial)'}}>
  <span style={{fontSize:13,color:'var(--ex-blue)',fontVariantNumeric:'tabular-nums'}}>{s.num}</span>
  <span style={{fontSize:12,fontWeight:600,letterSpacing:'0.06em',textTransform:'uppercase',color:'var(--ex-navy)'}}>{s.label}</span>
  <span style={{fontSize:11,lineHeight:1.45,color:'var(--ex-faint)'}}>{s.sub}</span></a>)}
 </div></section>;}

function SurfaceScene(){const s=S[0];return <Scene s={s} style={{paddingBottom:0}}>
 <div style={{...sceneType.wrap,alignItems:'flex-end',marginBottom:72}}><div style={{flex:'1 1 520px'}}><SceneHead s={s}/></div>
  <div style={{flex:'1 1 360px',display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:24}}><Fact v="12,400" l="분지 면적 (km²)"/><Fact v="3" l="원격탐사 데이터셋"/><Fact v="7" l="유망 지역 선별"/></div></div>
 <div style={{position:'relative',margin:'0 calc(-1 * var(--gutter-page))',height:620}}><image-slot id="scene-surface" shape="rect" placeholder="Full-bleed photo — coastline / offshore acreage from above (21:9)"></image-slot>
  <div style={{position:'absolute',left:0,right:0,bottom:0,height:1,background:'var(--ex-cyan)'}}></div></div>
</Scene>;}

function PetroleumScene(){const s=S[1];const el=[['Source rock','근원암 — 유기물이 열과 압력으로 탄화수소가 됩니다.'],['Migration','이동 — 부력으로 투수성 지층을 따라 위로 이동합니다.'],['Reservoir','저류암 — 공극이 많은 사암·탄산염암이 유체를 담습니다.'],['Trap & Seal','트랩·덮개암 — 불투수층이 이동을 멈추고 보존합니다.']];
 return <Scene s={s}><div style={sceneType.wrap}>
  <div style={{flex:'1 1 380px',maxWidth:480}}><SceneHead s={s}><ol style={{listStyle:'none',padding:0,margin:'40px 0 0',display:'flex',flexDirection:'column'}}>{el.map(([a,b],i)=><li key={a} style={{display:'grid',gridTemplateColumns:'36px 1fr',gap:12,padding:'16px 0',borderTop:'1px solid var(--ex-line)'}}><span style={{fontFamily:'var(--font-editorial)',fontSize:12,color:'var(--ex-blue)',paddingTop:2}}>{'0'+(i+1)}</span><div><div style={{fontFamily:'var(--font-editorial)',fontSize:15,fontWeight:600}}>{a}</div><div style={{fontFamily:'var(--font-kr)',fontSize:14,lineHeight:1.6,color:'var(--ex-muted)',marginTop:2}}>{b}</div></div></li>)}</ol></SceneHead></div>
  <div style={{flex:'2 1 560px',position:'relative',height:680,marginRight:'calc(-1 * var(--gutter-page))'}}><TechViz kind="strata" seed={5}/>
   <Callout x="40%" y="27%" label="Seal" sub="Shale cap rock"/><Callout x="40%" y="40%" label="Trapped hydrocarbons" sub="Anticline crest"/><Callout x="72%" y="58%" label="Normal fault"/><Callout x="22%" y="84%" label="Source rock" sub="Kitchen · Ro 0.9%"/>
   <div style={{position:'absolute',left:0,right:0,top:'10%',height:1,background:'var(--ex-cyan)'}}></div></div>
 </div></Scene>;}

function SubsurfaceScene(){const s=S[2];return <Scene s={s}><div style={sceneType.wrap}>
 <div style={{flex:'2 1 560px',position:'relative',height:600,marginLeft:'calc(-1 * var(--gutter-page))'}}><TechViz kind="structure" seed={21}/>
  <Callout x="46%" y="44%" label="Crest · 2,450 m" sub="Proposed well location"/>
  <div style={{position:'absolute',left:24,bottom:20,display:'flex',gap:12,alignItems:'center',background:'rgba(255,255,255,0.94)',borderRadius:6,padding:'8px 12px',fontFamily:'var(--font-editorial)',fontSize:11,color:'var(--ex-navy)'}}><span>Depth (m TVDSS)</span><span style={{width:120,height:8,borderRadius:2,background:'linear-gradient(90deg,#EEF4F8,#9AD7EA,#16A3D8,#1F4FD1,#0B1F6B)'}}></span><span>2,400 → 2,900</span></div></div>
 <div style={{flex:'1 1 380px',maxWidth:480}}><SceneHead s={s}><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:24,marginTop:40}}><Fact v="38 km²" l="구조 폐합 면적"/><Fact v="120 m" l="폐합 높이"/></div></SceneHead></div>
</div></Scene>;}

function WellScene(){const s=S[3];const tracks=[['Depth','m MD','var(--ex-faint)'],['GR','0 – 150 API','#C77A10'],['Resistivity','0.2 – 2000 Ω·m','#0A5CDB'],['Density · Neutron','1.95 – 2.95 g/cc','#D6402B'],['Lithology','','var(--ex-navy)']];
 return <Scene s={s}><div style={{...sceneType.wrap,alignItems:'stretch'}}>
  <div style={{flex:'1 1 380px',maxWidth:480,alignSelf:'center'}}><SceneHead s={s}><div style={{display:'flex',flexWrap:'wrap',gap:'10px 20px',marginTop:36,fontFamily:'var(--font-editorial)',fontSize:12}}>{[['#F29A1F','Hydrocarbon sand'],['#E3D3AE','Water sand'],['#9DAFC2','Shale']].map(([c,l])=><span key={l} style={{display:'flex',gap:8,alignItems:'center'}}><span style={{width:12,height:12,background:c,borderRadius:2}}></span>{l}</span>)}</div></SceneHead></div>
  <div style={{flex:'2 1 560px',display:'flex',flexDirection:'column',background:'#fff',borderRadius:4}}>
   <div style={{display:'grid',gridTemplateColumns:'12fr 22fr 22fr 22fr 22fr',borderBottom:'1px solid var(--ex-line)'}}>{tracks.map(([a,b,c])=><div key={a} style={{padding:'12px 10px',fontFamily:'var(--font-editorial)',fontSize:11,borderTop:'2px solid '+c}}><div style={{fontWeight:600,color:'var(--ex-navy)'}}>{a}</div><div style={{color:'var(--ex-faint)'}}>{b||'\u00a0'}</div></div>)}</div>
   <div style={{height:620}}><TechViz kind="log" seed={8}/></div></div>
 </div></Scene>;}

function SeismicScene(){const s=S[4];return <Scene s={s} style={{padding:'140px 0'}}>
 <div style={{padding:'0 var(--gutter-page)',...sceneType.wrap,alignItems:'flex-end',marginBottom:56}}><div style={{flex:'1 1 520px'}}><SceneHead s={s}/></div>
  <div style={{flex:'0 1 360px',display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:24}}><Fact dark v="1,240 km²" l="3D 탄성파 취득 면적"/><Fact dark v="12.5 m" l="빈(bin) 간격"/></div></div>
 <div style={{position:'relative',height:560}}><TechViz kind="seismic" seed={4}/>
  <div style={{position:'absolute',left:'var(--gutter-page)',top:16,fontFamily:'var(--font-editorial)',fontSize:11,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--ex-navy)',background:'rgba(255,255,255,0.9)',padding:'6px 10px',borderRadius:4}}>Inline 1184 · Time migrated</div>
  <Callout x="62%" y="46%" label="Top reservoir" sub="Interpreted horizon"/></div>
</Scene>;}

function ReservoirScene(){const s=S[5];const props=['Porosity','Permeability','Saturation'];const [p,setP]=React.useState(0);
 return <Scene s={s}><div style={sceneType.wrap}>
  <div style={{flex:'1 1 380px',maxWidth:480}}><SceneHead s={s}><div style={{display:'flex',gap:8,marginTop:36,flexWrap:'wrap'}}>{props.map((n,i)=><button key={n} onClick={()=>setP(i)} style={{all:'unset',cursor:'pointer',padding:'9px 16px',borderRadius:999,fontFamily:'var(--font-editorial)',fontSize:13,border:'1px solid '+(p===i?'#4DA3FF':'rgba(255,255,255,0.22)'),color:p===i?'#fff':'rgba(255,255,255,0.7)',background:p===i?'rgba(77,163,255,0.16)':'transparent'}}>{n}</button>)}</div></SceneHead></div>
  <div style={{flex:'2 1 560px',position:'relative',height:640}}><TechViz kind="reservoir" seed={[3,14,27][p]}/>
   <div style={{position:'absolute',right:0,bottom:0,display:'flex',gap:12,alignItems:'center',fontFamily:'var(--font-editorial)',fontSize:11,color:'rgba(255,255,255,0.8)'}}><span>{['5%','0.1 mD','0%'][p]}</span><span style={{width:180,height:8,borderRadius:2,background:'linear-gradient(90deg,var(--viz-1),var(--viz-2),var(--viz-3),var(--viz-4),var(--viz-5),var(--viz-6),var(--viz-7))'}}></span><span>{['30%','2,000 mD','85%'][p]}</span><span style={{marginLeft:8,color:'#fff',fontWeight:600}}>{props[p]}</span></div></div>
 </div></Scene>;}

function EngineeringScene(){const s=S[6];return <Scene s={s}><div style={sceneType.wrap}>
 <div style={{flex:'2 1 560px',display:'flex',flexDirection:'column',gap:16}}>
  <div style={{display:'flex',gap:20,fontFamily:'var(--font-editorial)',fontSize:12,flexWrap:'wrap'}}>{[['#0A5CDB','Oil rate',''],['#12A4D9','Water cut',''],['#0B1A2C','Reservoir pressure','dash']].map(([c,l,d])=><span key={l} style={{display:'flex',gap:8,alignItems:'center'}}><span style={{width:20,height:0,borderTop:'2px '+(d?'dashed ':'solid ')+c}}></span>{l}</span>)}</div>
  <div style={{height:460}}><TechViz kind="decline" seed={2}/></div></div>
 <div style={{flex:'1 1 380px',maxWidth:480}}><SceneHead s={s}><div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(0,1fr))',gap:20,marginTop:40}}><Fact v="42%" l="예상 회수율"/><Fact v="6 yr" l="정점 생산 유지"/><Fact v="18" l="주입정"/></div></SceneHead></div>
</div></Scene>;}

function ProductionScene(){const s=S[7];return <Scene s={s}><div style={sceneType.wrap}>
 <div style={{flex:'2 1 560px',height:640,marginLeft:'calc(-1 * var(--gutter-page))',position:'relative'}}><image-slot id="scene-production" shape="rect" placeholder="Photo — FPSO / production facility at sea"></image-slot></div>
 <div style={{flex:'1 1 380px',maxWidth:480}}><SceneHead s={s}><div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:24,marginTop:40}}><Fact v="120 kbbl/d" l="처리 용량"/><Fact v="2.1 MMbbl" l="저장 용량"/><Fact v="24" l="해저 생산정"/><Fact v="99.2%" l="설비 가동률"/></div></SceneHead></div>
</div></Scene>;}

function FieldScene({onTech}){const s=S[8];return <Scene s={s} style={{padding:0,minHeight:820,justifyContent:'flex-end'}}>
 <div style={{position:'absolute',inset:0}}><image-slot id="scene-field" shape="rect" placeholder="Wide photo — full field development, vessels and platforms at dusk"></image-slot></div>
 <div style={{position:'relative',margin:'0 var(--gutter-page) 140px',maxWidth:620,background:'#fff',padding:'48px 48px 44px',borderRadius:4,pointerEvents:'auto'}}><SceneHead s={s}><div style={{marginTop:36}}><ArrowCTA tone="blue" onClick={onTech}>Read the technical chapters</ArrowCTA></div></SceneHead></div>
</Scene>;}

function SiteFooter(){return <footer style={{background:'var(--ex-bg)',padding:'72px var(--gutter-page) 140px',borderTop:'1px solid var(--ex-line)',fontFamily:'var(--font-editorial)'}}><div style={{maxWidth:1360,margin:'0 auto',display:'flex',flexWrap:'wrap',gap:48,justifyContent:'space-between'}}>
 <div style={{fontSize:14,letterSpacing:'0.08em',textTransform:'uppercase'}}><b>Oil &amp; Gas</b> <span style={{fontWeight:300}}>Development</span><p style={{fontFamily:'var(--font-kr)',textTransform:'none',letterSpacing:0,fontSize:13,color:'var(--ex-muted)',maxWidth:300,lineHeight:1.6}}>From Subsurface to Field Development. 본 사이트의 수치는 설명을 위한 예시입니다.</p></div>
 <div style={{display:'grid',gridTemplateColumns:'repeat(3,minmax(140px,1fr))',gap:'8px 40px',fontSize:13}}>{S.map(s=><a key={s.id} href={'index.html#scene-'+s.id} style={{color:'var(--ex-navy)',textDecoration:'none',lineHeight:2}}><span style={{color:'var(--ex-faint)',marginRight:8}}>{s.num}</span>{s.label}</a>)}</div>
 </div><div style={{maxWidth:1360,margin:'48px auto 0',fontSize:12,color:'var(--ex-faint)'}}>© 2026 Oil &amp; Gas Development</div></footer>;}

Object.assign(window,{Hero,StageIndex,SurfaceScene,PetroleumScene,SubsurfaceScene,WellScene,SeismicScene,ReservoirScene,EngineeringScene,ProductionScene,FieldScene,SiteFooter,SceneHead,Fact,Callout,sceneType});
