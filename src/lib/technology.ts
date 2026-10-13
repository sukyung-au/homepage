/**
 * Technology information architecture — the knowledge used along the Journey (NOT the Journey stages).
 *
 * Data-driven: edit TECH_DATA only. Category numbers (01, 02 …), topic numbers (1.1, 1.2 …), counts and the
 * TechNav rail all follow from it. Topics are added one at a time from the real course material; a topic is
 * only navigable once it has a page (`hasPage: true` plus an entry in app/technology/[category]/[topic]/page.tsx).
 * The previous 5-category IA is kept in lib/technologyLegacy.ts.
 */
export interface TechTopic {
  id: string;
  num: string;
  title: string;
  read?: string;
  hasPage?: boolean;
}

export interface TechCategory {
  id: string;
  num: string;
  label: string;
  /** Spelled-out name, e.g. "Geology & Geophysics" for G&G */
  full?: string;
  kr?: string;
  topics: TechTopic[];
}

type TopicInput = Omit<TechTopic, "num">;
type CategoryInput = Omit<TechCategory, "num" | "topics"> & { topics: TopicInput[] };

const TECH_DATA: CategoryInput[] = [
  {
    id: "gg", label: "G&G", full: "Geology & Geophysics",
    topics: [
      { id: "pt-generation", title: "How Hydrocarbons Are Generated, Migrated and Trapped", read: "12 min", hasPage: true },
    ],
  },
  { id: "engineering", label: "Reservoir Engineering", topics: [] },
  { id: "evaluation", label: "Reservoir Evaluation", topics: [] },
];

export const TECH: TechCategory[] = TECH_DATA.map((c, i) => ({
  ...c,
  num: String(i + 1).padStart(2, "0"),
  topics: c.topics.map((t, j) => ({ ...t, num: `${i + 1}.${j + 1}` })),
}));

export interface FlatTopic extends TechTopic {
  category: TechCategory;
}

/** All topics in reading order; prev/next continue across categories. */
export const FLAT_TOPICS: FlatTopic[] = TECH.flatMap((c) => c.topics.map((t) => ({ ...t, category: c })));

export const categoryHref = (c: TechCategory) => `/technology/${c.id}`;
export const topicHref = (t: FlatTopic) => `/technology/${t.category.id}/${t.id}`;

/** Href if the topic has a page yet, otherwise undefined. */
export const topicLink = (t: FlatTopic | undefined) => (t && t.hasPage ? topicHref(t) : undefined);

export function findTopic(topicId: string) {
  const i = FLAT_TOPICS.findIndex((t) => t.id === topicId);
  return i < 0
    ? undefined
    : { topic: FLAT_TOPICS[i], prev: FLAT_TOPICS[i - 1] as FlatTopic | undefined, next: FLAT_TOPICS[i + 1] as FlatTopic | undefined };
}

export const findCategory = (id: string) => TECH.find((c) => c.id === id);

/**
 * Reading sequence for the TechNav prev/next buttons: each category's overview page, then its published
 * topics. Categories without topics yet are still reachable.
 */
export type TechStop = { kind: "category"; category: TechCategory; href: string } | { kind: "topic"; topic: FlatTopic; category: TechCategory; href: string };

export const TECH_STOPS: TechStop[] = TECH.flatMap((c) => [
  { kind: "category" as const, category: c, href: categoryHref(c) },
  ...FLAT_TOPICS.filter((t) => t.category.id === c.id && t.hasPage).map((t) => ({ kind: "topic" as const, topic: t, category: c, href: topicHref(t) })),
]);

export const stopTitle = (s: TechStop) => (s.kind === "topic" ? `${s.topic.num} ${s.topic.title}` : `${s.category.num} ${s.category.label} · Overview`);
