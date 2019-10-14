import React from 'react';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';

class Home extends React.Component {
  state = {
    searchInput: '',
    isSearchRequest: false,
  }

  handleRequest = () => {
    const { history } = this.props;
    history.push(`/search?q=${document.getElementById('search-input').value}`);
  }

  render() {
    const { searchInput, isSearchRequest } = this.state;
    return (
      <SearchForm
        onRequest={this.handleRequest}
        inputValue={searchInput}
        isNextRequest={isSearchRequest}
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
