// RowSelection.tsx
import React from 'react';
import { Button } from '@/components/ui/button';

interface RowSelectionProps {
  selectedRows: Set<string>;
  onClearSelection: () => void;
  onDeleteSelected: () => void;
}

export function RowSelection({
  selectedRows,
  onClearSelection,
  onDeleteSelected
}: RowSelectionProps) {
  if (selectedRows.size === 0) return null;

  return (
    <div className="flex items-center space-x-2 mb-4">
      <span>{selectedRows.size} row(s) selected</span>
      <Button variant="outline" size="sm" onClick={onClearSelection}>
        Clear Selection
      </Button>
      <Button variant="destructive" size="sm" onClick={onDeleteSelected}>
        Delete Selected
      </Button>
    </div>
  );
}