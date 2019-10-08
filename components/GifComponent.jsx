import React from 'react';
import PropTypes from 'prop-types';

import { getGif } from './api';
import Loading from './Loading';

class GifComponent extends React.Component {
  state = {
    gif: {},
    isFetching: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const gifData = await getGif(id);
    this.setState({
      gif: gifData.data,
      isFetching: false,
    });
  }

  render() {
    const { gif, isFetching } = this.state;
    if (isFetching) {
      return <Loading />;
    }
    const gifImg = (
      <video
        src={`${gif.images.original.mp4}`}
        autoPlay
        loop
        muted
        className="m-3"
        key="gif-full-img"
      />
    );

    const gifTitle = <h5 key="gif-title">{gif.title}</h5>;
    const gifDateTime = <h5 key="gif-date-time">{gif.import_datetime}</h5>;
    const gifInfo = [gifImg, gifTitle, gifDateTime];

    return (
      <div id="gif-info">
        {gifInfo}
      </div>
    );
  }
}


GifComponent.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

GifComponent.defaultProps = {
  match: {},
  location: {},
  history: {},
};

export default GifComponent;
