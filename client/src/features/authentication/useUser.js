import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
  const axiosPrivate = useAxiosPrivate();
  const {
    isLoading,
    onError,
    data: user,
    error,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUser(axiosPrivate),
  });

  return {
    isLoading,
    onError,
    user,
    error,
  };
}
