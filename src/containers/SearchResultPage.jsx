import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../actions';
import SearchForm from '../components/forms/SearchForm';
import GifsList from '../gifs/GifsList';
import DefaultButton from '../components/common/DefaultButton';
import {
  getGifs,
  getMoreGifs,
  getSearchQuery,
} from '../services/api';

class SearchResultPage extends React.Component {
  componentDidMount() {
    this.loadGifs();
  }

  async componentDidUpdate() {
    const { searchValue, searchRequest, gifsUnloaded } = this.props;
    const searchTerm = getSearchQuery();

    if (searchValue !== searchTerm) {
      gifsUnloaded();
      searchRequest({
        searchValue: searchTerm,
      });
    }
    this.loadGifs();
  }

  handleMoreGifsClick = async () => {
    const { gifListOffset, gifsLoaded } = this.props;
    const response = await getMoreGifs(gifListOffset + 15);

    gifsLoaded({
      newGifs: response,
      isGifListFetching: false,
      gifListOffset: gifListOffset + 15,
    });
  }

  async loadGifs() {
    const { gifsLoaded, gifs } = this.props;

    if (gifs.length === 0) {
      const response = await getGifs();
      gifsLoaded({
        newGifs: response,
        isGifListFetching: false,
        gifListOffset: 0,
      });
    }
  }

  render() {
    const {
      searchValue,
      gifs,
      isGifListFetching,
    } = this.props;

    return (
      <div id="search-result">
        <SearchForm searchValue={searchValue} />
        <GifsList
          gifs={gifs}
          isFetching={isGifListFetching}
          searchInput={searchValue}
        />
        <DefaultButton
          onClick={this.handleMoreGifsClick}
          isFetching={isGifListFetching}
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
  searchValue: PropTypes.string.isRequired,
  gifs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      datetime: PropTypes.string,
      original: PropTypes.string,
      id: PropTypes.string,
      preview: PropTypes.string,
    }),
  ).isRequired,
  isGifListFetching: PropTypes.bool.isRequired,
  gifListOffset: PropTypes.number.isRequired,
  gifsLoaded: PropTypes.func.isRequired,
  searchRequest: PropTypes.func.isRequired,
  gifsUnloaded: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  gifsLoaded: (newData) => dispatch(actions.gifsLoaded(newData)),
  searchRequest: (newSearchRequest) => dispatch(actions.searchRequest(newSearchRequest)),
  gifsUnloaded: () => dispatch(actions.gifsUnloaded()),
});

const mapStateToProps = (state) => ({
  gifs: state.gifs.gifs,
  isGifListFetching: state.gifs.isGifListFetching,
  gifListOffset: state.gifs.gifListOffset,
  searchValue: state.search.searchValue,
});

const SearchResult = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);


export default SearchResult;
