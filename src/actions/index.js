import {
  GIFS_LOADED,
  SEARCH_REQUEST,
  GIF_INFO_LOADED,
} from './action-types';

export function gifsLoaded(payload) {
  return { type: GIFS_LOADED, payload };
}

export function searchRequest(payload) {
  return { type: SEARCH_REQUEST, payload };
}

export function gifInfoLoaded(payload) {
  return { type: GIF_INFO_LOADED, payload };
}

export default {
  gifsLoaded,
  searchRequest,
  gifInfoLoaded,
};
