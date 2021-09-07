import { createSelector } from 'reselect'

const selectSearch = (state) => state.search

export const showResults = createSelector(
  [selectSearch],
  (search) => search.search
)
