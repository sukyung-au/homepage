/**
 * Case Studies — titles only for now. Add fields (summary, figures, a detail page `href`) as each case is written;
 * the page lists whatever is here, in this order, and numbers it automatically.
 */
export interface CaseStudy {
  id: string;
  title: string;
  /** Detail page, once it exists */
  href?: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  { id: "gas-field-fdp", title: "가스전 추가개발 FDP" },
  { id: "domestic-offshore-gas", title: "국내 해상광구 — 가스" },
  { id: "south-america-oil", title: "남미 유전" },
];
