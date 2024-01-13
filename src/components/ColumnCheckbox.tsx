import { type FC } from 'react';
import { DataItem } from '../types/types';
import classNames from 'classnames';
import './ColumnCheckbox.css';

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

  const checkboxClasses = classNames('checkbox', { 'checkbox--active': isVisible });

  return (
    <button className={checkboxClasses} onClick={() => onColumnVisibilityChange(columnName)}>
      {columnName}
    </button>
  );
};

export default ColumnCheckbox;
