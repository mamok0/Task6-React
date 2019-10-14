import React from 'react';
import PropTypes from 'prop-types';


class BackButton extends React.PureComponent {
  render() {
    const { onRedirect } = this.props;
    return (
      <div>
        <input
          type="button"
          className="btn btn-success mt-2 mb-4"
          value="Okay, let's go back"
          onClick={() => onRedirect()}
          key="back-button"
        />
      </div>
    );
  }
}

BackButton.propTypes = {
  onRedirect: PropTypes.func,
};

BackButton.defaultProps = {
  onRedirect: () => {},
};


export default BackButton;
