/** 44px pill search field with leading muted glyph; 1px rgba(0,0,0,.08) border. Only documented input. */
export interface SearchInputProps {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  style?: any;
}
export declare function SearchInput(props: SearchInputProps): JSX.Element;
