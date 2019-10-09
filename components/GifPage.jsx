import React from 'react';
import PropTypes from 'prop-types';

import GifComponent from './GifComponent';
import BackButton from './BackButton';

class GifPage extends React.PureComponent {
  render() {
    const { match, location } = this.props;
    const { state } = location;
    const { params } = match;
    const { id } = params;

    return (
      <div id="gif-container">
        <GifComponent id={id} />
        <BackButton referrer={state ? state.isValidUrl : false} />
      </div>
    );
  }
}

GifPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
};

GifPage.defaultProps = {
  match: {},
  location: {},
};

export default GifPage;
