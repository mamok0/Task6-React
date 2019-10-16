import React from 'react';
import PropTypes from 'prop-types';

class Gif extends React.PureComponent {
  render() {
    const { gif } = this.props;

    return (
      <div key="gif-info">
        <video
          src={`${gif.original}`}
          autoPlay
          loop
          muted
          className="m-3"
        />
        <h5>{gif.title}</h5>
        <p>{gif.datetime}</p>
      </div>
    );
  }
}

Gif.propTypes = {
  gif: PropTypes.shape({
    title: PropTypes.string,
    datetime: PropTypes.string,
    original: PropTypes.string,
  }).isRequired,
};

export default Gif;
