import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { updateCurrentUser } from '../../services/apiUsers';

export function useUpdateMe() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();

  const { mutate: updateMe, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateCurrentUser(data, axiosPrivate),
    onSuccess: (user) => {
      toast.success('User account successfully updated');
      queryClient.setQueryData(['user'], user);
      queryClient.invalidateQueries({
        queryKey: ['user-photo'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateMe, isUpdating };
}
