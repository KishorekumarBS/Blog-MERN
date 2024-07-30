import React from 'react'
import { useState } from 'react';
import './RegisterPage.css'

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function register(ev){
    ev.preventDefault();
    await fetch('http://localhost:4000/register',{
      method:'POST',
      body: JSON.stringify({username,password}),
      headers:{'Content-Type':'application/json'},
    })
  }

  //mongodb+srv://kishorekumar:CmW0OOdztrUsmV2R@cluster0.ka4pzx4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
  // CmW0OOdztrUsmV2R
  // kishorekumar
  return (
    <div>
        <form className='register' onSubmit={register}>
        <h1>Register</h1>
            <input 
            type="text" 
            placeholder='username' 
            value={username}
            onChange={ev =>setUsername(ev.target.value)}/>
            <input 
            type="password" 
            placeholder='password' 
            value={password}
            onChange={ev =>setPassword(ev.target.value)}
            />
            <button>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage