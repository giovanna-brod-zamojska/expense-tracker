import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../../services/apiTasks';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useTasks() {
  const axiosPrivate = useAxiosPrivate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTasks(axiosPrivate),
  });

  return { data, isLoading, isError, error };
}
