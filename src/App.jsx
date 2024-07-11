import React, { useState, useEffect } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.length > 2) {
      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then(response => response.json())
        .then(data => {
          if (Array.isArray(data)) {
            setResults(data);
          } else {
            setResults([]);
          }
        })
        .catch(() => setResults([]));
    } else {
      setResults([]);
    }
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleResultClick = (country) => {
    setSelectedCountry(country);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <form className="max-w-md w-full mb-4">   
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            id="default-search" 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-rose-500 focus:border-rose-500" 
            value={query} 
            onChange={handleChange}
            placeholder="Search Country..." 
            required 
          />
        </div>
      </form>

      {results.length > 0 && (
        <ul className="max-w-md w-full bg-white rounded-lg shadow-md border border-gray-200 overflow-y-auto max-h-60">
          {results.map((country) => (
            <li 
              key={country.cca3} 
              onClick={() => handleResultClick(country)}
              className="cursor-pointer p-4 hover:bg-gray-100"
            >
              {country.name.common}
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div className="max-w-md w-full mt-4 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">{selectedCountry.name.common}</h2>
          <p><strong>Capital:</strong> {selectedCountry.capital ? selectedCountry.capital[0] : 'N/A'}</p>
          <p><strong>Region:</strong> {selectedCountry.region}</p>
          <p><strong>Population:</strong> {selectedCountry.population.toLocaleString()}</p>
          <p><strong>Languages:</strong> {Object.values(selectedCountry.languages || {}).join(', ')}</p>
          <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} className="mt-4 w-32" />
        </div>
      )}
    </div>
  );
}

export default App;

