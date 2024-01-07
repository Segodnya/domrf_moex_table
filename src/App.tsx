import { useState, useEffect } from 'react';
import { DataItem, SortDirection } from './types/types';
import { sortData } from './utils/utils';
import ColumnCheckbox from './components/ColumnCheckbox';
import DataTableHeader from './components/DataTableHeader';
import DataTableRow from './components/DataTableRow';
import './App.css';

const App = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);
  const [visibleColumns, setVisibleColumns] = useState<(keyof DataItem)[]>(['code', 'index', 'value', 'diff', 'open', 'min', 'max', 'volume', 'date']);
  const [initialVisibleColumns] = useState<(keyof DataItem)[]>(['code', 'index', 'value', 'diff', 'open', 'min', 'max', 'volume', 'date']);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import('./assets/data.json');
        const jsonData = response.default;
        setData(jsonData);
        setVisibleColumns(initialVisibleColumns);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [initialVisibleColumns]);

  const handleColumnSort = (columnName: keyof DataItem) => {
    if (sortColumn === columnName) {
      setSortDirection(sortDirection === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending);
    } else {
      setSortColumn(columnName);
      setSortDirection(SortDirection.Ascending);
    }
  };

  const handleColumnVisibilityChange = (columnName: keyof DataItem) => {
    const isVisible = visibleColumns.includes(columnName);

    if (isVisible && columnName !== 'code') {
      setVisibleColumns((prevState) => prevState.filter((column) => column !== columnName));
    } else if (!isVisible) {
      const columnIndex = initialVisibleColumns.indexOf(columnName);
      setVisibleColumns((prevState) => [...prevState.slice(0, columnIndex), columnName, ...prevState.slice(columnIndex)]);
    }
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = sortData(data, sortColumn, sortDirection);

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="table-container">
      <h2>Stock Market Data</h2>
      <div className="column-checkboxes">
        {initialVisibleColumns.map((columnName) => (
          <ColumnCheckbox key={columnName} columnName={columnName} isVisible={visibleColumns.includes(columnName as keyof DataItem)} onColumnVisibilityChange={handleColumnVisibilityChange} />
        ))}
      </div>
      <table className="data-table table">
        <thead className="thead">
          <DataTableHeader visibleColumns={visibleColumns} onColumnSort={handleColumnSort} />
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <DataTableRow key={item.code} item={item} visibleColumns={visibleColumns} />
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <span>
          Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
        </span>
      </div>
    </div>
  );
};

export default App;
