import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import GifsComponent from './GifsComponent';
import MoreGifsComponent from './MoreGifsComponent';
import { getGifs, getMoreGifs, getSearchQuery } from './api';
import forgeGifElements from './elementForgery';

class SearchResult extends React.PureComponent {
  state = {
    gifsOffset: 0,
    searchInput: getSearchQuery(),
    gifs: null,
    isFetching: true,
    isMoreFetching: true,
    moreGifs: null,
    nextSearchRequest: false,
  };

  componentDidMount() {
    this.loadGifs();
  }

  handleRequest = () => {
    const { history } = this.props;
    history.push(`/search?q=${document.getElementById('search-input').value}`);
  }

  async loadGifs() {
    const { searchInput } = this.state;
    const response = await getGifs(searchInput);
    const gifsElements = forgeGifElements(response.data);
    this.setState({
      gifs: gifsElements,
      isFetching: false,
    });
  }

  async loadMoreGifs(offset) {
    this.setState({ gifsOffset: offset });

    const response = await getMoreGifs(offset);
    const gifsElements = forgeGifElements(response.data);
    this.setState({
      moreGifs: gifsElements,
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
      nextSearchRequest,
    } = this.state;

    return (
      <div id="search-result">
        <SearchForm
          onRequest={this.handleRequest}
          inputValue={searchInput}
          isNextRequest={nextSearchRequest}
        />
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

SearchResult.propTypes = {
  history: PropTypes.object,
};

SearchResult.defaultProps = {
  history: {},
};

export default SearchResult;
