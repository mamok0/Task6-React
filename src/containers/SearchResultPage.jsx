import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { gifsLoaded, searchRequest, gifsUnloaded } from '../actions';
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
    const { offset, dispatchGifsLoaded } = this.props;
    const response = await getMoreGifs(offset + moreGifsAmount);

    dispatchGifsLoaded({
      newGifs: response,
      isFetching: false,
      offset: offset + moreGifsAmount,
    });
  }

  async loadGifs() {
    const { dispatchGifsLoaded, gifs } = this.props;

    if (gifs.length === 0) {
      const response = await getGifs();
      dispatchGifsLoaded({
        newGifs: response,
        isFetching: false,
        offset: 0,
      });
    }
  }

  render() {
    const {
      searchValue,
      gifs,
      isFetching,
    } = this.props;

    return (
      <div id="search-result">
        <SearchForm searchValue={searchValue} />
        <GifsList
          gifs={gifs}
          isFetching={isFetching}
          searchInput={searchValue}
        />
        <DefaultButton
          onClick={this.handleMoreGifsClick}
          isFetching={isFetching}
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
  isFetching: PropTypes.bool.isRequired,
  offset: PropTypes.number.isRequired,
  dispatchGifsLoaded: PropTypes.func.isRequired,
  dispatchSearchRequest: PropTypes.func.isRequired,
  dispatchGifsUnloaded: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  dispatchGifsLoaded: (newData) => dispatch(gifsLoaded(newData)),
  dispatchSearchRequest: (newSearchRequest) => dispatch(searchRequest(newSearchRequest)),
  dispatchGifsUnloaded: () => dispatch(gifsUnloaded()),
});

const mapStateToProps = (state) => ({
  gifs: state.gifList.values,
  isFetching: state.gifList.isFetching,
  offset: state.gifList.offset,
  searchValue: state.search.searchValue,
});

const SearchResult = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchResultPage);


export default SearchResult;
