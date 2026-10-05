import React from 'react';
export function SearchInput({value,onChange,placeholder='Search',style}){
 const [f,setF]=React.useState(false);
 return <label style={{display:'flex',alignItems:'center',gap:10,height:44,padding:'0 20px',background:'var(--color-canvas)',border:'1px solid var(--color-hairline-a)',borderRadius:'var(--radius-pill)',outline:f?'2px solid var(--color-primary-focus)':'none',outlineOffset:1,fontFamily:'var(--font-text)',...style}}>
  <i className="icon-search" style={{fontSize:14,color:'var(--color-ink-muted-48)'}}></i>
  <input value={value} onChange={e=>onChange&&onChange(e.target.value)} placeholder={placeholder} onFocus={()=>setF(true)} onBlur={()=>setF(false)} style={{border:'none',outline:'none',background:'transparent',flex:1,fontSize:17,letterSpacing:'-0.374px',color:'var(--color-ink)',fontFamily:'inherit'}}/>
 </label>;
}
