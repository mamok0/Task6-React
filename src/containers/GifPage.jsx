import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchSingleGif, gifInfoUnloaded } from '../actions';
import Gif from '../gifs/Gif';
import Edit from '../components/forms/Edit';
import Delete from '../components/forms/Delete';
import Loading from '../components/common/Loading';
import BackButton from '../components/common/BackButton';
import DefaultButton from '../components/common/DefaultButton';

class GifPage extends React.Component {
  state = {
    isEditing: false,
    isDeleting: false,
  }

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
    this.setState({ isEditing: true });
  }

  handleDelete = () => {
    this.setState({ isDeleting: true });
  }

  handleCancel = () => {
    this.setState({ isEditing: false, isDeleting: false });
  }

  render() {
    const { gif, isFetching, match } = this.props;
    const { isEditing, isDeleting } = this.state;

    if (isEditing) {
      return <Edit onClick={this.handleEdit} onCancel={this.handleCancel} gif={gif} />;
    }

    if (isDeleting) {
      return (
        <Delete
          onClick={this.handleDelete}
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
  dispatchGifInfoLoaded: PropTypes.func.isRequired,
  dispatchResetGifInfo: PropTypes.func.isRequired,
};

GifPage.defaultProps = {
  gif: {},
  isFetching: true,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGifInfoLoaded: (id) => dispatch(fetchSingleGif(id)),
  dispatchResetGifInfo: () => dispatch(gifInfoUnloaded()),
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
