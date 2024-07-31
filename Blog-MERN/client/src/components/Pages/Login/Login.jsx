import React from 'react'
import { useState } from 'react';
import './Login.css'

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="login"action="">
      <h1>Login</h1>
        <input type="text" 
               placeholder='username'
               value={username}
               onChange={ev=>setUserName(ev.target.value)}/>
        <input type="password" 
               placeholder='password'
               value={password}
               onChange={ev => setPassword(ev.target.value)} />
        <button>Login</button>
    </form>
  )
}

export default Login