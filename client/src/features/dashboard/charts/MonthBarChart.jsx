import { useContext, useState } from 'react';
import { MdOutlineCalendarToday } from 'react-icons/md';
import StatsContext from '../../../context/StatsContext';

import BarChart from '../../../ui/BarChart';
import Card from '../../../ui/Card';
import Select from '../../../ui/Select';

import {
  generateBarChartOptions,
  generateBarChartData,
  filterMonthOptions,
  getDaysInMonth,
} from './MonthBarChartFunctions';

const MonthlyBarChart = ({ data, num, tot }) => {
  const { year, month, setMonth } = useContext(StatsContext);
  const [selectedValue, setSelectedValue] = useState(month);
  /*  const { statistics, isLoading: isLoadingExpense } = useMonthlyStats();
  
  const [data, setData] = useState([]);
  const [tot, setTot] = useState(0);
  const [num, setNum] = useState(0);

  //console.log('COMPONENT RE-RENDERING...');

  useEffect(() => {
    if (!isLoadingExpense && statistics) {
      //console.log('USING EFFECT...');
      const monthlyData = createDailyTotalAmountArray(
        statistics,
        getDaysInMonth(month, year)
      );
      //console.log('monthly data: ' + monthlyData);
      const [totalExpenses, numberExpenses] = totalMonthlyExpense(monthlyData);
      setTot(totalExpenses);
      setNum(numberExpenses);
      setData(monthlyData);
    }
  }, [statistics]); */

  //console.log('Data fed to chart: ' + data + 'length: ' + data.length);
  //console.log('Num: ' + num + ' tot: ' + tot);

  const processedData = generateBarChartData({ data: data });
  //console.log('PROCESSED DATA: ' + JSON.stringify(processedData));

  function handleChange(value) {
    setMonth(value);
    setSelectedValue(value);
  }

  return (
    <Card extra=" p-4   w-full  dark:bg-slate-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="ml-1 pt-2">
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Daily expenses
          </h4>
        </div>

        <div className="linear mt-1 flex  items-top justify-between gap-4 rounded-lg bg-lightPrimary p-2 text-gray-600 transition duration-200 hover:cursor-pointer  dark:hover:opacity-90 dark:active:opacity-80">
          <MdOutlineCalendarToday className="h-8 w-8" />
          <Select
            filterField="month"
            options={filterMonthOptions}
            onChange={(e) => handleChange(e.target.value)}
            value={selectedValue}
            extra="h-10 "
          />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-1">
          <p className=" text-[24px] lg:text-[30px] font-bold text-navy-700 dark:text-gray-100">
            -{tot}{' '}
            <span className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-100">
              EUR
            </span>
          </p>
          <p className="text-[24px] lg:text-[30px] font-bold text-navy-700 dark:text-white">
            {num}{' '}
            <span className="text-sm font-medium leading-6 text-gray-600 dark:text-gray-100">
              Transactions
            </span>
          </p>
        </div>
      </div>

      <div className=" min-h-[70%]  pt-5 ">
        {data && (
          <BarChart
            series={processedData}
            options={generateBarChartOptions({
              arrayXAxis: getDaysInMonth(month, year),
            })}
          />
        )}
      </div>
    </Card>
  );
};

export default MonthlyBarChart;
