import React from 'react';
import PropTypes from 'prop-types';

import Button from './DefaultButton';

class BackButton extends React.PureComponent {
  render() {
    const { onRedirect } = this.props;
    return (
      <div>
        <Button
          className="btn btn-success mt-2 mb-4"
          handleClick={() => onRedirect()}
          buttonText="Okay, let's go back"
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
