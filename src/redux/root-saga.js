import { all, call } from 'redux-saga/effects';
import { searchSagas } from './search/search.sagas';

import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(searchSagas)]);
}
