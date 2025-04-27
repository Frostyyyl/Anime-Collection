import Anime from '../types/anime';

export type SortDirection = 'asc' | 'desc';

export type SortValue = keyof Pick<
  Anime,
  'title' | 'type' | 'episodes' | 'status' | 'score'
>;

export const SORT_VALUES: SortValue[] = [
  'title',
  'type',
  'episodes',
  'status',
  'score',
];

export default interface Filter {
  direction: SortDirection;
  value: SortValue;
  query: string;
}

export const INITIAL_FILTER: Filter = {
  direction: 'asc',
  value: 'title',
  query: '',
};
