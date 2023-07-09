import React from 'react';

export default SearchResults = ({ results }) => {
  return (
    <div>
      <h2>Search Results</h2>
      {results.map((result) => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.description}</p>
        </div>
      ))}
    </div>
  );
};


