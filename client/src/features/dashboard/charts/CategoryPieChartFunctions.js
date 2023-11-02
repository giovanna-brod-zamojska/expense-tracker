export const generatePieChartOptions = (labels) => {
  const pieChartOptions = {
    chart: {
      height: '320px',
      width: '100%',
      type: 'donut',
    },
    stroke: {
      colors: ['transparent'],
      lineCap: '',
    },
    labels: labels,
    colors: [
      '#14b8a6',
      '#6AD2FF',
      '#3b82f6',
      '#a855f7',
      '#ec4899',
      '#ef4444',
      '#fb923c',
      '#fbbf24',
      '#EFF4FB',
    ],
    dataLabels: {
      enabled: true,
    },
    legend: {
      position: 'bottom',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: {
          cssClass: 'text-xs font-normal fill-gray-100 dark:fill-gray-700',
        },
      },
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + '€';
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + '€';
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },

    grid: {
      padding: {
        top: -2,
      },
    },
    //formatter: function (val, opts) {
    //  return val + ' - ' + opts.w.globals.series[opts.seriesIndex] + '€';
    //},
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,

            name: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: 20,
              color: 'text-xs font-normal fill-gray-100 dark:fill-gray-300',
            },
            total: {
              showAlways: true,
              show: true,
              label: 'total spent',
              fontFamily: 'Inter, sans-serif',
              color: 'text-xs font-normal fill-gray-100 dark:fill-gray-300',

              formatter: function (w) {
                const sum = w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
                return `${sum}€`;
              },
            },
            value: {
              show: true,
              fontFamily: 'Inter, sans-serif',
              offsetY: -20,
              formatter: function (value) {
                return value + '€';
              },
              color: 'text-xs font-normal fill-gray-100 dark:fill-gray-300',
            },
          },
          size: '75%',
          startAngle: -90,
          endAngle: 270,
        },
      },
    },
  };
  return pieChartOptions;
};

export const generatePieChartData = (data) => {
  const pieChartData = data;
  return pieChartData;
};

export function groupAndSumByCategory(data) {
  const groupedData = data.reduce((result, item) => {
    const category = item._id.category;

    if (!result[category]) {
      result[category] = {
        category: category,
        totalAmount: 0,
      };
    }

    result[category].totalAmount += item.totalAmount;

    return result;
  }, {});

  // Convert the grouped data object back to an array of objects
  const groupedArray = Object.values(groupedData);

  return groupedArray;
}

export function extractCategoryAndTotalAmount(dataArray) {
  const categories = [];
  const totalAmounts = [];

  for (const item of dataArray) {
    const { category, totalAmount } = item;
    if (category === undefined) {
      categories.push('undefined');
    } else {
      categories.push(category);
    }
    totalAmounts.push(totalAmount);
  }

  console.log('categories: ' + categories);
  console.log('values: ' + totalAmounts);

  return [categories, totalAmounts];
}
