import React from 'react';
import PropTypes from 'prop-types';

class DefaultButton extends React.PureComponent {
  render() {
    const { onClick, buttonText } = this.props;
    return (
      <div>
        <button
          type="button"
          className="btn btn-success mt-2 mb-4"
          onClick={onClick}
        >
          {buttonText}
        </button>
      </div>
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
