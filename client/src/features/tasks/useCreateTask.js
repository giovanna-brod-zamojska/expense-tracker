import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createTask } from '../../services/apiTasks';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useCreateTask() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { mutate: createThisTask, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createTask(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createThisTask, isCreating };
}
