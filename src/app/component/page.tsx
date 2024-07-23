<<<<<<< HEAD
"use client";
import React, { useState, useEffect } from 'react';
=======
'use client'
import React, { useState, useEffect, useCallback } from 'react';
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/data-table';
import SearchComponent from './searchComponent';
import StatusFilterComponent from './StatusFilterComponent';
import { DatePickerWithRange, DateRange } from './dateRangePicker';
<<<<<<< HEAD
import { parseISO, isWithinInterval, format } from 'date-fns';
import { ThemeToggle } from './theme-toggle';
=======
import { parseISO, isWithinInterval, format } from 'date-fns'; 
import ThemeToggle from './theme-toggle';

>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
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
<<<<<<< HEAD
=======
        console.log(data);
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
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

<<<<<<< HEAD
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/displaydetails');
        const data: DataItem[] = await response.json();
        setData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'dd-MMM-yyyy') })));
        setOriginalData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'dd-MMM-yyyy') })));

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
=======
  const filterData = useCallback(() => {
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
    let filtered = isServerSearch ? data : originalData;

    if (dateRange?.from && dateRange.to) {
      const start = dateRange.from;
      const end = dateRange.to;

      filtered = filtered.filter((item) => {
<<<<<<< HEAD
        if (!item.datecreated) return false; // Skip items without a date
        try {
          const itemDate = parseISO(item.datecreated);
          return isWithinInterval(itemDate, { 
            start: dateRange.from as Date, 
            end: dateRange.to as Date 
          });
        } catch (error) {
          console.error('Error parsing date:', item.datecreated);
          return false;
        }
=======
        const itemDate = parseISO(item.datecreated);
        return isWithinInterval(itemDate, { start, end });
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
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
      const [column, status] = selectedStatus.split(':');
      filtered = filtered.filter((item) => item[column] === status);
    }

    setFilteredData(filtered.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'yyyy-MM-dd') })));
  }, [searchQuery, selectedStatus, dateRange, data, originalData, isServerSearch]);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/displaydetails');
      const data: DataItem[] = await response.json();
      console.log(data);
      setData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'yyyy-MM-dd') }))); 
      setOriginalData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'yyyy-MM-dd') }))); 

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
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    filterData();
  }, [filterData]);

  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
    filterData();
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    filterData();
  };

  return (
    <div className="container mx-auto py-10">
<<<<<<< HEAD
      <div className="flex justify-between mb-4">
        <SearchComponent onSearch={setSearchQuery} onSearchButtonClick={handleSearchResults} />
        <DatePickerWithRange onDateChange={handleDateChange} />
        <StatusFilterComponent data={data} selectedStatus={selectedStatus} onStatusChange={setSelectedStatus} />
      
        <span>
          <ThemeToggle />
        </span>
=======
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div className="flex md:flex-1 md:justify-between md:gap-4">
          <div className="flex md:flex-1 md:justify-start">
            <SearchComponent onSearch={handleSearchQueryChange} onSearchButtonClick={handleSearchResults} />
          </div>
          <div className="md:hidden">
            <ThemeToggle />
          </div>
        </div>
        <div className="flex md:flex-1 md:justify-between gap-4 mt-4 md:mt-0">
          <div className="flex md:flex-1 md:justify-start md:gap-4">
            <DatePickerWithRange onDateChange={handleDateChange} />
            <StatusFilterComponent
              data={data}
              columnName="status"
              selectedStatus={selectedStatus}
              onStatusChange={handleStatusChange}
            />
          </div>
          <div className="hidden md:flex ">
            <ThemeToggle />
          </div>
        </div>
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa
      </div>
      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default DisplayDetails;