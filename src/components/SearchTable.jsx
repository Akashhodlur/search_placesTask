// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useRef } from "react";
import { fetchCities } from "../api";
import "./SearchTable.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  // Keyboard shortcut to focus on search input
  const handleKeyPress = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "/") {
      e.preventDefault();
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCities("IN", query, limit);
      if (data.data.length === 0) {
        setError("No results found");
      }
      setCities(data.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to fetch cities. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Search on Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h2>City Search</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for cities"
        ref={searchInputRef}
        aria-label="Search for cities"
      />
      
      <input
        type="number"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        min="1"
        max="10"
        placeholder="Number of results"
        aria-label="Limit the number of results"
      />
      <button onClick={handleSearch}>Search</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <table>
        <thead>
          <tr>
            <th  className="text-color">#</th>
            <th className="text-color">City</th>
            <th className="text-color">Country</th>
          </tr>
        </thead>
        <tbody>
          {cities.length > 0 ? (
            cities.map((city, index) => (
              <tr key={city.id}>
                <td>{index + 1}</td>
                <td>{city.name}</td>
                <td>
                  {city.country}{" "}
                  <img
                    src={`https://flagsapi.com/${city.countryCode}/flat/64.png`}
                    alt={`${city.country} Flag`}
                    className="image-size"
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Search;
