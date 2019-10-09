import React from 'react';
import { Link } from 'react-router-dom';

import { getGifs, getSearchQuery } from './api';
import forgeGifElements from './elementForgery';
import Loading from './Loading';

class GifsComponent extends React.Component {
  state = {
    gifs: {},
    isFetching: true,
  };

  async componentDidMount() {
    const response = await getGifs();
    const gifsElements = forgeGifElements(response.data) || {};
    this.setState({
      gifs: gifsElements,
      isFetching: false,
    });
  }

  forgeGifElements = (gifs) => {
    const gifsList = [];

    gifs.forEach((gif) => {
      const gifImg = React.createElement(
        'img',
        {
          src: gif.images.fixed_height_small.url,
          className: 'm-1 img-thumbnail',
        },
      );
      const gifLink = (
        <Link
          key={`link-${gif.id}`}
          to={
              {
                pathname: `/gif/${gif.id}`,
                state: { isValidUrl: true },
              }
               }
        >
          {gifImg}
        </Link>
      );
      gifsList.push(gifLink);
    });

    return gifsList;
  }

  render() {
    const searchQuery = getSearchQuery();

    const { isFetching, gifs } = this.state;

    if (isFetching) {
      return <Loading />;
    }

    return (
      <div id="search-output">
        <h4 className="mt-3" key="search-label">
          Search results for `
          {searchQuery}
          `:
        </h4>
        {gifs}
      </div>
    );
  }
}

export default GifsComponent;
