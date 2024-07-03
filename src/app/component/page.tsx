'use client';
import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/data-table';
import SearchComponent from './searchComponent';
import StatusFilterComponent from './StatusFilterComponent';
import { DatePickerWithRange, DateRange } from './dateRangePicker';

interface DataItem {
  [key: string]: any;
}

const DisplayDetails: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [originalData, setOriginalData] = useState<DataItem[]>([]);
  const [columns, setColumns] = useState<ColumnDef<DataItem>[]>([]);
  const [filteredData, setFilteredData] = useState<DataItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isServerSearch, setIsServerSearch] = useState<boolean>(false);

  const handleSearchResults = (searchResults: DataItem[]) => {
    setData(searchResults);
    setFilteredData(searchResults);
    setIsServerSearch(true);
  };

  const handleDateChange = async (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);

    if (newDateRange?.from && newDateRange.to) {
      try {
        const response = await fetch(`/api/displaydetails?from=${newDateRange.from.toISOString()}&to=${newDateRange.to.toISOString()}`);
        const data: DataItem[] = await response.json();
        setData(data);
        setFilteredData(data);
        setIsServerSearch(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setData(originalData);
      setIsServerSearch(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/displaydetails');
        const data: DataItem[] = await response.json();
        setData(data);
        setOriginalData(data);

        if (data.length > 0) {
          const dynamicColumns = Object.keys(data[0]).map((key) => ({
            accessorKey: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
          }));
          setColumns(dynamicColumns);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = isServerSearch ? data : originalData;

    if (dateRange?.from && dateRange.to) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.datecreated);
        return itemDate >= dateRange.from && itemDate <= dateRange.to;
      });
    }

    if (typeof searchQuery === 'string' && searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus && selectedStatus !== 'all') {
      filtered = filtered.filter((item) => item.status === selectedStatus);
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedStatus, dateRange, data, originalData, isServerSearch]);

  return (
    <div className="container mx-auto py-10">
      <DatePickerWithRange onDateChange={handleDateChange} />
      <SearchComponent onSearch={setSearchQuery} onSearchButtonClick={handleSearchResults} />
      <StatusFilterComponent data={data} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default DisplayDetails;
