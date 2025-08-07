export interface TitleProps {
  title: string;
}

export interface PartialTitleProps extends Partial<TitleProps> {}

export interface TabProps {
  value: string;
  onChange: (value: string) => void;
}
