import React, { useState, useEffect } from 'react';

import Cookies from "universal-cookie";

const cookies = new Cookies();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://localhost:3000/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      username: username,
      email: email,
      password: password
    };

    fetch('http://localhost:8000/rest-auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': cookies.get('csrftoken'),
      },
      body: JSON.stringify(user).replace(/</g, '\\u003c'),
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          localStorage.clear();
          localStorage.setItem('token', data.key);
          window.location.replace('http://localhost:3000/dashboard');
        } else {
          setUsername('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div className="app">
      {loading === false && <h1>Enter Login Information</h1>}
      {errors === true && <h2 className="loginError">*Invalid credentials. Re-enter authentication information.</h2>}
      {loading === false && (
        <form onSubmit={onSubmit}>
          <label htmlFor='username'>Username:</label> <br />
          <input
            name='username'
            type='username'
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />{' '}
          <br />
          <label htmlFor='email'>Email:</label> <br />
          <input
            name='email'
            type='email'
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />{' '}
          <br />
          <label htmlFor='password'>Password:</label> <br />
          <input
            name='password'
            type='password'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />{' '}
          <br />
          <input type='submit' value='Login' />
        </form>
      )}
    </div>
  );
};

export default Login;
