import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    email: '',
    gender: '',
    dob: '' // YYYY-MM-DD
  });
  const [dobDay, setDobDay] = useState('1');
  const [dobMonth, setDobMonth] = useState('1');
  const [dobYear, setDobYear] = useState('2000');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dobFormatted = `${dobYear}-${dobMonth.padStart(2, '0')}-${dobDay.padStart(2, '0')}`;
    const submitData = { ...formData, dob: dobFormatted };
    try {
      await axios.post('https://jsonplaceholder.typicode.com/users', submitData);
      localStorage.setItem('isRegistered', 'true');
      if (onRegisterSuccess) onRegisterSuccess();
      navigate('/login');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <div className="container-fluid bg-auth d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label">First Name</label>
              <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="col">
              <label className="form-label">Last Name</label>
              <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderMale"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderMale">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderFemale"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderFemale">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="genderOther"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  required
                />
                <label className="form-check-label" htmlFor="genderOther">Other</label>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Date of Birth</label>
            <div className="d-flex gap-2">
              <select className="form-select" value={dobDay} onChange={e => setDobDay(e.target.value)} required>
                {[...Array(31)].map((_, i) => (
                  <option key={i+1} value={String(i+1)}>{i+1}</option>
                ))}
              </select>
              <select className="form-select" value={dobMonth} onChange={e => setDobMonth(e.target.value)} required>
                {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
                  <option key={i+1} value={String(i+1)}>{m}</option>
                ))}
              </select>
              <select className="form-select" value={dobYear} onChange={e => setDobYear(e.target.value)} required>
                {Array.from({length: 31}, (_, i) => 2000 + i).map(y => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
        </form>
        <div className="mt-3 text-center">
          <span>Already have an account? </span>
          <button className="btn btn-link p-0" onClick={() => navigate('/login')}>
            Login here
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
