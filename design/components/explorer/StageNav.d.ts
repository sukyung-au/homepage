/**
 * Sticky bottom navigation showing where the reader is in the development journey (Surface → Field Development).
 * Current stage on the left, a 5-stage window in the middle, 9-step progress pips + CTA on the right.
 */
export interface Stage { id: string; num: string; label: string }
export interface StageNavProps {
  stages: Stage[];
  /** Index of the current stage */
  current?: number;
  onSelect?: (index: number) => void;
  cta?: string;
  onCta?: () => void;
  /** 'fixed' on pages (16px from bottom); 'relative' in previews */
  position?: 'fixed' | 'sticky' | 'relative' | 'absolute';
  /** Number of stages shown in the middle window */
  windowSize?: number;
  style?: any;
}
export declare function StageNav(props: StageNavProps): JSX.Element;
