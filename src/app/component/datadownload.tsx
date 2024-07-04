import React from 'react';
import { Button } from '@/components/ui/button';
import * as XLSX from 'xlsx';
interface DownloadButtonProps {
  data: any[];
}
const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'data.xlsx');
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload}>
      Download Excel
    </Button>
  );
};

export default DownloadButton;
