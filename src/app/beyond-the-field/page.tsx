import type { Metadata } from "next";
import { ImageSlot } from "@/components/ds/ImageSlot";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { Eyebrow, sceneStyles as ss } from "@/components/site/scene";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BEYOND, BEYOND_PHOTO_SLOTS } from "@/lib/beyond";
import { SITE_LINKS } from "@/lib/site";

export const metadata: Metadata = { title: "Beyond the Field — Oil & Gas Development" };

export default function BeyondTheField() {
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="beyond" position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead label="Beyond the Field" title="Beyond the Field" meta={<span>{BEYOND.length} chapters</span>} />
          <div className={s.stories}>
            {BEYOND.map((ch, i) => {
              const num = String(i + 1).padStart(2, "0");
              return (
                <article key={ch.id} id={ch.id} className={s.story} aria-labelledby={`${ch.id}-title`}>
                  <div className={s.storyText}>
                    <Eyebrow num={num} />
                    <h2 id={`${ch.id}-title`} className={s.storyTitle}>{ch.title}</h2>
                    {ch.story?.length ? ch.story.map((p, j) => <p key={j} className={ss.body} style={{ margin: 0 }}>{p}</p>) : <span className={s.soon} style={{ alignSelf: "flex-start" }}>Coming soon</span>}
                  </div>
                  <div className={s.photos}>
                    {ch.photos?.length
                      ? ch.photos.map((ph, j) => <div key={j} className={s.photo}><ImageSlot id={`${ch.id}-${j + 1}`} placeholder={ph.alt} src={ph.src} alt={ph.alt} sizes="(max-width: 734px) 100vw, 40vw" /></div>)
                      : Array.from({ length: BEYOND_PHOTO_SLOTS }, (_, j) => <div key={j} className={s.photo}><ImageSlot id={`${ch.id}-${j + 1}`} placeholder={`Photo · ${ch.title}`} /></div>)}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
