export function getQuery(queryParams) {
  let url = '?';

  Object.entries(queryParams).forEach(([key, value]) => {
    url += `${key}=${value}&`;
  });

  return url;
}

export function getSearchQuery() {
  return localStorage.searchInput;
}

export async function getGifs() {
  const queryParams = {
    q: encodeURI(getSearchQuery()),
    limit: '15',
    offset: '0',
    rating: 'G',
    lang: 'en',
    api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
  };

  const response = await fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getMoreGifs(offset) {
  const queryParams = {
    q: getSearchQuery(),
    limit: '15',
    offset,
    rating: 'G',
    lang: 'en',
    api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
  };

  const response = await fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGif(id) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + getQuery({ api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2' })}`);
  const gif = response.json();
  return gif;
}


export default {
  getGifs,
  getGif,
  getMoreGifs,
  getQuery,
  getSearchQuery,
};
