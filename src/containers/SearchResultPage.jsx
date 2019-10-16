import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from '../forms/SearchForm';
import GifsList from '../gifs/GifsList';
import DefaultButton from '../common/DefaultButton';
import {
  getGifs,
  getMoreGifs,
  getSearchQuery,
} from '../services/api';


class SearchResultPage extends React.Component {
  state = {
    gifsOffset: 0,
    searchValue: getSearchQuery(),
    searchInput: getSearchQuery(),
    gifs: [],
    isFetching: true,
  };

  componentDidMount() {
    this.loadGifs();
  }

  componentDidUpdate(prevProps, prevState) {
    const searchTerm = getSearchQuery();
    if (prevState.searchValue !== searchTerm) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        gifs: [],
        searchValue: searchTerm,
        searchInput: searchTerm,
      });
      this.loadGifs();
    }
  }

  handleChange = (event) => {
    this.setState({
      searchInput: event.target.value,
    });
  }

  loadMoreGifs = async () => {
    const { gifs, gifsOffset } = this.state;
    const response = await getMoreGifs(gifsOffset + 15);

    this.setState({
      gifs: gifs.concat(response),
      gifsOffset: gifsOffset + 15,
    });
  }

  async loadGifs() {
    const { gifs } = this.state;
    const response = await getGifs();

    this.setState({
      gifs: gifs.concat(response),
      isFetching: false,
      gifsOffset: 0,
    });
  }

  render() {
    const {
      searchValue,
      gifs,
      isFetching,
      searchInput,
    } = this.state;

    return (
      <div id="search-result">
        <SearchForm
          onChange={this.handleChange}
          inputValue={searchInput}
        />
        <GifsList
          gifs={gifs}
          isFetching={isFetching}
          searchInput={searchValue}
        />
        <DefaultButton
          onClick={this.loadMoreGifs}
        >
          More gifs!
        </DefaultButton>
      </div>
    );
  }
}

SearchResultPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SearchResultPage;
