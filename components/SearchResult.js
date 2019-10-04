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
      isMoreFetching: true,
      moreGifs: null,
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

  loadMoreGifs(searchQuery) {
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
      .then((result) => {
        this.setState({ moreGifs: result.data, isMoreFetching: false });
      });
  }

  forgeGifElements(gifs) {
    const gifsList = [];

    gifs.forEach((gif) => {
      const gifImg = React.createElement(
        'img',
        {
          src: gif.images.fixed_height_small.url,
          className: 'm-1 img-thumbnail',
        },
      );
      const gifLink = (
        <Link
          key={`link-${gif.id}`}
          to={
              {
                pathname: `/gif/${gif.id}`,
                state: { isValidUrl: true },
              }
               }
        >
          {gifImg}
        </Link>
      );
      gifsList.push(gifLink);
    });

    return gifsList;
  }

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q') || localStorage.searchInput;

    if (!window.location.search) {
      window.history.replaceState({}, '', `/search?q=${searchQuery}`);
    }

    const searchForm = <SearchForm key="search-form" inputValue={searchQuery} />;
    const searchLabel = React.createElement(
      'h4',
      { className: 'mt-3', key: 'search-label' },
      `Search results for "${searchQuery}":`,
    );

    this.loadGifs(searchQuery, this.state.gifs);


    const {
      gifs,
      isFetching,
      moreGifs,
      isMoreFetching,
    } = this.state;
    let gifsContainer;
    const loadingElement = React.createElement('h1', { key: 'loading' }, 'loading...');

    if (isFetching) {
      gifsContainer = loadingElement;
    } else {
      const gifsList = [];

      gifsList.push(this.forgeGifElements(gifs));

      gifsContainer = React.createElement('div', { id: 'gif-container', key: 'gif-container' }, gifsList);
    }

    let MoreGifsContainer;
    if (moreGifs) {
      if (isMoreFetching) {
        MoreGifsContainer = loadingElement;
      } else {
        MoreGifsContainer = React.createElement('div', { key: 'more-gifs-container' }, this.forgeGifElements(moreGifs));
      }
    } else {
      MoreGifsContainer = null;
    }

    const moreButton = React.createElement(
      'input',
      {
        type: 'button',
        className: 'btn btn-success mt-2 mb-4',
        onClick: () => this.loadMoreGifs(searchQuery),
        value: 'More gifs!',
        key: 'more-button',
      },
    );

    const searchResult = React.createElement(
      'div',
      { id: 'search-result' },
      [searchForm, searchLabel, gifsContainer, MoreGifsContainer, moreButton],
    );

    return searchResult;
  }
}

export default SearchResult;
