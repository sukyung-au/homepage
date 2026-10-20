import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { JourneyNav } from "@/components/home/JourneyNav";
import { JourneyScenes } from "@/components/home/Scenes";
import { StageIndex } from "@/components/home/StageIndex";
import { EditMode } from "@/components/intro/EditMode";
import { PresentationFit } from "@/components/intro/PresentationFit";
import { ShowReelV2 } from "@/components/intro/ShowReelV2";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PRESENTER } from "@/lib/presentation";

export const metadata: Metadata = {
  title: `Oil & Gas Development — ${PRESENTER.event}`,
  robots: { index: false },
};

/** Presentation entry: the 15 s v2 intro reel, a self-introduction, then the homepage Journey (v1: /presentation/v1). */
export default function Presentation() {
  return (
    <main>
      <ShowReelV2 prologue />
      <Hero presenter />
      <StageIndex />
      <JourneyScenes />
      <SiteFooter />
      <JourneyNav />
      <EditMode />
      <PresentationFit />
    </main>
  );
}
