import React from 'react'
import './RegisterPage.css'

function RegisterPage() {
  return (
    <div>
        <form className='register' action="/Register">
        <h1>Register</h1>
            <input type="text" placeholder='username'/>
            <input type="password" placeholder='password' />
            <button>Register</button>
        </form>
    </div>
  )
}

export default RegisterPage