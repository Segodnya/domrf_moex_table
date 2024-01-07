import { DataItem, SortDirection } from '../types/types';

export const sortData = (data: DataItem[], sortColumn: keyof DataItem | null, sortDirection: SortDirection) => {
  let sortedData = data;

  if (sortColumn != null) {
    sortedData = data.slice().sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];

      if (valueA === valueB) {
        return 0;
      } else if (valueA > valueB) {
        return sortDirection === SortDirection.Ascending ? 1 : -1;
      } else {
        return sortDirection === SortDirection.Ascending ? -1 : 1;
      }
    });
  }

  return sortedData;
};
