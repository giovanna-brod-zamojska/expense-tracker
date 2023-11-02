import { useQuery } from '@tanstack/react-query';
import { getAllTransactions } from '../../services/apiExpenses';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useAllTransactions() {
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['all-transactions'],
    queryFn: () => getAllTransactions(axiosPrivate),
  });

  return { data, isLoading, isError, error };
}
