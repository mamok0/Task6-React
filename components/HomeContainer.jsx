import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import { createSearchLink } from './api';

class HomeContainer extends React.Component {
  state = {
    searchInput: '',
    isSearchRequest: false,
  }

  onChange(event) {
    this.setState(
      { searchInput: event.target.value },
    );
  }

  handleRequest = () => {
    const { history } = this.props;
    history.push(createSearchLink(this.childRef.value));
  }

  render() {
    const { searchInput, isSearchRequest } = this.state;
    return (
      <SearchForm
        onClick={this.handleRequest}
        inputValue={searchInput}
        isNextRequest={isSearchRequest}
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
