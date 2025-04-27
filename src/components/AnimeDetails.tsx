import { useState } from 'react';
import Anime, {
  AnimeStatus,
  AnimeScore,
  ANIME_STATUSES,
  ANIME_SCORES,
} from '../types/anime';

interface DropdownProps {
  current: AnimeStatus | AnimeScore;
  values: Array<AnimeStatus | AnimeScore>;
  onChange: (newValue: AnimeStatus | AnimeScore) => void;
  disabled?: boolean;
}

function Dropdown({
  current,
  values,
  onChange,
  disabled = true,
}: DropdownProps) {
  return (
    <div className="dropdown">
      <button
        className={`badge bg-primary rounded-pill border-0 dropdown-toggle ${
          disabled ? 'bg-secondary' : ''
        }`}
        type="button"
        data-bs-toggle="dropdown"
        disabled={disabled}
      >
        {current ?? 'None'}
      </button>
      <ul className="dropdown-menu">
        {values.map((element) => (
          <li key={element}>
            <button className="dropdown-item" onClick={() => onChange(element)}>
              {element ?? 'None'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AnimeDetails({ anime }: { anime: Anime }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  function handleDelete() {
    const event = new CustomEvent('animeDeleted', {
      detail: anime,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }

  return (
    <div className="d-flex flex-column p-5 sticky-top vh-100">
      <h2 className="text-center pt-5 pb-5 text-white">{anime.title}</h2>
      <div className="align-self-center pb-5 h-50">
        <img
          src={anime.image}
          alt={anime.title}
          className="img-fluid rounded"
        />
      </div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Type
          <span className="badge bg-secondary rounded-pill">{anime.type}</span>
        </li>
        {anime.type === 'Series' && (
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Number of episodes
            <span className="badge bg-secondary rounded-pill">
              {anime.episodes}
            </span>
          </li>
        )}
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Status
          <Dropdown
            current={anime.status}
            values={ANIME_STATUSES}
            onChange={(newStatus) => {
              const updated = { ...anime, status: newStatus as AnimeStatus };
              const event = new CustomEvent('animeUpdated', {
                detail: updated,
                bubbles: true,
              });
              window.dispatchEvent(event);
            }}
            disabled={!isEditing}
          />
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          My score
          <Dropdown
            current={anime.score}
            values={ANIME_SCORES}
            onChange={(newScore) => {
              const updated = { ...anime, score: newScore as AnimeScore };
              const event = new CustomEvent('animeUpdated', {
                detail: updated,
                bubbles: true,
              });
              window.dispatchEvent(event);
            }}
            disabled={!isEditing}
          />
        </li>
      </ul>
      <div className="pt-4 align-self-end mt-auto">
        <button
          className="btn btn-success me-2"
          onClick={() => {
            setIsEditing((prev) => !prev);
          }}
        >
          <i className="bi bi-pencil me-1"></i> Edit
        </button>
        <button
          className="btn btn-danger"
          disabled={!isEditing}
          onClick={handleDelete}
        >
          <i className="bi bi-trash me-1"></i> Delete
        </button>
      </div>
    </div>
  );
}
