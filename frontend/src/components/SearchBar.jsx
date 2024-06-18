import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
    console.log('TYPING..', e.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="search"
        name="search"
        placeholder="Search by skills or name"
        value={query}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
