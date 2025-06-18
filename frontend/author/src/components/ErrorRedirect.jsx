import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const ErrorRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  });

  return <></>;
};

export default ErrorRedirect;
