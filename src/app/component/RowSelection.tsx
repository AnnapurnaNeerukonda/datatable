import React from 'react';

interface RowSelectionProps {
  selectedRows: Set<string>;
}

export function RowSelection({ selectedRows }: RowSelectionProps) {
  if (selectedRows.size === 0) return null;

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span>{selectedRows.size} row(s) selected</span>
    </div>
  );
}
