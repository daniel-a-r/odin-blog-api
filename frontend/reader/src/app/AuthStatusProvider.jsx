import { useState } from 'react';
import propTypes from 'prop-types';
import AuthStatusContext from '@/app/AuthStatusContext';

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

AuthStatusProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export { AuthStatusProvider };
