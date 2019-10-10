import React from 'react';
import PropTypes from 'prop-types';

class SearchForm extends React.PureComponent {
  render() {
    const { inputValue, onRequest } = this.props;

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
        />
        <input
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => {
            if (onRequest) {
              onRequest();
            }
          }}
          value="Search"
        />
      </div>
    );
  }
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  onRequest: PropTypes.func,
};

SearchForm.defaultProps = {
  inputValue: '',
  onRequest: () => {},
};

export default SearchForm;
