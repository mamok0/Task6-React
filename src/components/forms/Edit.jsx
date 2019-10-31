import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { editingSubmitted } from '../../actions';
import GifForm from './gifForm';

class EditGif extends React.Component {
  state= {
    // eslint-disable-next-line react/destructuring-assignment
    title: this.props.gif.title,
    // eslint-disable-next-line react/destructuring-assignment
    datetime: this.props.gif.datetime,
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }

  handleChangeDatetime = (event) => {
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
        <GifForm
          title={title}
          datetime={datetime}
          submitAction={this.submitEditing}
          changeDatetime={this.handleChangeDatetime}
          changeTitle={this.handleChangeTitle}
          onCancel={onCancel}
        />
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
