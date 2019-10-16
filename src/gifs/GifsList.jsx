import React from 'react';
import PropTypes from 'prop-types';

import GifPreview from './GifPreview';
import Loading from '../common/Loading';

class GifsList extends React.PureComponent {
  render() {
    const {
      isFetching,
      gifs,
      searchInput,
    } = this.props;

    if (isFetching) {
      return <Loading />;
    }

    const gifElements = gifs.map((gif) => <GifPreview key={`${gif.id}`} gif={gif} />);

    return (
      <div id="search-output">
        <h4 key="search-label">
          Search results for `
          {searchInput}
          `:
        </h4>
        {gifElements}
      </div>
    );
  }
}

GifsList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  gifs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      datetime: PropTypes.string,
      original: PropTypes.string,
      id: PropTypes.string,
      preview: PropTypes.string,
    }),
  ),
  searchInput: PropTypes.string.isRequired,
};

GifsList.defaultProps = {
  gifs: [],
};

export default GifsList;
