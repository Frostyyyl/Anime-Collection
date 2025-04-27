import Anime from '../types/anime';
import './AnimeList.scss';

function AnimeCard({ anime }: { anime: Anime }) {
  function handleClick() {
    const event = new CustomEvent('animeSelected', {
      detail: anime,
      bubbles: true,
    });
    window.dispatchEvent(event);
  }

  return (
    <>
      <div className="pb-4 anime-card-hover">
        <div className="card bg-secondary text-white border-0 shadow">
          <div className="row g-0 " onClick={handleClick}>
            <div className="col-md-2 ">
              <img
                src={anime.image}
                alt={anime.title}
                className="img-fluid rounded-start"
              />
            </div>
            <div className="col-md-10 p-4">
              <h5 className="card-title">{anime.title}</h5>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AnimeList({ animeList }: { animeList: Anime[] }) {
  return (
    <div className="row row-cols-2">
      {animeList.map((anime) => (
        <AnimeCard anime={anime} key={anime.id} />
      ))}
    </div>
  );
}
