export enum PlantListActionType {
  SET_LOADING = 'SET_LOADING',
  SET_WARNING = 'SET_WARNING',
  SET_PLANTS = 'SET_PLANTS',
  SET_SEARCH = 'SET_SEARCH',
}

export const initialState: any = {
  loading: false,
  warning: 0,
  plants: [],
  searchQuery: ''
};


export const plantListReducer = (state: any = initialState, action: any) => {
  switch (action.type) {
    case PlantListActionType.SET_LOADING: {
      return { ...state, loading: action.loading };
    }
    case PlantListActionType.SET_WARNING: {
      return { ...state, warning: action.warning };
    }
    case PlantListActionType.SET_PLANTS: {
      return { ...state, plants: [...action.plants] };
    }
    case PlantListActionType.SET_SEARCH: {
      return { ...state, searchQuery: action.query };
    }
    default: {
      return state;
    }
  }
};

export default plantListReducer;
