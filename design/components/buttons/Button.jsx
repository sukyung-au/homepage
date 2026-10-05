import React from 'react';
function usePress(){const [p,setP]=React.useState(false);return [p,{onMouseDown:()=>setP(true),onMouseUp:()=>setP(false),onMouseLeave:()=>setP(false),onTouchStart:()=>setP(true),onTouchEnd:()=>setP(false)}];}
const base={fontFamily:'var(--font-text)',border:'none',cursor:'pointer',display:'inline-flex',alignItems:'center',justifyContent:'center',gap:6,whiteSpace:'nowrap',transition:'transform var(--dur-fast) var(--ease-standard)',textDecoration:'none'};
const variants={
 primary:{background:'var(--color-primary)',color:'var(--color-on-primary)',borderRadius:'var(--radius-pill)',padding:'11px 22px',fontSize:17,fontWeight:400,lineHeight:1.18,letterSpacing:'-0.374px'},
 secondary:{background:'transparent',color:'var(--color-primary)',border:'1px solid var(--color-primary)',borderRadius:'var(--radius-pill)',padding:'10px 21px',fontSize:17,fontWeight:400,lineHeight:1.18,letterSpacing:'-0.374px'},
 'dark-utility':{background:'var(--color-ink)',color:'var(--color-on-dark)',borderRadius:'var(--radius-sm)',padding:'8px 15px',fontSize:14,fontWeight:400,lineHeight:1.29,letterSpacing:'-0.224px'},
 pearl:{background:'var(--color-surface-pearl)',color:'var(--color-ink-muted-80)',border:'3px solid var(--color-divider-soft)',borderRadius:'var(--radius-md)',padding:'8px 14px',fontSize:14,fontWeight:400,lineHeight:1.29,letterSpacing:'-0.224px'},
 'store-hero':{background:'var(--color-primary)',color:'var(--color-on-primary)',borderRadius:'var(--radius-pill)',padding:'14px 28px',fontSize:18,fontWeight:300,lineHeight:1},
};
export function Button({variant='primary',onDark=false,disabled=false,href,children,style,onClick,type='button',...rest}){
 const [pressed,h]=usePress();const [focus,setFocus]=React.useState(false);
 const v={...variants[variant]};
 if(variant==='secondary'&&onDark){v.color='var(--color-primary-on-dark)';v.borderColor='var(--color-primary-on-dark)';}
 const s={...base,...v,transform:pressed&&!disabled?'var(--press-scale)':'none',outline:focus?'2px solid var(--color-primary-focus)':'none',outlineOffset:2,...(disabled?{opacity:1,cursor:'default',color:'var(--color-ink-muted-48)',background:variant==='secondary'?'transparent':'var(--color-divider-soft)',borderColor:'var(--color-hairline)'}:{}),...style};
 const props={...h,onFocus:()=>setFocus(true),onBlur:()=>setFocus(false),style:s,onClick:disabled?undefined:onClick,...rest};
 return href&&!disabled?<a href={href} {...props}>{children}</a>:<button type={type} disabled={disabled} {...props}>{children}</button>;
}
