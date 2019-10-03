import React from 'react';
import { getQuery } from './api';

class GifPage extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      gif: {},
      isFetching: true,
    };
  }

  loadGifs(gifID) {
    fetch(`https://api.giphy.com/v1/gifs/${gifID + getQuery({ api_key: 'Oku2KgMLfkiQB8ws3zBwc5BLDSQHvzk2' })}`)
      .then((response) => response.json())
      .then((gifData) => {
        this.setState({
          gif: gifData.data,
          isFetching: false,
        });
      });
  }

  render() {
    let gifID = window.location.pathname;
    gifID = gifID.split('/');
    gifID = gifID[gifID.length - 1];
    this.loadGifs(gifID);

    let gifContainer;
    const { gif, isFetching } = this.state;
    if (isFetching) {
      gifContainer = React.createElement('h1', { key: 'loading' }, 'loading...');
    } else {
      const gifImg = React.createElement('video', {
        src: `${gif.images.original.mp4}`,
        autoPlay: '',
        loop: true,
        muted: '',
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
          key: 'back-button',
        },
      );

      gifContainer = React.createElement('div', {}, [gifImg, gifTitle, gifDateTime, moreButton]);
    }
    return gifContainer;
  }
}

export default GifPage;
