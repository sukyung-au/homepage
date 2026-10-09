import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { JourneyNav } from "@/components/home/JourneyNav";
import { JourneyScenes } from "@/components/home/Scenes";
import { StageIndex } from "@/components/home/StageIndex";
import { ShowReel } from "@/components/intro/ShowReel";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PRESENTER } from "@/lib/presentation";

export const metadata: Metadata = {
  title: `Oil & Gas Development — ${PRESENTER.event} (v1)`,
  robots: { index: false },
};

/** First intro reel (photo + diagram, 15 s), kept for comparison. The main entry is /presentation. */
export default function PresentationV1() {
  return (
    <main>
      <ShowReel />
      <Hero presenter />
      <StageIndex />
      <JourneyScenes />
      <SiteFooter />
      <JourneyNav />
    </main>
  );
}
