import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editingSubmitted } from '../../actions';
import DefaultButton from '../common/DefaultButton';

class EditGif extends React.PureComponent {
  state= {
    // eslint-disable-next-line react/destructuring-assignment
    title: this.props.gif.title,
    // eslint-disable-next-line react/destructuring-assignment
    datetime: this.props.gif.datetime,
  }

  changeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  changeDatetime = (event) => {
    this.setState({ datetime: event.target.value });
  }

  submitEditing = () => {
    const { dispatchSubmitEditing, onCancel } = this.props;
    const { title, datetime } = this.state;
    dispatchSubmitEditing({ title, datetime });
    onCancel();
  }

  render() {
    const { onCancel } = this.props;
    const { title, datetime } = this.state;
    return (
      <div className="container mt-3" id="edit-form">
        <h3>Editing gif:</h3>
        Title:
        <input
          type="text"
          className="form-control"
          onChange={this.changeTitle}
          value={title}
        />
        Import datetime:
        <input
          type="text"
          className="form-control"
          onChange={this.changeDatetime}
          value={datetime}
        />
        <DefaultButton onClick={this.submitEditing}>
          Save
        </DefaultButton>
        <DefaultButton onClick={onCancel}>
          Cancel
        </DefaultButton>
      </div>
    );
  }
}

EditGif.propTypes = {
  gif: PropTypes.shape({
    title: PropTypes.string,
    datetime: PropTypes.string,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
  dispatchSubmitEditing: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  dispatchSubmitEditing: (newData) => dispatch(editingSubmitted(newData)),
});

const Edit = connect(
  null,
  mapDispatchToProps,
)(EditGif);


export default Edit;
