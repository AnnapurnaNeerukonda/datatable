import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Button } from '@/components/ui/button';
import { TableInstance } from '@tanstack/react-table';

interface DataDownloadPDFProps<TData> {
  table: TableInstance<TData>;
}

const DataDownloadPDF: React.FC<DataDownloadPDFProps<any>> = ({ table }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Extract column headers
    const tableColumns = table.allColumns.map(column => column.id);

    // Extract rows data
    const tableRows = table.rows.map(row =>
      tableColumns.map(columnId => row.values[columnId])
    );

    // Set up the PDF table
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 10,
      theme: 'striped',
    });

    // Save the PDF file
    doc.save('table-data.pdf');
  };

  return (
    <div>
      <Button onClick={handleDownloadPDF}>Download Table as PDF</Button>
    </div>
  );
};

export default DataDownloadPDF;
