import {
  GIFS_LOADED,
  INPUT_CHANGE,
  SEARCH_REQUEST,
  NEXT_SEARCH_REQUEST,
  MORE_GIFS_LOADED,
  GIF_INFO_LOADED,
} from './action-types';

export function gifsLoaded(payload) {
  return { type: GIFS_LOADED, payload };
}

export function moreGifsLoaded(payload) {
  return { type: MORE_GIFS_LOADED, payload };
}

export function inputChange(payload) {
  return { type: INPUT_CHANGE, payload };
}

export function nextSearchRequest(payload) {
  return { type: NEXT_SEARCH_REQUEST, payload };
}

export function searchRequest(payload) {
  return { type: SEARCH_REQUEST, payload };
}

export function gifInfoLoaded(payload) {
  return { type: GIF_INFO_LOADED, payload };
}

export default {
  gifsLoaded,
  inputChange,
  moreGifsLoaded,
  searchRequest,
  nextSearchRequest,
  gifInfoLoaded,
};
