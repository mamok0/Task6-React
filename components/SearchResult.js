import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import { getQuery } from './api';

class SearchResult extends React.Component {
  constructor() {
    super();
    this.state = {
      gifs: {},
      isFetching: true,
    };
  }

  loadGifs(searchQuery) {
    const queryParams = {
      q: encodeURI(searchQuery),
      limit: '15',
      offset: '0',
      rating: 'G',
      lang: 'en',
      api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
    };
    fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`)
      .then((response) => response.json())
      .then((result) => {
        this.setState({ gifs: result.data, isFetching: false });
      });
  }

  moreGifs() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || localStorage.searchInput;
    const queryParams = {
      q: searchQuery,
      limit: '15',
      offset: document.getElementsByTagName('img').length,
      rating: 'G',
      lang: 'en',
      api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2',
    };

    fetch(`https://api.giphy.com/v1/gifs/search${getQuery(queryParams)}`)
      .then((response) => response.json())
      .then((moreGifs) => {
        moreGifs.data.forEach((gif) => {
          const gifLink = document.createElement('a');
          gifLink.setAttribute('id', 'gif');
          gifLink.setAttribute('href', `/gif/${gif.id}`);

          const gifImg = document.createElement('img');
          gifImg.setAttribute('src', `${gif.images.fixed_height_small.url}`);
          gifImg.setAttribute('alt', `${gif.title}`);
          gifImg.setAttribute('class', 'm-1 img-thumbnail');
          gifLink.appendChild(gifImg);

          document.getElementById('gif-container').appendChild(gifLink);
        });
      });
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || localStorage.searchInput;

    if (!window.location.search) {
      window.history.replaceState({}, '', `/search?q=${searchQuery}`);
      console.log('asdasdasdasdasd');
    }

    const searchForm = <SearchForm key="search-form" inputValue={searchQuery} />;
    const searchLabel = React.createElement(
      'h4',
      { className: 'mt-3', key: 'search-label' },
      `Search results for "${searchQuery}":`,
    );

    this.loadGifs(searchQuery);
    const { gifs, isFetching } = this.state;
    let gifsContainer;

    if (isFetching) {
      gifsContainer = React.createElement('h1', { key: 'loading' }, 'loading...');
    } else {
      const gifsList = [];

      gifs.forEach((gif) => {
        const gifImg = React.createElement(
          'img',
          {
            src: gif.images.fixed_height_small.url,
            className: 'm-1 img-thumbnail',
          },
        );
        const gifLink = <Link key={`link-${gif.id}`} to={`/gif/${gif.id}`}>{gifImg}</Link>;
        gifsList.push(gifLink);
      });

      gifsContainer = React.createElement('div', { id: 'gif-container', key: 'gif-container' }, gifsList);
    }

    const moreButton = React.createElement(
      'input',
      {
        type: 'button',
        className: 'btn btn-success mt-2 mb-4',
        onClick: this.moreGifs,
        value: 'More gifs!',
        key: 'more-button',
      },
    );
    const searchResult = React.createElement(
      'div',
      { id: 'search-result' },
      [searchForm, searchLabel, gifsContainer, moreButton],
    );
    return searchResult;
  }
}

export default SearchResult;
