/**
 * Beyond the Field — personal chapters. Structure only: add `photos` (files under /public/images/beyond/) and
 * `story` (Korean body text) per chapter when they are ready. Empty chapters show photo placeholders.
 */
export interface BeyondPhoto {
  src: string;
  alt: string;
}

export interface BeyondChapter {
  id: string;
  title: string;
  photos?: BeyondPhoto[];
  /** Paragraphs of the chapter's story */
  story?: string[];
}

export const BEYOND: BeyondChapter[] = [
  { id: "my-journey-at-knoc", title: "My Journey at KNOC" },
  { id: "people-and-learning", title: "People & Learning" },
  { id: "moments-in-ulsan", title: "Moments in Ulsan" },
  { id: "thank-you-knoc", title: "Thank You, KNOC" },
];

/** Placeholder photo slots per chapter while no photos are supplied */
export const BEYOND_PHOTO_SLOTS = 2;
