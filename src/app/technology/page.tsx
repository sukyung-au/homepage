import type { Metadata } from "next";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { IndexList, SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_LINKS } from "@/lib/site";
import { FLAT_TOPICS, TECH, topicLink } from "@/lib/technology";

export const metadata: Metadata = {
  title: "Petroleum Technology — Oil & Gas Development",
  description: "석유개발 과정에서 쓰이는 기술 지식을 분야별로 정리했습니다.",
};

/** Technology entry point: every category with its topics (lib/technology.ts). */
export default function TechnologyIndex() {
  const n = FLAT_TOPICS.length;
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="technology" position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead label="Petroleum Technology" title="Petroleum Technology" sub="The Knowledge Used Along the Journey"
            meta={<><span>{TECH.length} categories</span><span>{n} {n === 1 ? "topic" : "topics"}</span></>} />
          {TECH.map((cat) => (
            <section key={cat.id} id={cat.id} className={s.group} aria-labelledby={`${cat.id}-title`}>
              <h2 id={`${cat.id}-title`} className={s.groupHead}>
                <span className={s.num}>{cat.num}</span>
                <span className={s.groupTitle}>{cat.label}</span>
                {cat.ko && <span className={s.groupKo}>{cat.ko}</span>}
              </h2>
              <IndexList
                label={`${cat.label} topics`}
                items={cat.topics.map((t) => ({ id: t.id, num: t.num, title: t.title, href: topicLink(FLAT_TOPICS.find((f) => f.id === t.id)), meta: t.ko }))}
              />
            </section>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
