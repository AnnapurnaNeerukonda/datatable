import React from 'react';
import { ColumnDef, flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'; // Importing table components from your UI library

interface RowSelectionProps {
  selectedRows: Set<string>; // Set of selected row IDs
  onRowSelect: (rowId: string) => void; // Function to handle row selection
  columns: ColumnDef<any, any>[]; // Column definitions for the table
  data: any[]; // Array of data rows to display
}

const RowSelection: React.FC<RowSelectionProps> = ({
  selectedRows,
  onRowSelect,
  columns,
  data,
}) => {
  const isRowSelected = (rowId: string) => selectedRows.has(rowId); // Function to check if a row is selected

  return (
    <div className='rounded-md border'>
      <Table> {/* Wrapping table component */}
        <TableHeader> {/* Table header component */}
          <TableRow> {/* Table row component for header */}
            {columns.map(column => ( // Mapping through columns to render headers
              <TableHead key={column.id?.toString()}> {/* Table header cell */}
                {flexRender(column.header, {})} {/* Rendering header content */}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody> {/* Table body component */}
          {data.length ? ( // Conditionally rendering table rows based on data length
            data.map(row => ( // Mapping through data rows
              <TableRow
                key={row.id} // Unique key for each row
                data-state={selectedRows.has(row.id) ? 'selected' : undefined} // Setting selected state based on selectedRows set
                className={isRowSelected(row.id) ? 'bg-blue-100' : ''} // Applying conditional styling for selected rows
                onClick={() => onRowSelect(row.id)} // Handling row click event
              >
                {columns.map(column => ( // Mapping through columns to render cells
                  <TableCell key={column.id?.toString()}> {/* Table cell component */}
                    {flexRender(column.cell, { row })} {/* Rendering cell content */}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow> {/* Displaying a message if no data */}
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RowSelection;
