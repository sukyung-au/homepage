export interface SiteLink {
  id: string;
  label: string;
  /** Pages without a route yet render as inert labels */
  href?: string;
}

export const SITE_LINKS: SiteLink[] = [
  { id: "journey", label: "Journey", href: "/" },
  { id: "technology", label: "Petroleum Technology", href: "/technology" },
  { id: "ai", label: "AI Technology", href: "/ai-technology" },
  { id: "beyond", label: "Beyond the Field", href: "/beyond-the-field" },
];
