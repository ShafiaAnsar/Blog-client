import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { username, email, password } = inputValue;

  const handleUserNameChange = (event) => {
    const name = event.target.value;
    // Capitalize the first letter and store it
    setInputValue((prev) => ({
      ...prev,
      username: name.charAt(0).toUpperCase() + name.slice(1),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('https://blog-api-liart.vercel.app/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json();

      if (response.status === 200) {
        toast.success('Registration successful!', { position: 'top-center' });
        setRedirect(true);
      } else if (response.status === 400) {
        toast.error(responseData.error, { position: 'top-center' });
      } else {
        toast.error('Registration Failed', { position: 'top-center' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('An error occurred during registration', { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className='register' onSubmit={handleSubmit}>
      <h1>Register</h1>
      <input
        type='text'
        placeholder='Username'
        required
        name='username'
        value={username}
        onChange={handleUserNameChange} 
      />
      <input
        type='email'
        placeholder='Email'
        required
        name='email'
        value={email}
        onChange={handleChange}
      />
      <input
        type='password'
        placeholder='Password'
        required
        name='password'
        value={password}
        onChange={handleChange}
      />
      <button type='submit' disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>
      <p>
        Already have an account? <Link to={'/login'}>Login</Link>
      </p>
    </form>
  );
};

export default RegisterPage;
