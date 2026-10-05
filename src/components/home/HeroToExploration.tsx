"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { HERO_MOTION_QUERY, heroSettledTop } from "@/lib/heroTransition";
import { sceneId } from "@/lib/stages";
import s from "./HeroToExploration.module.css";

type Ease = (t: number) => number;
const linear: Ease = (t) => t;
const easeOut: Ease = (t) => 1 - (1 - t) ** 3;
const easeInOut: Ease = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

/**
 * Scroll progress (0 → 1 over the runway) split into eased segments, written as CSS custom properties.
 * The stylesheet maps each one onto transform / opacity of the existing data-layer / data-sequence hooks.
 */
const TIMELINE: [name: string, from: number, to: number, ease: Ease][] = [
  ["--copy", 0.15, 0.37, linear], //     Hero copy departs (staggered in CSS)
  ["--cam", 0.2, 0.58, easeInOut], //    camera pushes from the platform toward the open sea
  ["--tint", 0.42, 0.56, linear], //     photo ocean pales toward the technical sea colour
  ["--dive", 0.46, 0.68, easeInOut], //  camera descends through sea level
  ["--map", 0.58, 0.7, easeOut], //      regional basin view
  ["--zoom", 0.64, 0.72, linear], //     zoom box → field section guides
  ["--focus", 0.68, 0.84, easeInOut], // field section grows out of the zoom box
  ["--layers", 0.8, 0.92, linear], //    survey → interpretation → drilling (data-sequence)
  ["--text", 0.72, 0.94, linear], //     Exploration narrative settles (staggered in CSS)
];

const EXPLORATION_HASH = `#${sceneId("exploration")}`;

/**
 * V2.4 prototype — Hero → Exploration as one camera move. On desktop the Hero and the Exploration scene share
 * a sticky 100svh stage pinned over a scroll runway; progress drives CSS variables only (no React state per
 * frame). Mobile, short viewports and reduced motion keep the V2.3 static flow: Hero → StageIndex → Exploration.
 */
export function HeroToExploration({ hero, index, exploration }: { hero: ReactNode; index: ReactNode; exploration: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const runway = root?.querySelector<HTMLElement>("[data-pin-runway]");
    if (!root || !runway) return;
    const mq = window.matchMedia(HERO_MOTION_QUERY);
    let top = 0;
    let dist = 1;
    let raf = 0;
    let last = -1;

    /** Start of the field section's grow: the zoom box's rect, expressed in the frame's own layout box */
    const measureFocus = () => {
      const frame = root.querySelector<HTMLElement>('[data-persist="field-section"]');
      const box = root.querySelector('[data-layer="zoom-box"]');
      const parent = frame?.offsetParent;
      if (!frame || !box || !parent || !frame.offsetWidth) return;
      const z = box.getBoundingClientRect(), v = parent.getBoundingClientRect();
      const k = z.width / frame.offsetWidth;
      root.style.setProperty("--fs-s", k.toFixed(4));
      root.style.setProperty("--fs-x", `${(z.left - v.left - frame.offsetLeft).toFixed(1)}px`);
      root.style.setProperty("--fs-y", `${(z.top + z.height / 2 - v.top - frame.offsetTop - (frame.offsetHeight * k) / 2).toFixed(1)}px`);
    };

    const update = () => {
      raf = 0;
      const p = clamp01((window.scrollY - top) / dist);
      if (p === last) return;
      last = p;
      for (const [name, from, to, ease] of TIMELINE) root.style.setProperty(name, ease(clamp01((p - from) / (to - from))).toFixed(4));
      root.toggleAttribute("data-copy-gone", p >= 0.37);
      root.toggleAttribute("data-surface-gone", p >= 0.68);
    };

    const measure = () => {
      top = root.getBoundingClientRect().top + window.scrollY;
      dist = runway.offsetHeight || 1;
      measureFocus();
      last = -1;
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    // CTA "Explore the Journey" → the settled end of the transition (Next's Link skips prevented clicks)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("a[href]");
      if (!a || a.getAttribute("href") !== EXPLORATION_HASH || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const y = heroSettledTop();
      if (y === null) return;
      e.preventDefault();
      window.scrollTo({ top: y, behavior: "smooth" });
    };

    const ro = new ResizeObserver(measure);
    let on = false;
    const enable = () => {
      on = true;
      root.dataset.motionActive = "true";
      ro.observe(root);
      window.addEventListener("scroll", onScroll, { passive: true });
      measure();
      if (window.location.hash === EXPLORATION_HASH) window.scrollTo({ top: heroSettledTop() ?? 0, behavior: "instant" });
    };
    const disable = () => {
      on = false;
      root.dataset.motionActive = "false";
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      raf = 0;
      for (const [name] of TIMELINE) root.style.removeProperty(name);
      root.removeAttribute("data-copy-gone");
      root.removeAttribute("data-surface-gone");
    };
    const onMedia = () => (mq.matches ? enable() : on && disable());

    root.addEventListener("click", onClick);
    mq.addEventListener("change", onMedia);
    onMedia();
    return () => {
      root.removeEventListener("click", onClick);
      mq.removeEventListener("change", onMedia);
      if (on) disable();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={s.root}
      data-hero-transition
      data-transition-in="Real offshore surface (photo)"
      data-transition-hold="Copy departs · camera pushes toward the open sea · descends through sea level"
      data-transition-out="Regional basin view → zoom box → Exploration field section"
    >
      <div className={s.stage}>
        <div className={s.surface}>
          {hero}
          <div className={s.tint} aria-hidden />
          <div className={s.tail} aria-hidden>
            <span className={s.seaLevel}>Sea level · 0 m</span>
          </div>
        </div>
        <div className={s.index}>{index}</div>
        <div className={s.subsurface}>{exploration}</div>
      </div>
      <div className={s.runway} data-pin-runway aria-hidden />
    </div>
  );
}
