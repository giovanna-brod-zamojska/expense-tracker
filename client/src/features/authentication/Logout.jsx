import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';

import axiosClient from '../../axios';
import AuthContext from '../../context/AuthProvider';
import { useQueryClient } from '@tanstack/react-query';
import StatsContext from '../../context/StatsContext';

function Logout() {
  const { setAuth, setPersist } = useContext(AuthContext);
  const { setYear, setMonth } = useContext(StatsContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isLoading = false;

  const handleLogout = async () => {
    setAuth({});
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
    setPersist(false);

    try {
      const response = await axiosClient.get('users/logout', {
        withCredentials: true,
      });
      queryClient.removeQueries();
      localStorage.clear();

      toast.success('You are successfully logged out!');
      navigate('/welcome', { replace: true });
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <ButtonIcon disabled={isLoading} onClick={handleLogout}>
      {!isLoading ? (
        <>
          <HiArrowRightOnRectangle className="w-5 h-5" />
          <span className="ml-2 font-normal">Logout</span>
        </>
      ) : (
        <SpinnerMini />
      )}
    </ButtonIcon>
  );
}

export default Logout;
