import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
  } from "@radix-ui/react-icons";
  import { type Table } from "@tanstack/react-table";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { useState } from "react";
  
  interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    pageSizeOptions?: number[];
  }
  
  export function DataTablePagination<TData>({
    table,
    pageSizeOptions = [5, 20, 30, 40, 50],
  }: DataTablePaginationProps<TData>) {
    const [pageIndexInput, setPageIndexInput] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
    const handleGoToPage = (value: string) => {
      if (value.trim() === "") {
        setErrorMessage(null);
        return;
      }
  
      const pageIndex = Number(value) - 1;
      if (isNaN(pageIndex) || pageIndex < 0 || pageIndex >= table.getPageCount()) {
        setErrorMessage(`Invalid page number.`);
      } else {
        setErrorMessage(null);
        table.setPageIndex(pageIndex);
      }
    };
  
    return (
      <div className="flex w-full flex-col items-center justify-between gap-4 overflow-auto px-2 py-1 lg:flex-row sm:gap-8">
        <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <DoubleArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          <Input
            value={pageIndexInput}
            onChange={(e) => {
              setPageIndexInput(e.target.value);
              handleGoToPage(e.target.value);
            }}
            placeholder="Go to page"
            className="w-28"
          />
          {errorMessage && (
            <span className="text-red-500 text-sm">{errorMessage}</span>
          )}
        </div>
      </div>
    );
  }
  