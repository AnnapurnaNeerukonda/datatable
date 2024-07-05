'use client'

import React, { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../components/data-table';
import SearchComponent from './searchComponent';
import StatusFilterComponent from './StatusFilterComponent';
import { DatePickerWithRange, DateRange } from './dateRangePicker';
import { parseISO, isWithinInterval, format } from 'date-fns'; // Import format from date-fns
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DownloadButton from './datadownload';
import DownloadPDFButton from './datadownloadpdf';
import { Button } from '@/components/ui/button';

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
  const [downloadType, setDownloadType] = useState<'csv' | 'pdf'>('csv'); // Default download type

  // Function to handle search results
  const handleSearchResults = (searchResults: DataItem[]) => {
    setData(searchResults);
    setFilteredData(searchResults);
    setIsServerSearch(true);
  };

  // Function to handle date range change
  const handleDateChange = async (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);

    if (newDateRange?.from && newDateRange.to) {
      try {
        const response = await fetch(`/api/displaydetails?from=${newDateRange.from.toISOString()}&to=${newDateRange.to.toISOString()}`);
        const data: DataItem[] = await response.json();
        setData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'dd-MMM-yyyy') }))); // Format datecreated
        setFilteredData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'dd-MMM-yyyy') }))); // Format datecreated
        setIsServerSearch(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      setData(originalData);
      setIsServerSearch(false);
    }
  };

  // Fetch initial data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/displaydetails');
        const data: DataItem[] = await response.json();
        setData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'dd-MMM-yyyy') }))); // Format datecreated
        setOriginalData(data.map(item => ({ ...item, datecreated: format(parseISO(item.datecreated), 'dd-MMM-yyyy') }))); // Format datecreated

        if (data.length > 0) {
          const dynamicColumns = Object.keys(data[0]).map((key) => ({
            accessorKey: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
          }));
          setColumns(dynamicColumns);
          console.log(columns);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Apply filters when searchQuery, selectedStatus, dateRange, or data change
  useEffect(() => {
    let filtered = isServerSearch ? data : originalData;

    // Filter by date range
    if (dateRange?.from && dateRange.to) {
      filtered = filtered.filter((item) => {
        const itemDate = parseISO(item.datecreated);
        return isWithinInterval(itemDate, { start: dateRange.from, end: dateRange.to });
      });
    }

    // Filter by search query
    if (typeof searchQuery === 'string' && searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.email?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected status
    if (selectedStatus && selectedStatus !== 'all') {
      const [column, status] = selectedStatus.split(':');
      filtered = filtered.filter((item) => item[column] === status);
    }

    setFilteredData(filtered);
  }, [searchQuery, selectedStatus, dateRange, data, originalData, isServerSearch]);

  

  return (
    <div className="container mx-auto py-10">
     <div className="flex justify-between mb-4">
  <SearchComponent onSearch={setSearchQuery} onSearchButtonClick={handleSearchResults} />
  
  <div className="flex justify-between gap-4">
    <StatusFilterComponent
      data={data}
      columnName="status"
      selectedStatus={selectedStatus}
      onStatusChange={setSelectedStatus}
    />
    
    <DatePickerWithRange onDateChange={handleDateChange} />
    
    <div >
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button>Download</Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent suppressHydrationWarning={true}>
          <DropdownMenuLabel>Select Format</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem>
            <DownloadButton data={filteredData} />
          </DropdownMenuItem>
          
          <DropdownMenuItem>
            <DownloadPDFButton data={filteredData} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
         
     
    </div>
  </div>
</div>

      <DataTable columns={columns} data={filteredData} />
    </div>
  );
};

export default DisplayDetails;
