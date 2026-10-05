Bottom navigation for Technology topic pages — 5 fixed categories with expandable topic collections. Use instead of StageNav on any Technology page; StageNav stays on the Journey homepage.
```jsx
<TechNav categories={OGD_TECH} topic="pt-generation" onNavigate={t=>location.href=t.href} />
```
- Clicking a category opens the tray with that category's topics (preview); the current category keeps the blue rule.
- Prev/next walk the flat topic order and continue into the next category.
- The tray grid auto-fills and scrolls, so adding topics never changes the bar.
