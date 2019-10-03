export function getQuery(queryParams) {
  let url = '?';

  Object.entries(queryParams).forEach(([key, value]) => {
    url += `${key}=${value}&`;
  });

  return url;
}

export function getSearchQuery(searchInput) {
  return `/JS-Basics-and-DOM/search${getQuery({ q: searchInput })}`;
}

export async function getGifs(searchInputValue) {
  const queryParams = {
    q: encodeURI(searchInputValue),
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

export async function getMoreGifs(urlParams) {
  const queryParams = {
    q: urlParams.searchInputValue,
    limit: '15',
    offset: urlParams.gifsAmount,
    rating: 'G',
    lang: 'en',
    api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
  };
  const response = await fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`);
  const gifsList = response.json();
  return gifsList;
}

export async function getGif(id, urlParams) {
  const response = await fetch(`https://api.giphy.com/v1/gifs/${id + getQuery(urlParams)}`);
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
