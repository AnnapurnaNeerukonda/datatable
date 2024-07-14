import React from 'react';
import { Button } from '@/components/ui/button';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface DownloadPDFButtonProps {
  data: any[];
}

const DownloadPDFButton: React.FC<DownloadPDFButtonProps> = ({ data }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    const tableData = data.map(item => [item.name, item.email, item.status, item.amount, item.datecreated]);

    const columns = ['Name', 'Email', 'Status', 'Amount', 'Date Created'];

    (doc as any).autoTable({ head: [columns], body: tableData });

    doc.save('data.pdf');
  };

  return <Button onClick={handleDownload}>Download PDF</Button>;
};

export default DownloadPDFButton;
