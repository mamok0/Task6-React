import React from 'react';

import SearchForm from './SearchForm';

const Home = () => {
  localStorage.removeItem('searchInput');
  return <SearchForm />;
};

export default Home;
