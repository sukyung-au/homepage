import type { Metadata } from "next";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { IndexList, SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { SITE_LINKS } from "@/lib/site";

export const metadata: Metadata = { title: "Case Studies — Oil & Gas Development" };

export default function CaseStudies() {
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="cases" position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead label="Case Studies" title="Case Studies" meta={<span>{CASE_STUDIES.length} cases</span>} />
          <IndexList label="Case studies" items={CASE_STUDIES.map((c, i) => ({ id: c.id, num: String(i + 1).padStart(2, "0"), title: c.title, href: c.href }))} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
