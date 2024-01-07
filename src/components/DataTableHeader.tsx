import { type FC } from 'react';
import { DataItem } from '../types/types';

interface DataTableHeaderProps {
  visibleColumns: (keyof DataItem)[];
  onColumnSort: (columnName: keyof DataItem) => void;
}

const DataTableHeader: FC<DataTableHeaderProps> = ({ visibleColumns, onColumnSort }) => (
  <tr>
    {visibleColumns.map((column) => (
      <th key={column} onClick={() => onColumnSort(column)}>
        {column}
      </th>
    ))}
  </tr>
);

export default DataTableHeader;
