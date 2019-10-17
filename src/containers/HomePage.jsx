import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from '../forms/SearchForm';

class HomePage extends React.Component {
  state = {
    searchInput: '',
  }

  handleChange = (event) => {
    this.setState(
      { searchInput: event.target.value },
    );
  }

  render() {
    const { searchInput } = this.state;
    return (
      <SearchForm
        inputValue={searchInput}
        onChange={this.handleChange}
      />
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default HomePage;
