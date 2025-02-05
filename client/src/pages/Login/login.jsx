import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'Login successful') {
          alert('Login successful');
        } else {
          alert('Invalid credentials');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label><span className='label_span'>*</span>Email:</label>
          <input 
          
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required />
        </div>
        <div>
          <label><span className='label_span'>*</span>Password:</label>
          <input 
          
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required />
        </div>
        <button type="submit">Login</button>
        <p className="custom-text">
          Don't have an account? 
          <Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
