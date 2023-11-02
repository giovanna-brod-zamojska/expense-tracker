import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiAuth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/AuthProvider';
import jwt_decode from 'jwt-decode';

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setAuth } = useContext(AuthContext);

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (response) => {
      console.log(response.data);

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

      toast.success('Account successfully created. Welcome on board!');
      navigate('/dashboard');
    },
  });

  return { signup, isLoading };
}
