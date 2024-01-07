import { type FC } from 'react';
import { DataItem } from '../types/types';

interface ColumnCheckboxProps {
  columnName: keyof DataItem;
  isVisible: boolean;
  onColumnVisibilityChange: (columnName: keyof DataItem) => void;
}

const ColumnCheckbox: FC<ColumnCheckboxProps> = ({ columnName, isVisible, onColumnVisibilityChange }) => {
  if (columnName === 'code') {
    // Skip rendering the checkbox for the 'code' column
    return null;
  }

  return (
    <label className="label">
      <input type="checkbox" checked={isVisible} onChange={() => onColumnVisibilityChange(columnName)} />
      {columnName}
    </label>
  );
};

export default ColumnCheckbox;
