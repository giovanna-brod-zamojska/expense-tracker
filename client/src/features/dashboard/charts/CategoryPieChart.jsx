import {
  extractCategoryAndTotalAmount,
  generatePieChartData,
  generatePieChartOptions,
  groupAndSumByCategory,
} from './CategoryPieChartFunctions';

import Card from '../../../ui/Card';
import PieChart from '../../../ui/PieChart';

const CategoryPieChart = ({ month, data }) => {
  const categoryArray = groupAndSumByCategory(data);
  console.log(categoryArray);
  const [labels, values] = extractCategoryAndTotalAmount(categoryArray);
  console.log(labels);
  console.log(values);

  return (
    <Card extra="w-full bg-white shadow dark:text-gray-50 dark:fill-gray-50 dark:bg-slate-700 p-4">
      <div className="flex flex-row justify-between px-3">
        <div>
          <h4 className="text-lg font-bold text-navy-700 dark:text-white">
            Expenses per Category
          </h4>
        </div>

        <div className="mb-6 flex items-center justify-center">
          <span>{month}</span>
        </div>
      </div>

      <div className="mb-auto flex  my-3  h-56 md:h-80 items-center justify-center align-middle">
        {categoryArray.length === 0 ? (
          <div className="h-72 py-30 items-center justify-center align-middle">
            <span className="">Ups! No data to display...</span>
          </div>
        ) : (
          <PieChart
            options={generatePieChartOptions(labels)}
            series={generatePieChartData(values)}
          />
        )}
      </div>
    </Card>
  );
};

export default CategoryPieChart;
