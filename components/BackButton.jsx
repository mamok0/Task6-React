import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class BackButton extends React.Component {
  state = {
    isRedirect: false,
  }

  goBack() {
    const { referrer } = this.props;
    const { isRedirect } = this.state;
    if (isRedirect) {
      if (referrer) {
        window.history.go(-1);
      }
      return <Redirect to="/" />;
    }
    return '';
  }

  render() {
    return (
      <div>
        {this.goBack()}
        <input
          type="button"
          className="btn btn-success mt-2 mb-4"
          value="Okay, let's go back"
          onClick={() => this.setState({ isRedirect: true })}
          key="back-button"
        />
      </div>
    );
  }
}

BackButton.propTypes = {
  referrer: PropTypes.bool,
};

BackButton.defaultProps = {
  referrer: false,
};


export default BackButton;
