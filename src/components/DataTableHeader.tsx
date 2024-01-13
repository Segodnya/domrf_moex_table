import { type FC } from 'react';
import { DataItem } from '../types/types';
import DropdownIcon from '../assets/dropdown.svg';

interface DataTableHeaderProps {
  visibleColumns: (keyof DataItem)[];
  sortColumn: keyof DataItem | null;
  onColumnSort: (columnName: keyof DataItem) => void;
}

const DataTableHeader: FC<DataTableHeaderProps> = ({ visibleColumns, sortColumn, onColumnSort }) => (
  <tr>
    {visibleColumns.map((column) => (
      <th key={column} onClick={() => onColumnSort(column)} className={`th ${sortColumn === column ? 'sorted' : ''}`}>
        {column} {sortColumn === column ? <img className="dropdown-icon" src={DropdownIcon} alt="sorted column" /> : ''}
      </th>
    ))}
  </tr>
);

export default DataTableHeader;
