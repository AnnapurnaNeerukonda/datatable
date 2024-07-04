import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { Table as ReactTable, Column } from '@tanstack/react-table';

interface ColumnsProps<T> {
  table: ReactTable<T>;
}

const Columns = <T,>({ table }: ColumnsProps<T>) => {
  return (
    <div className='flex items-center justify-between mb-4'>
      <div>
      </div>
      <div className='flex items-center justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-2'>
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column: Column<T, unknown>) => column.getCanHide())
              .map((column: Column<T, unknown>, index: number, columns: Column<T, unknown>[]) => {
                const visibleColumns = columns.filter((col: Column<T, unknown>) => col.getIsVisible()).length;
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value: boolean) => column.toggleVisibility(!!value)}
                    disabled={visibleColumns === 1 && column.getIsVisible()}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Columns;