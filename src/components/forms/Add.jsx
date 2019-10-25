import React from 'react';

import DefaultButton from '../common/DefaultButton';

class AddGif extends React.PureComponent {
  render() {
    return (
      <>
        <input type="file" />
        <DefaultButton>
          Add gif
        </DefaultButton>
      </>
    );
  }
}

export default AddGif;
