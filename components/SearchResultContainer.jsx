import React from 'react';
import { Redirect } from 'react-router-dom';

import SearchForm from './SearchForm';
import GifsComponent from './Gifs';
import MoreGifsComponent from './MoreGifs';
import Button from './DefaultButton';
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
    isRedirect: false,
  };

  componentDidMount() {
    this.loadGifs();
  }

  handleRequest = () => {
    const newSearchTerm = this.inputElement.value;
    this.setState({
      searchInput: newSearchTerm,
      isRedirect: true,
      isNewSearchRequest: true,
    });
  }

  redirect() {
    const { isRedirect } = this.state;
    return isRedirect ? <Redirect to={`/search?q=${this.inputElement.value}`} /> : null;
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

  getSearchElement = (element) => {
    this.inputElement = element;
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
          onRequest={this.handleRequest}
          inputValue={searchInput}
          getInputValue={this.getSearchElement}
        />
        {this.redirect()}
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

export default SearchResult;
