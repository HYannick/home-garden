import {useEffect, useReducer} from "react";
import {ActionType, Directions} from "./onboarding.types";
import boardingReducer, {initialState} from "./onboarding.reducer";

interface KeyProps {
  username?: string,
  avatar?: string
}

export const useDisableNext = (value: KeyProps, dispatch: Function) => {
  useEffect(() => {
      dispatch({type: ActionType.DISABLE_NEXT, payload: {disableNext: !value}});
  }, [value, dispatch]);
};

export const useOnBoardingHook = (pages: any[], submitUserInfos: Function) => {
  const [state, dispatch] = useReducer(boardingReducer, initialState);
  const {tab, direction, loading} = state;

  const handleChange = async (direction: string) => {
    switch (direction) {
      case Directions.NEXT:
        if (tab < pages.length - 1) {
          dispatch({
            type: ActionType.SET_DIRECTION,
            payload: {direction: Directions.NEXT}});
          dispatch({
            type: ActionType.SET_TAB,
            payload: {tab: tab + 1}});
        }

        if (tab === pages.length - 1) {
          await submitUserInfos();
        }
        break;
      case Directions.PREV:
        if (tab > 0) {
          dispatch({
            type: ActionType.SET_DIRECTION,
            payload: {direction: Directions.PREV}});
          dispatch({
            type: ActionType.SET_TAB,
            payload: {tab: tab - 1}});
        }
        break;
      default:
        return
    }
  };

  return {
    tab,
    direction,
    loading,
    handleChange,
    state,
    dispatch
  }
};
