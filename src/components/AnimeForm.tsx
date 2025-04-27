import { useState } from 'react';
import Anime, {
  ANIME_SCORES,
  ANIME_STATUSES,
  ANIME_TYPES,
  AnimeEpisodes,
  AnimeScore,
  AnimeStatus,
  AnimeType,
} from '../types/anime';

export default function AnimeForm() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState<AnimeType>('Series');
  const [score, setScore] = useState<AnimeScore>(null);
  const [status, setStatus] = useState<AnimeStatus>('Plan to watch');
  const [episodes, setEpisodes] = useState<AnimeEpisodes>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAnime: Anime = {
      id: Date.now(),
      title,
      image,
      type,
      score,
      status,
      episodes,
    };

    window.dispatchEvent(new CustomEvent('animeCreate', { detail: newAnime }));

    setTitle('');
    setImage('');
    setType('Series');
    setScore(null);
    setStatus('Plan to watch');
    setEpisodes(0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-white d-flex flex-column p-5 sticky-top vh-100"
    >
      <h2 className="mb-4 text-center pt-5 pb-5">Create new anime</h2>

      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image url</label>
        <input
          type="url"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Anime type</label>
        <select
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value as AnimeType)}
        >
          {ANIME_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {type === 'Series' && (
        <div className="mb-4">
          <label className="form-label">Number of episodes</label>
          <input
            type="number"
            className="form-control"
            value={episodes!}
            onChange={(e) => setEpisodes(Number(e.target.value))}
            required
            min="0"
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value as AnimeStatus)}
        >
          {ANIME_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Your score</label>
        <select
          className="form-select"
          value={score ?? ''}
          onChange={(e) =>
            setScore(
              e.target.value === ''
                ? null
                : (Number(e.target.value) as AnimeScore)
            )
          }
        >
          {ANIME_SCORES.map((s) => (
            <option key={String(s)} value={s ?? ''}>
              {s === null ? 'None' : s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-auto d-flex justify-content-end pt-3 mt-auto">
        <button type="submit" className="btn btn-success me-2">
          <i className="bi bi-check-circle me-1"></i> Confirm
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => window.dispatchEvent(new Event('animeCreateCancel'))}
        >
          <i className="bi bi-x-circle me-1"></i> Cancel
        </button>
      </div>
    </form>
  );
}
