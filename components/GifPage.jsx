import React from 'react';

import GifComponent from './GifComponent';

class GifPage extends React.Component {


  goBack() {
    const { location, history } = this.props;
    const { state } = location;

    if (state && state.isValidUrl) {
      history.go(-1);
    } else {
      history.push('/');
    }
  }

  render() {
    const gif = <GifComponent />;

    const moreButton = (
      <input
        type="button"
        className="btn btn-success mt-2 mb-4"
        value="Okay, let\'s go back"
        onClick={() => this.goBack()}
        key="back-button"
      />
    );

    const gifContainer = [gif, moreButton];

    return (
      <div id="gif-container">
        {gifContainer}
      </div>
    );
  }
}


export default GifPage;
