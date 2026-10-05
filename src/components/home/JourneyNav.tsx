"use client";
import { useEffect, useState } from "react";
import { StageNav } from "@/components/ds/StageNav";
import { STAGES, sceneId } from "@/lib/stages";

function scrollToStage(i: number) {
  document.getElementById(sceneId(STAGES[i].id))?.scrollIntoView({ behavior: "smooth", block: "start" });
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
