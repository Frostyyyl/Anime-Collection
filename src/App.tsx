import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState, useEffect } from 'react';
import AnimeList from './components/AnimeList';
import AnimeDetails from './components/AnimeDetails';
import NavigationBar from './components/NavigationBar';
import Filter, {
  SortValue,
  SortDirection,
  INITIAL_FILTER,
} from './types/filter';
import Anime from './types/anime';
import animeData from './data/anime.json';
import AnimeForm from './components/AnimeForm';

export default function App() {
  const [animeArray, setAnimeArray] = useState<Anime[]>(animeData as Anime[]);
  const [filteredArray, setFilteredArray] = useState<Anime[]>(animeArray);
  const [filters, setFilters] = useState<Filter>(INITIAL_FILTER);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);
  const selectedAnime: Anime | null =
    filteredArray.find((a) => a.id === selectedAnimeId) ?? filteredArray[0];
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Apply filters whenever filters or animeArray change
  useEffect(() => {
    const defaultCompare = (a: Anime, b: Anime) => {
      return filters.direction === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    };

    const applyFilters = () => {
      const { value, direction, query } = filters;

      const filtered = [...animeArray].filter((anime) =>
        anime.title.toLowerCase().includes(query)
      );

      const sorted = [...filtered].sort((a, b) => {
        if (a[value]! < b[value]!) return direction === 'asc' ? -1 : 1;
        if (a[value]! > b[value]!) return direction === 'asc' ? 1 : -1;
        return defaultCompare(a, b);
      });

      setFilteredArray(sorted);
    };

    applyFilters();
  }, [animeArray, filters]);

  // Handle events
  useEffect(() => {
    const handleSearchInput = (event: CustomEvent) => {
      setFilters((prev) => ({
        ...prev,
        query: event.detail.toLowerCase(),
      }));
    };

    const handleSortUpdate = (
      event: CustomEvent<{ value: SortValue; direction: SortDirection }>
    ) => {
      setFilters((prev) => ({
        ...prev,
        value: event.detail.value,
        direction: event.detail.direction,
      }));
    };

    const handleAnimeCreateInit = () => {
      setIsAddingNew(true);
    };

    const handleAnimeCreate = (event: CustomEvent) => {
      const newAnime = event.detail as Anime;
      setAnimeArray((prev) => [...prev, newAnime]);
      setIsAddingNew(false);
      setSelectedAnimeId(newAnime.id);
    };

    const handleAnimeCreateCancel = () => {
      setIsAddingNew(false);
    };

    const handleAnimeDelete = (event: CustomEvent) => {
      const deletedAnime = event.detail as Anime;

      setAnimeArray((prev) => {
        const updated = prev.filter((anime) => anime.id !== deletedAnime.id);
        setSelectedAnimeId(filteredArray[0]?.id ?? null);
        return updated;
      });
    };

    const handleAnimeUpdate = (event: CustomEvent) => {
      const updatedAnime = event.detail as Anime;

      setAnimeArray((prev) => {
        const updated = prev.map((anime) =>
          anime.id === updatedAnime.id ? updatedAnime : anime
        );
        return updated;
      });
    };

    const handleAnimeSelection = (event: CustomEvent<{ id: number }>) => {
      setSelectedAnimeId(event.detail.id);
    };

    // Event listeners
    window.addEventListener('searchInput', handleSearchInput as EventListener);
    window.addEventListener('sortUpdated', handleSortUpdate as EventListener);
    window.addEventListener(
      'animeCreateInit',
      handleAnimeCreateInit as EventListener
    );
    window.addEventListener(
      'animeCreateCancel',
      handleAnimeCreateCancel as EventListener
    );
    window.addEventListener('animeCreate', handleAnimeCreate as EventListener);
    window.addEventListener('animeDeleted', handleAnimeDelete as EventListener);
    window.addEventListener('animeUpdated', handleAnimeUpdate as EventListener);
    window.addEventListener(
      'animeSelected',
      handleAnimeSelection as EventListener
    );

    // Cleanup function
    return () => {
      window.removeEventListener(
        'searchInput',
        handleSearchInput as EventListener
      );
      window.removeEventListener(
        'sortUpdated',
        handleSortUpdate as EventListener
      );
      window.removeEventListener(
        'animeCreateInit',
        handleAnimeCreateInit as EventListener
      );
      window.removeEventListener(
        'animeCreate',
        handleAnimeCreate as EventListener
      );
      window.removeEventListener(
        'animeCreateCancel',
        handleAnimeCreateCancel as EventListener
      );
      window.removeEventListener(
        'animeDeleted',
        handleAnimeDelete as EventListener
      );
      window.removeEventListener(
        'animeUpdated',
        handleAnimeUpdate as EventListener
      );
      window.removeEventListener(
        'animeSelected',
        handleAnimeSelection as EventListener
      );
    };
  }, [filteredArray]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 p-5">
          <h1 className="pb-3 text-center">My Anime Collection</h1>
          <NavigationBar />
          {filteredArray.length ? (
            <AnimeList animeList={filteredArray} />
          ) : (
            <p className="text-center pt-3">No anime found.</p>
          )}
        </div>
        <div className="col-md-4 bg-dark min-vh-100">
          {isAddingNew ? (
            <AnimeForm />
          ) : selectedAnime ? (
            <AnimeDetails anime={selectedAnime} />
          ) : (
            <div className="text-white p-5">No anime selected.</div>
          )}
        </div>
      </div>
    </div>
  );
}
