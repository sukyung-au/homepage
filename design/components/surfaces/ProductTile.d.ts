import * as React from 'react';
/**
 * Full-bleed, square-cornered section: headline → tagline → pill CTAs → media. Tiles stack with 0 gap; the color change is the divider.
 * @startingPoint section="Sections" subtitle="Full-bleed headline tile, light or dark" viewport="1200x640"
 */
export interface ProductTileProps {
  tone?: 'light' | 'parchment' | 'dark' | 'dark-2' | 'dark-3' | 'black';
  /** Small 21/600 label above the headline */
  eyebrow?: string;
  title: React.ReactNode;
  tagline?: React.ReactNode;
  /** Usually one or two <Button>s */
  actions?: React.ReactNode;
  /** 56px hero headline instead of 40px tile headline */
  hero?: boolean;
  /** Media rendered under the copy (MediaFrame) */
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function ProductTile(props: ProductTileProps): JSX.Element;
