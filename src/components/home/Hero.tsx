import Image from "next/image";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { sceneStyles } from "@/components/site/scene";
import { SITE_LINKS } from "@/lib/site";
import { STAGES, sceneId } from "@/lib/stages";
import s from "./Hero.module.css";

/**
 * Photo hero: the real offshore platform photograph (bright daylight) is the subject. Desktop — the photo
 * fills the hero, anchored right/top so the platform and derrick stay in frame, and the navy V2 typography
 * sits in the open sky/sea on the left over a faint pale gradient. Mobile — copy first, then the photo
 * cropped around the platform. The photo itself is shown unfiltered.
 * data-layer / data-sequence hooks are driven by HeroToExploration (desktop scroll transition).
 */
export function Hero() {
  return (
    <section className={s.hero} data-stage="surface" data-scene="00" data-transition-out="Hero photo hands off to the Exploration scene">
      <SiteHeader links={SITE_LINKS} active="journey" />
      <div className={s.visual} data-layer="photo">
        <Image
          src="/hero-surface.webp"
          alt="Offshore drilling platform on open blue sea under a clear sky"
          fill
          unoptimized
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className={s.photo}
        />
      </div>
      <div className={s.scrim} data-layer="scrim" aria-hidden />
      <div className={s.copy} data-layer="copy">
        <div className={`${sceneStyles.eyebrow} ${s.eyebrow}`} data-sequence="1"><span>A scientific journey in five stages</span></div>
        <h1 className={s.title} data-sequence="2">Oil &amp; Gas<br />Development</h1>
        <p className={s.tagline} data-sequence="3">From Subsurface<br />to Field Development</p>
        <p className={`${sceneStyles.body} ${s.lede}`} data-sequence="4">지표에서 저류층까지, 그리고 생산과 개발까지. 석유개발의 전 과정을 하나의 과학적 여정으로 탐색합니다.</p>
        <div className={s.cta} data-sequence="5"><ArrowCTA href={`#${sceneId(STAGES[0].id)}`}>Explore the Journey</ArrowCTA></div>
      </div>
    </section>
  );
}
