import * as React from 'react';
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DatePickerProps {
  className?: React.HTMLAttributes<HTMLDivElement>;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DatePickerWithRange({ className, onDateChange }: DatePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [okClicked, setOkClicked] = useState(false);

  const handleDateChange = (newDate: DateRange | undefined) => {
    if (newDate && newDate.from && !newDate.to) {
      // If only the from date is selected, set the to date to be the same as the from date
      setDate({ from: newDate.from, to: newDate.from });
    } else {
      setDate(newDate);
    }
    setOkClicked(false);
  };

  const handleOkClick = () => {
    setOkClicked(true);
    onDateChange(date);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[250px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            onSelect={handleDateChange}
            className="rounded-md border"
            numberOfMonths={2}
          />
          {date?.from && (
            <div className="flex justify-end p-2">
              <Button onClick={handleOkClick}>OK</Button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export type { DateRange };
