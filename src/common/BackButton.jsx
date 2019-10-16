import React from 'react';
import PropTypes from 'prop-types';

import DefaultButton from './DefaultButton';

class BackButton extends React.PureComponent {
  render() {
    const { onRedirect } = this.props;
    return (
      <div>
        <DefaultButton onClick={onRedirect}>
          {'Okay, let\'s go back'}
        </DefaultButton>
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
