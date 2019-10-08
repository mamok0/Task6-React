import React from 'react';

import { getQuery } from './api';


class GifPage extends React.Component {
  constructor() {
    super();
    this.state = {
      gif: {},
      isFetching: true,
    };
  }

  componentDidMount() {
    fetch(`https://api.giphy.com/v1/gifs/${this.props.match.params.id + getQuery({ api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2' })}`)
      .then((response) => response.json())
      .then((gifData) => {
        this.setState({
          gif: gifData.data,
          isFetching: false,
        });
      });
  }

  goBack() {
    const { state } = this.props.location;

    if (state && state.isValidUrl) {
      window.history.back();
    } else {
      this.props.history.push('/');
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

export default GifPage;
