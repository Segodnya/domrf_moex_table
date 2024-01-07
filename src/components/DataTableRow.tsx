import { type FC } from 'react';
import DataTableCell from './DataTableCell';
import { DataItem } from '../types/types';

interface DataTableRowProps {
  item: DataItem;
  visibleColumns: (keyof DataItem)[];
}

const DataTableRow: FC<DataTableRowProps> = ({ item, visibleColumns }) => (
  <tr key={item.code} className="tr">
    {visibleColumns.map((column) => (
      <DataTableCell key={column} value={item[column]} column={column} />
    ))}
  </tr>
);

export default DataTableRow;
