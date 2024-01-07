export interface DataItem {
  code: string;
  index: string;
  value: number;
  diff: string;
  open: number;
  min: number;
  max: number;
  volume: number;
  date: string;
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}
