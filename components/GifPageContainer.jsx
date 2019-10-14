import React from 'react';
import PropTypes from 'prop-types';

import GifComponent from './GifComponent';
import BackButton from './BackButton';
import { getGif } from './api';

class GifPage extends React.PureComponent {
  state = {
    gif: {},
    isFetching: true,
    redirect: null,
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
    const { gif, isFetching, redirect } = this.state;

    return (
      <div id="gif-container">
        <GifComponent gifData={{ gif, isFetching }} />
        <BackButton onRedirect={this.handleRedirect} />
        {redirect}
      </div>
    );
  }
}

GifPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

GifPage.defaultProps = {
  match: {},
  location: {},
  history: {},
};

export default GifPage;
