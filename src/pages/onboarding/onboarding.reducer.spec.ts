import boardingReducer, {initialState} from "./onboarding.reducer";
import {ActionType, Directions} from "./onboarding.types";

describe('onBoarding reducer', () => {
  it('should set initialState properly', () => {
    expect(boardingReducer(initialState, {type: null})).toEqual({
      username: '',
      avatar: '',
      disableNext: false,
      loading: true,
      tab: 0,
      direction: Directions.NEXT
    });
  });

  it('should set username properly', () => {
    expect(boardingReducer(initialState, {
      type: ActionType.SET_USERNAME,
      payload: {
        username: 'Anita'
      }
    })).toEqual({
      username: 'Anita',
      avatar: '',
      disableNext: false,
      loading: true,
      tab: 0,
      direction: Directions.NEXT
    })
  });

  it('should set avatar properly', () => {
    expect(boardingReducer(initialState, {
      type: ActionType.SET_AVATAR,
      payload: {
        avatar: 'data:jpeg/randomAvatar'
      }
    })).toEqual({
      username: '',
      avatar: 'data:jpeg/randomAvatar',
      disableNext: false,
      loading: true,
      tab: 0,
      direction: Directions.NEXT
    })
  });

  it('should set disableNext to true properly', () => {
    expect(boardingReducer(initialState, {
      type: ActionType.DISABLE_NEXT,
      payload: {
        disableNext: true
      }
    })).toEqual({
      username: '',
      avatar: '',
      disableNext: true,
      loading: true,
      tab: 0,
      direction: Directions.NEXT
    })
  });

  it('should set tab to 2 properly', () => {
    expect(boardingReducer(initialState, {
      type: ActionType.SET_TAB,
      payload: {
        tab: 2
      }
    })).toEqual({
      username: '',
      avatar: '',
      disableNext: false,
      loading: true,
      tab: 2,
      direction: Directions.NEXT
    })
  });

  it('should set loading properly', () => {
    expect(boardingReducer(initialState, {
      type: ActionType.SET_LOADING,
      payload: {
        loading: false
      }
    })).toEqual({
      username: '',
      avatar: '',
      disableNext: false,
      loading: false,
      tab: 0,
      direction: Directions.NEXT
    })
  });
  it('should set direction properly', () => {
    expect(boardingReducer(initialState, {
      type: ActionType.SET_DIRECTION,
      payload: {
        direction: Directions.PREV
      }
    })).toEqual({
      username: '',
      avatar: '',
      disableNext: false,
      loading: true,
      tab: 0,
      direction: Directions.PREV
    })
  });
});
