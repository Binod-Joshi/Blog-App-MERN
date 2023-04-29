import React from "react";
import "./Top.css";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UseGlobalContext } from "../context/Context";

const Topbar = () => {
  let { user,showPopUp,setShowPopUp,logouts } = UseGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.clear();
    logouts();
    navigate('/login');
    setShowPopUp(false);
    
  }
  return (
    <>
    <div className="top">
      {user? (
        <>
          <div className="topleft">
            <FaFacebookSquare className="topIcons" />
            <FaTwitterSquare className="topIcons" />
            <Link to="https://www.linkedin.com/feed/"target="_blank" className="link" style={{marginTop:"4px"}}><FaLinkedin className="topIcons" /></Link>
            <Link to="https://www.instagram.com/binod__joshi/" target="_blank" className="link" style={{marginTop:"4px"}}><FaInstagramSquare className="topIcons" /></Link>
            
          </div>
          <div className="topcenter">
            <ul className="topList">
              <li className="topListItem">
                <Link to="/" className={!showPopUp &&location.pathname==="/"?"active":"link"}>
                  HOME
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/profile" className={!showPopUp &&location.pathname==="/profile"?"active":"link"}>
                  PROFILE
                </Link>
              </li>
              <li className="topListItem">
                <Link to="/contact" className={!showPopUp && location.pathname==="/contact"?"active":"link"}>
                  CONTACT
                </Link>
              </li>
              <li className="topListItem">
                <button
                  className={showPopUp?"active1":"logoutuser"}
                  onClick={() => setShowPopUp(true)}
                >
                  LOGOUT
                </button>
              </li>
            </ul>
          </div>
          <div className="topright">
            <>
              <Link to={`/update`}>
                <img
                  className="topImg"
                  src={user.profilePic}
                  alt="user"
                />
              </Link>
              {/* <BsSearch className="topSearchIcons update" /> */}
            </>
          </div>
        </>
      ) : (
        <div className="center">Blog</div>
      )}
      
    </div>
    {showPopUp && (
        <div className="logouts">
          <div className="logout">
            <h1>Confirm to logout.</h1>
            <div className="buttons">
              <button  className="ok" onClick={logout}>
                Ok
              </button>
              <button className="cancel" onClick={()=>setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
