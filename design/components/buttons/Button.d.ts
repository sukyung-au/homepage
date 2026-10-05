import * as React from 'react';
/**
 * Pill CTA, ghost pill, dark utility rect, pearl capsule, or store-hero CTA. Press = scale(0.95).
 * @startingPoint section="Components" subtitle="Pill CTAs and utility buttons" viewport="700x320"
 */
export interface ButtonProps {
  /** primary = blue pill; secondary = ghost pill; dark-utility = 8px rect; pearl = 11px capsule; store-hero = large 18/300 pill */
  variant?: 'primary' | 'secondary' | 'dark-utility' | 'pearl' | 'store-hero';
  /** Secondary pill on dark tiles switches to Sky Link Blue */
  onDark?: boolean;
  disabled?: boolean;
  /** Renders an <a> when set */
  href?: string;
  type?: 'button' | 'submit';
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
