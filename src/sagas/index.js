import {
  takeLatest,
  put,
  call,
  fork,
  all,
} from 'redux-saga/effects';

import { gifsLoaded, gifInfoLoaded } from '../actions';
import { getGifs, getGif } from '../services/api';

function* fetchGifList(action) {
  const offset = action.payload;
  const response = yield call(getGifs, { offset: offset || 0 });
  yield put(gifsLoaded({ newGifs: response, isFetching: false, offset }));
}

function* fetchSingleGif(action) {
  const response = yield call(getGif, action.payload);
  yield put(gifInfoLoaded({ gif: response, isFetching: false }));
}

function* watchFetchGifList() {
  yield takeLatest('FETCH_GIF_LIST', fetchGifList);
}

function* watchFetchSingleGif() {
  yield takeLatest('FETCH_SINGLE_GIF', fetchSingleGif);
}

export default function* rootSaga() {
  yield all(
    [
      fork(watchFetchGifList),
      fork(watchFetchSingleGif),
    ],
  );
}
