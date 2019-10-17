import React from 'react';
import PropTypes from 'prop-types';

class DefaultButton extends React.PureComponent {
  render() {
    const { onClick, children, isFetching } = this.props;


    return isFetching && children === 'More gifs!' ? null : (
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
  isFetching: PropTypes.bool,
};

DefaultButton.defaultProps = {
  onClick: () => {},
  isFetching: true,
};

export default DefaultButton;
