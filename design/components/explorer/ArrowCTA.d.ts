import * as React from 'react';
/** Editorial call-to-action: 48px filled circle with arrow + label. Used for journey-level actions (Explore, Continue, Descend). */
export interface ArrowCTAProps {
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
  tone?: 'navy' | 'blue' | 'white';
  direction?: 'right' | 'down' | 'up-right';
  style?: React.CSSProperties;
}
export declare function ArrowCTA(props: ArrowCTAProps): JSX.Element;
