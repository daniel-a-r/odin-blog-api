import { createContext, useState } from 'react';

const initialState = {
  authStatus: false,
  setAuthStatus: () => null,
};

const AuthStatusContext = createContext(initialState);

const AuthStatusProvider = ({ children }) => {
  const [authStatus, setAuthStatus] = useState(
    localStorage.getItem('accessToken') ? true : false,
  );

  return (
    <AuthStatusContext value={{ authStatus, setAuthStatus }}>
      {children}
    </AuthStatusContext>
  );
};

export { AuthStatusProvider, AuthStatusContext };
