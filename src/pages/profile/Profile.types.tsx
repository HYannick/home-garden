import { UserInfosProps } from '../onboarding/onboarding.types';

export interface ChartItemProps {
  name: string,
  label: string,
  variant: string,
  value: number
}

export interface ProfileViewProps {
  t: Function,
  userLoading: boolean,
  userInfos: UserInfosProps,
  countLoading: boolean,
  counters: any,
  chartData: ChartItemProps[]
}
