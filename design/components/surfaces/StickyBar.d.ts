import * as React from 'react';
/** 64px frosted bar pinned to the viewport bottom: running summary left, blue pill right. */
export interface StickyBarProps {
  label?: React.ReactNode;
  value?: React.ReactNode;
  cta?: string;
  onCta?: () => void;
  /** 'fixed' in pages; 'relative' / 'absolute' for previews */
  position?: 'fixed' | 'sticky' | 'absolute' | 'relative';
  style?: React.CSSProperties;
}
export declare function StickyBar(props: StickyBarProps): JSX.Element;
