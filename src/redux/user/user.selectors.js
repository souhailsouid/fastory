import { createSelector } from 'reselect'

const selectUser = (state) => state.user

export const isAuthenticated = createSelector(
  [selectUser],
  (user) => user.currentUser.data
)
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
)
