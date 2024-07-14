'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { 
  ColumnDef, 
  flexRender, 
  SortingState, 
  VisibilityState, 
  getCoreRowModel, 
  getSortedRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  useReactTable, 
  RowSelectionState 
} from '@tanstack/react-table';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTablePagination } from '@/app/component/pagination';
import Columns from '../app/component/Columns';
import DownloadButton from '../app/component/datadownload';
import DownloadPDFButton from '../app/component/datadownloadpdf';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const selectionColumn: ColumnDef<TData> = {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const columnsWithSelection = useMemo(
    () => [selectionColumn, ...columns.filter(col => col.id !== 'select')],
    [columns]
  );

  const table = useReactTable({
    data,
    columns: columnsWithSelection,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const getSortingIcon = (columnId: string) => {
    const isSorted = sorting.find(sort => sort.id === columnId);
    if (!isSorted) return null;
    return isSorted.desc ? '↓' : '↑';
  };

  if (!mounted) return null;

 
  const selectedRowsData = table.getSelectedRowModel().rows.map(row => row.original);


  const dataToDownload = selectedRowsData.length > 0 ? selectedRowsData : table.getRowModel().rows.map(row => row.original);

  return (
    <>
      <Columns table={table} />
      <div className='flex items-center justify-between mb-4'>
        <DownloadButton data={dataToDownload}/>
      </div>
      <div className='flex items-center justify-between mb-4'>
        <DownloadPDFButton data={dataToDownload} />
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex items-center justify-center space-x-4">
        <span>{Object.keys(rowSelection).length} row(s) selected</span>
        
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={`cursor-pointer select-none ${theme === 'light' ? 'text-blue-500 text-base font-semibold' : 'text-amber-400 text-base font-semibold'}`}
                  >
                    <div className="flex items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getCanSort() && getSortingIcon(header.column.id)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={`p-4 ${theme === 'light' ? 'text-dark-900' : 'text-white-100'}`}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsWithSelection.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
