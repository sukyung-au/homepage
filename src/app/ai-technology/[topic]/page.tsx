import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { SectionHead, sectionStyles as s } from "@/components/section/SectionPage";
import { sceneStyles as ss } from "@/components/site/scene";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading, topicStyles as t } from "@/components/technology/TopicParts";
import { AI_TOPICS, aiTopicHref } from "@/lib/aiTech";
import { SITE_LINKS } from "@/lib/site";
import a from "./AiTopic.module.css";

/**
 * One AI Technology topic. Structure only for now: each section shows its draft summary and planned items
 * (lib/aiTech.ts) until the content is written.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return AI_TOPICS.map((x) => ({ topic: x.id }));
}

const pad = (i: number) => String(i + 1).padStart(2, "0");

async function resolve(params: PageProps<"/ai-technology/[topic]">["params"]) {
  const { topic } = await params;
  const i = AI_TOPICS.findIndex((x) => x.id === topic);
  if (i < 0) notFound();
  return { i, topic: AI_TOPICS[i], prev: AI_TOPICS[i - 1], next: AI_TOPICS[i + 1] };
}

export async function generateMetadata({ params }: PageProps<"/ai-technology/[topic]">): Promise<Metadata> {
  const { topic } = await resolve(params);
  return { title: `${topic.title} — AI Technology — Oil & Gas Development` };
}

export default async function AiTopicPage({ params }: PageProps<"/ai-technology/[topic]">) {
  const { i, topic, prev, next } = await resolve(params);
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="ai" position="relative" />
      <section className={s.page}>
        <div className={s.inner}>
          <SectionHead
            crumbs={[{ label: "AI Technology", href: "/ai-technology" }, { label: `Topic ${pad(i)}` }]}
            num={pad(i)} label={topic.ko} title={topic.title} sub={topic.sub}
            meta={<><span>Topic {pad(i)} of {String(AI_TOPICS.length).padStart(2, "0")}</span><span className={a.draftTag}>Draft · structure only</span></>}
          />
          <p className={`${ss.body} ${a.lede}`}>{topic.summary}</p>
          <ol className={a.toc} aria-label="Topic outline">
            {topic.sections.map((sec, j) => <li key={sec.id}><a href={`#${sec.id}`}><span>{pad(j)}</span>{sec.title}</a></li>)}
          </ol>
        </div>
      </section>

      {topic.sections.map((sec, j) => (
        <section key={sec.id} id={sec.id} className={`${t.section} ${j % 2 === 0 ? t.white : ""} ${a.anchor}`} data-section={sec.id}>
          <div className={`${t.inner} ${a.grid}`}>
            <div>
              <SectionHeading num={pad(j)}>{sec.title}</SectionHeading>
              <p className={`${ss.body} ${a.intent}`}>{sec.intent}</p>
            </div>
            <div className={a.draft}>
              <span className={a.draftLabel}>Planned content</span>
              <ul className={a.plan}>{sec.plan.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </div>
        </section>
      ))}

      <section className={t.next}>
        <div className={t.nextRow}>
          {prev ? (
            <Link href={aiTopicHref(prev)} className={t.back}><ArrowLeft size={14} aria-hidden /> {pad(i - 1)} {prev.title}</Link>
          ) : (
            <Link href="/ai-technology" className={t.back}><ArrowLeft size={14} aria-hidden /> AI Technology · Overview</Link>
          )}
          {next && (
            <div className={t.nextBlock}>
              <div className={`${ss.eyebrow} ${t.nextEyebrow}`}>Next topic · {pad(i + 1)}</div>
              <div className={t.nextTitle}>{next.title}</div>
              <ArrowCTA tone="blue" href={aiTopicHref(next)}>Continue reading</ArrowCTA>
            </div>
          )}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
