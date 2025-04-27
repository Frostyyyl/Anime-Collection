import { useState } from 'react';
import {
  INITIAL_FILTER,
  SORT_VALUES,
  SortValue,
  SortDirection,
} from '../types/filter';

function SearchBar() {
  const [query, setQuery] = useState(INITIAL_FILTER.query);

  const dispatchSearch = () => {
    const event = new CustomEvent('searchInput', {
      detail: query.toLowerCase(),
    });
    window.dispatchEvent(event);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatchSearch();
    }
  };

  return (
    <div className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="btn btn-dark me-2  text-nowrap"
        type="button"
        onClick={dispatchSearch}
      >
        <i className="bi bi-search me-2"></i>
        Search
      </button>
      <button
        className="btn btn-success text-nowrap"
        type="button"
        onClick={() => {
          window.dispatchEvent(new CustomEvent('animeCreateInit'));
        }}
      >
        <i className="bi bi-plus-circle me-2"></i>Add new
      </button>
    </div>
  );
}

function SortList() {
  const [selectedField, setSelectedField] = useState<SortValue>(
    INITIAL_FILTER.value
  );
  const [direction, setDirection] = useState<SortDirection>(
    INITIAL_FILTER.direction
  );

  const handleClick = (value: SortValue) => {
    let newDirection: SortDirection = INITIAL_FILTER.direction;

    if (selectedField === value) {
      newDirection = direction === 'asc' ? 'desc' : 'asc';
      setDirection(newDirection);
    } else {
      setSelectedField(value);
      setDirection(INITIAL_FILTER.direction);
    }

    const event = new CustomEvent('sortUpdated', {
      detail: { value, direction: newDirection },
      bubbles: true,
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="d-flex align-items-center">
      <span className="me-2">Sort by</span>
      <div className="btn-group" role="group">
        {SORT_VALUES.map((value) => (
          <button
            key={value}
            className={`btn ${
              selectedField === value ? 'btn-dark' : 'btn-outline-dark'
            }`}
            onClick={() => handleClick(value)}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
            {selectedField === value && (
              <span className="ms-2">
                {direction === 'asc' ? (
                  <i className="bi bi-arrow-up"></i>
                ) : (
                  <i className="bi bi-arrow-down"></i>
                )}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function NavigationBar() {
  return (
    <nav className="navbar rounded pb-4 justify-content-between">
      <SearchBar />
      <SortList />
    </nav>
  );
}
