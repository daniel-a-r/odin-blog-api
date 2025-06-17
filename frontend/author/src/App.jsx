import axios from 'axios';
import './App.css';
import { LOGIN_ENDPOINT } from './utils.js';

function App() {
  const login = async (formData) => {
    const body = {};
    body.username = formData.get('username');
    body.password = formData.get('password');
    console.log(LOGIN_ENDPOINT);

    const { data } = await axios.post(LOGIN_ENDPOINT, body);
    console.log(data);
  };

  return (
    <>
      <h1>Login</h1>
      <form action={login}>
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' required />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' required />
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default App;
