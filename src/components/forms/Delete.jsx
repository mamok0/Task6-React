import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deletingSubmitted } from '../../actions';
import DefaultButton from '../common/DefaultButton';

class DeleteGif extends React.Component {
  deleteGif = () => {
    const { dispatchSubmitDeleting, id, onCancel } = this.props;
    dispatchSubmitDeleting({ id });
    onCancel();
  }

  render() {
    const { onCancel } = this.props;
    return (
      <div className="container mt-3">
        <h3>Are you sure you want to delete this gif?</h3>
        <DefaultButton onClick={this.deleteGif}>
          Yes
        </DefaultButton>
        <DefaultButton onClick={onCancel}>
          No
        </DefaultButton>
      </div>
    );
  }
}

DeleteGif.propTypes = {
  id: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  dispatchSubmitDeleting: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => ({
  dispatchSubmitDeleting: (id) => dispatch(deletingSubmitted(id)),
});

const Delete = connect(
  null,
  mapDispatchToProps,
)(DeleteGif);


export default Delete;
