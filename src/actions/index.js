import { createAction } from 'redux-actions';

export const fetchGifList = createAction('FETCH_GIF_LIST');
export const fetchSingleGif = createAction('FETCH_SINGLE_GIF');
export const gifsLoaded = createAction('GIFS_LOADED');
export const gifsUnloaded = createAction('GIFS_UNLOADED');
export const searchRequest = createAction('SEARCH_REQUEST');
export const gifInfoLoaded = createAction('GIF_INFO_LOADED');
export const gifInfoUnloaded = createAction('GIF_INFO_UNLOADED');
export const editingSubmitted = createAction('EDITING_SUBMITTED');
export const deletingSubmitted = createAction('DELETING_SUBMITTED');
export const addingSubmitted = createAction('ADDING_SUBMITTED');
export const switchEditing = createAction('SWITCH_EDITING');
export const switchDeleting = createAction('SWITCH_DELETING');


export default {
  fetchGifList,
  fetchSingleGif,
  gifsLoaded,
  gifsUnloaded,
  gifInfoLoaded,
  gifInfoUnloaded,
  searchRequest,
  editingSubmitted,
  deletingSubmitted,
  switchDeleting,
  switchEditing,
};
