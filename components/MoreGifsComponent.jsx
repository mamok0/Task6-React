import React from 'react';
import PropTypes from 'prop-types';

import { getMoreGifs } from './api';
import forgeGifElements from './elementForgery';
import Loading from './Loading';

class MoreGifsComponent extends React.Component {
  state = {
    isMoreFetching: true,
    moreGifs: null,
  };

  async componentDidMount() {
    const { offset } = this.props;
    const response = await getMoreGifs(offset);
    const gifsElements = forgeGifElements(response.data) || {};
    this.setState({
      moreGifs: gifsElements,
      isMoreFetching: false,
    });
  }

  render() {
    const { isMoreFetching, moreGifs } = this.state;

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
  offset: PropTypes.number,
};

MoreGifsComponent.defaultProps = {
  offset: 0,
};

export default MoreGifsComponent;
