import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import './Login.css'

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function log(ev){
    ev.preventDefault();
    try{
      const response = await axios.post('http://localhost:4000/login',{
        username,
        password
      });
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <form className="login" onSubmit={log}>
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