/**
 * Beyond the Field — personal chapters. Structure only: add `photos` (files under /public/images/beyond/) and
 * `story` (Korean body text) per chapter when they are ready. Slots without a photo show placeholders.
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
  {
    id: "my-journey-at-knoc",
    title: "My Journey at KNOC",
    photos: [
      { src: "/images/beyond/knoc-1.webp", alt: "울산 한국석유공사 본사 사옥 전경" },
      { src: "/images/beyond/knoc-3.webp", alt: "‘축하합니다! 열정인턴. 어수경.’이라고 적힌 한국석유공사 봉투" },
    ],
  },
  {
    id: "people-and-learning",
    title: "People & Learning",
    photos: [{ src: "/images/beyond/people-1.webp", alt: "사무실에서 커피를 들고 함께 웃고 있는 동료들" }],
  },
  { id: "moments-in-ulsan", title: "Moments in Ulsan" },
  {
    id: "thank-you-knoc",
    title: "Thank You, KNOC",
    photos: [
      { src: "/images/beyond/thank-you-1.webp", alt: "케이크를 앞에 두고 함께 저녁 식사를 하며 찍은 동료들의 사진" },
      { src: "/images/beyond/thank-you-2.webp", alt: "저녁에 건물 앞에서 주먹을 쥐고 함께 찍은 단체 사진" },
    ],
  },
];

/** Photo slots per chapter; slots beyond the supplied photos show placeholders */
export const BEYOND_PHOTO_SLOTS = 2;
