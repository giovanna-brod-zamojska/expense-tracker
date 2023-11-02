import { useQueryClient, useMutation } from '@tanstack/react-query';
import { updateExpense } from '../../services/apiExpenses';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

export function useUpdateExpense() {
  const axiosPrivate = useAxiosPrivate();
  const queryClient = useQueryClient();
  const {
    mutate: updateThisExpense,
    isLoading: isUpdating,
    //onSuccess: successUpdate,
  } = useMutation({
    mutationFn: (data) => updateExpense(data, axiosPrivate),
    onSuccess: () => {
      toast.success('Expense successfully updated!');
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
    onError: (err) => toast.error(err.response.data.message),
  });

  return { isUpdating, updateThisExpense };
}
