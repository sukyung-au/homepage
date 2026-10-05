export interface SiteLink {
  id: string;
  label: string;
  /** Pages without a route yet render as inert labels */
  href?: string;
}

export const SITE_LINKS: SiteLink[] = [
  { id: "journey", label: "Journey", href: "/" },
  { id: "technology", label: "Technology", href: "/technology" },
  { id: "resources", label: "Resources" },
  { id: "storyboard", label: "Storyboard" },
  { id: "system", label: "Design System" },
];
