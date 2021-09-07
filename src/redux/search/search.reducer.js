import SearchActionTypes from './search.types';

const INITIAL_STATE = {
  search: null,
  error: null,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_SUCCESS:
      return {
        ...state,
        search: action.payload,
        error: null,
      };
    case SearchActionTypes.SEARCH_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default searchReducer;
