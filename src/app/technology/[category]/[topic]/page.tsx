import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/ds/SiteHeader";
import { TechNav } from "@/components/ds/TechNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { PetroleumGenerationTopic } from "@/components/technology/PetroleumGenerationTopic";
import { SITE_LINKS } from "@/lib/site";
import { FLAT_TOPICS, TECH, findTopic, type FlatTopic } from "@/lib/technology";

/** Topic id → page body. Add an entry (and set `hasPage` in lib/technology.ts) to publish a topic. */
const TOPIC_PAGES: Record<string, ComponentType<{ topic: FlatTopic; prev?: FlatTopic; next?: FlatTopic }>> = {
  "pt-generation": PetroleumGenerationTopic,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return FLAT_TOPICS.filter((t) => t.hasPage && TOPIC_PAGES[t.id]).map((t) => ({ category: t.category.id, topic: t.id }));
}

async function resolve(params: PageProps<"/technology/[category]/[topic]">["params"]) {
  const { category, topic } = await params;
  const found = findTopic(topic);
  if (!found || found.topic.category.id !== category || !TOPIC_PAGES[topic]) notFound();
  return found;
}

export async function generateMetadata({ params }: PageProps<"/technology/[category]/[topic]">): Promise<Metadata> {
  const { topic } = await resolve(params);
  return { title: `${topic.num} ${topic.title} — Oil & Gas Development` };
}

export default async function TopicPage({ params }: PageProps<"/technology/[category]/[topic]">) {
  const { topic, prev, next } = await resolve(params);
  const Body = TOPIC_PAGES[topic.id];
  return (
    <main>
      <SiteHeader links={SITE_LINKS} active="technology" position="relative" />
      <Body topic={topic} prev={prev} next={next} />
      <SiteFooter />
      <TechNav categories={TECH} topic={topic.id} />
    </main>
  );
}
