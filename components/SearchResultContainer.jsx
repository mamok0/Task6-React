import React from 'react';
import { Redirect } from 'react-router-dom';

import SearchForm from './SearchForm';
import GifsComponent from './Gifs';
import MoreGifsComponent from './MoreGifs';
import { getGifs, getMoreGifs, getSearchQuery } from './api';
import forgeGifElements from './elementForgery';

class SearchResult extends React.PureComponent {
  state = {
    gifsOffset: 0,
    searchInput: getSearchQuery(),
    gifs: null,
    isFetching: true,
    isMoreFetching: true,
    moreGifs: [],
    redirect: null,
    newSearchRequest: false,
  };

  componentDidMount() {
    this.loadGifs();
  }

  handleRequest = () => {
    const newSearchTerm = document.getElementById('search-input').value;
    this.setState({
      searchInput: newSearchTerm,
      redirect: <Redirect to={`/search?q=${newSearchTerm}`} />,
      newSearchRequest: true,
    });
  }

  async loadGifs() {
    const { searchInput } = this.state;

    const response = await getGifs(searchInput);
    const gifsElements = forgeGifElements(response.data);
    this.setState({
      gifs: gifsElements,
      isFetching: false,
      newSearchRequest: false,
      isMoreFetching: true,
      moreGifs: [],
      gifsOffset: 0,
    });
  }

  async loadMoreGifs(offset) {
    const { moreGifs } = this.state;
    const muchMoreGifs = [moreGifs];

    this.setState({ gifsOffset: offset });
    const response = await getMoreGifs(offset);
    const newGifsElements = forgeGifElements(response.data);
    muchMoreGifs.push(newGifsElements);
    this.setState({
      moreGifs: muchMoreGifs,
      isMoreFetching: false,
    });
  }

  render() {
    const {
      searchInput,
      gifsOffset,
      gifs,
      isFetching,
      moreGifs,
      isMoreFetching,
      redirect,
      newSearchRequest,
    } = this.state;

    if (newSearchRequest) {
      this.loadGifs();
    }

    return (
      <div id="search-result">
        <SearchForm
          onRequest={this.handleRequest}
          inputValue={searchInput}
        />
        {redirect}
        <GifsComponent gifsData={{ gifs, isFetching, searchInput }} />
        <MoreGifsComponent moreGifsData={{ gifsOffset, moreGifs, isMoreFetching }} />
        <input
          type="button"
          className="btn btn-success mt-2 mb-4"
          value="More gifs!"
          onClick={() => this.loadMoreGifs(gifsOffset + 15)}
          key="more-button"
        />
      </div>
    );
  }
}

export default SearchResult;
