import { handleActions } from 'redux-actions';

const gifs = handleActions(
  {
    GIFS_LOADED: (state, action) => (
      Object.assign(
        {},
        state,
        {
          gifs: state.gifs.concat(action.payload.newGifs),
          isGifListFetching: action.payload.isGifListFetching,
          gifListOffset: action.payload.gifListOffset,
        },
      )
    ),
    GIF_INFO_LOADED: (state, action) => (
      Object.assign(
        {},
        state,
        {
          gif: action.payload.gif,
          isGifFetching: action.payload.isGifFetching,
        },
      )
    ),
    GIFS_UNLOADED: (state, action) => (
      Object.assign(
        {},
        state,
        {
          gifs: action.payload.newGifs,
          isGifListFetching: action.payload.isGifListFetching,
          gifListOffset: action.payload.gifListOffset,
        },
      )
    ),
  },
  {},
);

export default gifs;
