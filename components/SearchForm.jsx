import React from 'react';
import PropTypes from 'prop-types';
import Button from './DefaultButton';

class SearchForm extends React.PureComponent {
  render() {
    const { inputValue, onRequest, getInputValue } = this.props;

    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what are you want to find:</h3>
        <input
          id="search-input"
          ref={getInputValue}
          type="text"
          className="form-control"
          defaultValue={
            inputValue
          }
        />
        <Button
          className="btn btn-danger mt-2 mb-4"
          callback={() => {
            if (onRequest) {
              onRequest();
            }
          }}
          buttonText="Search"
        />
      </div>
    );
  }
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  onRequest: PropTypes.func,
  getInputValue: PropTypes.func,
};

SearchForm.defaultProps = {
  inputValue: '',
  onRequest: () => {},
  getInputValue: () => {},
};

export default SearchForm;
