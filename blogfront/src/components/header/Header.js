import { Link } from "react-router-dom";
import { UseGlobalContext } from "../context/Context";
import "./Header.css";
import {HiPlusCircle} from 'react-icons/hi'
const Header = () => {
  const { showPopUp } = UseGlobalContext();

  return (
    <div className="header">
      <div className="headerTitles">
        <div className="writeHeight">Create Your Own</div>
      <div className={showPopUp ? "normalLg" : "headerTitleLg"}>Blog</div>
          <div>
          <Link to="/write" className=" writeBlog link">
            <p className="writeHeight1">WRITE</p> <div style={{marginTop:"3.5px"}} ><HiPlusCircle/></div>
          </Link>
          </div>
        
      </div>
      {/* <img
        className={showPopUp ? "headerImg1" : "headerImg"}
        src="https://img.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg"
        alt=""
      /> */}
    </div>
  );
};

export default Header;
