import * as React from 'react';
/** Inline link in Action Blue (light) or Sky Link Blue (dark). */
export interface TextLinkProps {
  href?: string;
  onDark?: boolean;
  /** Append a › chevron (e.g. "Learn more ›") */
  chevron?: boolean;
  underline?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
export declare function TextLink(props: TextLinkProps): JSX.Element;
