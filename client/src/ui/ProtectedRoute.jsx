import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthProvider';
import useRefreshToken from '../hooks/useRefreshToken';
import Spinner from './Spinner';
import toast from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';

function ProtectedRoute({ children }) {
  const { auth, persist } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const queryClient = useQueryClient();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    if (auth?.accessToken === undefined && !persist) {
      console.log('navigating to loginnn...');

      navigate('/login');
    }
    const refreshAccessToken = async () => {
      try {
        await refresh();
      } catch (err) {
        if (err.response.status === 401) {
          queryClient.removeQueries();
          localStorage.clear();
          setAuth({});
          navigate('login');

          toast.error('Session expired. Please login again.');
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    !auth?.accessToken && persist ? refreshAccessToken() : setIsLoading(false);
  }, [auth, persist, refresh]);

  return (
    <div>
      {isLoading ? (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Spinner />
        </div>
      ) : auth?.role === 'admin' || auth?.role === 'user' ? (
        children
      ) : null}
    </div>
  );
}

export default ProtectedRoute;
