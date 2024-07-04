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



'use client';
import React, { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import {Button} from '@/components/ui/button'

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

  const handleStatusChange = (status: string) => {
    onStatusChange(status);
  };

  return (
    <div className="flex items-center mb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-4 border border-gray-300 rounded-l-md flex-grow">
          {(selectedStatus || 'all').charAt(0).toUpperCase() + (selectedStatus || 'all').slice(1)}

          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statuses.map(status => (
            <DropdownMenuItem key={status} onSelect={() => handleStatusChange(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default StatusFilterComponent;

