import * as React from 'react';
/** Dense parchment footer: optional disclaimer note, link columns (caption-strong heads, relaxed 2.41 leading), legal row. */
export interface FooterColumn { title: string; links: string[] }
export interface FooterProps {
  columns?: FooterColumn[];
  /** Fine-print disclaimer above the columns (e.g. forward-looking statements) */
  note?: React.ReactNode;
  legal?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Footer(props: FooterProps): JSX.Element;
