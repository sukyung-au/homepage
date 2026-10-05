/** Pill-shaped selectable option (filters, configurations). Selected = 2px Focus Blue border. */
export interface OptionChipProps {
  label: string;
  /** Right-aligned muted detail, e.g. a count or delta */
  detail?: string;
  selected?: boolean;
  /** Optional CSS color for a 24px circular swatch */
  thumb?: string;
  onClick?: () => void;
  style?: any;
}
export declare function OptionChip(props: OptionChipProps): JSX.Element;
