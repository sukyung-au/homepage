Sticky bottom journey navigator — always visible on journey pages; updates as scenes enter the viewport.
```jsx
<StageNav stages={STAGES} current={2} onSelect={i=>scrollToScene(i)} />
```
- Shows a 5-stage window around the current stage; pips show all 9.
- The only floating element with a shadow (--shadow-float).
