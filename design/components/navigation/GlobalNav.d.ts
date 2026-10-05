/** 44px pure-black top bar: brand wordmark (type only), 12px links, search + locale icons. */
export interface NavLink { id: string; label: string }
export interface GlobalNavProps {
  /** Rendered as plain type — no logo was supplied */
  brand?: string;
  links?: NavLink[];
  active?: string;
  onNavigate?: (id: string) => void;
  style?: any;
}
export declare function GlobalNav(props: GlobalNavProps): JSX.Element;
