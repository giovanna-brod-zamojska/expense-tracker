export const generateIEBarChartData = (incomeData, expenseData) => {
  const chartData = [
    {
      name: 'Income',
      color: '#31C48D',
      data: incomeData,
    },
    {
      name: 'Expense',
      data: expenseData,
      color: '#F05252',
    },
  ];
  return chartData;
};

export const generateIEBarChartOptions = () => {
  const chartOptions = {
    chart: {
      sparkline: {
        enabled: false,
      },
      type: 'bar',
      width: '100%',
      height: 400,
      toolbar: {
        show: false,
      },
    },
    fill: {
      opacity: 1,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '100%',
        borderRadiusApplication: 'end',
        borderRadius: 2,
        dataLabels: {
          position: 'top',
        },
      },
    },
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: {
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    tooltip: {
      shared: true,
      intersect: false,
      formatter: function (value) {
        return '$' + value;
      },
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300',
        },
        formatter: function (value) {
          return '$' + value;
        },
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: 'Inter, sans-serif',
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
        },
      },
    },
    grid: {
      show: true,
      strokeDashArray: 2,
      borderColor: '#9ca3af',

      padding: {
        left: 2,
        right: 2,
        top: -20,
      },
    },
  };
  return chartOptions;
};
