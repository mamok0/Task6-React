import React from 'react';
import { Link } from 'react-router-dom';
import SearchForm from './SearchForm';
import { getQuery, getSearchQuery } from './api';

class SearchResult extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      searchInput: localStorage.searchInput,
      gifs: {},
      isFetching: true,
      isMoreFetching: true,
      moreGifs: null,
    };
  }

  componentDidMount() {
    this.loadGifs();
  }

  loadGifs() {
    const queryParams = {
      q: encodeURI(getSearchQuery()),
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

  loadMoreGifs() {
    const gifsAmount = document.getElementsByTagName('img').length;

    const queryParams = {
      q: getSearchQuery(),
      limit: gifsAmount,
      offset: '15',
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
    const searchQuery = getSearchQuery();

    if (this.state.searchInput !== searchQuery) {
      this.setState({ searchInput: searchQuery });
      this.loadGifs();
    }
    console.log('a');

    window.history.replaceState({}, '', `/search?q=${searchQuery}`);


    const searchForm = <SearchForm key="search-form" inputValue={searchQuery} />;
    const searchLabel = React.createElement(
      'h4',
      { className: 'mt-3', key: 'search-label' },
      `Search results for "${searchQuery}":`,
    );

    const {
      gifs,
      isFetching,
      moreGifs,
      isMoreFetching,
    } = this.state;
    let gifsContainer;
    const loadingElement = React.createElement('h1', { key: 'loading' }, 'loading...');
    const gifsList = [];

    if (isFetching) {
      gifsContainer = loadingElement;

      const searchResult = React.createElement(
        'div',
        { id: 'search-result' },
        [searchForm, searchLabel, gifsContainer],
      );
      return searchResult;
    }

    gifsList.push(this.forgeGifElements(gifs));

    let MoreGifsContainer;
    if (moreGifs) {
      if (isMoreFetching) {
        MoreGifsContainer = loadingElement;
      } else {
        gifsList.push(this.forgeGifElements(moreGifs));
      }
    } else {
      MoreGifsContainer = null;
    }

    gifsContainer = React.createElement('div', { id: 'gif-container', key: 'gif-container' }, gifsList);

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
