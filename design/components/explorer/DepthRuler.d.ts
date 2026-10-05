/** Thin vertical depth gauge placed at the right edge of journey visuals — anchors every scene to a depth. */
export interface DepthRulerProps {
  marks?: string[];
  tone?: 'light' | 'dark';
  label?: string;
  style?: any;
}
export declare function DepthRuler(props: DepthRulerProps): JSX.Element;
