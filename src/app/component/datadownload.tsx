'use client'
import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Parser } from 'json2csv';

interface CSVDownloadProps {
  data: any[]; 
  columns: string[]; 
}

const CSVDownload: FC<CSVDownloadProps> = ({ data, columns }) => {
  const handleDownloadCSV = () => {
    const parser = new Parser({ fields: columns });
    const csv = parser.parse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'user-data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <Button onClick={handleDownloadCSV}>Download CSV</Button>
    </div>
  );
};

export default CSVDownload;