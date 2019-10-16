import React from 'react';
import PropTypes from 'prop-types';

class DefaultButton extends React.PureComponent {
  render() {
    const { onClick, children } = this.props;

    return (
      <>
        <button
          type="button"
          className="btn btn-success m-2"
          onClick={onClick}
        >
          {children}
        </button>
      </>
    );
  }
}

DefaultButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string.isRequired,
};

DefaultButton.defaultProps = {
  onClick: () => {},
};

export default DefaultButton;
