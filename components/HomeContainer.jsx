import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import { createSearchLink } from './api';

class Home extends React.Component {
  state = {
    searchInput: '',
    isSearchRequest: false,
  }

  handleRequest = () => {
    const { history } = this.props;
    history.push(createSearchLink(this.inputElement.value));
  }

  render() {
    const { searchInput, isSearchRequest } = this.state;
    return (
      <SearchForm
        handleClick={() => this.handleRequest()}
        inputValue={searchInput}
        isNextRequest={isSearchRequest}
        getInputValue={(el) => this.inputElement = el}
      />
    );
  }
}

Home.propTypes = {
  history: PropTypes.object,
};

Home.defaultProps = {
  history: {},
};

export default Home;
