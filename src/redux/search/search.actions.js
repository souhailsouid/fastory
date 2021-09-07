import SearchActionsTypes from './search.types';

export const launchSearch = (query) => ({
  type: SearchActionsTypes.LAUNCH_SEARCH,
  payload: query,
});

export const searchSuccess = (result) => ({
  type: SearchActionsTypes.SEARCH_SUCCESS,
  payload: result,
});

export const searchFailure = (error) => ({
  type: SearchActionsTypes.SEARCH_FAILURE,
  payload: error,
});

export const loadPeople = (people) => ({
  type: SearchActionsTypes.LOAD_PEOPLE,
  payload: people,
});

export const loadCharacter = (id) => ({
  type: SearchActionsTypes.LOAD_CHARACTER,
  payload: id,
});
export const loadResponse = (queryAndPage) => ({
  type: SearchActionsTypes.LOAD_RESPONSE,
  payload: queryAndPage,
});
export const loadURL = (queryAndPage) => ({
  type: SearchActionsTypes.LOAD_URL,
  payload: queryAndPage,
});
