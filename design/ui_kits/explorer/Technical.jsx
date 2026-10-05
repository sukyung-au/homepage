const { TechViz, TechNav, SiteHeader, ArrowCTA, DepthRuler, TextLink, Button, SearchInput } = window.OilGasDevelopmentDesignSystem_dcb6ae;
const T=sceneType;
const TECH=window.OGD_TECH,TOPIC='pt-generation';
const TFLAT=[];TECH.forEach(c=>c.topics.forEach(t=>TFLAT.push({...t,cat:c})));
const TI=TFLAT.findIndex(t=>t.id===TOPIC),TCUR=TFLAT[TI],TPREV=TFLAT[TI-1],TNEXT=TFLAT[TI+1];
const openTopic=t=>{if(t&&t.href)location.href=t.href;};
function Crumb(){return <div style={{maxWidth:1360,margin:'0 auto',display:'flex',gap:10,fontFamily:'var(--font-editorial)',fontSize:12,color:'var(--ex-faint)',letterSpacing:'0.04em'}}><a href="Technical.html" style={{color:'var(--ex-faint)',textDecoration:'none'}}>Technology</a><span>/</span><a style={{color:'var(--ex-faint)',textDecoration:'none'}}>{TCUR.cat.num} {TCUR.cat.label}</a><span>/</span><span style={{color:'var(--ex-blue)',fontWeight:600}}>Topic {TCUR.num}</span></div>;}
function H2({num,children}){return <div style={{display:'flex',flexDirection:'column',gap:20,marginBottom:48}}><div style={{...T.eyebrow,color:'var(--ex-faint)'}}><span>{num}</span><span style={{width:32,height:1,background:'currentColor'}}></span></div><h2 style={{margin:0,fontFamily:'var(--font-editorial)',fontSize:'var(--type-editorial-md)',fontWeight:300,lineHeight:1.05,letterSpacing:'-0.02em',color:'var(--ex-navy)',maxWidth:820,textWrap:'balance'}}>{children}</h2></div>;}
const ELEMENTS=[
 {n:'01',t:'Source Rock',kr:'유기물이 풍부한 셰일이 매몰되어 열과 압력을 받으면 케로겐이 석유와 가스로 변합니다.',v:()=><image-slot id="tech-source" shape="rect" placeholder="Photo — organic-rich black shale sample"></image-slot>},
 {n:'02',t:'Migration',kr:'생성된 탄화수소는 부력에 의해 투수성 지층과 단층을 따라 위쪽으로 이동합니다.',v:()=><TechViz kind="strata" seed={3}/>},
 {n:'03',t:'Reservoir',kr:'공극과 투과도가 높은 사암·탄산염암이 이동한 유체를 담아 둡니다.',v:()=><image-slot id="tech-core" shape="rect" placeholder="Photo — sandstone core slab"></image-slot>},
 {n:'04',t:'Trap & Seal',kr:'배사 구조나 단층이 닫힌 형태를 만들고, 불투수성 덮개암이 누출을 막습니다.',v:()=><TechViz kind="structure" seed={21}/>},
];
const EVENTS=[['Source rock',[[10,18]],'#0B1A2C'],['Reservoir rock',[[30,14]],'#0B1A2C'],['Seal rock',[[44,10]],'#0B1A2C'],['Overburden',[[54,46]],'#8A98A8'],['Trap formation',[[58,14]],'#0A5CDB'],['Generation · Migration',[[70,30]],'#F29A1F'],['Preservation',[[72,28]],'#12A4D9']];
function EventChart(){return <div style={{fontFamily:'var(--font-editorial)'}}>
 <div style={{display:'grid',gridTemplateColumns:'200px 1fr',fontSize:11,color:'var(--ex-faint)',marginBottom:8}}><span></span><div style={{display:'flex',justifyContent:'space-between'}}>{['200 Ma','150','100','50','0'].map(t=><span key={t}>{t}</span>)}</div></div>
 <div style={{position:'relative'}}>
  {EVENTS.map(([l,bars,c])=><div key={l} style={{display:'grid',gridTemplateColumns:'200px 1fr',alignItems:'center',height:44,borderTop:'1px solid var(--ex-line)'}}><span style={{fontSize:13,color:'var(--ex-navy)'}}>{l}</span><div style={{position:'relative',height:'100%'}}>{bars.map(([a,w],i)=><span key={i} style={{position:'absolute',left:a+'%',width:w+'%',top:15,height:14,background:c,borderRadius:2}}></span>)}</div></div>)}
  <div style={{position:'absolute',top:0,bottom:0,left:'calc(200px + (100% - 200px) * 0.82)',width:2,background:'var(--ex-blue)'}}><span style={{position:'absolute',top:-26,left:-40,width:120,fontSize:11,fontWeight:600,color:'var(--ex-blue)'}}>Critical moment · 36 Ma</span></div>
 </div></div>;}
const PARAMS=[['Total organic carbon (TOC)','3.2 wt%','Rock-Eval pyrolysis'],['Kerogen type','Type II','Visual kerogen / HI–OI'],['Vitrinite reflectance (Ro)','0.85 – 1.10 %','Oil window'],['Reservoir porosity','18 – 24 %','Core & log'],['Permeability','50 – 400 mD','Core plug'],['Seal entry pressure','2.8 MPa','MICP'],['Hydrocarbon column','120 m','Pressure gradient']];
function TechnicalApp(){
 return <div style={{background:'var(--ex-bg)'}}>
  <SiteHeader links={window.OGD_LINKS} active="technology" onNavigate={window.OGD_GO} position="relative"/>
  <section data-category="petroleum" data-topic="pt-generation" style={{padding:'24px var(--gutter-page) 120px'}}><Crumb/>
   <div style={{...T.wrap,alignItems:'stretch',marginTop:40}}>
    <div style={{flex:'1 1 420px',maxWidth:560,paddingTop:48,display:'flex',flexDirection:'column'}}>
     <div style={{...T.eyebrow,color:'var(--ex-faint)'}}><span>{TCUR.cat.num}</span><span style={{width:32,height:1,background:'currentColor'}}></span><span style={{fontWeight:600,color:'var(--ex-blue)'}}>{TCUR.cat.label}</span><span style={{fontVariantNumeric:'tabular-nums'}}>· {TCUR.num}</span></div>
     <h1 style={{margin:'28px 0 0',fontFamily:'var(--font-editorial)',fontSize:'var(--type-editorial-md)',fontWeight:400,lineHeight:1.08,letterSpacing:'-0.02em',color:'var(--ex-navy)',textWrap:'balance'}}>How Hydrocarbons Are Generated, Migrated and Trapped</h1>
     <p style={{...T.body,color:'var(--ex-muted)',maxWidth:500}}>석유 시스템은 수백만 년에 걸쳐 함께 작동하는 지질학적 과정의 집합입니다. 근원암의 유기물이 탄화수소로 바뀌고, 이동하여 저류암에 모이며, 트랩과 덮개암에 의해 보존됩니다. 각 요소와 그 순서가 모두 맞아야 매장량이 됩니다.</p>
     <div style={{marginTop:'auto',paddingTop:48,display:'flex',gap:32,fontFamily:'var(--font-editorial)',fontSize:12,color:'var(--ex-faint)'}}><span>Topic {TCUR.num} of {TCUR.cat.topics.length}</span><span>{TCUR.read} read</span><span>Updated Oct 2026</span></div>
    </div>
    <div style={{flex:'1.4 1 560px',position:'relative',minHeight:620,marginRight:'calc(-1 * var(--gutter-page))'}}><image-slot id="tech-hero" shape="rect" placeholder="Photo — coastal cliff outcrop showing layered sedimentary rock"></image-slot><Callout x="28%" y="58%" label="Outcrop analogue" sub="Reservoir sandstone"/></div>
   </div></section>
  <section style={{background:'#fff',padding:'120px var(--gutter-page)'}}><div style={{maxWidth:1360,margin:'0 auto'}}><H2 num="2.1">Four elements, one system.</H2>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))'}}>{ELEMENTS.map((e,i)=><article key={e.n} style={{padding:'0 28px 8px',borderLeft:i?'1px solid var(--ex-line)':'none',paddingLeft:i?28:0,display:'flex',flexDirection:'column',gap:14}}>
    <span style={{fontFamily:'var(--font-editorial)',fontSize:13,color:'var(--ex-blue)'}}>{e.n}</span><h3 style={{margin:0,fontFamily:'var(--font-editorial)',fontSize:22,fontWeight:600,letterSpacing:'-0.01em',color:'var(--ex-navy)'}}>{e.t}</h3>
    <p style={{margin:0,fontFamily:'var(--font-kr)',fontSize:15,lineHeight:1.7,color:'var(--ex-muted)',minHeight:76}}>{e.kr}</p>
    <div style={{height:180,position:'relative',marginTop:12,borderRadius:4,overflow:'hidden'}}>{e.v()}</div></article>)}</div>
   <div style={{marginTop:40}}><TextLink chevron href="#fig">See the cross-section</TextLink></div></div></section>
  <section id="fig" style={{padding:'120px var(--gutter-page) 0'}}><div style={{maxWidth:1360,margin:'0 auto'}}><H2 num="2.2">Where the system comes together.</H2></div>
   <figure style={{margin:'0 calc(-1 * var(--gutter-page))'}}><div style={{position:'relative',height:640}}><TechViz kind="strata" seed={5}/>
    <Callout x="40%" y="27%" label="Seal" sub="Shale, 80 m"/><Callout x="40%" y="40%" label="Accumulation" sub="Oil leg 120 m"/><Callout x="72%" y="58%" label="Normal fault" sub="Migration pathway"/><Callout x="22%" y="84%" label="Source kitchen" sub="Ro 0.85 – 1.10 %"/>
    <div style={{position:'absolute',right:'var(--gutter-page)',top:'14%',bottom:'6%'}}><DepthRuler marks={['0 m','1,000','2,000','3,000','4,000 m']}/></div></div>
   <figcaption style={{padding:'16px var(--gutter-page) 0',maxWidth:1360+0,margin:'0 auto',fontFamily:'var(--font-editorial)',fontSize:12,color:'var(--ex-faint)'}}>Figure 2.2 — Schematic cross-section of an anticlinal trap. Vertical exaggeration ×5.</figcaption></figure></section>
  <section style={{padding:'120px var(--gutter-page)'}}><div style={{maxWidth:1360,margin:'0 auto',display:'flex',flexWrap:'wrap',gap:'48px 80px'}}>
   <div style={{flex:'1 1 320px',maxWidth:420}}><H2 num="2.3">Timing is the fifth element.</H2><p style={{...T.body,marginTop:0,color:'var(--ex-muted)'}}>트랩은 탄화수소가 이동하기 전에 형성되어 있어야 합니다. 이벤트 차트는 각 요소가 언제 만들어졌는지와, 생성·이동이 시작된 임계 시점(critical moment)을 함께 보여줍니다.</p></div>
   <div style={{flex:'2 1 560px',paddingTop:40}}><EventChart/></div></div></section>
  <section style={{background:'#fff',padding:'120px var(--gutter-page)'}}><div style={{maxWidth:1360,margin:'0 auto'}}><H2 num="2.4">Key parameters.</H2>
   <table style={{width:'100%',borderCollapse:'collapse',fontFamily:'var(--font-editorial)',fontSize:15}}><thead><tr>{['Parameter','Value','Method'].map(h=><th key={h} style={{textAlign:'left',fontSize:11,fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',color:'var(--ex-faint)',padding:'0 0 14px',borderBottom:'1px solid var(--ex-navy)'}}>{h}</th>)}</tr></thead>
   <tbody>{PARAMS.map(([a,b,c])=><tr key={a}><td style={{padding:'18px 0',borderBottom:'1px solid var(--ex-line)',color:'var(--ex-navy)'}}>{a}</td><td style={{padding:'18px 0',borderBottom:'1px solid var(--ex-line)',fontVariantNumeric:'tabular-nums',color:'var(--ex-navy)',fontWeight:600}}>{b}</td><td style={{padding:'18px 0',borderBottom:'1px solid var(--ex-line)',color:'var(--ex-muted)'}}>{c}</td></tr>)}</tbody></table></div></section>
  <section style={{padding:'96px var(--gutter-page) 120px'}}><div style={{maxWidth:1360,margin:'0 auto',display:'flex',flexWrap:'wrap',justifyContent:'space-between',alignItems:'flex-end',gap:40,borderTop:'1px solid var(--ex-line)',paddingTop:40}}>
   {TPREV?<a onClick={()=>openTopic(TPREV)} style={{cursor:'pointer',fontFamily:'var(--font-editorial)',textDecoration:'none',color:'var(--ex-muted)',fontSize:14}}><i className="icon-arrow-left"></i> {TPREV.num} {TPREV.title}</a>:<a style={{fontFamily:'var(--font-editorial)',textDecoration:'none',color:'var(--ex-muted)',fontSize:14}}><i className="icon-arrow-left"></i> {TCUR.cat.num} {TCUR.cat.label} · All topics</a>}
   <div style={{textAlign:'right'}}><div style={{...T.eyebrow,justifyContent:'flex-end',color:'var(--ex-faint)'}}>{TNEXT&&TNEXT.cat===TCUR.cat?'Next topic · '+TNEXT.num:'Next category · '+(TNEXT?TNEXT.cat.num+' '+TNEXT.cat.label:'')}</div><div style={{fontFamily:'var(--font-editorial)',fontSize:'var(--type-editorial-lg)',fontWeight:300,letterSpacing:'-0.02em',lineHeight:1,margin:'16px 0 28px',color:'var(--ex-navy)',maxWidth:760,marginLeft:'auto',textWrap:'balance'}}>{TNEXT&&TNEXT.title}</div><ArrowCTA tone="blue" onClick={()=>openTopic(TNEXT)}>Continue reading</ArrowCTA></div></div></section>
  <SiteFooter/>
  <TechNav categories={TECH} topic={TOPIC} onNavigate={openTopic} defaultOpen={location.hash==='#topics'}/>
 </div>;
}
{const __el=document.getElementById('root');if(__el&&__el.dataset.app==='technical'&&!__el.__mounted&&window.OilGasDevelopmentDesignSystem_dcb6ae&&window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz!==undefined&&window.OilGasDevelopmentDesignSystem_dcb6ae.TechNav!==undefined&&(__el.__mounted=true))ReactDOM.createRoot(__el).render(<TechnicalApp/>);}
