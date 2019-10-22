import {
  GIFS_LOADED,
  INPUT_CHANGE,
  NEXT_SEARCH_REQUEST,
  SEARCH_REQUEST,
  MORE_GIFS_LOADED,
  GIF_INFO_LOADED,
} from '../actions/action-types';

const initialState = {
  gifs: [],
  gifListOffset: 0,
  isGifListFetching: true,
  searchValue: '',
  searchInput: '',
  gif: {},
  isGifFetching: true,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, searchInput: action.payload };
    case GIFS_LOADED:
      return {
        ...state,
        gifs: action.payload.newGifs,
        isGifListFetching: action.payload.isGifListFetching,
        gifListOffset: action.payload.gifListOffset,
      };
    case SEARCH_REQUEST:
      return { ...state, searchValue: action.payload.searchValue };
    case NEXT_SEARCH_REQUEST:
      return {
        ...state,
        gifs: action.payload.gifs,
        searchValue: action.payload.searchValue,
        searchInput: action.payload.searchInput,
        gifListOffset: 0,
      };
    case MORE_GIFS_LOADED:
      return {
        ...state,
        gifs: state.gifs.concat(action.payload.moreGifs),
        gifListOffset: action.payload.gifListOffset,
      };
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
