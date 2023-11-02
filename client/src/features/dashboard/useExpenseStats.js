import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMonthlyStats, getStats } from '../../services/apiExpenses';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import StatsContext from '../../context/StatsContext';
import { useContext } from 'react';

export function useExpenseStats() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { year } = useContext(StatsContext);

  const {
    data: statistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['statistics', 'expense', year],
    queryFn: () => getStats({ year, type: 'expense' }, axiosPrivate),
  });

  for (let month = 1; month <= 12; month++) {
    queryClient.prefetchQuery({
      queryKey: ['statistics', 'expense', year, month.toString()],
      queryFn: () =>
        getMonthlyStats({ year, month, type: 'expense' }, axiosPrivate),
    });
  }

  return { statistics, isLoading, isError, error };
}
