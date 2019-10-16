import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class GifPreview extends React.PureComponent {
  render() {
    const { gif } = this.props;

    return (
      <Link
        to={
            {
              pathname: `/gif/${gif.id}`,
              state: { isValidUrl: true },
            }
        }
      >
        <img
          src={gif.preview}
          className="m-1 img-thumbnail"
          alt={gif.title}
        />
      </Link>
    );
  }
}

GifPreview.propTypes = {
  gif: PropTypes.shape({
    title: PropTypes.string,
    datetime: PropTypes.string,
    original: PropTypes.string,
    id: PropTypes.string,
    preview: PropTypes.string,
  }).isRequired,
};

export default GifPreview;
