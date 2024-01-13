import { useState, useEffect } from 'react';
import { DataItem, SortDirection } from './types/types';
import { sortData } from './utils/utils';
import ColumnCheckbox from './components/ColumnCheckbox';
import DataTableHeader from './components/DataTableHeader';
import DataTableRow from './components/DataTableRow';
import SearchInput from './components/SearchInput';
import Pagination from './components/Pagination';
import './App.css';

const App = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null);
  const [sortDirection, setSortDirection] = useState(SortDirection.Ascending);
  const [visibleColumns, setVisibleColumns] = useState<(keyof DataItem)[]>(['code', 'index', 'value', 'diff', 'open', 'min', 'max', 'volume', 'date']);
  const [initialVisibleColumns] = useState<(keyof DataItem)[]>(['code', 'index', 'value', 'diff', 'open', 'min', 'max', 'volume', 'date']);
  const [searchValue, setSearchValue] = useState('');
  const itemsPerPage = 5;

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

    setCurrentPage(1);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = sortData(data, sortColumn, sortDirection);

  const filteredItems = sortedData.filter((item) => {
    return item.index.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="table-container">
      <h2>Stock Market Data</h2>
      <div className="column-checkboxes">
        <SearchInput value={searchValue} onChange={handleSearchInputChange} />
        {initialVisibleColumns.map((columnName) => (
          <ColumnCheckbox key={columnName} columnName={columnName} isVisible={visibleColumns.includes(columnName as keyof DataItem)} onColumnVisibilityChange={handleColumnVisibilityChange} />
        ))}
      </div>
      <div className="table-wrapper">
        <table className="data-table table">
          <thead className="thead">
            <DataTableHeader visibleColumns={visibleColumns} sortColumn={sortColumn} onColumnSort={handleColumnSort} />
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <DataTableRow key={item.code} item={item} visibleColumns={visibleColumns} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <span className="pagination-message">
          Showing <span className="pagination-message_strong">{currentPage * itemsPerPage - (itemsPerPage - 1)}</span>-
          <span className="pagination-message_strong">{currentPage * itemsPerPage > filteredItems.length ? filteredItems.length : currentPage * itemsPerPage} </span>
          from <span className="pagination-message_strong">{filteredItems.length} </span>
          data
        </span>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} onPreviousPage={handlePreviousPage} onNextPage={handleNextPage} />
      </div>
    </div>
  );
};

export default App;
