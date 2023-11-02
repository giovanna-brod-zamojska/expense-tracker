import { useContext } from 'react';
import axiosClient from '../axios';
import AuthContext from '../context/AuthProvider';
import jwt_decode from 'jwt-decode';

const useRefreshToken = () => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    const response = await axiosClient.get('users/refresh', {
      withCredentials: true,
    });

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

    return accessToken;
  };
  return refresh;
};

export default useRefreshToken;
