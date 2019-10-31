import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from '../common/DefaultButton';

class GifForm extends React.PureComponent {
  render() {
    const {
      onCancel,
      submitAction,
      changeDatetime,
      changeTitle,
      datetime,
      title,
    } = this.props;
    return (
      <>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            className="form-control"
            onChange={changeTitle}
            value={title}
          />
        </label>
        <br />
        <label htmlFor="title">
          Import datetime:
          <input
            type="text"
            id="datetime"
            className="form-control"
            onChange={changeDatetime}
            value={datetime}
          />
        </label>
        <br />
        <DefaultButton onClick={submitAction}>
          Save
        </DefaultButton>
        <DefaultButton onClick={onCancel}>
          Cancel
        </DefaultButton>
      </>
    );
  }
}

GifForm.propTypes = {
  title: PropTypes.string,
  datetime: PropTypes.string,
  changeDatetime: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  submitAction: PropTypes.func.isRequired,
};

GifForm.defaultProps = {
  title: '',
  datetime: '',
};

export default GifForm;
