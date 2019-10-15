import React from 'react';
import PropTypes from 'prop-types';

import Loading from '../common/Loading';

class GifsList extends React.PureComponent {
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
        <h4 key="search-label">
          Search results for `
          {searchInput}
          `:
        </h4>
        {gifs}
      </div>
    );
  }
}

GifsList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  gifs: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  searchInput: PropTypes.string.isRequired,
};

GifsList.defaultProps = {
  gifs: [],
};

export default GifsList;
