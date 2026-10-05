/**
 * Sticky bottom navigation for the Technology section: 5 top-level categories, current category + topic position,
 * previous/next topic (continues across categories), and an expandable "All topics" tray listing the category's topic collection.
 * Categories are fixed; topic collections grow without changing the bar layout.
 */
export interface TechTopic { id: string; num: string; title: string; read?: string; href?: string }
export interface TechCategory { id: string; num: string; label: string; kr?: string; topics: TechTopic[] }
export interface TechNavProps {
  categories: TechCategory[];
  /** id of the topic currently being read — determines current category */
  topic?: string;
  /** Called with a topic for prev/next and tray clicks */
  onNavigate?: (topic: TechTopic) => void;
  position?: 'fixed' | 'sticky' | 'relative' | 'absolute';
  /** Start with the topic tray open */
  defaultOpen?: boolean;
  label?: string;
  style?: any;
}
export declare function TechNav(props: TechNavProps): JSX.Element;
