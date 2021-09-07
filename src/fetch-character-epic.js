import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import {
  map, mergeMap, tap, takeUntil
} from 'rxjs/operators'
import { FETCH_CHARACTERS, fetchCharactersFulfilled } from './actions'

const ENDPOINT = 'http://localhost:5000/people/'

const feddtchCharactersEpic = (action$) => action$.pipe(
  ofType(FETCH_CHARACTERS),
  tap((value) => console.log('Gonna fetch', value)),
  mergeMap(() => ajax.getJSON(ENDPOINT)
    .pipe(
      map((response) => fetchCharactersFulfilled(response)),
      takeUntil(
        action$.pipe(
          tap((value) => console.log('CANCELLING!', value)),
          ofType(FETCH_CHARACTERS)
        )
      )
    ))
)

export default feddtchCharactersEpic
