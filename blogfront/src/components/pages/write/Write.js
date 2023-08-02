import { useState } from "react";
import "./Write.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import {AiFillPlusCircle} from "react-icons/ai"
import { UseGlobalContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";


const Write = () => {
  const {user} =UseGlobalContext();  
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [phot, setPhot] = useState("");
  const [link,setLink] = useState(false);
  const navigate = useNavigate();
  const userId = user?._id;
  const username = user.username;

  const postUpload = async(e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64); 
    setPhot(base64);
  }
  const convertToBase64 = async(file) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    return new Promise((resolve,reject)=>{
        fileReader.onload = () => {
            resolve(fileReader.result);
        };
        fileReader.onerror =(error) => {
            reject(error);
        };
    } );
  };

  const publish = async (e) => {
    e.preventDefault();
    let post = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
      method: "post",
      body: JSON.stringify({title,desc,phot,userId,username}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    post = await post.json();
    if(post._id){
      navigate('/')
    }
  };

  return (
    <div className="write">
      <img src={phot} alt="insert a photo" className="writeImg" />
      
      <form className="writeForm" onSubmit={publish}>
        <div className="writeFormGroup">
        <label htmlFor="inputFile" className="imageinputicons">
            <MdAddPhotoAlternate style={{marginRight:"10px",fontSize:"33px",cursor:"pointer"}} />
          </label>
          <AiFillPlusCircle style={{marginBottom:"5px",fontSize:"30px",cursor:"pointer"}} onClick={()=>setLink(true)}/>
          {link &&<input type="text" autoFocus={true} placeholder="enter a link of a image." className="writeInput" onChange={(e) =>setPhot(e.target.value)} />
}
          <input
            type="file"
            id="inputFile"
            style={{ display: "none" }}
            accept="image/*"
            onChange={postUpload}
          />
        </div>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story.."
            className="writeInput writeText"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit">Publish</button>
      </form>
    </div>
  );
};

export default Write;
