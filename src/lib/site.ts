export interface SiteLink {
  id: string;
  label: string;
  /** Pages without a route yet render as inert labels */
  href?: string;
}

export const SITE_LINKS: SiteLink[] = [
  { id: "about", label: "About Me", href: "/about" },
  { id: "journey", label: "Journey", href: "/" },
  { id: "technology", label: "Technology", href: "/technology" },
  { id: "cases", label: "Case Studies", href: "/case-studies" },
  { id: "beyond", label: "Beyond the Field", href: "/beyond-the-field" },
];
