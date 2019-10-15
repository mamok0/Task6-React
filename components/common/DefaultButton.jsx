import React from 'react';
import PropTypes from 'prop-types';

class DefaultButton extends React.PureComponent {
  render() {
    const { onClick, buttonText } = this.props;
    return (
      <>
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </>
    );
  }
}

DefaultButton.propTypes = {
  onClick: PropTypes.func,
  buttonText: PropTypes.string.isRequired,
};

DefaultButton.defaultProps = {
  onClick: () => {},
};

export default DefaultButton;
