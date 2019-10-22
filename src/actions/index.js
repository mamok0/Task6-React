import { createActions } from 'redux-actions';

const actions = createActions({
  SEARCH_REQUEST: ({ searchValue }) => ({ searchValue }),
  GIFS_LOADED: ({ newGifs, isGifListFetching, gifListOffset }) => ({
    newGifs,
    isGifListFetching,
    gifListOffset,
  }),
  GIFS_UNLOADED: () => ({
    newGifs: [],
    isGifListFetching: true,
    gifListOffset: 0,
  }),
  GIF_INFO_LOADED: ({ gif, isGifFetching }) => ({ gif, isGifFetching }),
});

export default actions;
