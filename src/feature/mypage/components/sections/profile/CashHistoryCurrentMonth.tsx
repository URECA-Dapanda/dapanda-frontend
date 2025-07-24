import MonthPicker from "@components/common/calendar/MonthPicker";
import dayjs, { Dayjs } from "dayjs";
import { useCallback, useState } from "react";

interface CashHistoryCurrentMonthProps {
  data: any;
}

export default function CashHistoryCurrentMonth({ data }: CashHistoryCurrentMonthProps) {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const handleDateChange = useCallback((newDate: Dayjs) => setCurrentDate(newDate), []);

  return (
    <div className="flex flex-col gap-24 justify-center items-center h-full w-full">
      <MonthPicker value={currentDate} onChange={handleDateChange} />
    </div>
  );
}
