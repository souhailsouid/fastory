/* eslint-disable import/no-cycle */
import { all, call } from 'redux-saga/effects'
import { searchSagas } from 'redux/search/search.sagas'

import { userSagas } from 'redux/user/user.sagas'

export default function * rootSaga () {
  yield all([call(userSagas), call(searchSagas)])
}
