import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { inputChange, searchRequest } from '../js/actions/index';

import SearchForm from '../forms/SearchForm';

class HomePage extends React.Component {
  handleChange = (event) => {
    const { dispatchInputChange } = this.props;
    dispatchInputChange(event.target.value);
  }

  handleClick = () => {
    const { searchInput, dispatchSearchRequest } = this.props;
    dispatchSearchRequest({
      searchValue: searchInput,
    });
  }

  render() {
    const { searchInput } = this.props;
    return (
      <SearchForm
        inputValue={searchInput}
        onChange={this.handleChange}
        onClick={this.handleClick}
      />
    );
  }
}

HomePage.propTypes = {
  searchInput: PropTypes.string.isRequired,
  dispatchInputChange: PropTypes.func.isRequired,
  dispatchSearchRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchInputChange: bindActionCreators(inputChange, dispatch),
  dispatchSearchRequest: bindActionCreators(searchRequest, dispatch),
});

const mapStateToProps = (state) => ({ searchInput: state.searchInput });

const Home = connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);


export default Home;
