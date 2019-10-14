import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import { createSearchLink, setRef } from './api';

class Home extends React.Component {
  state = {
    searchInput: '',
    isSearchRequest: false,
  }

  setRef = setRef.bind(this);

  setRef(input) {
    this.childRef = input;
  }

  handleRequest = () => {
    const { history } = this.props;
    history.push(createSearchLink(this.childRef.value));
  }

  getSearchElement = (element) => {
    this.inputElement = element;
  }

  render() {
    const { searchInput, isSearchRequest } = this.state;
    return (
      <SearchForm
        handleClick={this.handleRequest}
        inputValue={searchInput}
        isNextRequest={isSearchRequest}
        setInput={this.setRef}
      />
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

Home.defaultProps = {
  history: {},
};

export default Home;
