'use client'
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DataDownloadProps {
  data: any[]; 
  columns: string[]; 
}

const DataDownloadPDF: FC<DataDownloadProps> = ({ data, columns }) => {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumns = columns;
    const tableRows = data.map(row => Object.values(row));
    (doc as any).autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 10,
      theme: 'striped',
    });

    doc.save('user-data.pdf');
  };



  return (
    <div>
      <Button onClick={handleDownloadPDF}>Download PDF</Button>
    </div>
  );
};

export default DataDownloadPDF;