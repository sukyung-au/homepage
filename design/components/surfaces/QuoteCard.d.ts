import * as React from 'react';
/** Photographic editorial hero: white centered headline over a landscape photo (tile-1 fallback), airy 24/300 lead, single CTA. */
export interface QuoteCardProps {
  src?: string;
  /** Placeholder caption when no src */
  label?: string;
  kicker?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function QuoteCard(props: QuoteCardProps): JSX.Element;
