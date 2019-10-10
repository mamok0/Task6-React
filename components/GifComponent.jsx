import React from 'react';
import PropTypes from 'prop-types';


import Loading from './Loading';

class GifComponent extends React.PureComponent {
  render() {
    const { gifData } = this.props;
    const { gif, isFetching } = gifData;

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
  gifData: PropTypes.object,
};

GifComponent.defaultProps = {
  gifData: {},
};


export default GifComponent;
