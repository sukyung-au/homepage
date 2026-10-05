The single action primitive — blue pill for primary CTAs, ghost pill for the second CTA, compact rects for utility actions.
```jsx
<div style={{display:'flex',gap:16}}><Button>Learn more</Button><Button variant="secondary">View reserves</Button></div>
<Button variant="dark-utility">Sign in</Button>
```
- `variant`: primary | secondary | dark-utility | pearl | store-hero
- `onDark` on secondary → Sky Link Blue outline. Primary blue works on dark tiles unchanged.
- Never add shadows or gradients. Press state is scale(0.95); focus is 2px #0071e3 outline.
