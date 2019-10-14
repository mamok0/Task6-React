import React from 'react';
import PropTypes from 'prop-types';
import Button from './DefaultButton';

class SearchForm extends React.PureComponent {
  render() {
    const { inputValue, handleClick, setInput } = this.props;

    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what are you want to find:</h3>
        <input
          id="search-input"
          ref={setInput}
          type="text"
          className="form-control"
          defaultValue={
            inputValue
          }
        />
        <Button
          className="btn btn-danger mt-2 mb-4"
          handleClick={handleClick}
          buttonText="Search"
        />
      </div>
    );
  }
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  handleClick: PropTypes.func,
  setInput: PropTypes.func,
};

SearchForm.defaultProps = {
  inputValue: '',
  handleClick: () => {},
  setInput: () => {},
};

export default SearchForm;
