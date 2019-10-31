import GifModel from './gifModel';

const defaultParameters = {
  api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
};

export function getQuery(queryParams) {
  let url = '?';
  Object.entries(queryParams).forEach(([key, value]) => {
    url += `${key}=${value}&`;
  });
  return url;
}

export function getSearchQuery() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('q');
}

export async function getGifs(params) {
  const queryParams = {
    q: encodeURI(getSearchQuery()),
    limit: params.limit || '15',
    offset: params.offset || '0',
    rating: params.rating || 'G',
    lang: params.lang || 'en',
  };

  const response = await fetch(`https://api.giphy.com/v1/gifs/search${getQuery({ ...queryParams, ...defaultParameters })}`);
  const gifs = await response.json();
  const modelGifsData = gifs.data.map((gif) => new GifModel(gif));
  return modelGifsData;
}

export async function getGif(id) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + getQuery(defaultParameters)}`);
  const gifData = await response.json();
  return new GifModel(gifData.data);
}

export function createSearchLink(searchTerm) {
  const queryParams = { q: searchTerm };
  return `/search${getQuery({ ...queryParams, ...defaultParameters })}`;
}

export function createApiRequest(method, dataType, body) {
  return {
    method,
    headers: { 'Content-Type': dataType },
    body,
  };
}

export default {
  getGifs,
  getGif,
  getQuery,
  getSearchQuery,
  createSearchLink,
  createApiRequest,
};
