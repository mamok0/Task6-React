import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from './DefaultButton';

class BackButton extends React.PureComponent {
  render() {
    const { onRedirect } = this.props;
    return (
      <div>
        <DefaultButton
          onClick={onRedirect}
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
