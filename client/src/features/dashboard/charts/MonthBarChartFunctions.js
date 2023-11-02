export function getDaysInMonth(month, year) {
  const firstDay = new Date(year, month - 1, 1);
  const nextMonth = new Date(year, month, 1);
  const daysInMonth = Math.floor(
    (nextMonth - firstDay) / (1000 * 60 * 60 * 24)
  );
  const dayNumbers = Array.from({ length: daysInMonth }, (_, index) =>
    (index + 1).toString()
  );
  //console.log('days array:' + dayNumbers);
  return dayNumbers;
}

export const generateBarChartData = ({ data }) => {
  // console.log('GENERATING NEW BAR CHART DATA...');
  const barChartData = [
    {
      name: 'Daily Expenses',
      data: data,
    },
  ];
  // console.log('NEW BAR CHART DATA: ' + data);
  return barChartData;
};

export const filterByMonth = (dataArray, month) => {
  const filteredArray = [];
  for (const data of dataArray) {
    if (data._id.month === month) {
      filteredArray.push(data);
    }
  }
  return filteredArray;
};

export const createDailyTotalAmountArray = (dataArray, daysArray) => {
  const totalAmountArray = Array(daysArray.length).fill(0);
  console.log(dataArray);
  if (dataArray.length === 0) {
    return totalAmountArray;
  }

  for (const data of dataArray) {
    if (data !== 0) {
      const day = data._id.day;
      totalAmountArray[day - 1] += data.totalAmount;
    }
  }

  return totalAmountArray;
};

export const generateBarChartOptions = ({ arrayXAxis }) => {
  const barChartOptions = {
    chart: {
      height: '100%',
      maxWidth: '100%',
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
        backgroundColor: '#000000',
      },
      onDatasetHover: {
        style: {
          fontSize: '12px',
          fontFamily: undefined,
        },
      },
      theme: 'dark',
    },
    xaxis: {
      categories: arrayXAxis,
      show: false,
      labels: {
        show: true,
        style: {
          colors: '#A3AED0',
          fontSize: '10px',
          fontWeight: '500',
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      labels: {
        style: {
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-300',
        },
      },
    },
    grid: {
      show: false,
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'vertical',
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.9,
        colorStops: [
          [
            {
              offset: 0,
              color: '#2563eb',
              opacity: 1,
            },
            {
              offset: 100,
              color: '#22d3ee',
              opacity: 0.8,
            },
          ],
        ],
      },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        columnWidth: '8px',
      },
    },
  };
  return barChartOptions;
};

export const filterMonthOptions = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

export const totalMonthlyExpense = (dataArray) => {
  //console.log('monthly data in total and num: ' + dataArray);
  let total = 0;
  let sum = 0;
  for (const data of dataArray) {
    if (data !== 0) {
      total = total + data;
      sum = sum + 1;
    }
  }
  return [total, sum];
};
