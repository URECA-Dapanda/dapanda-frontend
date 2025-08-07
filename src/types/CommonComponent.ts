export interface TitleProps {
  title: string;
}

export type PartialTitleProps = Partial<TitleProps>;

export interface TabProps {
  value: string;
  onChange: (value: string) => void;
}
