import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from '../common/DefaultButton';

class GifForm extends React.PureComponent {
  render() {
    const {
      onCancel,
      onSubmitAction,
      onChangeDatetime,
      onChangeTitle,
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
            onChange={onChangeTitle}
            value={title}
          />
        </label>
        <br />
        <label htmlFor="dateTime">
          Import datetime:
          <input
            type="text"
            id="dateTime"
            className="form-control"
            onChange={onChangeDatetime}
            value={datetime}
          />
        </label>
        <br />
        <DefaultButton onClick={onSubmitAction}>
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
  onChangeDatetime: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmitAction: PropTypes.func.isRequired,
};

GifForm.defaultProps = {
  title: '',
  datetime: '',
};

export default GifForm;
