import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import search, { searchSaga } from './search';
import filter from './filter';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['filter'],
};

const rootReducer = combineReducers({
  search,
  filter,
});

export function* rootSaga() {
  yield searchSaga();
}

export default persistReducer(persistConfig, rootReducer);
