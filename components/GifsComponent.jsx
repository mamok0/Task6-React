import React from 'react';

import Loading from './Loading';

class GifsComponent extends React.PureComponent {
  render() {
    const { gifsData } = this.props;
    const { isFetching, gifs, searchInput } = gifsData;
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div id="search-output">
        <h4 className="mt-3" key="search-label">
          Search results for `
          {searchInput}
          `:
        </h4>
        {gifs}
      </div>
    );
  }
}

export default GifsComponent;
