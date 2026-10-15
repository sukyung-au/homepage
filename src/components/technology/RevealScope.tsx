"use client";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

declare global {
  interface Window { __rmReleased?: boolean }
}

/**
 * Scroll-entrance driver for a topic page. Each [data-reveal] element inside gets `data-in` once, the first
 * time it reaches the viewport (IntersectionObserver; never removed, so nothing replays or hides again).
 * While <html data-rm> is set, the stylesheet holds not-yet-revealed elements in their entrance state.
 * Free scrolling is untouched: no scroll listeners, snapping or scrubbing.
 */
export function RevealScope({ className, children }: { className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Before paint: arm the entrance states — also on client-side navigation, where the inline boot script does not run.
  useLayoutEffect(() => {
    const html = document.documentElement;
    if (window.__rmReleased || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    html.dataset.rm = "ready";
    return () => { delete html.dataset.rm; };
  }, []);

  useEffect(() => {
    const root = ref.current;
    if (!root || document.documentElement.dataset.rm !== "ready") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0 },
    );
    root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}

/** Placements tried in order (CSS: .hint[data-side][data-level]); the first that covers no text is used. */
const HINT_SPOTS: [string, string][] = [["left", "rail"], ["right", "rail"], ["left", "above"], ["right", "above"], ["center", "above"]];

/** True if the hint's box overlaps the Technology rail or any visible text on the page. */
function coversSomething(hint: HTMLElement) {
  const h = hint.getBoundingClientRect();
  const hit = (r: DOMRect) => r.width > 0 && r.left < h.right && r.right > h.left && r.top < h.bottom && r.bottom > h.top;
  const rail = document.querySelector<HTMLElement>('nav[aria-label="Technology categories"] > div');
  if (rail && hit(rail.getBoundingClientRect())) return true;
  for (const el of document.querySelectorAll<HTMLElement>("main h1, main h2, main h3, main p, main span, main a, main li, main figcaption, main text")) {
    if (el === hint || hint.contains(el) || el.closest("nav") || !el.textContent?.trim()) continue;
    if (hit(el.getBoundingClientRect())) return true;
  }
  return false;
}

/**
 * "Scroll to explore" cue on the opening screen. It fades in after a moment at the first spot that covers no
 * text (beside the rail, else above it), stays hidden if there is none, and fades out once the reader scrolls on.
 */
export function ScrollHint({ className }: { className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<"off" | "on" | "gone">("off");
  const [spot, setSpot] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let free = -1;
    const place = () => {
      free = -1;
      for (let i = 0; i < HINT_SPOTS.length; i++) {
        [el.dataset.side, el.dataset.level] = HINT_SPOTS[i];
        if (getComputedStyle(el).display !== "none" && !coversSomething(el)) { free = i; break; }
      }
      if (free >= 0) setSpot(free);
      return free >= 0;
    };
    const t = setTimeout(() => setState((s) => (s === "off" && window.scrollY < window.innerHeight * 0.25 && place() ? "on" : s)), 1200);
    const onScroll = () => setState((s) => (window.scrollY > window.innerHeight * 0.25 ? "gone" : s === "gone" && free >= 0 ? "on" : s));
    const onResize = () => setState((s) => (s === "on" && !place() ? "off" : s));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const [side, level] = HINT_SPOTS[spot];
  return <p ref={ref} className={className} data-state={state} data-side={side} data-level={level} aria-hidden>Scroll to explore <span>↓</span></p>;
}
