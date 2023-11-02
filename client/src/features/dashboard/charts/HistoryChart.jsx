import { useContext, useState } from 'react';
import { MdOutlineCalendarToday, MdBarChart } from 'react-icons/md';
import StatsContext from '../../../context/StatsContext';

import Card from '../../../ui/Card';
import Select from '../../../ui/Select';
import LineChart from '../../../ui/LineChart';
import SpinnerMini from '../../../ui/SpinnerMini';
import { useUser } from '../../authentication/useUser';
import { useExpenseStats } from '../useExpenseStats';

import {
  createTotalAmountArray,
  generateLineChartData,
  generateLineChartOptions,
  totalExpense,
  filterYearOptions,
} from './HistoryChartFunctions';

const HistoryChart = () => {
  const { year, setYear } = useContext(StatsContext);
  const [selectedValue, setSelectedValue] = useState(year);

  const { statistics: expenseStats, isLoading1 } = useExpenseStats();
  const { user, isLoading } = useUser();

  if (isLoading1 || isLoading) {
    return <SpinnerMini />;
  }

  const tot = totalExpense(expenseStats || []);
  const data = createTotalAmountArray(expenseStats || []);

  function handleChange(value) {
    setYear(value);
    setSelectedValue(value);
  }

  return (
    <Card extra="p-4 w-full max-h-[600px] text-center dark:bg-slate-700">
      <div className="flex justify-between ">
        <div className="linear mt-1 flex  items-top justify-center gap-4 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer  dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday className="h-8 w-8" />
          <Select
            filterField="year"
            options={filterYearOptions}
            onChange={(e) => handleChange(e.target.value)}
            value={selectedValue}
            extra="h-10"
          />
        </div>

        <div className="flex flex-col">
          <p className="mt-[20px] text-3xl font-bold text-navy-700 dark:text-white">
            -{tot}
          </p>
          <div className="flex flex-col items-start">
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-100">
              Total Spent
            </p>
          </div>
          <div className="!linear z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 !transition !duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
            <MdBarChart className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="min-h-[70%]">
        {user && expenseStats && (
          <LineChart
            options={generateLineChartOptions(user.monthlyBudget)}
            series={generateLineChartData({
              arrayExpenses: data,
            })}
          />
        )}
      </div>
    </Card>
  );
};

export default HistoryChart;
