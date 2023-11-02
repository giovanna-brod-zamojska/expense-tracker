import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { getUserPhoto } from '../../services/apiAuth';

export function useUserPhoto() {
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useContext(AuthContext);

  const {
    data: photo,
    isLoading,
    onError,
    error,
  } = useQuery({
    queryKey: ['user-photo'],
    queryFn: () => getUserPhoto(axiosPrivate, auth?.id),
  });

  return {
    photo,
    isLoading,
    onError,
    error,
  };
}
