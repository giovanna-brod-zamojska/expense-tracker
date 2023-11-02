import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateTask } from '../../services/apiTasks';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useUpdateTask() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const { mutate: updateThisTask, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updateTask(data, axiosPrivate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isUpdating, updateThisTask };
}
