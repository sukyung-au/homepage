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

/** "Scroll to explore" cue on the opening screen; fades in after a moment and out once the reader scrolls on. */
export function ScrollHint({ className }: { className?: string }) {
  const [state, setState] = useState<"off" | "on" | "gone">("off");
  useEffect(() => {
    const t = setTimeout(() => setState((s) => (s === "off" ? "on" : s)), 1200);
    const onScroll = () => setState(window.scrollY > window.innerHeight * 0.25 ? "gone" : "on");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);
  return <p className={className} data-state={state} aria-hidden>Scroll to explore <span>↓</span></p>;
}
