import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const res = await api.post('/auth/signup', { email, password });
      localStorage.setItem('token', res.data.token); // Save token if backend sends one
      navigate('/'); // Redirect to homepage
    } catch (error) {
      console.error(error);
      setErr('Signup failed. Try a different email.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <button type="submit">Signup</button>
      </form>
      {err && <p style={{ color: 'red' }}>{err}</p>}
    </div>
  );
};

export default Signup;
