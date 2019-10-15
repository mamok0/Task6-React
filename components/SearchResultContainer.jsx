import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './common/SearchForm';
import GifsList from './gifs/GifsList';
import Button from './common/DefaultButton';
import {
  getGifs,
  getMoreGifs,
  getSearchQuery,
} from './services/api';
import forgeGifElements from './services/elementForgery';

class SearchResultContainer extends React.Component {
  state = {
    gifsOffset: 0,
    searchValue: getSearchQuery(),
    searchInput: getSearchQuery(),
    gifs: null,
    isFetching: true,
  };

  componentDidMount() {
    this.loadGifs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== getSearchQuery()) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        searchValue: getSearchQuery(),
        searchInput: getSearchQuery(),
      });
      this.loadGifs();
    }
  }

  onChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  }

  async loadGifs(term) {
    const { searchInput } = this.state;
    const response = await getGifs(term || searchInput);
    const gifsElements = forgeGifElements(response.data);
    this.setState({
      gifs: gifsElements,
      isFetching: false,
      gifsOffset: 0,
    });
  }

  async loadMoreGifs(offset) {
    const { gifs } = this.state;
    const muchMoreGifs = [gifs];

    this.setState({ gifsOffset: offset });

    const response = await getMoreGifs(offset);
    const newGifsElements = forgeGifElements(response.data);

    muchMoreGifs.push(newGifsElements);

    this.setState({
      gifs: muchMoreGifs,
    });
  }

  render() {
    const {
      searchValue,
      gifsOffset,
      gifs,
      isFetching,
      searchInput,
    } = this.state;

    return (
      <div id="search-result">
        <SearchForm
          onChange={this.onChange}
          inputValue={searchInput}
          onSearch={this.onSearch}
        />
        <GifsList
          gifs={gifs}
          isFetching={isFetching}
          searchInput={searchValue}
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
