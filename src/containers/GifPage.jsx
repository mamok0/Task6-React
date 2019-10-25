import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSingleGif, gifInfoUnloaded } from '../actions';
import Gif from '../gifs/Gif';
import Loading from '../components/common/Loading';
import BackButton from '../components/common/BackButton';

class GifPage extends React.Component {
  async componentDidMount() {
    const { dispatchGifInfoLoaded } = this.props;
    dispatchGifInfoLoaded();
  }

  handleRedirect = () => {
    const { location, history, dispatchGifInfoUnloaded } = this.props;
    dispatchGifInfoUnloaded();
    if (location.isFirstLoadedPage) {
      history.go(-1);
    }
    history.push('/');
  }

  render() {
    const { gif, isFetching } = this.props;

    return (
      <div id="gif-container">
        {isFetching ? <Loading /> : (
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
  isFetching: PropTypes.bool,
  dispatchGifInfoLoaded: PropTypes.func.isRequired,
  dispatchGifInfoUnloaded: PropTypes.func.isRequired,
};

GifPage.defaultProps = {
  gif: {},
  isFetching: true,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGifInfoLoaded: () => dispatch(fetchSingleGif()),
  dispatchGifInfoUnloaded: () => dispatch(gifInfoUnloaded()),
});

const mapStateToProps = (state) => ({
  gif: state.singleGif.value,
  isFetching: state.singleGif.isFetching,
});

const GifInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifPage);

export default GifInfo;
