import { takeLatest, put, all, call } from 'redux-saga/effects'
import Axios from 'axios'
import nookies from 'nookies'
import UserActionTypes from 'redux/user/user.types'
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure
} from './user.actions'

function setCookie (response) {
  const token = response.data.token

  return nookies.set(null, 'cookie_au_noix_de_pecan', token)
}
export function * signIn ({ payload: { username, password } }) {
  try {
    const response = yield Axios.post('http://localhost:5000/login', {
      username,
      password
    })
    setCookie(response)
    yield put(signInSuccess(response))
  } catch (error) {
    yield put(signInFailure(error.response.data.message))
  }
}

export function * signOut () {
  try {
    nookies.destroy(null, 'cookie_au_noix_de_pecan')
    yield put(signOutSuccess())
  } catch (error) {
    yield put(signOutFailure(error))
  }
}

export function * onEmailSignInStart () {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signIn)
}

export function * onSignOutStart () {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function * userSagas () {
  yield all([call(onEmailSignInStart), call(onSignOutStart)])
}
