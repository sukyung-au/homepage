/** Transparent 72px editorial header: type-only wordmark, 13px links, search + KR/EN. Sits over the hero. */
export interface HeaderLink { id: string; label: string }
export interface SiteHeaderProps {
  links?: HeaderLink[];
  active?: string;
  onNavigate?: (id: string) => void;
  tone?: 'light' | 'dark';
  position?: 'absolute' | 'relative' | 'sticky';
  style?: any;
}
export declare function SiteHeader(props: SiteHeaderProps): JSX.Element;
