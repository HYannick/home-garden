import { VariantProps } from '../../interfaces';

export interface CardProps extends VariantProps {
  key: string,
}

export interface PlantProp {
  picture: string,
  name: string,
  id: string,
  days_left: number
}

export interface ScheduleProps {
  t: Function,
  loading: boolean,
  plants: PlantProp[],
  warning: number,
  hasErrors: boolean
}
