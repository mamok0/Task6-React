import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

class MoreGifsComponent extends React.PureComponent {
  render() {
    const { gifsOffset, isMoreFetching, moreGifs } = this.props;

    if (gifsOffset === 0) {
      return null;
    }

    if (isMoreFetching) {
      return <Loading />;
    }

    return (
      <div id="more-search-output">
        {moreGifs}
      </div>
    );
  }
}

MoreGifsComponent.propTypes = {
  isMoreFetching: PropTypes.bool,
  moreGifs: PropTypes.arrayOf(PropTypes.array),
  gifsOffset: PropTypes.number,
};

MoreGifsComponent.defaultProps = {
  isMoreFetching: true,
  moreGifs: {},
  gifsOffset: 0,
};

export default MoreGifsComponent;
