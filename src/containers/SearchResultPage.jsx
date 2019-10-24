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

  componentDidUpdate() {
    const { searchValue, dispatchSearchRequest, dispatchGifsUnloaded } = this.props;
    const searchTerm = getSearchQuery();

    if (searchValue !== searchTerm) {
      dispatchGifsUnloaded();
      dispatchSearchRequest({
        searchValue: searchTerm,
      });
    }
    this.loadGifs();
  }

  handleMoreGifsClick = async () => {
    const moreGifsAmount = 15;
    const { gifListOffset, dispatchGifsLoaded } = this.props;
    const response = await getMoreGifs(gifListOffset + moreGifsAmount);

    dispatchGifsLoaded({
      newGifs: response,
      isGifListFetching: false,
      gifListOffset: gifListOffset + moreGifsAmount,
    });
  }

  async loadGifs() {
    const { dispatchGifsLoaded, gifs } = this.props;

    if (gifs.length === 0) {
      const response = await getGifs();
      dispatchGifsLoaded({
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
  dispatchGifsLoaded: PropTypes.func.isRequired,
  dispatchSearchRequest: PropTypes.func.isRequired,
  dispatchGifsUnloaded: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  dispatchGifsLoaded: (newData) => dispatch(actions.gifsLoaded(newData)),
  dispatchSearchRequest: (newSearchRequest) => dispatch(actions.searchRequest(newSearchRequest)),
  dispatchGifsUnloaded: () => dispatch(actions.gifsUnloaded()),
});

const mapStateToProps = (state) => ({
  gifs: state.gifList.values,
  isGifListFetching: state.gifList.isGifListFetching,
  gifListOffset: state.gifList.gifListOffset,
  searchValue: state.search.searchValue,
});

const SearchResult = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);


export default SearchResult;
