import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addingSubmitted } from '../../actions';
import DefaultButton from '../common/DefaultButton';

class AddGif extends React.PureComponent {
  state= {
    gif: null,
    title: '',
    datetime: '',
  }

  changeGif = (event) => {
    this.setState({ gif: event.target });
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  changeDatetime = (event) => {
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
    return (
      <div className="container mt-3" id="edit-form">
        <h3>Adding gif:</h3>
        Gif:
        <br />
        <input type="file" id="gif" onChange={this.changeGif} className=".form-control" />
        <br />
        Title:
        <input
          type="text"
          className="form-control"
          onChange={this.changeTitle}
        />
        Import datetime:
        <input
          type="text"
          className="form-control"
          onChange={this.changeDatetime}
        />
        <DefaultButton onClick={this.submitAdding}>
          Add
        </DefaultButton>
        <DefaultButton onClick={this.handleCancel}>
          Cancel
        </DefaultButton>
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
