import { axiosPrivate } from '../axios';
import { useContext, useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import jwt_decode from 'jwt-decode';
import AuthContext from '../context/AuthProvider';
import dayjs from 'dayjs';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    // BEFORE A PRIVATE REQUEST IS SENT
    const requestIntercept = axiosPrivate.interceptors.request.use(
      async (req) => {
        if (auth?.accessToken === undefined) {
          console.log('WARNING! Token is undefined');
        }

        // DECODE ACCESS TOKEN EXPIRATION FROM AUTH CONTEXT
        const user = jwt_decode(auth?.accessToken);
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

        // IF NO HEADER
        if (!req.headers.Authorization) {
          //console.log('token not present in headers');
          req.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }
        // IF NOT EXPIRED
        if (!isExpired) return req;

        // IF EXPIRED DUE TO EXPIRATION TIME, OR UNDEFINED DUE TO PAGE RELOAD
        const newAccessToken = await refresh(); //get new access token, and update the Auth context
        req.headers.Authorization = `Bearer ${newAccessToken}`; //congifure again the headers
        return req;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
