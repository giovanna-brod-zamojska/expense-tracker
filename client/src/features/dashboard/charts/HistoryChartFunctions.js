export const totalExpense = (dataArray) => {
  console.log(dataArray);
  let total = 0;
  for (const data of dataArray) {
    total = total + data.totalAmount;
  }
  return total;
};

export const createTotalAmountArray = (dataArray) => {
  const totalAmountArray = Array(12).fill(0);
  if (dataArray.length === 0) {
    return totalAmountArray;
  }
  for (const data of dataArray) {
    const month = data._id.month;
    totalAmountArray[month - 1] += data.totalAmount;
  }
  return totalAmountArray;
};

export const generateLineChartData = ({ arrayExpenses }) => {
  const lineChartDataTotalSpent = [
    {
      name: 'Expenses',
      data: arrayExpenses,
      color: '#0F5EFF',
    },
  ];

  return lineChartDataTotalSpent;
};

export const generateLineChartOptions = (budget) => {
  const lineChartOptionsTotalSpent = {
    annotations: {
      yaxis: [
        {
          y: budget,
          borderColor: '#fb923c',
          label: {
            borderColor: '#fb923c',
            style: {
              color: '#fff',
              background: '#fb923c',
            },
            text: 'Monthly budget',
          },
        },
      ],
    },
    legend: {
      show: false,
    },
    theme: {
      mode: 'light',
    },
    chart: {
      height: '100%',
      maxWidth: '100%',
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 5,
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        backgroundColor: '#000000',
      },
      theme: 'dark',
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
    grid: {
      show: false,
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: '#A3AED0',
          fontSize: '12px',
          fontWeight: '500',
        },
      },
      type: 'text',
      range: undefined,
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
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300',
        },
      },
    },
  };
  return lineChartOptionsTotalSpent;
};

export const filterYearOptions = [
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
];
