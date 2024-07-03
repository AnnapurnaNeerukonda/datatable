// import React, { useState, useMemo } from 'react';
// import {
//   ColumnDef,
//   flexRender,
//   SortingState,
//   VisibilityState,
//   getCoreRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
// import { Button } from '@/components/ui/button';
// import { DataTablePagination } from '@/app/component/pagination';
// // import DataDownload from "../app/u/datadownload";

// // Define your data type
// interface UserData {
//   name: string;
//   email: string;
//   status: string;
//   datecreated: string; // Ensure this matches the format of your date field
// }

// // Define your columns
// const columns: ColumnDef<UserData, any>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <input
//         type="checkbox"
//         checked={table.getIsAllRowsSelected()}
//         onChange={table.getToggleAllRowsSelectedHandler()}
//       />
//     ),
//     cell: ({ row }) => (
//       <input
//         type="checkbox"
//         checked={row.getIsSelected()}
//         onChange={row.getToggleSelectedHandler()}
//       />
//     ),
//   },
//   {
//     accessorKey: 'name',
//     header: () => <div className='flex items-center'>Name</div>,
//     cell: info => info.getValue(),
//   },
//   {
//     accessorKey: 'email',
//     header: () => <div className='flex items-center'>Email</div>,
//     cell: info => info.getValue(),
//   },
//   {
//     accessorKey: 'status',
//     header: () => <div className='flex items-center'>Status</div>,
//     cell: info => info.getValue(),
//   },
//   {
//     accessorKey: 'datecreated',
//     header: () => <div className='flex items-center'>Date Created</div>,
//     cell: info => info.getValue(),
//   },
// ];

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
//   const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting,
//       columnVisibility,
//     },
//     onSortingChange: setSorting,
//     onColumnVisibilityChange: setColumnVisibility,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//   });

//   const handleRowSelect = (rowId: string) => {
//     setSelectedRows(prev => {
//       const newSelectedRows = new Set(prev);
//       if (newSelectedRows.has(rowId)) {
//         newSelectedRows.delete(rowId);
//       } else {
//         newSelectedRows.add(rowId);
//       }
//       return newSelectedRows;
//     });
//   };

//   const isRowSelected = (rowId: string) => selectedRows.has(rowId);

//   const getSortingIcon = (columnId: string) => {
//     const isSorted = sorting.find(sort => sort.id === columnId);
//     if (!isSorted) return null;
//     return isSorted.desc ? '↓' : '↑';
//   };

//   return (
//     <>
//       <div className='flex items-center justify-between mb-4'>
//         <div className='flex items-center justify-end'>
//           <div className='ml-4'>
//             {/* <DataDownload data={data} /> */}
//           </div>
//           {/* Column visibility */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant='outline' className='ml-2'>
//                 Columns
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align='end'>
//               {table
//                 .getAllColumns()
//                 .filter(column => column.getCanHide())
//                 .map(column => (
//                   <DropdownMenuCheckboxItem
//                     key={column.id}
//                     className='capitalize'
//                     checked={column.getIsVisible()}
//                     onCheckedChange={value => column.toggleVisibility(!!value)}
//                   >
//                     {column.id}
//                   </DropdownMenuCheckboxItem>
//                 ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//       {/* Table */}
//       <div className='rounded-md border'>
//         <Table>
//           <TableHeader>
//             {table.getHeaderGroups().map(headerGroup => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map(header => (
//                   <TableHead
//                     key={header.id}
//                     onClick={header.column.getToggleSortingHandler()}
//                     className='cursor-pointer select-none'
//                   >
//                     <div className='flex items-center'>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                       {header.column.getCanSort() && getSortingIcon(header.column.id)}
//                     </div>
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map(row => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() ? 'selected' : undefined}
//                   className={isRowSelected(row.id) ? 'bg-blue-100' : ''}
//                 >
//                   {row.getVisibleCells().map(cell => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className='h-24 text-center'
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       {/* Pagination */}
//       <div className='flex items-center justify-end space-x-2 py-4'>
//         <Button
//           variant='outline'
//           size='sm'
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           Previous
//         </Button>
//         <Button
//           variant='outline'
//           size='sm'
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           Next
//         </Button>
//       </div>
//       <DataTablePagination table={table} />
//     </>
//   );
// }
import React, { useState, useMemo } from 'react';
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
  RowSelectionState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTablePagination } from '@/app/component/pagination';
import Columns from '@/app/component/columns';
interface UserData {
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

  return (
    <>
      <div className='flex items-center justify-between mb-4'>
        <div>
          <Columns table={table}/>
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? 'selected' : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
      <div className='flex items-center justify-end space-x-2 py-4'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
