import React from 'react';

import SearchForm from './SearchForm';
import GifsComponent from './GifsComponent';
import MoreGifsComponent from './MoreGifsComponent';
import { getSearchQuery } from './api';


class SearchResult extends React.PureComponent {
  state = {
    gifsOffset: 0,
    searchInput: getSearchQuery(),
  };

  loadMoreGifs() {
    const {
      gifsOffset,
    } = this.state;

    if (gifsOffset > 0) {
      return <MoreGifsComponent offset={gifsOffset} />;
    }

    return '';
  }

  render() {
    const {
      searchInput,
      gifsOffset,
    } = this.state;

    const searchQuery = getSearchQuery();

    if (searchQuery !== searchInput) {
      this.setState({ searchInput: searchQuery });
    }

    window.history.replaceState({}, '', `/search?q=${searchInput}`);

    return (
      <div id="search-result">
        <SearchForm inputValue={searchInput} />
        <GifsComponent requestValue={searchInput} />
        {this.loadMoreGifs()}
        <input
          type="button"
          className="btn btn-success mt-2 mb-4"
          value="More gifs!"
          onClick={() => this.setState({ gifsOffset: gifsOffset + 15 })}
          key="more-button"
        />
      </div>
    );
  }
}

export default SearchResult;
