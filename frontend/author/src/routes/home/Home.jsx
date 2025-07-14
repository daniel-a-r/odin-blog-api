import { useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import axios from '@/utils/axios';
import { LOGIN_ENDPOINT } from '@/utils/utils.js';
import { VALIDATE_ENDPOINT } from '@/utils/utils.js';
import { authInterceptor } from '@/utils/axios.js';

const Home = () => {
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();

  const login = async (formData) => {
    const body = {};
    body.username = formData.get('username');
    body.password = formData.get('password');
    try {
      const { data } = await axios.post(LOGIN_ENDPOINT, body, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', data.accessToken);
      return navigate('/dashboard');
    } catch (error) {
      console.log(error.response.data.message);
      setInvalidLogin(true);
    }
  };

  useEffect(() => {
    const getInterceptorResponse = async () => {
      try {
        const interceptorResponse =
          await authInterceptor.get(VALIDATE_ENDPOINT);
        if (interceptorResponse.status == 200) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.log(error);
      }
    };

    const token = localStorage.getItem('accessToken');
    if (token) {
      getInterceptorResponse();
    }
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <h1 className={styles.h1}>Blog Author</h1>
        <form action={login} className={styles.form}>
          <label htmlFor='username' className={styles.label}>
            Username:
          </label>
          <input
            type='text'
            name='username'
            id='username'
            className={styles.input}
            required
          />
          <label htmlFor='password' className={styles.label}>
            Password:
          </label>
          <input
            type='password'
            name='password'
            id='password'
            className={styles.input}
            required
          />
          <button type='submit' className={styles.button}>
            Login
          </button>
        </form>

        {invalidLogin ? (
          <h2 className={styles.errorMessage}>
            Incorrect username or password
          </h2>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
