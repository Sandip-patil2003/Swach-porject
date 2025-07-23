import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

function LoginPage({ onLoginSuccess, isRegistered }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      const user = res.data.find(user => user.email.toLowerCase() === email.toLowerCase());

      if (true) {
        localStorage.setItem('isLoggedIn', 'true');
        if (onLoginSuccess) onLoginSuccess();
        navigate('/home');
      } else {
        setError('Invalid email (use any @example.com email from JSONPlaceholder)');
      }
    } catch (err) {
      setError('Login failed. Server error.');
    }
  };

  return (
    <div className="container-fluid bg-auth d-flex justify-content-center align-items-center min-vh-100">
      <div className="card card-auth p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">Login</h3>
          {!isRegistered && (
            <div className="alert alert-warning text-center mb-3">You are not registered. Please register first.</div>
          )}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label ">Email address</label>
              <input
                type="email"
                className="form-control "
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isRegistered}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label ">Password</label>
              <input
                type="password"
                className="form-control "
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={!isRegistered}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={!isRegistered}>Login</button>
          </form>
          <div className="mt-3 text-center">
            <span>Don't have an account? </span>
            <button className="btn btn-link p-0" onClick={() => navigate('/register')}>
              Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


