import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import DefaultButton from './DefaultButton';

class SearchForm extends React.PureComponent {
  render() {
    const { inputValue, onClick, onChange } = this.props;

    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what are you want to find:</h3>
        <input
          id="search-input"
          type="text"
          onChange={(e) => onChange(e)}
          className="form-control"
          defaultValue={
            inputValue
          }
        />
        <Link to={`/search?q=${inputValue}`}>
          <DefaultButton
            onClick={onClick}
            buttonText="Search"
          />
        </Link>
      </div>
    );
  }
}

SearchForm.propTypes = {
  inputValue: PropTypes.string,
  onClick: PropTypes.func,
  setInput: PropTypes.func,
};

SearchForm.defaultProps = {
  inputValue: '',
  onClick: () => {},
  setInput: () => {},
};

export default SearchForm;
