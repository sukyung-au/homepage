import Image from "next/image";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { sceneStyles } from "@/components/site/scene";
import { SITE_LINKS } from "@/lib/site";
import { STAGES, sceneId } from "@/lib/stages";
import s from "./Hero.module.css";

/**
 * Photo hero: the real offshore platform photograph is the subject. Desktop — copy on the left over a deep
 * navy field, photo layer on the right whose left edge fades into that field. Mobile — copy first, then the
 * whole (portrait) photo below. The photo itself is shown unfiltered; only a soft navy gradient sits behind
 * the copy for legibility.
 */
export function Hero() {
  return (
    <section className={s.hero} data-stage="surface" data-scene="00" data-transition-out="Hero photo hands off to the Exploration scene">
      <SiteHeader links={SITE_LINKS} active="journey" tone="dark" />
      <div className={s.visual}>
        <Image
          src="/hero-surface.jpg"
          alt="Offshore drilling platform and support vessel at sea at sunset"
          fill
          unoptimized
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 899px) 100vw, 70vw"
          className={s.photo}
        />
      </div>
      <div className={s.scrim} aria-hidden />
      <div className={s.copy}>
        <div className={`${sceneStyles.eyebrow} ${s.eyebrow}`}><span>A scientific journey in five stages</span></div>
        <h1 className={s.title}>Oil &amp; Gas<br />Development</h1>
        <p className={s.tagline}>From Subsurface<br />to Field Development</p>
        <p className={`${sceneStyles.body} ${s.lede}`}>지표에서 저류층까지, 그리고 생산과 개발까지. 석유개발의 전 과정을 하나의 과학적 여정으로 탐색합니다.</p>
        <div className={s.cta}><ArrowCTA tone="white" href={`#${sceneId(STAGES[0].id)}`}>Explore the Journey</ArrowCTA></div>
      </div>
    </section>
  );
}
