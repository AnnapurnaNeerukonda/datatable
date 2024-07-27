import React, { useMemo, useState } from 'react';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTablePagination } from '@/app/component/pagination';
import Columns from '../app/component/Columns'
import DownloadButton from '../app/component/datadownload';
import DownloadPDFButton from '../app/component/datadownloadpdf';
import * as Popover from '@radix-ui/react-popover';
import EllipsisDropdown from '../components/ui/ellipsis-dropdown';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';

interface UserData {
  name: string;
  email: string;
  status: string;
  datecreated: string;
}
interface RowDetails {
  name: string;
  email: string;
  status: string;
  datecreated: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [selectedRowDetails, setSelectedRowDetails] = useState<RowDetails | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [heading, setHeading] = useState<string>('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [saveAs, setSaveAs] = useState('');

  const handleViewDetails = (rowDetails: TData) => {
    setSelectedRowDetails(rowDetails as RowDetails);
    setIsSheetOpen(true);
  };
  const handlePopoverChange = (open: boolean) => {
    setPopoverOpen(open);
    if (!open) {
      setHeading('');
      setSaveAs('');
    }
  };

  const copyDetails = (rowDetails: RowDetails) => {
    setSelectedRowDetails(rowDetails);

    const detailsArray = Object.entries(rowDetails).map(([key, value]) => `${key}: ${value}`);
    const detailsString = detailsArray.join('\n');

    navigator.clipboard.writeText(detailsString)
      .then(() => {
        alert('Details copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };
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

  const selectedRowsData = table.getSelectedRowModel().rows.map(row => row.original);


  const dataToDownload = selectedRowsData.length > 0 ? selectedRowsData : table.getRowModel().rows.map(row => row.original);

  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <Columns table={table} />
        <div className='flex items-center space-x-2'>
          <Popover.Root open={popoverOpen} onOpenChange={handlePopoverChange}>
            <Popover.Trigger asChild>
              <button className="border rounded px-2 py-1">Download</button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="center"
                sideOffset={5}
                className="bg-white p-4 rounded shadow-lg"
              >
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="Enter heading for file"
                    className="border rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    value={saveAs}
                    onChange={(e) => setSaveAs(e.target.value)}
                    placeholder="Save File Name as"
                    className="border rounded px-2 py-1"
                  />
                  <DownloadButton 
                    data={dataToDownload} 
                    heading={heading} 
                    saveAs={saveAs} 
                  />
                  <DownloadPDFButton 
                    data={dataToDownload} 
                    heading={heading} 
                    saveAs={saveAs} 
                  />
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className='cursor-pointer select-none'
                  >
                    <div className='flex items-center'>
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
                <React.Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() ? 'selected' : undefined}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                    <TableCell>
                      <EllipsisDropdown onOption1Click={() => handleViewDetails(row.original)} onOption2Click={() => copyDetails(row.original as RowDetails)} />
                    </TableCell>
                  </TableRow>
                </React.Fragment>))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsWithSelection.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full max-w-4xl">
          <SheetHeader>
            <SheetTitle className="text-2xl">Row Details</SheetTitle>
          </SheetHeader>
          {selectedRowDetails && (
            <div className="mt-10 p-10 border rounded shadow">
              <div className="text-xl mb-4"><strong>Name:</strong> {selectedRowDetails?.name || 'N/A'}</div>
              <div className="text-xl mb-4"><strong>Email:</strong> {selectedRowDetails?.email || 'N/A'}</div>
              <div className="text-xl mb-4"><strong>Status:</strong> {selectedRowDetails?.status || 'N/A'}</div>
              <div className="text-xl mb-4"><strong>Date Created:</strong> {selectedRowDetails?.datecreated || 'N/A'}</div>
            </div>
          )}
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
