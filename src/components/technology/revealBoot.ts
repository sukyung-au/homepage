/**
 * Inline boot script for the topic scroll motion, run while the HTML is parsed (before first paint).
 * It marks <html data-rm> so entrance states apply from the first frame — unless the visitor prefers reduced
 * motion. If the client bundle never takes over (RevealScope sets data-rm="ready"), it releases the states
 * after 3 s so the content is shown as-is.
 */
export const REVEAL_BOOT = `(function(){try{var h=document.documentElement;if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;h.dataset.rm="pending";setTimeout(function(){if(h.dataset.rm==="pending"){delete h.dataset.rm;window.__rmReleased=true}},3000)}catch(e){}})();`;
