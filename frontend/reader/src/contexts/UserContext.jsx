import { createContext, useContext, useState } from 'react';
import propTypes from 'prop-types';

const initialState = {
  user: {
    username: '',
    id: '',
  },
  setUser: () => null,
};

const UserContext = createContext(initialState);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return {
      username: localStorage.getItem('username'),
      id: localStorage.getItem('id'),
    };
  });

  return <UserContext value={{ user, setUser }}>{children}</UserContext>;
};

UserProvider.propTypes = {
  children: propTypes.node.isRequired,
};

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { UserProvider, useUser };
