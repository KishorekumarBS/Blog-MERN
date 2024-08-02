import React, { useState } from 'react';
import api from './api.jsx';
import './Login.css'

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function log(ev) {
    ev.preventDefault();
    try {
      const response = await api.post('http://localhost:4000/login', {
        username,
        password
      });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login');
    }
  }

  return (
    <form className="login" onSubmit={log}>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input type="text" 
             placeholder='username'
             value={username}
             onChange={ev => setUserName(ev.target.value)}/>
      <input type="password" 
             placeholder='password'
             value={password}
             onChange={ev => setPassword(ev.target.value)} />
      <button>Login</button>
    </form>
  )
}

export default Login