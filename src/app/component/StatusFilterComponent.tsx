// 'use client';
// import React, { useState, useEffect } from 'react';

// interface StatusFilterComponentProps {
//   data: any[];
//   selectedStatus: string;
//   onStatusChange: (status: string) => void;
// }

// const StatusFilterComponent: React.FC<StatusFilterComponentProps> = ({ data = [], selectedStatus, onStatusChange }) => {
//   const [statuses, setStatuses] = useState<string[]>([]);

//   useEffect(() => {
//     if (data.length > 0) {
//       const uniqueStatuses = Array.from(new Set(data.map(item => item.status)));
//       setStatuses(['all', ...uniqueStatuses]);
//     }
//   }, [data]);

//   const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     onStatusChange(event.target.value);
//   };

//   return (
//     <div className="flex items-center mb-4">
//       <select
//         value={selectedStatus}
//         onChange={handleStatusChange}
//         className="p-4 border border-gray-300 rounded-l-md flex-grow"
//       >
//         {statuses.map(status => (
//           <option key={status} value={status}>
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// };

// export default StatusFilterComponent;

// StatusFilterComponent.tsx
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StatusFilterComponentProps {
  data: any[];
  columnName: string;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

const StatusFilterComponent: React.FC<StatusFilterComponentProps> = ({ data = [], columnName, selectedStatus, onStatusChange }) => {
  const [statuses, setStatuses] = useState<string[]>([]);

  // Update statuses when data or columnName changes
  useEffect(() => {
    if (data.length > 0) {
      const uniqueStatuses = Array.from(new Set(data.map(item => item[columnName])));
      setStatuses(['all', ...uniqueStatuses]);
    }
  }, [data, columnName]);

  // Handle status change event
  const handleStatusChange = (status: string) => {
    const statusValue = status === 'all' ? 'all' : `${columnName}:${status}`;

    onStatusChange(statusValue);
  };

  return (
    <div className="flex items-center mb-4">
      <Select value={selectedStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`Select ${columnName}`} />
        <SelectValue>
  {selectedStatus && selectedStatus.split(':').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(': ')}
</SelectValue>

        </SelectTrigger>
        <SelectContent>
          {statuses.map(status => (
            <SelectItem key={status} value={status}>
              { `${status.charAt(0).toUpperCase() + status.slice(1)}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StatusFilterComponent;