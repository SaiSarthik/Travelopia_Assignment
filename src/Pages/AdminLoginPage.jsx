import { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import './AdminLoginPage.css'; // Import the CSS file for styling

const AdminLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [cookies, setCookie] = useCookies(['token_travelopia']); // Set up cookies
  console.log('COOKIE', cookies?.token_travelopia)

  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the server to authenticate the admin
      const response = await axios.post('https://travelopiabe-production.up.railway.app/admin/login', { username, password });
      const token = response.data.token;

      if(response.status === 200 && token){
          // Store the token securely
          setCookie('token_travelopia', token, { path: '/admin', sameSite: 'none', secure: true });          
          navigate('/admin/dashboard');
        }

    } catch (error) {
      console.error('Failed to login:', error);
    }
  };

  if(cookies.token_travelopia != undefined){
    console.log('Navigating to /admin/dashboard');
    navigate('/admin/dashboard');
    return null; // Return null to avoid rendering the login form
  }

  return (
    <div className="admin-login-page">
      <h2 className="admin-login-title">Admin Login</h2>
      <form onSubmit={handleLogin} className="admin-login-form">
        <div className="admin-login-form-group">
          <label htmlFor="username" className="admin-login-label">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className="admin-login-input" />
        </div>
        <div className="admin-login-form-group">
          <label htmlFor="password" className="admin-login-label">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="admin-login-input" />
        </div>
        <button type="submit" className="admin-login-button">Login</button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
