import Image from "next/image";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { sceneStyles } from "@/components/site/scene";
import { PRESENTER } from "@/lib/presentation";
import { SITE_LINKS } from "@/lib/site";
import { STAGES, sceneId } from "@/lib/stages";
import s from "./Hero.module.css";

/**
 * Photo hero: the real offshore platform photograph (bright daylight) is the subject. Desktop — the photo
 * fills the hero, anchored right/top so the platform and derrick stay in frame, and the navy V2 typography
 * sits in the open sky/sea on the left over a faint pale gradient. Mobile — copy first, then the photo
 * cropped around the platform. The photo itself is shown unfiltered.
 */
/**
 * `presenter` adds the presentation credit line under the CTA (used on /presentation). Elements marked
 * [data-reel-target] fade in first when the v2 intro reel surfaces, before the rest of the Hero; the reel
 * measures [data-reel-photo] to settle on the photo's horizon and trace its platform.
 */
export function Hero({ presenter = false }: { presenter?: boolean }) {
  return (
    <section className={s.hero} data-stage="surface" data-scene="00" data-transition-out="Hero photo hands off to the Exploration scene">
      <SiteHeader links={SITE_LINKS} active="journey" />
      <div className={s.visual}>
        <Image
          src="/hero-surface.webp"
          alt="Offshore drilling platform on open blue sea under a clear sky"
          fill
          unoptimized
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className={s.photo}
          data-reel-photo
        />
      </div>
      <div className={s.scrim} aria-hidden />
      <div className={s.copy}>
        <div className={`${sceneStyles.eyebrow} ${s.eyebrow}`}><span>A scientific journey in five stages</span></div>
        <h1 className={s.title} data-reel-target>Oil &amp; Gas<br />Development</h1>
        <p className={s.tagline} data-reel-target>From Subsurface<br />to Field Development</p>
        <p className={`${sceneStyles.body} ${s.lede}`}>지표에서 저류층까지, 그리고 생산과 개발까지. 석유개발의 전 과정을 하나의 과학적 여정으로 탐색합니다.</p>
        <div className={s.cta}><ArrowCTA href={`#${sceneId(STAGES[0].id)}`}>Explore the Journey</ArrowCTA></div>
        {presenter && (
          <p className={s.presenter} data-reel-target>
            <span>{PRESENTER.org} · {PRESENTER.event}</span>
            {PRESENTER.team} {PRESENTER.name}
          </p>
        )}
      </div>
    </section>
  );
}
