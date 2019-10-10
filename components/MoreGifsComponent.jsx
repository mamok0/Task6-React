import React from 'react';
import PropTypes from 'prop-types';

import Loading from './Loading';

class MoreGifsComponent extends React.PureComponent {
  render() {
    const { moreGifsData } = this.props;
    const { gifsOffset, isMoreFetching, moreGifs} = moreGifsData;

    if (gifsOffset === 0) {
      return '';
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

};

MoreGifsComponent.defaultProps = {

};

export default MoreGifsComponent;
