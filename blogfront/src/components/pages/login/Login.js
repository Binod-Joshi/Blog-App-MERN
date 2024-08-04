import { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { UseGlobalContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Login = () => {
  const { user, login } = UseGlobalContext();
  const navigate = useNavigate();
  const { loginClicked, error } = UseGlobalContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
      console.log('home');
    }
  }, [user, navigate]);

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={(e) => loginClicked({ navigate, e, email, password })}>
        <label>Email</label>
        <TextField
          className="loginInput"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
        />
        <label>Password</label>
        <TextField
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
        />
        <Button className="loginButton" variant="contained" color="primary" type="submit">
          {login ? <div className="load"></div> : 'Login'}
        </Button>
        <p className="errorlogin">{error}</p>
      </form>
      <Link to="/register" className="link" style={{ textDecoration: 'none', marginTop: '10px' }}>
        <Button variant="outlined" type="button" fullWidth>
          Register
        </Button>
      </Link>
    </div>
  );
};

export default Login;
