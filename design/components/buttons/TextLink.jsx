import React from 'react';
export function TextLink({href='#',onDark=false,chevron=false,underline=false,children,style,onClick}){
 return <a href={href} onClick={onClick} style={{color:onDark?'var(--color-primary-on-dark)':'var(--color-primary)',textDecoration:underline?'underline':'none',display:'inline-flex',alignItems:'center',gap:2,...style}}>{children}{chevron&&<i className="icon-chevron-right" aria-hidden="true" style={{fontSize:'0.85em'}}></i>}</a>;
}
