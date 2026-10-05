/**
 * Hero → Exploration scroll transition (desktop). The transition pins one stage for a runway of scroll;
 * while pinned, the Exploration scene's on-screen box doesn't reflect where it "settles", so jumps to it
 * (Hero CTA, Journey nav) must target the end of the runway instead.
 */

/** Same condition as the motion layout in HeroToExploration.module.css */
export const HERO_MOTION_QUERY = "(min-width: 900px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

/** Document scroll position where the transition ends and Exploration is settled; null when motion is off. */
export function heroSettledTop(): number | null {
  const root = document.querySelector<HTMLElement>("[data-hero-transition]");
  const runway = root?.querySelector<HTMLElement>("[data-pin-runway]");
  if (!root || !runway || root.dataset.motionActive !== "true") return null;
  return Math.round(root.getBoundingClientRect().top + window.scrollY + runway.offsetHeight);
}
