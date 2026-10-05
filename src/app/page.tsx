import { Hero } from "@/components/home/Hero";
import { HeroToExploration } from "@/components/home/HeroToExploration";
import { JourneyNav } from "@/components/home/JourneyNav";
import { ExplorationScene, JourneyScenes } from "@/components/home/Scenes";
import { StageIndex } from "@/components/home/StageIndex";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <main>
      <HeroToExploration hero={<Hero />} index={<StageIndex />} exploration={<ExplorationScene />} />
      <JourneyScenes />
      <SiteFooter />
      <JourneyNav />
    </main>
  );
}
