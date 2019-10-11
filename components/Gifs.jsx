import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

class GifsComponent extends React.PureComponent {
  render() {
    const { gifsData } = this.props;
    const { isFetching, gifs, searchInput } = gifsData;
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

GifsComponent.propTypes = {
  gifsData: PropTypes.object,
};

GifsComponent.defaultProps = {
  gifsData: {},
};

export default GifsComponent;
