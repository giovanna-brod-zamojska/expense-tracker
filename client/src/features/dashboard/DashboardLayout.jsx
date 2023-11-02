import { FcCurrencyExchange, FcDebt, FcMoneyTransfer } from 'react-icons/fc';

import Spinner from '../../ui/Spinner';
import Widget from '../../ui/Widget';

import MonthlyBarChart from './charts/MonthBarChart';
import {
  createDailyTotalAmountArray,
  filterMonthOptions,
  getDaysInMonth,
  totalMonthlyExpense,
} from './charts/MonthBarChartFunctions';
import {
  createTotalAmountArray,
  filterYearOptions,
  totalExpense,
} from './charts/HistoryChartFunctions';
import HistoryChart from './charts/HistoryChart';

import { useExpenseStats } from './useExpenseStats';
//import { useMonthlyStats } from './useMonthlyStats';
import { useIncomeStats } from './useIncomeStats';
import { useContext, useState } from 'react';
import StatsContext from '../../context/StatsContext';
import { useMonthlyStats } from './useMonthlyStats';
import CategoryPieChart from './charts/CategoryPieChart';
import IEBarChart from './charts/IEBarChart';
import Select from '../../ui/Select';
import Heading from '../../ui/Heading';

function DashboardLayout() {
  const { month, year, setYear, setMonth } = useContext(StatsContext);

  const [selectedYearValue, setSelectedYearValue] = useState(year);
  const [selectedMonthValue, setSelectedMonthValue] = useState(month);

  const { statistics: expenseStats, isLoading: isLoadingExpense } =
    useExpenseStats();
  const { statistics: incomeStats, isLoading: isLoadingIncome } =
    useIncomeStats();
  const { statistics: monthlyStats, isLoading: isLoadingMonth } =
    useMonthlyStats();

  if (isLoadingExpense || isLoadingIncome || isLoadingMonth) {
    return <Spinner />;
  }

  const totYearIncome = totalExpense(incomeStats);
  const totYearExpense = totalExpense(expenseStats);

  const yearlyExpenseStats = createTotalAmountArray(expenseStats);
  const yearlyIncomeStats = createTotalAmountArray(incomeStats);

  const monthlyData = createDailyTotalAmountArray(
    monthlyStats,
    getDaysInMonth(month, year)
  );

  const [totalMonthlyExpenses, numberMonthlyExpenses] =
    totalMonthlyExpense(monthlyData);

  function handleYearChange(value) {
    setYear(value);
    setSelectedYearValue(value);
  }
  function handleMonthChange(value) {
    setMonth(value);
    setSelectedMonthValue(value);
  }

  return (
    <div>
      <div className="flex flex-inline font-medium justify-start align-center text-2xl">
        <Heading as="h3">Statistics for: </Heading>
        <Select
          filterField="month"
          options={filterMonthOptions}
          onChange={(e) => handleMonthChange(e.target.value)}
          value={selectedMonthValue}
          extra="h-10 mx-2 max-w-[120px]"
        />
        <span className="pt-1">/</span>
        <Select
          filterField="year"
          options={filterYearOptions}
          onChange={(e) => handleYearChange(e.target.value)}
          value={selectedYearValue}
          extra="h-10 mx-2 max-w-[90px]"
        />
      </div>
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
        <Widget
          title="Monthly total expenses"
          subtitle={`- €${totalMonthlyExpenses}`}
          icon={<FcMoneyTransfer className="h-7 w-7" />}
        />

        <Widget
          title="Yearly total expenses"
          subtitle={`- €${totYearExpense}`}
          icon={<FcCurrencyExchange className="h-7 w-7" />}
        />

        <Widget
          title="Yearly total incomes"
          subtitle={`+ €${totYearIncome}`}
          icon={<FcDebt className="h-7 w-7" />}
        />
      </div>
      <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-5 ">
        <HistoryChart />
        <IEBarChart
          incomeData={yearlyIncomeStats}
          expenseData={yearlyExpenseStats}
          totIncome={totYearIncome}
          totExpense={totYearExpense}
        />

        <MonthlyBarChart
          data={monthlyData}
          num={numberMonthlyExpenses}
          tot={totalMonthlyExpenses}
        />
        <CategoryPieChart data={monthlyStats} month={month} />
      </div>
    </div>
  );
}

export default DashboardLayout;
