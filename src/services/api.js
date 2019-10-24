import GifModel from './gifModel';

export function getQuery(queryParams) {
  let url = '?api_key=Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2&';

  Object.entries(queryParams).forEach(([key, value]) => {
    url += `${key}=${value}&`;
  });
  return url;
}

export function getSearchQuery() {
  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get('q');
}

async function getApiResponse(params) {
  const queryParams = {
    q: encodeURI(params.q || getSearchQuery()),
    limit: params.limit || '15',
    offset: params.offset || '0',
    rating: params.rating || 'G',
    lang: params.lang || 'en',
  };

  const response = await fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`);
  const gifs = await response.json();
  const modelGifsData = gifs.data.map((gif) => new GifModel(gif));
  return modelGifsData;
}

export async function getGifs(q) {
  return getApiResponse({ q });
}

export async function getMoreGifs(offset) {
  return getApiResponse({ offset });
}

export async function getGif(id) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + getQuery({})}`);
  const gifData = await response.json();
  return new GifModel(gifData.data);
}

export function createSearchLink(searchTerm) {
  return `/search?q=${searchTerm}`;
}

export default {
  getGifs,
  getGif,
  getMoreGifs,
  getQuery,
  getSearchQuery,
  createSearchLink,
};
