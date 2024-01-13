import type { FC } from 'react';
import SearchIcon from '../assets/Search.svg';
import './SearchInput.css';

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="search-field">
      <img className="search-icon" src={SearchIcon} alt="search icon" />
      <input className="input" type="text" value={value} onChange={onChange} placeholder="Search by index value" />
    </div>
  );
};

export default SearchInput;
