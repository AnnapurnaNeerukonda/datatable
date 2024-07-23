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

    const tableData = data.map(item => [item.name, item.email, item.status, item.amount, item.datecreated]);

    const columns = ['Name', 'Email', 'Status', 'Amount', 'Date Created'];

<<<<<<< HEAD
    (doc as any).autoTable({ head: [columns], body: tableData });
=======
    (doc as any).autoTable({
      head: [columns],
      body: tableData,
      startY: 30, 
    });
>>>>>>> 828dd7cc25c896c1c8c5e672d11489539a8629aa

    doc.save(`${saveAs}.pdf`);
  };

  return <Button onClick={handleDownload}>Download PDF</Button>;
};

export default DownloadPDFButton;
