import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchSingleGif,
  gifInfoUnloaded,
  switchDeleting,
  switchEditing,
} from '../actions';
import Gif from '../gifs/Gif';
import Edit from '../components/forms/Edit';
import Delete from '../components/forms/Delete';
import Loading from '../components/common/Loading';
import BackButton from '../components/common/BackButton';
import DefaultButton from '../components/common/DefaultButton';

class GifPage extends React.Component {
  async componentDidMount() {
    const { dispatchGifInfoLoaded, match } = this.props;
    dispatchGifInfoLoaded(match.params.id);
  }

  handleRedirect = () => {
    const { location, history, dispatchResetGifInfo } = this.props;
    dispatchResetGifInfo();
    if (location.isFirstLoadedPage) {
      history.go(-1);
    }
    history.push('/');
  }

  handleEdit = () => {
    const { dispatchSwitchEditing } = this.props;
    dispatchSwitchEditing();
  }

  handleDelete = () => {
    const { dispatchSwitchDeleting } = this.props;
    dispatchSwitchDeleting();
  }

  handleCancel = () => {
    const {
      dispatchSwitchDeleting,
      dispatchSwitchEditing,
      isEditing,
    } = this.props;

    if (isEditing) {
      dispatchSwitchEditing();
    } else {
      dispatchSwitchDeleting();
    }
  }

  render() {
    const {
      gif,
      isFetching,
      match,
      isEditing,
      isDeleting,
    } = this.props;

    if (isEditing) {
      return <Edit onClick={this.handleEdit} onCancel={this.handleCancel} gif={gif} />;
    }

    if (isDeleting) {
      return (
        <Delete
          onCancel={this.handleCancel}
          id={match.params.id}
        />
      );
    }

    return (
      <div id="gif-container">
        {isFetching ? <Loading /> : (
          <>
            <Gif
              gif={gif}
            />
            <DefaultButton onClick={this.handleEdit}>Edit</DefaultButton>
            <DefaultButton onClick={this.handleDelete}>Delete</DefaultButton>
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
  isEditing: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool.isRequired,
  dispatchGifInfoLoaded: PropTypes.func.isRequired,
  dispatchResetGifInfo: PropTypes.func.isRequired,
  dispatchSwitchEditing: PropTypes.func.isRequired,
  dispatchSwitchDeleting: PropTypes.func.isRequired,
};

GifPage.defaultProps = {
  gif: {},
  isFetching: true,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGifInfoLoaded: (id) => dispatch(fetchSingleGif(id)),
  dispatchResetGifInfo: () => dispatch(gifInfoUnloaded()),
  dispatchSwitchEditing: () => dispatch(switchEditing()),
  dispatchSwitchDeleting: () => dispatch(switchDeleting()),
});

const mapStateToProps = (state) => ({
  gif: state.singleGif.value,
  isFetching: state.singleGif.isFetching,
  isEditing: state.singleGif.isEditing,
  isDeleting: state.singleGif.isDeleting,
});

const GifInfo = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GifPage);

export default GifInfo;
