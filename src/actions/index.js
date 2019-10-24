import { createAction } from 'redux-actions';

export const gifsLoaded = createAction('GIFS_LOADED');
export const gifsUnloaded = createAction('GIFS_UNLOADED');
export const searchRequest = createAction('SEARCH_REQUEST');
export const gifInfoLoaded = createAction('GIF_INFO_LOADED');


export default {
  gifsLoaded,
  gifsUnloaded,
  gifInfoLoaded,
  searchRequest,
};
