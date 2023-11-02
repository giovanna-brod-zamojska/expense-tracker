import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '../../services/apiExpenses';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useDeleteExpense() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { isLoading: isDeleting, mutate: deleteThisExpense } = useMutation({
    mutationFn: (data) => deleteExpense(data, axiosPrivate),
    onSuccess: () => {
      toast.success('Exam successfully deleted.');
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteThisExpense };
}
