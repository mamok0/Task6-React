import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import Gifs from './Gifs';
import Button from './DefaultButton';
import {
  getGifs,
  getMoreGifs,
  getSearchQuery,
  createSearchLink,
} from './api';
import forgeGifElements from './elementForgery';

class SearchResultContainer extends React.Component {
  state = {
    gifsOffset: 0,
    searchInput: getSearchQuery(),
    gifs: null,
    isFetching: true,
    moreGifs: [],
  };

  componentDidMount() {
    this.loadGifs();
  }

  setRef = (input) => {
    this.childRef = input;
  }

  handleRequest = () => {
    const { history } = this.props;
    history.push(createSearchLink(this.childRef.value));
    this.setState({
      searchInput: this.childRef.value,
      isNewSearchRequest: true,
    });
  }

  async loadGifs() {
    const { searchInput } = this.state;

    const response = await getGifs(searchInput);
    const gifsElements = forgeGifElements(response.data);
    this.setState({
      gifs: gifsElements,
      isFetching: false,
      isNewSearchRequest: false,
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
    });
  }

  render() {
    const {
      searchInput,
      gifsOffset,
      gifs,
      isFetching,
      moreGifs,
      isNewSearchRequest,
    } = this.state;

    if (isNewSearchRequest) {
      this.loadGifs();
    }

    return (
      <div id="search-result">
        <SearchForm
          onClick={this.handleRequest}
          inputValue={searchInput}
          setInput={this.setRef}
        />
        <Gifs
          gifs={[gifs, moreGifs]}
          isFetching={isFetching}
          searchInput={searchInput}
        />
        <Button
          className="btn btn-success mt-2 mb-4"
          onClick={() => this.loadMoreGifs(gifsOffset + 15)}
          buttonText="More gifs!"
        />
      </div>
    );
  }
}

SearchResultContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SearchResultContainer;
