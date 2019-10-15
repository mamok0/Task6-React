import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

class Gifs extends React.PureComponent {
  render() {
    const {
      isFetching,
      gifs,
      searchInput,
    } = this.props;
    if (isFetching) {
      return <Loading />;
    }
    return (
      <div id="search-output">
        <h4 className="mt-3" key="search-label">
          Search results for `
          {searchInput}
          `:
        </h4>
        {gifs}
      </div>
    );
  }
}

Gifs.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  gifs: PropTypes.arrayOf(PropTypes.array),
  searchInput: PropTypes.string.isRequired,
};

Gifs.defaultProps = {
  gifs: [],
};

export default Gifs;
