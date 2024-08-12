import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function register(ev) {
    ev.preventDefault();
    try {
      const response = await axios.post('https://blog-mern-z9vc.onrender.com/register', {
        username,
        password
      });
      console.log('Registration successful:', response.data);
      // Handle successful registration (e.g., redirect, show message)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during registration');
    }
  }

  return (
    <div>
      <form className='register' onSubmit={register}>
        <h1>Register</h1>
        {error && <p className="error">{error}</p>}
        <input 
          type="text" 
          placeholder='username' 
          value={username}
          onChange={ev => setUsername(ev.target.value)}
        />
        <input 
          type="password" 
          placeholder='password' 
          value={password}
          onChange={ev => setPassword(ev.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;