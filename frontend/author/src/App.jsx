import axios from 'axios';
import './App.css'

function App() {
  const signUp = async (formData) => {
    const body = {};
    body.username = formData.get('username');
    body.password = formData.get('password');
    body.confirmPassword = formData.get('confirmPassword');

    if (body.password !== body.confirmPassword) {
      return alert('passwords do not match');
    }

    const {data} = await axios.post('http://localhost:3000/sign-up', body);
    console.log(data);
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form action={signUp}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" id="username" required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" required/>
        <label htmlFor="confirm-password">Confirm Passwowrd:</label>
        <input type="password" name="confirmPassword" id="confirm-password" required />
        <button type="submit">Sign Up</button>
      </form>
    </>
  )
}

export default App
