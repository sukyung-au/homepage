/**
 * Technology information architecture — 5 fixed categories, each an open-ended topic collection.
 * These are NOT the Journey stages. Add topics freely; the TechNav layout does not change.
 * A topic is only navigable once it has a page (`hasPage: true`).
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
  kr?: string;
  topics: TechTopic[];
}

export const TECH: TechCategory[] = [
  {
    id: "petroleum", num: "01", label: "Petroleum System",
    kr: "탄화수소의 생성·이동·집적과 보존을 다루는 지질학적 기초.",
    topics: [
      { id: "pt-generation", num: "1.1", title: "How Hydrocarbons Are Generated, Migrated and Trapped", read: "12 min", hasPage: true },
      { id: "pt-source", num: "1.2", title: "Source Rock Evaluation", read: "9 min" },
      { id: "pt-migration", num: "1.3", title: "Migration Pathways", read: "8 min" },
      { id: "pt-trap", num: "1.4", title: "Trap & Seal Analysis", read: "10 min" },
      { id: "pt-basin", num: "1.5", title: "Basin Modeling", read: "14 min" },
      { id: "pt-play", num: "1.6", title: "Play & Prospect Assessment", read: "11 min" },
    ],
  },
  {
    id: "subsurface", num: "02", label: "Subsurface",
    kr: "지질 구조 해석, 탄성파 탐사, 시추공 검층으로 지하를 이미징합니다.",
    topics: [
      { id: "ss-structure", num: "2.1", title: "Structural Interpretation", read: "10 min" },
      { id: "ss-acq", num: "2.2", title: "Seismic Acquisition", read: "9 min" },
      { id: "ss-proc", num: "2.3", title: "Seismic Processing & Imaging", read: "13 min" },
      { id: "ss-logs", num: "2.4", title: "Well Logging & Petrophysics", read: "12 min" },
      { id: "ss-depth", num: "2.5", title: "Depth Conversion", read: "7 min" },
    ],
  },
  {
    id: "reservoir", num: "03", label: "Reservoir",
    kr: "저류층의 암석·유체 특성과 3차원 정적 모델.",
    topics: [
      { id: "rs-char", num: "3.1", title: "Reservoir Characterization", read: "11 min" },
      { id: "rs-static", num: "3.2", title: "Static Modeling", read: "12 min" },
      { id: "rs-rock", num: "3.3", title: "Rock Properties", read: "8 min" },
      { id: "rs-pvt", num: "3.4", title: "Fluid Properties (PVT)", read: "9 min" },
    ],
  },
  {
    id: "engineering", num: "04", label: "Reservoir Engineering",
    kr: "유동 예측, 시뮬레이션, 회수 증진 전략.",
    topics: [
      { id: "re-mb", num: "4.1", title: "Material Balance", read: "9 min" },
      { id: "re-dca", num: "4.2", title: "Decline Curve Analysis", read: "8 min" },
      { id: "re-sim", num: "4.3", title: "Reservoir Simulation", read: "14 min" },
      { id: "re-wt", num: "4.4", title: "Well Testing", read: "10 min" },
      { id: "re-eor", num: "4.5", title: "Waterflooding & EOR", read: "12 min" },
    ],
  },
  {
    id: "field", num: "05", label: "Field Development",
    kr: "개발 컨셉, 시추 계획, 생산 설비와 경제성의 통합.",
    topics: [
      { id: "fd-concept", num: "5.1", title: "Development Concept Selection", read: "11 min" },
      { id: "fd-wells", num: "5.2", title: "Well Planning", read: "9 min" },
      { id: "fd-fac", num: "5.3", title: "Surface Facilities", read: "10 min" },
      { id: "fd-ops", num: "5.4", title: "Production Operations", read: "9 min" },
      { id: "fd-econ", num: "5.5", title: "Economics & Decommissioning", read: "12 min" },
    ],
  },
];

export interface FlatTopic extends TechTopic {
  category: TechCategory;
}

/** All topics in reading order; prev/next continue across categories. */
export const FLAT_TOPICS: FlatTopic[] = TECH.flatMap((c) => c.topics.map((t) => ({ ...t, category: c })));

export const topicHref = (t: FlatTopic) => `/technology/${t.category.id}/${t.id}`;

/** Href if the topic has a page yet, otherwise undefined. */
export const topicLink = (t: FlatTopic | undefined) => (t && t.hasPage ? topicHref(t) : undefined);

export function findTopic(topicId: string) {
  const i = FLAT_TOPICS.findIndex((t) => t.id === topicId);
  return i < 0
    ? undefined
    : { topic: FLAT_TOPICS[i], prev: FLAT_TOPICS[i - 1] as FlatTopic | undefined, next: FLAT_TOPICS[i + 1] as FlatTopic | undefined };
}

export const FIRST_TOPIC_WITH_PAGE = FLAT_TOPICS.find((t) => t.hasPage)!;
