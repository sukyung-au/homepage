const { Button, TextLink, IconButton, ProductTile, MediaFrame, QuoteCard, StickyBar, UtilityCard, OptionChip, SearchInput, GlobalNav, SubNav, Footer } = window.OilGasDevelopmentDesignSystem_dcb6ae;
const NAV=[{id:'operations',label:'Operations'},{id:'sustainability',label:'Sustainability'},{id:'investors',label:'Investors'},{id:'careers',label:'Careers'},{id:'news',label:'News'}];
const SUB={home:null,operations:{title:'Operations',links:[{id:'o',label:'Overview'},{id:'a',label:'Assets'},{id:'d',label:'Production data'}],active:'a',cta:'Investor deck'},sustainability:{title:'Sustainability',links:[{id:'e',label:'Emissions'},{id:'w',label:'Water'},{id:'c',label:'Communities'}],active:'e',cta:'Report'}};
function App(){
 const [page,setPage]=React.useState(()=>localStorage.getItem('ogd-page')||'home');
 const go=p=>{const t=['home','operations','sustainability'].includes(p)?p:'home';setPage(t);localStorage.setItem('ogd-page',t);window.scrollTo(0,0);};
 const sub=SUB[page];
 const Screen={home:HomeScreen,operations:OperationsScreen,sustainability:SustainabilityScreen}[page];
 return <div>
  <GlobalNav links={NAV} active={page} onNavigate={go}/>
  {sub&&<SubNav {...sub}/>}
  <div data-screen-label={page}><Screen go={go}/></div>
  <Footer note="This website contains forward-looking statements, including production and emissions targets, which involve risks and uncertainties. Actual results may differ materially."
   columns={[{title:'Operations',links:['Assets','Midstream','Production data','Safety']},{title:'Sustainability',links:['Emissions','Water','Communities','Reports']},{title:'Investors',links:['Quarterly results','Events','Stock information','SEC filings']},{title:'Company',links:['Leadership','Careers','News','Contact']}]}
   legal="Copyright © 2026 Oil & Gas Development. All rights reserved."/>
 </div>;
}
{const __el=document.getElementById('root');if(__el&&__el.dataset.app==='website'&&!__el.__mounted&&window.OilGasDevelopmentDesignSystem_dcb6ae&&window.OilGasDevelopmentDesignSystem_dcb6ae.TechViz!==undefined&&(__el.__mounted=true))ReactDOM.createRoot(__el).render(<App/>);}
