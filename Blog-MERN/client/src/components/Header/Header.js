import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from "react-router-dom";
import api from '../Pages/Login/api';
import './Header.css';
import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/profile', { withCredentials: true })
      .then(response => {
        setUserInfo(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  function logout() {
    api.post('/logout', {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
        navigate('/login')
        
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <Link onClick={logout}>Logout ({username})</Link>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}