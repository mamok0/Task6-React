import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.PureComponent {
  render() {
    const { handleClick, className, buttonText } = this.props;
    return (
      <div>
        <button
          type="button"
          className={`${className}`}
          onClick={() => handleClick()}
        >
          {buttonText}
        </button>
      </div>
    );
  }
}

Button.propTypes = {
  callback: PropTypes.func,
  className: PropTypes.string,
  buttonText: PropTypes.string,
};

Button.defaultProps = {
  callback: () => {},
  className: '',
  buttonText: '',
};

export default Button;
