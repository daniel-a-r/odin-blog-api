import { createContext } from 'react';

const initialState = {
  authStatus: false,
  setAuthStatus: () => null,
};

const AuthStatusContext = createContext(initialState);

export default AuthStatusContext;
