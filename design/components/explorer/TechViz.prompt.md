Procedural subsurface visualization — seismic section, geological cross-section, reservoir property map, structure map, well log, production curves.
```jsx
<div style={{height:420}}><TechViz kind="seismic" seed={4} /></div>
<div style={{height:520}}><TechViz kind="log" /></div>
```
- Always size the parent; the canvas fills it.
- Colors come from the viz ramp (--viz-1…7) and seismic polarity ramp. Replace with real exports when available.
