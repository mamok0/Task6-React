import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './common/SearchForm';

class HomeContainer extends React.Component {
  state = {
    searchInput: '',
  }

  onChange = (event) => {
    this.setState(
      { searchInput: event.target.value },
    );
  }

  render() {
    const { searchInput } = this.state;
    return (
      <SearchForm
        inputValue={searchInput}
        onChange={this.onChange}
      />
    );
  }
}

HomeContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default HomeContainer;
