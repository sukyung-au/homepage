import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { DepthRuler } from "@/components/ds/DepthRuler";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { TechViz } from "@/components/ds/TechViz";
import { sceneStyles } from "@/components/site/scene";
import { SITE_LINKS } from "@/lib/site";
import { STAGES, sceneId } from "@/lib/stages";
import s from "./Hero.module.css";

export function Hero() {
  return (
    <section className={s.hero} data-stage="surface" data-scene="00" data-transition-out="Sea level seam moves to viewport center; descent begins">
      <SiteHeader links={SITE_LINKS} active="journey" />
      <div className={s.visual}>
        <div className={s.photo}>
          <ImageSlot id="hero-surface" placeholder="Hero photo — offshore platform, open sea, bright sky" priority sizes="64vw" />
        </div>
        <div className={s.strata}><TechViz kind="strata" seed={11} label="Geological cross-section below the sea floor" /></div>
        <div className={s.seaLevel}>Sea level · ±0 m</div>
        <div className={s.ruler}><DepthRuler marks={["0 m", "1,000", "2,000", "3,000 m"]} /></div>
      </div>
      <div className={s.copy}>
        <div className={`${sceneStyles.eyebrow} ${s.eyebrow}`}><span>A scientific exploration in nine stages</span></div>
        <h1 className={s.title}>Oil &amp; Gas<br />Development</h1>
        <p className={s.tagline}>From Subsurface<br />to Field Development</p>
        <p className={`${sceneStyles.body} ${s.lede}`}>지표에서 저류층까지, 그리고 생산과 개발까지. 석유개발의 전 과정을 하나의 과학적 여정으로 탐색합니다.</p>
        <div className={s.cta}><ArrowCTA href={`#${sceneId(STAGES[0].id)}`}>Explore the Journey</ArrowCTA></div>
      </div>
    </section>
  );
}
