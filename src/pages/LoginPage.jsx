import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from '../UserContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    username: '',
    password: ''
  });
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Capitalize the first letter of the username
    if (name === 'username') {
      setInputValue((prev) => ({
        ...prev,
        username: value.charAt(0).toUpperCase() + value.slice(1),
      }));
    } else {
      setInputValue((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const { username, password } = inputValue;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://blog-api-liart.vercel.app/login', {

      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
      toast.success('Login successful!', { position: 'top-center' });
    } else {
      toast.error('Wrong Credentials', { position: 'top-center' });
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <input type="text" placeholder="Username" name="username" value={username} onChange={handleChange} />
      <input type="password" placeholder="Password" name="password" value={password} onChange={handleChange} />
      <button>Login</button>
      <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
    </form>
  );
}

export default LoginPage;
