import { createContext, useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import api from '@/utils/api';
import { REFRESH_ENDPOINT } from '@/utils/endpoints';

const initialState = {
  accessToken: '',
  setAccessToken: () => null,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const { data } = await api.get(REFRESH_ENDPOINT, {
          withCredentials: true,
        });
        setAccessToken(data.accessToken);
        console.log(data);
      } catch (error) {
        if (error.status !== 401) throw error;
      }
    };

    getAccessToken();
  }, []);

  return (
    <AuthContext value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
