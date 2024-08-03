import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import api from './api.jsx';
import './Login.css';
import { UserContext } from '../../UserContext/UserContext.jsx';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function log(ev) {
    ev.preventDefault();
    try {
      const response = await api.post('/login', {
        username,
        password
      });
      if (response.status >= 200 && response.status < 300) {
        setUserInfo(response.data)
        setRedirect(true);
        console.log('Login successful:', response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login" onSubmit={log}>
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <input 
        type="text" 
        placeholder='username'
        value={username}
        onChange={ev => setUserName(ev.target.value)}
      />
      <input 
        type="password" 
        placeholder='password'
        value={password}
        onChange={ev => setPassword(ev.target.value)} 
      />
      <button>Login</button>
    </form>
  );
}

export default Login;