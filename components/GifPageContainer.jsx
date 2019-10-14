import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

import Gif from './Gif';
import BackButton from './BackButton';
import { getGif } from './api';

class GifPageContainer extends React.Component {
  state = {
    gif: {},
    isFetching: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const gifData = await getGif(match.params.id);
    this.setState({
      gif: gifData.data,
      isFetching: false,
    });
  }

  handleRedirect = () => {
    const { location, history } = this.props;

    if (location.state && location.state.isValidUrl) {
      history.go(-1);
    }
    history.push('/');
  }

  render() {
    const { gif, isFetching } = this.state;

    return (
      <div id="gif-container">
        {isFetching ? <Loading /> : (
          <Gif
            gifImg={gif.images.original.mp4}
            gifTitle={gif.title}
            gifDateTime={gif.import_datetime}
            isFetching={isFetching}
          />
        )}
        <BackButton onRedirect={this.handleRedirect} />
      </div>
    );
  }
}

GifPageContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    go: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      isValidUrl: PropTypes.bool,
    }),
  }).isRequired,
};

export default GifPageContainer;
