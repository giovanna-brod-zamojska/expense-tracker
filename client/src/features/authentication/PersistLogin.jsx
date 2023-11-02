import { useState, useEffect, useContext } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import AuthContext from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const PersistLogin = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {}, [auth, persist, setIsLoading, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log('persist:' + persist);
    console.log(`access token: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading, auth, persist]);

  if (isLoading) {
    <p>Loading</p>;
  }
  if (!isLoading & (persist === false)) {
    navigate('/login', { replace: true });
  }
  if (persist === true) {
    return children;
  }

  //return <>{!persist ? children : isLoading ? <p>Loading...</p> : children}</>;
};

export default PersistLogin;
