import { useEffect, useState } from "react";
import "./SinglePost.css";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { UseGlobalContext } from "../context/Context";

const SinglePost = () => {
  const { user} = UseGlobalContext();
  const id = user?._id;
  const params = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updatemode, setUpdatemode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopUp,setShowPopUp] = useState(false);
  
  useEffect(() => {
      const singlePost = async () => {
        setLoading(true);
        let post = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${params.postId}`, {
          method: "get",
        });
        post = await post.json();
        setLoading(false);
        setPost(post);
        setTitle(post.title);
        setDesc(post.desc);
      };
      singlePost();  
  }, [params]);

  const updatePost = async () => {
    let post = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${params.postId}`, {
      method: "put",
      body: JSON.stringify({ id, title, desc }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    post = await post.json();
    setPost(post);
    setUpdatemode(false);
  };

  const deletePost = async () => {
    await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${params.postId}`, {
      method: "delete",
    });
    navigate("/");
  };

  return updatemode ? (
    <div className="singlepost">
      <div className="singlePostWrapper">
        <img src={post.phot} alt="" className="singlePostImg" />
        <input
          type="text"
          className="singlePostTitle1"
          value={title}
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="singePostInfo">
          <span className="singelPostAuthor">
            Author: <b>{post.userId}</b>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          className="singlePostDesc1"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <button className="updatePostbutton" onClick={updatePost}>
        update
      </button>
    </div>
  ) : loading ? (
        <div className="center">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

  ) : (
    <div className="singlepost">
      <div className="singlePostWrapper">
        <img src={post.phot} alt="" className="singlePostImg" />
        <h1 className="singlePostTitle">
          {post.title}
          {user?._id === post.userId ? (
            <div className="singlePostEdit">
              <FaUserEdit
                className="singlePostIcon"
                onClick={() => setUpdatemode(true)}
              />
              <RiDeleteBin6Fill
                className="singlePostIcon"
                onClick={() => setShowPopUp(true)}
                style={{marginRight:"40px",marginLeft:"30px"}}
              />
            </div>
          ) : (
            ""
          )}
        </h1>
        <div className="singePostInfo">
          <span className="singelPostAuthor">
            Author: <b>{post.username}</b>
          </span>
          <span className="singlePostDate" style={{marginRight:"40px"}}>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {!showPopUp && <p className="singlePostDesc" style={{marginRight:"40px"}}>{post.desc}</p>}
      </div>
      {showPopUp && (
        <div className="logouts1">
          <div className="logout">
            <h1>Are you sure you want to delete this post.</h1>
            <div className="buttons">
              <button  className="ok" onClick={deletePost}>
                Ok
              </button>
              <button className="cancel" onClick={()=>setShowPopUp(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default SinglePost;
