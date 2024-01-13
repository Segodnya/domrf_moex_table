import type { FC } from 'react';
import classnames from 'classnames';
import { DataItem } from '../types/types';

interface DataTableCellProps {
  value: string | number;
  column: keyof DataItem;
}

const DataTableCell: FC<DataTableCellProps> = ({ value, column }) => {
  const cellClass = classnames('span', {
    'green-text': typeof value === 'string' && value.includes('+') && column === 'diff',
    'red-text': typeof value === 'string' && value.includes('-') && column === 'diff',
    'neutral-text': typeof value === 'string' && !value.includes('-') && !value.includes('+') && column === 'diff',
  });

  let formattedValue = value;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  if (column === 'date' && typeof value === 'string') {
    const dateParts = value.split('.');
    if (dateParts.length === 3) {
      const [year, month, day] = dateParts;
      const date = new Date(`${year}-${month}-${day}`);
      formattedValue = date.toLocaleDateString('us-US', options);
    }
  }

  return <td className="td">{column === 'diff' ? <span className={cellClass}>{value}</span> : typeof formattedValue === 'number' ? formattedValue.toLocaleString() : formattedValue}</td>;
};

export default DataTableCell;
