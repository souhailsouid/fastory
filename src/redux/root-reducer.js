import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import searchReducer from './search/search.reducer'
import userReducer from './user/user.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'search']
}
const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer
})

export default persistReducer(persistConfig, rootReducer)
