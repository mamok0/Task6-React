import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { gifsLoaded, searchRequest } from '../actions';
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
    const { gifs } = this.props;

    if (gifs.length === 0) {
      this.loadGifs();
    }
  }

  async componentDidUpdate() {
    const { gifs, searchValue, dispatchSearchRequest } = this.props;
    const searchTerm = getSearchQuery();

    if (gifs.length === 0) {
      this.loadGifs();
    }

    if (searchValue !== searchTerm) {
      const response = await getGifs();
      dispatchSearchRequest({
        searchValue: searchTerm,
        gifs: response,
      });
    }
  }

  handleMoreGifsClick = async () => {
    const { gifListOffset, dispatchGifsLoaded } = this.props;
    const response = await getMoreGifs(gifListOffset + 15);

    dispatchGifsLoaded({
      newGifs: response,
      isGifListFetching: false,
      gifListOffset: gifListOffset + 15,
    });
  }

  async loadGifs() {
    const { dispatchGifsLoaded } = this.props;
    const response = await getGifs();
    dispatchGifsLoaded({
      newGifs: response,
      isGifListFetching: false,
      gifListOffset: 0,
    });
  }

  render() {
    const {
      searchValue,
      gifs,
      isGifListFetching,
    } = this.props;
    return (
      <div id="search-result">
        <SearchForm />
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
};


const mapDispatchToProps = (dispatch) => ({
  dispatchGifsLoaded: bindActionCreators(gifsLoaded, dispatch),
  dispatchSearchRequest: bindActionCreators(searchRequest, dispatch),
});

const mapStateToProps = (state) => ({
  gifs: state.gifs,
  isGifListFetching: state.isGifListFetching,
  gifListOffset: state.gifListOffset,
  searchInput: state.searchInput,
  searchValue: state.searchValue,
});

const SearchResult = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);


export default SearchResult;
