import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar/Sidebar";
import { BiUserCircle } from "react-icons/bi";
import {RiDeleteBin6Fill} from 'react-icons/ri';
import "./Setting.css";
import { UseGlobalContext } from "../../context/Context";
import { useNavigate, Link } from "react-router-dom";

const Setting = () => {
  const { user, updatehandler } = UseGlobalContext();
  const id = user?._id;
  console.log(id);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");
  
  const navigate = useNavigate();
  useEffect(() => {
    getCuser();
  }, []);
  const getCuser = async () => {
    setUsername(user.username);
    setEmail(user.email);
    setProfilePic(user.profilePic);
  };

  const updatehandlers = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    updatehandler({ navigate, id, username, email, password,profilePic });
  };

  const imageUpload = async (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64)
    setProfilePic(base64);
  };

  const convertToBase64 = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      fileReader.onload = () => {
        console.log(fileReader.result)
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">
            <Link className="link" to={`/delete`}>
            <RiDeleteBin6Fill className="deleteAccount"/>
            </Link>
          </span>
        </div>
        <form className="settingsForm" onSubmit={updatehandlers}>
          <label>Profile Picture</label>

          <div className="settingsPP">
            <img src={profilePic} alt="" />
            <label htmlFor="fileInput">
              <BiUserCircle className="settingsPPIcon" />
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput" accept="image/*"
              onChange={imageUpload}
            />
          </div>
          <label>Username</label>
          <input
            style={{ color: "black" }}
            type="text"
            placeholder="username"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            style={{ color: "black" }}
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            style={{ color: "black" }}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
        </form>
      </div>
      <div className="display">
      <Sidebar  />
      </div>
    </div>
  );
};

export default Setting;
