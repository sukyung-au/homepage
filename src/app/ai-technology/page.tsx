import type { Metadata } from "next";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { IndexList, SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AI_TOPICS, aiTopicHref } from "@/lib/aiTech";
import { SITE_LINKS } from "@/lib/site";

export const metadata: Metadata = { title: "AI Technology — Oil & Gas Development" };

export default function AiTechnology() {
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="ai" position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead label="AI Technology" title="AI Technology" sub="Tools, What We Built, Work Automated, and the Rules We Kept"
            meta={<span>{AI_TOPICS.length} topics</span>} />
          <IndexList label="AI Technology topics"
            items={AI_TOPICS.map((t, i) => ({ id: t.id, num: String(i + 1).padStart(2, "0"), title: t.title, href: aiTopicHref(t), meta: t.ko }))} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
