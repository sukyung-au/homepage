const { Button, TextLink, IconButton, ProductTile, MediaFrame, QuoteCard, StickyBar, UtilityCard, OptionChip, SearchInput, GlobalNav, SubNav, Footer } = window.OilGasDevelopmentDesignSystem_dcb6ae;
const ASSETS=[
 {id:'del',region:'Permian',title:'Delaware Basin',meta:'142 kboe/d net',kind:'Oil'},
 {id:'mid',region:'Permian',title:'Midland Basin',meta:'96 kboe/d net',kind:'Oil'},
 {id:'eag',region:'Gulf Coast',title:'Eagle Ford',meta:'58 kboe/d net',kind:'Oil'},
 {id:'hay',region:'Gulf Coast',title:'Haynesville',meta:'1.1 Bcf/d gross',kind:'Natural gas'},
 {id:'mar',region:'Appalachia',title:'Marcellus',meta:'0.9 Bcf/d gross',kind:'Natural gas'},
 {id:'gom',region:'Offshore',title:'Gulf of Mexico',meta:'64 kboe/d net',kind:'Oil'},
 {id:'ngl',region:'Midstream',title:'Gathering & processing',meta:'2,400 miles of pipe',kind:'NGLs'},
 {id:'bak',region:'Rockies',title:'Williston Basin',meta:'41 kboe/d net',kind:'Oil'},
];
function OperationsScreen(){
 const [q,setQ]=React.useState('');const [kind,setKind]=React.useState('All');const [picked,setPicked]=React.useState([]);
 const list=ASSETS.filter(a=>(kind==='All'||a.kind===kind)&&(a.title+a.region).toLowerCase().includes(q.toLowerCase()));
 const toggle=id=>setPicked(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]);
 return <main style={{background:'var(--color-canvas-parchment)',paddingBottom:picked.length?96:0}}>
  <section style={{maxWidth:1440,margin:'0 auto',padding:'64px 22px 80px'}}>
   <h1 style={{margin:0,fontFamily:'var(--font-display)',fontSize:56,fontWeight:600,lineHeight:1.07,letterSpacing:'-0.28px',color:'var(--color-ink)'}}>Assets.</h1>
   <p style={{margin:'8px 0 32px',fontSize:28,lineHeight:1.14,letterSpacing:'0.196px',color:'var(--color-ink-muted-48)'}}>Every operated basin, in one place.</p>
   <div style={{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center',marginBottom:32}}>
    <SearchInput value={q} onChange={setQ} placeholder="Search basins and regions" style={{flex:'1 1 280px',maxWidth:420}}/>
    {['All','Oil','Natural gas','NGLs'].map(k=><OptionChip key={k} label={k} selected={kind===k} onClick={()=>setKind(k)}/>)}
   </div>
   <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:20}}>
    {list.map(a=><div key={a.id} style={{position:'relative'}}>
     <UtilityCard eyebrow={a.region} title={a.title} meta={a.meta} link={picked.includes(a.id)?'Added to data request':'Add to data request'} imageLabel={a.title+' map'} ratio="4/3" onClick={()=>toggle(a.id)} style={picked.includes(a.id)?{border:'2px solid var(--color-primary-focus)',padding:23}:{}}/>
    </div>)}
    {!list.length&&<p style={{color:'var(--color-ink-muted-48)'}}>No assets match “{q}”.</p>}
   </div>
  </section>
  {picked.length>0&&<StickyBar label={picked.length+' selected'} value={ASSETS.filter(a=>picked.includes(a.id)).map(a=>a.title).join(' · ')} cta="Request data room access" onCta={()=>setPicked([])}/>}
 </main>;
}
window.OperationsScreen=OperationsScreen;
