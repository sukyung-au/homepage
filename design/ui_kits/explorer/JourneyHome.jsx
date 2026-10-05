const { TechViz, StageNav, SiteHeader, ArrowCTA, DepthRuler, TextLink, Button, SearchInput } = window.OilGasDevelopmentDesignSystem_dcb6ae;
function HomeApp(){
 const [cur,setCur]=React.useState(0);
 React.useEffect(()=>{const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const i=window.OGD_STAGES.findIndex(s=>s.id===e.target.dataset.stage);if(i>=0)setCur(i);}});},{rootMargin:'-45% 0px -45% 0px'});document.querySelectorAll('[data-stage]').forEach(el=>io.observe(el));return()=>io.disconnect();},[]);
 const go=i=>{const el=document.getElementById('scene-'+window.OGD_STAGES[i].id);if(el)window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY,behavior:'smooth'});};
 return <div style={{background:'var(--ex-bg)'}}>
  <Hero go={go}/><StageIndex go={go}/>
  <SurfaceScene/><PetroleumScene/><SubsurfaceScene/><WellScene/><SeismicScene/><ReservoirScene/><EngineeringScene/><ProductionScene/><FieldScene onTech={()=>window.OGD_GO('technology')}/>
  <SiteFooter/>
  <StageNav stages={window.OGD_STAGES} current={cur} onSelect={go} onCta={()=>go(Math.min(cur+1,8))} cta={cur<8?'Next stage':'Explore the Journey'}/>
 </div>;
}
{const __el=document.getElementById('root');if(__el&&__el.dataset.app==='home'&&!__el.__mounted&&window.OilGasDevelopmentDesignSystem_dcb6ae&&window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz!==undefined&&(__el.__mounted=true))ReactDOM.createRoot(__el).render(<HomeApp/>);}
