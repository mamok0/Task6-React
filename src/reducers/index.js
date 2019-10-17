import {
  GIFS_LOADED,
  SEARCH_REQUEST,
  GIF_INFO_LOADED,
} from '../actions/action-types';
import { getSearchQuery } from '../services/api';

const initialState = {
  gifs: [],
  gifListOffset: 0,
  isGifListFetching: true,
  searchValue: getSearchQuery() || '',
  gif: {},
  isGifFetching: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GIFS_LOADED:
      return {
        ...state,
        gifs: state.gifs.concat(action.payload.newGifs),
        isGifListFetching: action.payload.isGifListFetching,
        gifListOffset: action.payload.gifListOffset,
      };
    case SEARCH_REQUEST:
      return { ...state, searchValue: action.payload.searchValue, gifs: action.payload.gifs };
    case GIF_INFO_LOADED:
      return {
        ...state,
        gif: action.payload.gif,
        isGifFetching: action.payload.isGifFetching,
      };
    default:
      return state;
  }
}

export default rootReducer;
