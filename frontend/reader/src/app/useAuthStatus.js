import { useContext } from 'react';
import AuthStatusContext from '@/app/AuthStatusContext';

const useAuthStatus = () => {
  const context = useContext(AuthStatusContext);
  return context;
};

export default useAuthStatus;
