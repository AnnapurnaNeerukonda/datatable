'use client';
import React, { useState, useEffect } from 'react';

interface StatusFilterComponentProps {
  data: any[];
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const StatusFilterComponent: React.FC<StatusFilterComponentProps> = ({ data = [], selectedStatus, onStatusChange }) => {
  const [statuses, setStatuses] = useState<string[]>([]);

  useEffect(() => {
    if (data.length > 0) {
      const uniqueStatuses = Array.from(new Set(data.map(item => item.status)));
      setStatuses(['all', ...uniqueStatuses]);
    }
  }, [data]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value);
  };

  return (
    <div className="flex items-center mb-4">
      <select
        value={selectedStatus}
        onChange={handleStatusChange}
        className="p-4 border border-gray-300 rounded-l-md flex-grow"
      >
        {statuses.map(status => (
          <option key={status} value={status}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatusFilterComponent;
