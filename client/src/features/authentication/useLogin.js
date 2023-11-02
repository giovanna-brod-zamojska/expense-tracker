import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { login as loginApi } from '../../services/apiAuth';
import AuthContext from '../../context/AuthProvider';
import StatsContext from '../../context/StatsContext';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
/* import {
  getAllTransactions,
  getExpenses,
  getMonthlyStats,
  getStats,
} from '../../services/apiExpenses'; */

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const { month, year } = useContext(StatsContext);
  const axiosPrivate = useAxiosPrivate();

  const {
    mutate: login,
    isLoading,
    isSuccess,
  } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      console.log(' on success');
      const accessToken = response.data.accessToken;
      const id = jwt_decode(accessToken).id;
      const username = jwt_decode(accessToken).username;
      const role = jwt_decode(accessToken).role;

      setAuth({
        id,
        username,
        role,
        accessToken,
      });

      const user = response.data.data.user;
      queryClient.setQueryData(['user'], user);

      navigate('/dashboard', { replace: true });
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  /*   useEffect(() => {
    if (isSuccess) {
      queryClient.prefetchQuery({
        queryKey: ['statistics', 'expense', year],
        queryFn: () => getStats({ year, type: 'expense' }, axiosPrivate),
      });
      queryClient.prefetchQuery({
        queryKey: ['statistics', 'income', year],
        queryFn: () => getStats({ year, type: 'expense' }, axiosPrivate),
      });
      queryClient.prefetchQuery({
        queryKey: ['all-transactions'],
        queryFn: () => getAllTransactions(axiosPrivate),
      });
      const filter = { type: 'all', category: 'all' };
      queryClient.prefetchQuery({
        queryKey: ['expenses', filter, 1],
        queryFn: () => getExpenses({ filter, page: 1 }, axiosPrivate),
        onSucces: (data) => {
          console.log('successfully prefetched: ' + JSON.stringify(data));
        },
      });
    }
  }, [auth, isSuccess]); */

  return { login, isLoading, isSuccess };
}
