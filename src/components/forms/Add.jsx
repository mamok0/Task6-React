import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addingSubmitted } from '../../actions';
import GifForm from './gifForm';

class AddGif extends React.Component {
  state= {
    gif: null,
    title: '',
    datetime: '',
  }

  handleChangeGifFile = (event) => {
    this.setState({ gif: event.target });
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeDatetime = (event) => {
    this.setState({ datetime: event.target.value });
  }

  handleCancel = () => {
    window.history.back();
  }

  submitAdding = () => {
    const { dispatchSubmitAdding } = this.props;
    const { title, datetime, gif } = this.state;
    dispatchSubmitAdding({ title, datetime, gif });
    this.handleCancel();
  }

  render() {
    const { title, datetime } = this.state;

    return (
      <div className="container mt-3 text-left">
        <h3>Adding gif:</h3>
        <form>
          <label htmlFor="file">
            Gif:
            <br />
            <input type="file" id="file" onChange={this.handleChangeGifFile} className="form-control" />
          </label>
          <br />
          <GifForm
            title={title}
            datetime={datetime}
            onSubmitAction={this.submitAdding}
            onChangeDatetime={this.handleChangeDatetime}
            onChangeTitle={this.handleChangeTitle}
            onCancel={this.handleCancel}
          />
        </form>
      </div>
    );
  }
}

AddGif.propTypes = {
  dispatchSubmitAdding: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchSubmitAdding: (newData) => dispatch(addingSubmitted(newData)),
});

const Add = connect(
  null,
  mapDispatchToProps,
)(AddGif);

export default Add;
