import { FC } from 'react';
import classnames from 'classnames';
import { DataItem } from '../types/types';

interface DataTableCellProps {
  value: string | number;
  column: keyof DataItem;
}

const DataTableCell: FC<DataTableCellProps> = ({ value, column }) => {
  const cellClass = classnames('td', {
    'green-text': typeof value === 'string' && value.includes('+') && column === 'diff',
    'red-text': typeof value === 'string' && value.includes('-') && column === 'diff',
  });

  return <td className={cellClass}>{typeof value === 'number' ? value.toLocaleString() : value}</td>;
};

export default DataTableCell;
