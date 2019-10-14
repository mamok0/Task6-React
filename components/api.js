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

async function getApiResponse(limit, offset, rating, lang) {
  const queryParams = {
    q: encodeURI(getSearchQuery() || ''),
    limit: limit || '15',
    offset: offset || '0',
    rating: rating || 'G',
    lang: lang || 'en',
  };
  const response = await fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGifs() {
  return getApiResponse();
}

export async function getMoreGifs(offset) {
  return getApiResponse(null, offset, null, null);
}

export async function getGif(id) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + getQuery({})}`);
  const gif = response.json();
  return gif;
}

export function createSearchLink(searchTerm) {
  return `/search?q=${searchTerm}`;
}

export function setRef(input) {
  this.childRef = input;
}


export default {
  getGifs,
  getGif,
  getMoreGifs,
  getQuery,
  getSearchQuery,
  createSearchLink,
  setRef,
};
