/**
 * Technology information architecture — the knowledge used along the Journey (NOT the Journey stages).
 *
 * Categories follow the KNOC technical team's disciplines. Data-driven: edit TECH_DATA only. Category numbers
 * (01, 02 …), topic numbers (1.1, 1.2 …), counts and the TechNav rail all follow from it. Topics are added one at
 * a time from the real course material; a topic is listed as "Coming soon" until it has a page (`hasPage: true`
 * plus an entry in app/technology/[category]/[topic]/page.tsx).
 * The previous 5-category IA and its published topic are kept in lib/technologyLegacy.ts.
 */
export interface TechTopic {
  id: string;
  num: string;
  title: string;
  /** Subtitle (topic page and the "next topic" link) */
  sub?: string;
  /** Korean working title from the course outline */
  ko?: string;
  read?: string;
  hasPage?: boolean;
}

export interface TechCategory {
  id: string;
  num: string;
  label: string;
  /** Korean name, shown under the English label */
  ko?: string;
  kr?: string;
  /** Topic id to open instead of the category overview (the category link and /technology/<id> go straight to it) */
  landing?: string;
  topics: TechTopic[];
}

type TopicInput = Omit<TechTopic, "num">;
type CategoryInput = Omit<TechCategory, "num" | "topics"> & { topics: TopicInput[] };

const TECH_DATA: CategoryInput[] = [
  {
    id: "geophysics", label: "Geophysics", ko: "지구물리", landing: "gp-fdp-role",
    topics: [{ id: "gp-fdp-role", title: "Role of Reservoir Geophysics", sub: "Imaging the Reservoir Between the Wells", ko: "FDP에서 지구물리의 역할", hasPage: true }],
  },
  {
    id: "geology", label: "Geology", ko: "지질",
    topics: [{ id: "ge-fdp-role", title: "Role of Geology", sub: "From Rock Evidence to Reservoir Understanding", ko: "FDP에서 지질의 역할", hasPage: true }],
  },
  {
    id: "engineering", label: "Reservoir Engineering", ko: "저류공학",
    topics: [
      { id: "re-role", title: "Role of Reservoir Engineering", sub: "From Reservoir Understanding to Development Decisions", ko: "FDP에서 저류공학의 역할", hasPage: true },
      { id: "re-fundamentals", title: "Reservoir Engineering Fundamentals", sub: "Understanding the Reservoir, From Fluids to Recovery.", ko: "저류공학의 기초", hasPage: true },
      { id: "re-well-test", title: "Pressure & Rate Transient Analysis", sub: "Reading the Reservoir From Pressure and Rate Data", ko: "압력·생산 거동 분석 (PTA·RTA)", hasPage: true },
      { id: "re-simulation", title: "Reservoir Simulation", sub: "Understanding Reservoir Behavior Through Time", ko: "저류층 시뮬레이션", hasPage: true },
    ],
  },
  {
    id: "reserves", label: "Reserves Estimation", ko: "매장량 평가", landing: "rs-estimation",
    topics: [{ id: "rs-estimation", title: "Reserves Estimation", sub: "How Much Can Be Recovered, and How Sure We Are", ko: "매장량 평가", hasPage: true }],
  },
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

/** Category link: its landing topic when one is set, otherwise the category overview. */
export const categoryHref = (c: TechCategory) => (c.landing ? `/technology/${c.id}/${c.landing}` : `/technology/${c.id}`);
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
