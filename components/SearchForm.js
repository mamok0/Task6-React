import React from 'react';

class SearchForm extends React.Component {
  goToRoute() {
    window.history.pushState({}, '', `/search?q=${document.getElementById('search-input').value}`);
  }

  render() {
    return (
      <div id="search-form" className="container text-center mt-3">
        <h3>Type what are you want to find:</h3>
        <input id="search-input" type="text" className="form-control" />
        <input type="button" className="btn btn-danger mt-2" value="Search" onClick={this.goToRoute} />

      </div>
    );
  }
}


export default SearchForm;
