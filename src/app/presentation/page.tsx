import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { JourneyNav } from "@/components/home/JourneyNav";
import { JourneyScenes } from "@/components/home/Scenes";
import { StageIndex } from "@/components/home/StageIndex";
import { ShowReel } from "@/components/intro/ShowReel";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PRESENTER } from "@/lib/presentation";

export const metadata: Metadata = {
  title: `Oil & Gas Development — ${PRESENTER.event}`,
  robots: { index: false },
};

/** Presentation entry: the homepage Journey, opened by the 15 s intro reel. */
export default function Presentation() {
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
