export type AnimeStatus = 'Plan to watch' | 'Watching' | 'Completed';
export const ANIME_STATUSES: AnimeStatus[] = [
  'Plan to watch',
  'Watching',
  'Completed',
];

export type AnimeType = 'Movie' | 'Series';
export const ANIME_TYPES: AnimeType[] = ['Movie', 'Series'];

export type AnimeScore = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export const ANIME_SCORES: AnimeScore[] = [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export type AnimeEpisodes = null | number;

export default interface Anime {
  id: number;
  title: string;
  image: string;
  type: AnimeType;
  score: AnimeScore;
  status: AnimeStatus;
  episodes: AnimeEpisodes;
}
