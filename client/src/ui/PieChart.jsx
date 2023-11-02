import Chart from 'react-apexcharts';

const PieChart = ({ series, options }) => {
  return (
    <Chart
      options={options}
      type="donut"
      width="100%"
      height="100%"
      series={series}
    />
  );
};

export default PieChart;
