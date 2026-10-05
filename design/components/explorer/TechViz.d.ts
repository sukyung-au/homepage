/**
 * Procedural technical visualization (canvas) in the system's subsurface colormaps. Fills its container.
 * Stand-in until real seismic / log / model exports are supplied.
 */
export interface TechVizProps {
  /** seismic = polarity section · strata = geological cross-section with trap · reservoir = property map (masked, gridded) · structure = depth-contour map · log = well-log tracks · decline = production curves */
  kind?: 'seismic' | 'strata' | 'reservoir' | 'structure' | 'log' | 'decline';
  /** Deterministic seed — same seed, same picture */
  seed?: number;
  /** Seismic/strata: draw a normal fault */
  fault?: boolean;
  /** Reservoir: clip to an irregular field outline (transparent outside) */
  mask?: boolean;
  /** Raster resolution factor 0.25–1 (pixel kinds) */
  resolution?: number;
  label?: string;
  style?: any;
}
export declare function TechViz(props: TechVizProps): JSX.Element;
