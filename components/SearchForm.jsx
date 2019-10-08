import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SearchForm extends React.Component {
  setSearchInput = () => {
    localStorage.setItem('searchInput', document.getElementById('search-input').value);
  }

  render() {
    const { inputValue } = this.props;

    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what are you want to find:</h3>
        <input
          id="search-input"
          type="text"
          className="form-control"
          defaultValue={
            inputValue
          }
          onBlur={this.setSearchInput}
        />
        <Link to="/search">
          <input type="button" className="btn btn-danger mt-2" value="Search" />
        </Link>
      </div>
    );
  }
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
};

SearchForm.defaultProps = {
  inputValue: '',
};

export default SearchForm;
