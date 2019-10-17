import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../common/Loading';

import Gif from '../gifs/Gif';
import BackButton from '../common/BackButton';
import { getGif } from '../services/api';

class GifPage extends React.Component {
  state = {
    gif: {},
    isFetching: true,
  };

  async componentDidMount() {
    const { match } = this.props;
    const gif = await getGif(match.params.id);

    this.setState({
      gif,
      isFetching: false,
    });
  }

  handleRedirect = () => {
    const { location, history } = this.props;

    if (location.isFirstLoadedPage) {
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
    isFirstLoadedPage: PropTypes.bool,
  }).isRequired,
};

export default GifPage;
