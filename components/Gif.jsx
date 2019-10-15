import React from 'react';
import PropTypes from 'prop-types';

class Gif extends React.PureComponent {
  render() {
    const {
      gifTitle, gifDateTime, gifImg,
    } = this.props;

    return (
      <div id="gif-info">
        <video
          src={`${gifImg}`}
          autoPlay
          loop
          muted
          className="m-3"
          key="gif-full-img"
        />
        <h5 key="gif-title">{gifTitle}</h5>
        <p key="gif-date-time">{gifDateTime}</p>
      </div>
    );
  }
}

Gif.propTypes = {
  gifTitle: PropTypes.string.isRequired,
  gifDateTime: PropTypes.string.isRequired,
  gifImg: PropTypes.string.isRequired,
};

export default Gif;
