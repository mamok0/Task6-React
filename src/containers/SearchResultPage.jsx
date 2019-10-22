import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  gifsLoaded,
  inputChange,
  nextSearchRequest,
  moreGifsLoaded,
} from '../js/actions/index';

import SearchForm from '../forms/SearchForm';
import GifsList from '../gifs/GifsList';
import DefaultButton from '../common/DefaultButton';
import {
  getGifs,
  getMoreGifs,
  getSearchQuery,
} from '../js/services/api';


class SearchResultPage extends React.Component {
  componentDidMount() {
    this.loadGifs();
  }

  componentDidUpdate() {
    const { searchValue, dispatchNextSearchRequest } = this.props;
    const searchTerm = getSearchQuery();
    if (searchValue !== searchTerm) {
      // eslint-disable-next-line react/no-did-update-set-state
      dispatchNextSearchRequest({
        gifs: [],
        searchValue: searchTerm,
        searchInput: searchTerm,
      });
      this.loadGifs();
    }
  }

  componentWillUnmount() {
    const { dispatchGifsLoaded } = this.props;

    dispatchGifsLoaded({
      newGifs: [],
      isGifListFetching: true,
      gifListOffset: 0,
    });
  }

  handleChange = (event) => {
    const { dispatchInputChange } = this.props;
    dispatchInputChange(event.target.value);
  }

  handleMoreGifsClick = async () => {
    const { dispatchMoreGifsLoaded, gifListOffset } = this.props;
    const response = await getMoreGifs(gifListOffset + 15);

    dispatchMoreGifsLoaded({
      moreGifs: response,
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
      searchInput,
    } = this.props;
    return (
      <div id="search-result">
        <SearchForm
          onChange={this.handleChange}
          inputValue={searchInput}
          onClick={this.handleSearchClick}
        />
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
  searchInput: PropTypes.string.isRequired,
  gifListOffset: PropTypes.number.isRequired,
  dispatchMoreGifsLoaded: PropTypes.func.isRequired,
  dispatchGifsLoaded: PropTypes.func.isRequired,
  dispatchInputChange: PropTypes.func.isRequired,
  dispatchNextSearchRequest: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  dispatchGifsLoaded: bindActionCreators(gifsLoaded, dispatch),
  dispatchInputChange: bindActionCreators(inputChange, dispatch),
  dispatchNextSearchRequest: bindActionCreators(nextSearchRequest, dispatch),
  dispatchMoreGifsLoaded: bindActionCreators(moreGifsLoaded, dispatch),
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
