import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchRequest } from '../../actions';
import { getSearchQuery } from '../../services/api';
import DefaultButton from '../common/DefaultButton';

class SearchForm extends React.PureComponent {
  state = {
    searchInput: getSearchQuery() || '',
  }

  handleInputChange = (event) => {
    this.setState({ searchInput: event.target.value });
  }

  handleClick = () => {
    const { dispatchSearchRequest } = this.props;
    const { searchInput } = this.state;
    dispatchSearchRequest({
      searchValue: searchInput,
      gifs: [],
    });
  }

  render() {
    const { searchInput } = this.state;

    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what are you want to find:</h3>
        <input
          id="search-input"
          type="text"
          onChange={this.handleInputChange}
          className="form-control"
          value={searchInput}
        />
        <Link
          to={`/search?q=${searchInput}`}
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
};

SearchForm.defaultProps = {
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSearchRequest: bindActionCreators(searchRequest, dispatch),
});

const mapStateToProps = (state) => ({ searchInput: state.searchInput });

const Search = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchForm);

export default Search;
