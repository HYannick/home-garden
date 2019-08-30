import { VariantProps } from '../../interfaces';

export interface ArticleProps {
  id: number,
  link: string,
  picture: string,
  title: string,
  source: string
}

export interface PlaceHolderProps extends VariantProps {
  stopAnimate?: boolean
}
