import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import './AdminLoginPage.css';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [cookies, setCookie] = useCookies(['token_travelopia']);
  const navigate = useNavigate();

  const notify = (text) => toast.error(text);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://travelopiabe-production.up.railway.app/admin/login',
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        setCookie('token_travelopia', token, { path: '/admin', maxAge: 86400, secure:true, sameSite:'none' });
        navigate('/admin/dashboard')
      } else {
        notify('Please enter valid credentials');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      notify('Please enter valid credentials');
    }
  };

  useEffect(() => {
    if (cookies.token_travelopia !== 'undefined' ) {
      navigate('/admin/dashboard');
    }
  }, [cookies.token_travelopia]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
      <div className="admin-login-page">
        <h2 className="admin-login-title">Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-login-form-group">
            <label htmlFor="username" className="admin-login-label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="admin-login-input"
            />
          </div>
          <div className="admin-login-form-group">
            <label htmlFor="password" className="admin-login-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="admin-login-input"
            />
          </div>
          <button type="submit" className="admin-login-button">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default AdminLoginPage;
