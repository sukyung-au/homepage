import * as React from 'react';
/** 44×44 translucent circular control that floats over photography (carousel, close, media). */
export interface IconButtonProps {
  /** Lucide icon name, e.g. 'chevron-left', 'x', 'play' */
  icon?: string;
  label?: string;
  size?: number;
  onDark?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
