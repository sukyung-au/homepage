const { Button, TextLink, IconButton, ProductTile, MediaFrame, QuoteCard, StickyBar, UtilityCard, OptionChip, SearchInput, GlobalNav, SubNav, Footer } = window.OilGasDevelopmentDesignSystem_dcb6ae;
function SustainabilityScreen(){
 const stat=(v,l)=><div><div style={{fontFamily:'var(--font-display)',fontSize:56,fontWeight:600,lineHeight:1.07,letterSpacing:'-0.28px'}}>{v}</div><div style={{fontSize:17,letterSpacing:'-0.374px',marginTop:8,color:'var(--color-body-muted)'}}>{l}</div></div>;
 return <main>
  <QuoteCard label="Landscape photography — prairie at dawn over operated acreage" kicker="Target 2030" title="Zero routine flaring." body="Across every operated asset, verified by continuous monitoring." action={<Button>Read the plan</Button>} style={{minHeight:640}}/>
  <section style={{background:'var(--color-canvas)',padding:'80px 22px'}}>
   <div style={{maxWidth:980,margin:'0 auto'}}>
    <p style={{fontSize:24,fontWeight:300,lineHeight:1.5,color:'var(--color-ink)',margin:0,maxWidth:760}}>We measure emissions at the source, publish the results each quarter, and tie executive pay to the outcome. This page reports where we stand.</p>
    <p style={{marginTop:24}}><TextLink chevron>Download the 2026 sustainability report</TextLink></p>
   </div></section>
  <section style={{background:'var(--color-surface-tile-1)',color:'var(--color-on-dark)',padding:'80px 22px'}}>
   <div style={{maxWidth:980,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:48}}>
    {stat('48%','Lower methane intensity vs. 2019')}{stat('0.09%','Methane emissions intensity')}{stat('71%','Produced water recycled')}
   </div>
   <div style={{maxWidth:980,margin:'48px auto 0'}}><TextLink onDark chevron>Methodology and assurance</TextLink></div>
  </section>
  <ProductTile tone="parchment" title="Water" tagline="Recycled before it is sourced." actions={<><Button>Learn more</Button><Button variant="secondary">Data tables</Button></>}>
   <div style={{maxWidth:880,margin:'0 auto'}}><MediaFrame label="Water recycling facility (16:9)" ratio="16/9"/></div>
  </ProductTile>
 </main>;
}
window.SustainabilityScreen=SustainabilityScreen;
