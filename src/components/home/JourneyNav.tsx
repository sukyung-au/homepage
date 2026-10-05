"use client";
import { useEffect, useState } from "react";
import { StageNav } from "@/components/ds/StageNav";
import { STAGES, sceneId } from "@/lib/stages";

/** Gap kept between an anchored block and the top of the floating rail */
const ANCHOR_GAP = 12;

/**
 * Jump to a stage. By default the scene's top aligns with the viewport top. A scene can mark its key block
 * with [data-nav-anchor] (e.g. the FDP diagram): the jump then scrolls just far enough for that block to end
 * above the rail — but never so far that the scene title (h2) leaves the top of the viewport.
 */
function scrollToStage(i: number) {
  const sec = document.getElementById(sceneId(STAGES[i].id));
  if (!sec) return;
  let top = sec.getBoundingClientRect().top + window.scrollY;
  const anchor = sec.querySelector<HTMLElement>("[data-nav-anchor]");
  const rail = document.querySelector<HTMLElement>("[data-journey-nav]");
  if (anchor && rail) {
    const a = anchor.getBoundingClientRect(), limit = rail.getBoundingClientRect().top - ANCHOR_GAP;
    if (a.height <= limit) top = Math.max(top, a.bottom + window.scrollY - limit);
    const title = sec.querySelector("h2");
    if (title) top = Math.min(top, title.getBoundingClientRect().top + window.scrollY - ANCHOR_GAP);
  }
  window.scrollTo({ top, behavior: "smooth" });
}

/** Tracks which [data-stage] section crosses the viewport midline and drives the sticky StageNav. */
export function JourneyNav() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = STAGES.findIndex((s) => s.id === (e.target as HTMLElement).dataset.stage);
          if (i >= 0) setCur(i);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    document.querySelectorAll("[data-stage]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return <StageNav stages={STAGES} current={cur} onSelect={scrollToStage} />;
}
