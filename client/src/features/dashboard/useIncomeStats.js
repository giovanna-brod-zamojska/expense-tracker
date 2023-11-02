import { useQuery } from '@tanstack/react-query';
import { getStats } from '../../services/apiExpenses';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import StatsContext from '../../context/StatsContext';
import { useContext } from 'react';

export function useIncomeStats() {
  const axiosPrivate = useAxiosPrivate();
  const { year } = useContext(StatsContext);

  const {
    data: statistics,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['statistics', 'income', year],
    queryFn: () => getStats({ year, type: 'income' }, axiosPrivate),
  });

  return { statistics, isLoading, isError, error };
}
