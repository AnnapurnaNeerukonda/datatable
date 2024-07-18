'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface SearchComponentProps {
  onSearch: (searchQuery: string) => void;
  onSearchButtonClick: (searchResults: any[]) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, onSearchButtonClick }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await fetch(`/api/search?searchQuery=${encodeURIComponent(searchQuery)}`);
      let data = await response.json();
  
      const formatDate = (dateString: string | number | Date) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      };
  
      const convertDates = (obj: { [x: string]: any; hasOwnProperty: (arg0: string) => any; }) => {
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'string' && !isNaN(Date.parse(obj[key]))) {
              obj[key] = formatDate(obj[key]);
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
              convertDates(obj[key]);
            }
          }
        }
      };
  
      convertDates(data);
  
      onSearchButtonClick(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  

  return (
    <div className="flex items-center space-x-2 mb-4">
      <Input
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
      <Button onClick={handleSearchClick}>Search</Button>
    </div>
  );
};

export default SearchComponent;
