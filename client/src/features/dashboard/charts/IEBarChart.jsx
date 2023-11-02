import BarChart from '../../../ui/BarChart';
import Card from '../../../ui/Card';
import {
  generateIEBarChartData,
  generateIEBarChartOptions,
} from './IEBarChatFunctions';

const IEBarChart = ({ incomeData, expenseData, totIncome, totExpense }) => {
  const profit = totIncome - totExpense;
  const profitPercentage = (profit / totIncome) * 100;

  return (
    <>
      <Card className=" w-full bg-white rounded-lg shadow dark:bg-slate-700 p-4 md:p-6">
        <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
          <dl>
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
              Profit
            </dt>
            <dd className="leading-none text-3xl font-bold text-gray-900 dark:text-white">
              €{totIncome - totExpense}
            </dd>
          </dl>
          <div>
            <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300">
              <svg
                className="w-2.5 h-2.5 mr-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13V1m0 0L1 5m4-4 4 4"
                />
              </svg>
              Profit {profitPercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 py-3">
          <dl>
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
              Income
            </dt>
            <dd className="leading-none text-xl font-bold text-green-500 dark:text-green-400">
              + €{totIncome}
            </dd>
          </dl>
          <dl>
            <dt className="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
              Expense
            </dt>
            <dd className="leading-none text-xl font-bold text-red-600 dark:text-red-500">
              - €{totExpense}
            </dd>
          </dl>
        </div>
        <div className="min-h-[80%]">
          <BarChart
            series={generateIEBarChartData(incomeData, expenseData)}
            options={generateIEBarChartOptions()}
          />
        </div>
      </Card>
    </>
  );
};

export default IEBarChart;
