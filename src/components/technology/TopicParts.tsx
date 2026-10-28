import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { ArrowCTA } from "@/components/ds/ArrowCTA";
import { sceneStyles as ss } from "@/components/site/scene";
import { categoryHref, topicLink, type FlatTopic } from "@/lib/technology";
import s from "./Topic.module.css";

export { s as topicStyles };

/** Technology / 01 Category (its overview) / Topic 1.1 */
export function Crumb({ topic }: { topic: FlatTopic }) {
  return (
    <nav className={s.crumb} aria-label="Breadcrumb">
      <Link href="/technology">Petroleum Technology</Link>
      <span aria-hidden>/</span>
      <Link href={categoryHref(topic.category)}>{topic.category.num} {topic.category.label}</Link>
      <span aria-hidden>/</span>
      <span className={s.crumbCurrent} aria-current="page">Topic {topic.num}</span>
    </nav>
  );
}

/** Numbered section heading: eyebrow number + rule, light editorial H2. */
export function SectionHeading({ num, children }: { num: string; children: ReactNode }) {
  return (
    <div className={s.h2wrap}>
      <div className={ss.eyebrow}><span>{num}</span><span className={ss.eyebrowRule} /></div>
      <h2 className={s.h2}>{children}</h2>
    </div>
  );
}

/**
 * End-of-topic navigation. Left: previous topic, or the category overview when this is the first topic.
 * Right: the next topic — labelled "Next category" when it crosses into the next category.
 */
export function TopicNext({ topic, prev, next }: { topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }) {
  const prevHref = topicLink(prev);
  const nextHref = topicLink(next);
  const sameCat = next && next.category.id === topic.category.id;
  return (
    <section className={s.next}>
      <div className={s.nextRow}>
        {prev ? (
          prevHref ? (
            <Link href={prevHref} className={s.back}><ArrowLeft size={14} aria-hidden /> {prev.num} {prev.title}</Link>
          ) : (
            <span className={s.back}><ArrowLeft size={14} aria-hidden /> {prev.num} {prev.title}</span>
          )
        ) : (
          <Link href={categoryHref(topic.category)} className={s.back}><ArrowLeft size={14} aria-hidden /> {topic.category.num} {topic.category.label} · Overview</Link>
        )}
        {next && (
          <div className={s.nextBlock}>
            <div className={`${ss.eyebrow} ${s.nextEyebrow}`}>
              {sameCat ? `Next topic · ${next.num}` : `Next category · ${next.category.num} ${next.category.label}`}
            </div>
            <div className={s.nextTitle}>{next.title}</div>
            <ArrowCTA tone="blue" href={nextHref} title={nextHref ? undefined : "Coming soon"}>{nextHref ? "Continue reading" : "Coming soon"}</ArrowCTA>
          </div>
        )}
      </div>
    </section>
  );
}
