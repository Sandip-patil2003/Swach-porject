import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';



function LoginPage({ onLoginSuccess, isRegistered }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');

  // Set isLoggedIn to false when the website is closed
  useEffect(() => {
    const handleUnload = () => {
      localStorage.setItem('isLoggedIn', 'false');
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      const user = res.data.find(user => user.email.toLowerCase() === email.toLowerCase());
      if (user) {
        localStorage.setItem('isLoggedIn', 'true');
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      } else {
        setError('Invalid email (use any @example.com email from JSONPlaceholder)');
      }
    } catch (err) {
      setError('Login failed. Server error.');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setForgotMsg('');
    if (!forgotEmail) {
      setForgotMsg('Please enter your email.');
      return;
    }
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/users');
      const user = res.data.find(user => user.email.toLowerCase() === forgotEmail.toLowerCase());
      if (user) {
        setForgotMsg('A password reset link has been sent to your email (simulated).');
      } else {
        setForgotMsg('Email not found.');
      }
    } catch (err) {
      setForgotMsg('Server error. Please try again.');
    }
  };

  return (
    <div className="container-fluid bg-auth d-flex justify-content-center align-items-center min-vh-100">
      <div className="card card-auth p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="card-body">
          <h3 className="card-title mb-4 text-center">{showForgot ? 'Forgot Password' : 'Login'}</h3>
          {!showForgot && !isRegistered && (
            <div className="alert alert-warning text-center mb-3">You are not registered. Please register first.</div>
          )}
          {!showForgot && error && <div className="alert alert-danger">{error}</div>}
          {showForgot && forgotMsg && <div className={`alert ${forgotMsg.includes('sent') ? 'alert-success' : 'alert-danger'}`}>{forgotMsg}</div>}
          {!showForgot ? (
            <>
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
              <div className="mt-2 text-center">
                <button className="btn btn-link p-0" type="button" onClick={() => setShowForgot(true)}>
                  Forgot Password?
                </button>
              </div>
              <div className="mt-3 text-center">
                <span>Don't have an account? </span>
                <button className="btn btn-link p-0" onClick={() => navigate('/register')}>
                  Register here
                </button>
              </div>
            </>
          ) : (
            <>
              <form onSubmit={handleForgotSubmit}>
                <div className="mb-3">
                  <label htmlFor="forgotEmail" className="form-label">Enter your email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="forgotEmail"
                    placeholder="Enter your registered email"
                    value={forgotEmail}
                    onChange={e => setForgotEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
              </form>
              <div className="mt-3 text-center">
                <button className="btn btn-link p-0" onClick={() => setShowForgot(false)}>
                  Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;


