import { useQuery } from '@tanstack/react-query';
import { getMonthlyStats } from '../../services/apiExpenses';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useContext } from 'react';
import StatsContext from '../../context/StatsContext';

export function useMonthlyStats() {
  const axiosPrivate = useAxiosPrivate();
  const { year, month } = useContext(StatsContext);

  const {
    data: statistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['statistics', 'expense', year, month],
    queryFn: () =>
      getMonthlyStats({ year, month, type: 'expense' }, axiosPrivate),
    keepPreviousData: false,
    notifyOnChangeProps: 'all',
  });

  return { statistics, isLoading, isError, error };
}
