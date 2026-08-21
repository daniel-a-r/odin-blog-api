import { createContext, useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import api from '@/utils/api';
import { REFRESH_ENDPOINT, USER_ENDPOINT, baseURL } from '@/utils/endpoints';
import { configureAuth } from '@/utils/api';
import axios from 'axios';

const initialState = {
  accessToken: '',
  setAccessToken: () => null,
  user: {
    username: '',
    id: '',
  },
  setUser: () => null,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [user, setUser] = useState(accessToken);

  useEffect(() => {
    configureAuth({
      getToken: () => accessToken,
      setToken: setAccessToken,
    });
  }, [accessToken]);

  useEffect(() => {
    const initAccessToken = async () => {
      try {
        const refreshRespone = await api.get(REFRESH_ENDPOINT, {
          withCredentials: true,
        });
        const { accessToken } = refreshRespone.data;
        setAccessToken(accessToken);

        const userResponse = await axios.get(`${baseURL}${USER_ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { user } = userResponse.data;
        setUser(user);
      } catch (error) {
        if (error.status !== 401) throw error;
      }
    };

    initAccessToken();
  }, []);

  return (
    <AuthContext value={{ accessToken, setAccessToken, user, setUser }}>
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
