/** Photography / render slot. Shows a neutral placeholder until `src` is supplied. `shadow` applies the system's single product shadow. */
export interface MediaFrameProps {
  src?: string;
  alt?: string;
  /** Placeholder caption describing the intended image */
  label?: string;
  /** CSS aspect-ratio, e.g. '16/9', '21/9', '1/1' */
  ratio?: string;
  radius?: number | string;
  shadow?: boolean;
  tone?: 'light' | 'dark';
  fit?: 'cover' | 'contain';
  style?: any;
}
export declare function MediaFrame(props: MediaFrameProps): JSX.Element;
