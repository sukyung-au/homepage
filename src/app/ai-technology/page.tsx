import type { Metadata } from "next";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { IndexList, SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { AI_TOPICS, aiTopicHref } from "@/lib/aiTech";
import { SITE_LINKS } from "@/lib/site";

export const metadata: Metadata = {
  title: "AI Technology — Oil & Gas Development",
  description: "인턴십 기간의 생성형 AI 활용, 바이브 코딩, 업무 자동화를 정리했습니다.",
};

export default function AiTechnology() {
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="ai" position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead label="AI Technology" title="AI Technology" sub="Tools, What We Built, and Work Automated"
            meta={<span>{AI_TOPICS.length} topics</span>} />
          <IndexList label="AI Technology topics"
            items={AI_TOPICS.map((t, i) => ({ id: t.id, num: String(i + 1).padStart(2, "0"), title: t.title, href: aiTopicHref(t), meta: t.ko }))} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
