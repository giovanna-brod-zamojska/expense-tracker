import { useQueryClient, useMutation } from '@tanstack/react-query';
import { createExpense } from '../../services/apiExpenses';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const { mutate: createThisExpense, isLoading: isCreating } = useMutation({
    mutationFn: (data) => createExpense(data, axiosPrivate),
    onSuccess: () => {
      toast.success('Expense successfully added!');
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
      queryClient.invalidateQueries({
        queryKey: ['statistics'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { createThisExpense, isCreating };
}
