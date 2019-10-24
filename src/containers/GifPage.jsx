import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import actions from '../actions';
import Gif from '../gifs/Gif';
import Loading from '../components/common/Loading';
import BackButton from '../components/common/BackButton';
import { getGif } from '../services/api';

class GifPage extends React.Component {
  async componentDidMount() {
    const { match, dispatchGifInfoLoaded } = this.props;
    const gif = await getGif(match.params.id);

    dispatchGifInfoLoaded({
      gif,
      isGifFetching: false,
    });
  }

  handleRedirect = () => {
    const { location, history, dispatchGifInfoLoaded } = this.props;
    dispatchGifInfoLoaded({ gif: {}, isGifFetching: true });
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
  dispatchGifInfoLoaded: (gifInfo) => dispatch(actions.gifInfoLoaded(gifInfo)),
});

const mapStateToProps = (state) => ({
  gif: state.singleGif.value,
  isGifFetching: state.singleGif.isGifFetching,
});

const GifInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifPage);

export default GifInfo;
