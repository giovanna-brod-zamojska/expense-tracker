import { useState } from 'react';
import { BsCircleFill } from 'react-icons/bs';

import Spinner from '../../ui/Spinner';
import { useAllTransactions } from './useAllTransactions';
import { getDaysInMonth } from '../../utils/helpers';

function FullCalendar() {
  const today = new Date();

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // Month is 1-based
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const { data, isLoading } = useAllTransactions();
  console.log(data);

  console.log('today: ' + today);
  const changeMonth = (increment) => {
    const newDate = new Date(selectedYear, selectedMonth - 1 + increment, 1);
    setSelectedMonth(newDate.getMonth() + 1);
    setSelectedYear(newDate.getFullYear());
  };

  if (isLoading) {
    return <Spinner />;
  }
  console.log(
    'this month days: ' +
      getDaysInMonth(selectedMonth, selectedYear).length +
      ' month ' +
      selectedMonth +
      ' year ' +
      selectedYear
  );
  return (
    <div className="h-full flex flex-col justify-start  rounded-lg">
      <div className="flex flex-inline gap-2 px-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="rounded-lg px-4 py-1.5 border dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200  shadow-sm"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {new Date(selectedYear, i, 1).toLocaleString('default', {
                month: 'long',
              })}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="rounded-lg px-4 py-1.5 border dark:border-slate-700 dark:bg-slate-800 dark:text-gray-200  shadow-sm"
        >
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={selectedYear - 5 + i}>
              {selectedYear - 5 + i}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full p-4">
        <div className="flex items-center justify-between mb-4 border shadow-sm bg-gray-50 dark:bg-slate-700 dark:border-slate-800 rounded-xl px-4 py-1">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <h2 className="text-lg font-medium">
            {selectedMonth}
            {' /'} {selectedYear}
          </h2>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>
        <div className="grid grid-cols-7 md:gap-2 ">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              className="text-center font-medium py-1 text-sm dark:text-gray-200"
            >
              {' '}
              {day}
            </div>
          ))}
          {getDaysInMonth(selectedMonth, selectedYear).map((date) => (
            <div
              key={date}
              className="text-center shadow-sm bg-gray-50 dark:bg-slate-700 h-36 border border-gray-200 dark:border-slate-800  rounded-lg overflow-y-scroll" // Adjust the height here
            >
              <span>{date.getDate()}</span>
              <div className="">
                {data.map((item) => {
                  const itemDate = new Date(item.date);

                  if (
                    itemDate.getDate() === date.getDate() &&
                    // 0-indexed month + 1 === 1-indexed month
                    itemDate.getMonth() === date.getMonth() &&
                    itemDate.getFullYear() === date.getFullYear()
                  ) {
                    {
                      console.log(
                        'item date: ' +
                          itemDate.getDate() +
                          ' date date: ' +
                          date.getDate()
                      );
                    }
                    return (
                      //single item informations
                      <div
                        key={item._id}
                        className={`p-1 shadow-sm flex flex-inline text-xs border rounded-lg m-1 dark:border-slate-800/40 dark:shadow `} // Smaller text size
                      >
                        <BsCircleFill
                          className={` ${
                            item.type === 'expense'
                              ? 'fill-red-500 dark:fill-red-500'
                              : 'text-green-500 dark:fill-green-500'
                          } h-2 w-2 my-auto mx-2`}
                        />
                        <span>
                          {item.amount}€{' '}
                          {item.category.charAt(0).toUpperCase() +
                            item.category.slice(1)}
                        </span>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FullCalendar;
