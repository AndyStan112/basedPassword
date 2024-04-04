'use client'
import { useState } from 'react';
import axios from 'axios';

const PasswordForm = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verifyPassword', { password });
      setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Password Verification</h1>
      <PasswordForm />
    </div>
  );
};

export default Home;