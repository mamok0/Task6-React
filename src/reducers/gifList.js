import { handleActions, createAction } from 'redux-actions';

const gifsLoaded = createAction('GIFS_LOADED');
const gifsUnloaded = createAction('GIFS_UNLOADED');

const gifs = handleActions(
  {
    [gifsLoaded]: (state, action) => (
      {
        ...state,
        values: state.values.concat(action.payload.newGifs),
        isGifListFetching: action.payload.isGifListFetching,
        gifListOffset: action.payload.gifListOffset,
      }
    ),
    [gifsUnloaded]: (state) => (
      {
        ...state,
        values: [],
        isGifListFetching: true,
        gifListOffset: 0,
      }
    ),
  },
  {
    values: [],
    gifListOffset: 0,
    isGifListFetching: true,
  },
);

export default gifs;
