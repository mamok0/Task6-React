import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import GifsComponent from './Gifs';
import MoreGifsComponent from './MoreGifs';
import Button from './DefaultButton';
import {
  getGifs,
  getMoreGifs,
  getSearchQuery,
  setRef,
  createSearchLink,
} from './api';
import forgeGifElements from './elementForgery';

class SearchResult extends React.PureComponent {
  state = {
    gifsOffset: 0,
    searchInput: getSearchQuery(),
    gifs: null,
    isFetching: true,
    isMoreFetching: true,
    moreGifs: [],
  };

  setRef = setRef.bind(this);

  componentDidMount() {
    this.loadGifs();
  }

  handleRequest = () => {
    const newSearchTerm = this.childRef.value;
    this.setState({
      searchInput: newSearchTerm,
      isNewSearchRequest: true,
    });
  }

  redirect = () => {
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
      isNewSearchRequest,
    } = this.state;
    if (isNewSearchRequest) {
      this.loadGifs();
    }

    return (
      <div id="search-result">
        <SearchForm
          handleClick={this.redirect}
          inputValue={searchInput}
          setInput={this.setRef}
        />
        <GifsComponent
          gifs={gifs}
          isFetching={isFetching}
          searchInput={searchInput}
        />
        <MoreGifsComponent
          gifsOffset={gifsOffset}
          moreGifs={moreGifs}
          isMoreFetching={isMoreFetching}
        />
        <Button
          className="btn btn-success mt-2 mb-4"
          handleClick={() => this.loadMoreGifs(gifsOffset + 15)}
          buttonText="More gifs!"
        />
      </div>
    );
  }
}

SearchResult.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

SearchResult.defaultProps = {
  history: {},
};
export default SearchResult;
