import { createContext, useContext, useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { REFRESH_ENDPOINT, USER_ENDPOINT } from '@/utils/endpoints';
import api, { setAccessToken } from '@/utils/apiClient';

const initialState = {
  user: {},
  setUser: () => null,
};

const AuthContext = createContext(initialState);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const initAccessToken = async () => {
      try {
        const refreshRespone = await api.get(REFRESH_ENDPOINT, {
          withCredentials: true,
        });
        const { accessToken } = refreshRespone.data;
        setAccessToken(accessToken);

        const userResponse = await api.get(`${USER_ENDPOINT}`, {
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

  return <AuthContext value={{ user, setUser }}>{children}</AuthContext>;
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
