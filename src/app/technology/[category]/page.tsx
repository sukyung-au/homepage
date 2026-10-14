import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { TechNav } from "@/components/ds/TechNav";
import { IndexList, SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SITE_LINKS } from "@/lib/site";
import { FLAT_TOPICS, TECH, findCategory, topicLink } from "@/lib/technology";

export const dynamicParams = false;

export function generateStaticParams() {
  return TECH.map((c) => ({ category: c.id }));
}

async function resolve(params: PageProps<"/technology/[category]">["params"]) {
  const { category } = await params;
  const cat = findCategory(category);
  if (!cat) notFound();
  return cat;
}

export async function generateMetadata({ params }: PageProps<"/technology/[category]">): Promise<Metadata> {
  const cat = await resolve(params);
  return { title: `${cat.num} ${cat.label} — Technology — Oil & Gas Development` };
}

/** Category overview: the category's topics from lib/technology.ts (empty until course material is added). */
export default async function CategoryPage({ params }: PageProps<"/technology/[category]">) {
  const cat = await resolve(params);
  const n = cat.topics.length;
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="technology" position="relative" />
      <section className={`${s.page} ${s.clearNav}`} data-category={cat.id}>
        <div className={s.inner}>
          <SectionHead
            crumbs={[{ label: "Technology", href: "/technology" }, { label: `${cat.num} ${cat.label}` }]}
            num={cat.num}
            label="Technology"
            title={cat.label}
            sub={cat.ko}
            meta={<><span>Category {cat.num} of {String(TECH.length).padStart(2, "0")}</span><span>{n} {n === 1 ? "topic" : "topics"}</span></>}
          />
          {n > 0 ? (
            <IndexList
              label={`${cat.label} topics`}
              items={cat.topics.map((t) => ({ id: t.id, num: t.num, title: t.title, href: topicLink(FLAT_TOPICS.find((f) => f.id === t.id)), meta: t.read && `${t.read} read` }))}
            />
          ) : (
            <p className={s.empty}>세부 토픽은 준비 중입니다.</p>
          )}
        </div>
      </section>
      <SiteFooter />
      <TechNav categories={TECH} category={cat.id} />
    </main>
  );
}
