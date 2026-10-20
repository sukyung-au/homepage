/**
 * Fit-to-screen for /presentation: the page is laid out at a fixed reference width (FIT_WIDTH, the width the
 * presenter tuned it at) and scaled with CSS `zoom` to the actual window, so every laptop shows the same
 * composition, like a slide. <html> gets `zoom` and `--pz` (the factor; viewport units in the CSS divide by it,
 * see --vw / --vh / --svh in tokens/explorer.css) and data-fit. Narrow windows (< FIT_MIN) keep the normal
 * responsive layout. Layers that work in real screen pixels (the reel canvas, edit-mode UI) zoom back by 1/--pz.
 */
export const FIT_WIDTH = 1528;
export const FIT_MIN = 1000;

const fitSource = `function(){var h=document.documentElement,w=window.innerWidth;if(w<${FIT_MIN}){h.style.removeProperty("zoom");h.style.removeProperty("--pz");delete h.dataset.fit;return}var z=w/${FIT_WIDTH};h.style.zoom=String(z);h.style.setProperty("--pz",String(z));h.dataset.fit=""}`;

/** Inline script, run while the HTML is parsed so the first paint is already fitted */
export const FIT_BOOT = `(function(){try{window.__presentationFit=${fitSource};window.__presentationFit()}catch(e){}})();`;

export function applyFit() {
  (window as unknown as { __presentationFit?: () => void }).__presentationFit?.();
}

export function clearFit() {
  const h = document.documentElement;
  h.style.removeProperty("zoom");
  h.style.removeProperty("--pz");
  delete h.dataset.fit;
}

/** Current zoom factor (1 when not fitted) — convert screen-pixel deltas into the page's CSS pixels */
export function fitZoom() {
  return parseFloat(document.documentElement.style.getPropertyValue("--pz")) || 1;
}
