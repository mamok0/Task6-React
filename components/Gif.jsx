import React from 'react';
import PropTypes from 'prop-types';

class GifComponent extends React.PureComponent {
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

GifComponent.propTypes = {
  gifTitle: PropTypes.string,
  gifDateTime: PropTypes.string,
  gifImg: PropTypes.string,
};

GifComponent.defaultProps = {
  gifTitle: '',
  gifDateTime: '',
  gifImg: '',
};


export default GifComponent;
