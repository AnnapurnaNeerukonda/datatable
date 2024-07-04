// DownloadButton.tsx

import React from 'react';
import { Button } from '@/components/ui/button';

interface DownloadButtonProps {
  data: any[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ data }) => {
  const handleDownload = () => {
    const csvData = data.map(row => ({
      name: row.name,
      email: row.email,
      status: row.status,
      datecreated: row.datecreated,
    }));

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      csvData.map(row => Object.values(row).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'data.csv');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button onClick={handleDownload}>
      Download CSV
    </Button>
  );
};

export default DownloadButton;
