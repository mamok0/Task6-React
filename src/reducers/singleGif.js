import { handleActions, createAction } from 'redux-actions';

const gifInfoLoaded = createAction('GIF_INFO_LOADED');

const singleGif = handleActions(
  {
    [gifInfoLoaded]: (state, action) => (
      {
        ...state,
        value: action.payload.gif,
        isGifFetching: action.payload.isGifFetching,
      }
    ),
  },
  {
    value: {},
    isGifFetching: true,
  },
);

export default singleGif;
