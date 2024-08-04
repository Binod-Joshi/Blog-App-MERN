import { useEffect, useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../../context/Context";
import { BiUserCircle } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Register = () => {
  const { registerClicked, user, login, response } = UseGlobalContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const imageUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setProfilePic(base64);
  };

  const convertToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        console.log(fileReader.result);
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("idkh");
    if (password.length < 4) {
      setPasswordError("Password should be at least 4 characters");
      if (timeoutId) {
        clearTimeout(timeoutId); // clear the previous timeout if it exists
      }
      const newTimeoutId = setTimeout(() => setPasswordError(""), 5000);
      setTimeoutId(newTimeoutId);
      return;
    }
    registerClicked({ navigate, username, email, password });
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleRegister}>
        <TextField
          label="Username"
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
          sx={{backgroundColor:"white",borderRadius:"5px"}}
        />
        <TextField
          label="Email"
          type="email"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
          sx={{backgroundColor:"white",borderRadius:"5px"}}
        />
        <TextField
          label="Password"
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          sx={{backgroundColor:"white",borderRadius:"5px"}}
        />
        <h3 style={{marginTop:"10px",marginBottom:"5px"}}>Profile Pic</h3>
        <div className="registerpicManagement">
          <label htmlFor="fileInput">
            <BiUserCircle className="settingsPPIcon" />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="settingsPPInput"
            accept="image/*"
            onChange={imageUpload}
          />
          {profilePic ? <img src={profilePic} alt="" /> : ''}
        </div>
        {passwordError && <div style={{ color: "red" }}>{passwordError}</div>}
        <Button className="registerButton" variant="contained" color="primary" type="submit">
          {login ? <div className="load"></div> : "Register"}
        </Button>
        <p className='errorlogin'>{response}</p>
      </form>
      <Link to="/login" className="link" style={{ textDecoration: 'none', marginTop: '10px' }}>
        <Button variant="outlined" type="button" fullWidth>
          LOGIN
        </Button>
      </Link>
    </div>
  );
};

export default Register;
