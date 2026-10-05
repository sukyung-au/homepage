/** 52px frosted parchment sub-nav: section title (21/600) left, 12px links + small blue pill CTA right. */
export interface SubNavLink { id: string; label: string }
export interface SubNavProps {
  title: string;
  links?: SubNavLink[];
  active?: string;
  onNavigate?: (id: string) => void;
  /** Label of the persistent right-aligned pill */
  cta?: string;
  onCta?: () => void;
  style?: any;
}
export declare function SubNav(props: SubNavProps): JSX.Element;
