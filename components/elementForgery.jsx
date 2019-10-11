import React from 'react';
import { Link } from 'react-router-dom';

function forgeGifElements(gifs) {
  const gifsList = gifs.map((gif) => {
    const gifImg = (
      <img
        src={gif.images.fixed_height_small.url}
        className="m-1 img-thumbnail"
        key={`gif-${gif.id}`}
        alt={gif.title}
      />
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
    return gifLink;
  });

  return gifsList;
}

export default forgeGifElements;
