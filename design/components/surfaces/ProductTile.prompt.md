The page-building block: a full-bleed tile with centered headline stack and media below.
```jsx
<ProductTile tone="dark" title="Delaware Basin" tagline="Long laterals. Lower intensity."
  actions={<><Button>Learn more</Button><Button variant="secondary" onDark>View data</Button></>}>
  <MediaFrame label="Pad aerial" ratio="21/9" tone="dark" />
</ProductTile>
```
- Alternate light/parchment ↔ dark tones. Use dark-2/dark-3 when two dark tiles touch.
