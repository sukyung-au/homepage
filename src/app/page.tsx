import { Hero } from "@/components/home/Hero";
import { JourneyNav } from "@/components/home/JourneyNav";
import { JourneyScenes } from "@/components/home/Scenes";
import { StageIndex } from "@/components/home/StageIndex";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <StageIndex />
      <JourneyScenes />
      <SiteFooter />
      <JourneyNav />
    </main>
  );
}
