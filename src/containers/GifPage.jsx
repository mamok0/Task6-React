import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gifInfoLoaded } from '../js/actions/index';

import Gif from '../gifs/Gif';
import Loading from '../common/Loading';
import BackButton from '../common/BackButton';
import { getGif } from '../js/services/api';

class GifPage extends React.Component {
  async componentDidMount() {
    const { match, dispatchGifInfoLoaded } = this.props;
    const gif = await getGif(match.params.id);

    dispatchGifInfoLoaded({
      gif,
      isGifFetching: false,
    });
  }

  componentWillUnmount() {
    const { dispatchGifInfoLoaded } = this.props;

    dispatchGifInfoLoaded({
      gif: {},
      isGifFetching: true,
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
    const { gif, isGifFetching } = this.props;

    return (
      <div id="gif-container">
        {isGifFetching ? <Loading /> : (
          <>
            <Gif
              gif={gif}
            />
            <BackButton onRedirect={this.handleRedirect} />
          </>
        )}
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
  gif: PropTypes.shape({
    title: PropTypes.string,
    datetime: PropTypes.string,
    original: PropTypes.string,
  }),
  isGifFetching: PropTypes.bool,
  dispatchGifInfoLoaded: PropTypes.func.isRequired,
};

GifPage.defaultProps = {
  gif: {},
  isGifFetching: true,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGifInfoLoaded: bindActionCreators(gifInfoLoaded, dispatch),
});

const mapStateToProps = (state) => ({
  gif: state.gif,
  isGifFetching: state.isGifFetching,
});

const GifInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifPage);

export default GifInfo;
