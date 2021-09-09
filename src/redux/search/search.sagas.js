import { takeLatest, put, all, call } from 'redux-saga/effects'
import { searchSuccess, searchFailure } from 'redux/search/search.actions'
import SearchActionsTypes from 'redux/search/search.types'
import UseCustomAxios from 'services/custom-axios'

export function * launchSearch ({ payload: { query } }) {
  try {
    const response = yield UseCustomAxios().get(`/${query}`)
    yield put(searchSuccess(response))
  } catch (error) {
    document.location.href = '/erreur-404'
    yield put(searchFailure(error.response.data.message))
  }
}

function convertArgs (args) {
  switch (typeof args) {
    case undefined:
      return ''
    case 'string':
      return `${args}`
    default:
      return ''
  }
}

function isNumeric (value) {
  return !isNaN(value)
}

function endPointFollowingContext (query, page, pathname) {
  const urlIncludesPages = pathname.includes('/page/')
  const urlNotIncludesPages = !pathname.includes('/page/')
  const urlIncludesWookiee = pathname.includes('format=wookiee')
  const urlNotIncludesWookiee = !pathname.includes('format=wookiee')

  if (convertArgs(page) === '') {
    return `${convertArgs(query)}`
  }

  if (isNumeric(page) && urlNotIncludesPages && urlNotIncludesWookiee) {
    return `${convertArgs(query)}/${convertArgs(page)}`
  }
  if (isNumeric(page) && urlIncludesPages) {
    return `${convertArgs(query)}/page/${convertArgs(page)}`
  }
  if (isNumeric(page) && urlNotIncludesPages && urlIncludesWookiee) {
    return `${convertArgs(query)}/${convertArgs(page)}/format=wookiee`
  }
}

export function * showResult ({ payload: { query, page, pathname } }) {
  try {
    const response = yield UseCustomAxios().get(
      endPointFollowingContext(query, page, pathname)
    )

    yield put(searchSuccess(response))
  } catch (error) {
    yield put(searchFailure(error.response.data.message))
  }
}

export function * onSearchResult () {
  yield takeLatest(SearchActionsTypes.LAUNCH_SEARCH, launchSearch)
}

export function * onLoadResponse () {
  yield takeLatest(SearchActionsTypes.LOAD_RESPONSE, showResult)
}

export function * searchSagas () {
  yield all([call(onSearchResult), call(onLoadResponse)])
}
