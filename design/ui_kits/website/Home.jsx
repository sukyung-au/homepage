const { Button, TextLink, IconButton, ProductTile, MediaFrame, QuoteCard, StickyBar, UtilityCard, OptionChip, SearchInput, GlobalNav, SubNav, Footer } = window.OilGasDevelopmentDesignSystem_dcb6ae;
function HomeScreen({go}){
 return <main>
  <ProductTile tone="light" hero title="Energy, developed." tagline="Onshore and offshore assets built for the long term." actions={<><Button onClick={()=>go('operations')}>Our operations</Button><Button variant="secondary" onClick={()=>go('investors')}>Investor relations</Button></>}>
   <MediaFrame label="Hero photography — drilling pad at first light (21:9)" ratio="21/9"/>
  </ProductTile>
  <ProductTile tone="dark" eyebrow="Permian" title="Delaware Basin" tagline="Long laterals. Lower intensity." actions={<><Button onClick={()=>go('operations')}>Learn more</Button><Button variant="secondary" onDark>View data</Button></>}>
   <div style={{maxWidth:880,margin:'0 auto'}}><MediaFrame label="Aerial of multi-well pad (16:9)" ratio="16/9" tone="dark"/></div>
  </ProductTile>
  <ProductTile tone="parchment" title="Q3 2026 results" tagline="Production, capital, and returns." actions={<><Button>Read the release</Button><Button variant="secondary">Webcast</Button></>}/>
  <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,480px),1fr))',gap:12,padding:12,background:'var(--color-canvas)'}}>
   <ProductTile tone="dark-2" title="Offshore Gulf" tagline="Deepwater, delivered." actions={<Button>Learn more</Button>} style={{paddingTop:56}}><div style={{padding:'0 24px'}}><MediaFrame label="Platform photo" ratio="4/3" tone="dark"/></div></ProductTile>
   <ProductTile tone="parchment" title="Methane intensity" tagline="Down 48% since 2019." actions={<Button onClick={()=>go('sustainability')}>See progress</Button>} style={{paddingTop:56}}><div style={{padding:'0 24px'}}><MediaFrame label="Monitoring equipment render" ratio="4/3"/></div></ProductTile>
  </div>
 </main>;
}
window.HomeScreen=HomeScreen;
