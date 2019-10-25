import {
  takeLatest,
  put,
  call,
  fork,
  all,
} from 'redux-saga/effects';

import { getGifs, getMoreGifs, getGif } from '../services/api';

function* fetchGifList(action) {
  const offset = action.payload;
  let response;

  if (offset !== 0) {
    response = yield call(getMoreGifs, offset);
  } else {
    response = yield call(getGifs);
  }
  yield put({ type: 'GIFS_LOADED', payload: { newGifs: response, isFetching: false, offset } });
}

function* fetchSingleGif() {
  const response = yield call(getGif);
  yield put({ type: 'GIF_INFO_LOADED', payload: { gif: response, isFetching: false } });
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
