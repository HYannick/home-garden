import React from 'react';
import { ActionType, Directions, IAction, IStateProps } from './onboarding.types';

export const initialState: IStateProps = {
  username: '',
  avatar: '',
  disableNext: false,
  tab: 0,
  direction: Directions.NEXT,
  loading: true,
};

const changeState = (state: IStateProps, key: any, value: any) => {
  return {
    ...state,
    [key]: value,
  };
};

export const boardingReducer: React.Reducer<IStateProps, IAction | any> = (state, action) => {

  switch (action.type) {
  case ActionType.SET_USERNAME:
    return changeState(state, 'username', action.payload.username);
  case ActionType.SET_AVATAR:
    return changeState(state, 'avatar', action.payload.avatar);
  case ActionType.DISABLE_NEXT:
    return changeState(state, 'disableNext', action.payload.disableNext);
  case ActionType.SET_DIRECTION:
    return changeState(state, 'direction', action.payload.direction);
  case ActionType.SET_LOADING:
    return changeState(state, 'loading', action.payload.loading);
  case ActionType.SET_TAB:
    return changeState(state, 'tab', action.payload.tab);
  default: {
    return state;
  }
  }
};

export default boardingReducer;
