import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask } from '../../services/apiTasks';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { isLoading: isDeleting, mutate: deleteThisTask } = useMutation({
    mutationFn: (data) => deleteTask(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteThisTask };
}
