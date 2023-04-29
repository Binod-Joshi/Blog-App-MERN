import { useEffect, useState } from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { UseGlobalContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const {user,login} = UseGlobalContext();
  const navigate = useNavigate();
  const {loginClicked,error} = UseGlobalContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [login, setLogin] = useState(false);
  useEffect(() => {
    if(user){
      navigate('/');
      console.log('home')
    }
  })

  return (
    <div className="login">
    <span className="loginTitle">Login</span>
    <form className="loginForm" onSubmit={(e) =>loginClicked({navigate,e,username,password})}>
      <label>Username</label>
      <input className="loginInput" type="text" placeholder="Enter your email..." value={username} onChange={(e)=> setUsername(e.target.value)} required />
      <label>Password</label>
      <input className="loginInput" type="password" placeholder="Enter your password..." value={password} onChange={(e)=> setPassword(e.target.value)} required />
      <button className="loginButton">{login?<div className="load"></div>:"Login"}</button>
      <p className='errorlogin'>{error}</p>
    </form>
      <button className="loginRegisterButton" type='onsubmit'>
        <Link to= '/register' className='link'>Register</Link>
      </button>
  </div>
  )
}

export default Login
