import React from 'react';
import PropTypes from 'prop-types';

import { getQuery } from './api';


class GifPage extends React.Component {
  state = {
    gif: {},
    isFetching: true,
  };


  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    fetch(`https://api.giphy.com/v1/gifs/${id + getQuery({ api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2' })}`)
      .then((response) => response.json())
      .then((gifData) => {
        this.setState({
          gif: gifData.data,
          isFetching: false,
        });
      });
  }

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
    let gifContainer;
    const { gif, isFetching } = this.state;
    if (isFetching) {
      gifContainer = React.createElement('h1', { key: 'loading' }, 'loading...');
    } else {
      const gifImg = React.createElement('video', {
        src: `${gif.images.original.mp4}`,
        autoPlay: true,
        loop: true,
        muted: true,
        className: 'm-3',
        key: 'gif-full-img',
      });

      const gifTitle = React.createElement('h5', { key: 'gif-title' }, `Title: ${gif.title}`);
      const gifDateTime = React.createElement('h5', { key: 'gif-date-time' }, `Import datetime: ${gif.import_datetime}`);

      const moreButton = React.createElement(
        'input',
        {
          type: 'button',
          className: 'btn btn-success mt-2 mb-4',
          value: 'Okay, let\'s go back',
          onClick: () => this.goBack(),
          key: 'back-button',
        },
      );

      gifContainer = React.createElement('div', {}, [gifImg, gifTitle, gifDateTime, moreButton]);
    }
    return gifContainer;
  }
}

GifPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
};

GifPage.defaultProps = {
  match: {},
  location: {},
  history: {},
};

export default GifPage;
