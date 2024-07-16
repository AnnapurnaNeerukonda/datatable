import React from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DownloadPDFButtonProps {
  data: any[];
  heading: string;
  saveAs: string;
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ data, heading, saveAs }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.text(heading, 20, 20);

    const columns = data.length > 0 ? Object.keys(data[0]) : [];
    const tableData = data.map(item => columns.map(col => item[col]));

    doc.autoTable({
      head: [columns],
      body: tableData,
      startY: 30, 
    });

    doc.save(`${saveAs}.pdf`);
  };

  return <Button onClick={handleDownload}>Download PDF</Button>;
};

export default DownloadPDFButton;
