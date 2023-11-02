import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getExpenses } from '../../services/apiExpenses';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useSearchParams } from 'react-router-dom';

export function useExpenses() {
  const axiosPrivate = useAxiosPrivate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // PAGINATION
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  // FILTER
  let filterType = searchParams.get('type');
  let filterCategory = searchParams.get('category');

  if (!filterType) filterType = 'all';
  if (!filterCategory) filterCategory = 'all';

  const filter = { type: filterType, category: filterCategory };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['expenses', filter, page],
    queryFn: () => getExpenses({ filter, page }, axiosPrivate),
    onSuccess: () => {
      queryClient.prefetchQuery({
        queryKey: ['expenses', filter, page + 1],
        queryFn: () => getExpenses({ filter, page: page + 1 }, axiosPrivate),
      });
    },
  });

  return { data, isLoading, isError, error };
}
