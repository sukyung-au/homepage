import * as React from 'react';
/**
 * White 18px-radius card with 1px hairline, 24px padding: 1:1 image (8px), 17/600 name, 17/400 meta, blue link. No shadow.
 * @startingPoint section="Components" subtitle="Grid card for assets, reports, projects" viewport="700x420"
 */
export interface UtilityCardProps {
  src?: string;
  imageLabel?: string;
  ratio?: string;
  eyebrow?: string;
  title: React.ReactNode;
  meta?: React.ReactNode;
  link?: string;
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function UtilityCard(props: UtilityCardProps): JSX.Element;
