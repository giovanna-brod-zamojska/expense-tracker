import { parseISO } from 'date-fns';
import { differenceInDays } from 'date-fns/esm';

export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatCurrency = (value) =>
  new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(
    value
  );
export const getDaysInMonth = (month, year) => {
  const firstDay = new Date(year, month - 1, 1); //october 1
  const lastDay = new Date(year, month, 0); //october last
  const startDayOfWeek = firstDay.getDay(); // 0 for Sunday, 1 for Monday, ...
  console.log(
    `This month  ${month}/${year} start days at: ${firstDay} - ${startDayOfWeek}, ends at ${lastDay}`
  );

  const daysInMonth = [];

  // Add days from the previous month if the month doesn't start on a Monday
  if (startDayOfWeek !== 0) {
    const prevMonthLastDay = new Date(year, month - 1, 0);
    console.log(
      `Prev month  ${month - 1}/${year}  ends at ${prevMonthLastDay}`
    );
    for (
      let i = prevMonthLastDay.getDate() - startDayOfWeek + 1;
      i <= prevMonthLastDay.getDate();
      i++
    ) {
      daysInMonth.push(new Date(year, month - 2, i));
    }
  }

  // Add days from the current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    daysInMonth.push(new Date(year, month - 1, i));
  }
  console.log('days in month length ' + daysInMonth.length);

  console.log('days in month ' + daysInMonth);

  return daysInMonth;
};
