import type { Metadata } from "next";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { sceneStyles as ss } from "@/components/site/scene";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_LINKS } from "@/lib/site";

export const metadata: Metadata = { title: "Page Not Found — Oil & Gas Development" };

export default function NotFound() {
  return (
    <main>
      <SiteHeader links={SITE_LINKS} position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead num="404" label="Not Found" title="Page Not Found" />
          <p className={ss.body} style={{ margin: "32px 0 40px" }}>찾으시는 페이지가 없거나 주소가 바뀌었습니다.</p>
          <ArrowCTA href="/">Back to the Journey</ArrowCTA>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
