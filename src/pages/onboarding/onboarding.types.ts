export interface IStateProps {
  username: string,
  avatar?: string,
  disableNext: boolean,
  tab: number,
  direction: Directions,
  loading: boolean
}

export interface UserInfosProps {
  username: string,
  avatar?: string,
}

export enum ActionType {
  SET_USERNAME = 'SET_USERNAME',
  SET_AVATAR = 'SET_AVATAR',
  DISABLE_NEXT = 'DISABLE_NEXT',
  SET_DIRECTION = 'SET_DIRECTION',
  SET_LOADING = 'SET_LOADING',
  SET_TAB = 'SET_TAB'
}

export enum Directions {
  NEXT = 'next',
  PREV = 'prev'
}

export interface IAction {
  type: ActionType;
  payload: IStateProps,
}
