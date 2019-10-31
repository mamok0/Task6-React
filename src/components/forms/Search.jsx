import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { gifsUnloaded, searchRequest } from '../../actions';
import { getSearchQuery, createSearchLink } from '../../services/api';
import DefaultButton from '../common/DefaultButton';

class SearchForm extends React.PureComponent {
  state = {
    searchInput: getSearchQuery() || '',
  }

  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  handleClick = () => {
    const { dispatchSearchRequest, dispatchResetGifs } = this.props;
    const { searchInput } = this.state;
    dispatchSearchRequest({ searchValue: searchInput });
    dispatchResetGifs();
  }

  render() {
    const { searchInput } = this.state;

    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what do you want to find:</h3>
        <input
          id="search-input"
          type="text"
          onChange={this.handleInputChange}
          className="form-control"
          value={searchInput}
        />
        <Link
          to={createSearchLink(searchInput)}
        >
          <DefaultButton
            onClick={this.handleClick}
          >
            Search
          </DefaultButton>
        </Link>
      </div>
    );
  }
}

SearchForm.propTypes = {
  dispatchSearchRequest: PropTypes.func.isRequired,
  dispatchResetGifs: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSearchRequest: (newSearch) => dispatch(searchRequest(newSearch)),
  dispatchResetGifs: () => dispatch(gifsUnloaded()),
});

const mapStateToProps = (state) => ({
  state,
});


const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default Search;
