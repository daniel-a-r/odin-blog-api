import { useNavigate, useLoaderData } from 'react-router';
import { useState } from 'react';
import styles from './Home.module.css';
import axios from '@/utils/axios';
import { LOGIN_ENDPOINT } from '@/utils/utils.js';

const Home = () => {
  const [invalidLogin, setInvalidLogin] = useState(false);
  const navigate = useNavigate();
  useLoaderData();

  const login = async (formData) => {
    const body = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    
    try {
      const { data } = await axios.post(LOGIN_ENDPOINT, body, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', data.accessToken);
      navigate('/dashboard');
    } catch (ignoreError) {
      setInvalidLogin(true);
    }
  };

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

        {invalidLogin && (
          <h2 className={styles.errorMessage}>
            Incorrect username or password
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
