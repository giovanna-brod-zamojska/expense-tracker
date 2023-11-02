import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { updatePassword as updatePasswordAPI } from '../../services/apiAuth';

export function useUpdatePassword() {
  const axiosPrivate = useAxiosPrivate();

  const { mutate: updatePassword, isLoading: isUpdating } = useMutation({
    mutationFn: (data) => updatePasswordAPI(data, axiosPrivate),
    onSuccess: () => {
      toast.success('Password successfully updated');
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePassword, isUpdating };
}
