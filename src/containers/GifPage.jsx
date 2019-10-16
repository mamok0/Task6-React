import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';

import Gif from '../gifs/Gif';
import BackButton from '../common/BackButton';
import { getGif } from '../services/api';
import GifModel from '../services/gifModel';

class GifPage extends React.Component {
  state = {
    gif: {},
    isFetching: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const gifData = await getGif(match.params.id);
    this.setState({
      gif: GifModel.create(gifData.data),
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
            gif={gif}
          />
        )}
        <BackButton onRedirect={this.handleRedirect} />
      </div>
    );
  }
}

GifPage.propTypes = {
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

export default GifPage;
