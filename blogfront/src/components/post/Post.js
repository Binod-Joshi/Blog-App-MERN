import React, { useState } from "react";
import "./Post.css";
import { UseGlobalContext } from "../context/Context";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FaComment } from "react-icons/fa";
const Post = () => {
  const { totalposts, isLoading, user, updateTotalPosts } = UseGlobalContext();
  // const [totallikes, setTotallikes] = useState([]);
  const [commentsIcon, setCommentsIcon] = useState(false);


  const pullLike = async (post) => {
    try {
      const data = await fetch("http://localhost:5000/posts/unlikes", {
        method: "post",
        body: JSON.stringify({ postId: post._id, userId: user._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      console.log(result);
      if (result.likes) {
        console.log(totalposts);
        let updatedPost = totalposts.map((postt) => {
          if (postt._id === post._id) {
            let userr = postt.likes;
            console.log(user._id);
            return {
              ...postt,
              likes: userr.filter((l) => l !== user._id),
            };
          } else {
            return postt;
          }
        });
        console.log(updatedPost);
        updateTotalPosts(updatedPost);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const clickLikes = async (post) => {
    console.log(post, user._id);
    try {
      let data = await fetch("http://localhost:5000/posts/likes", {
        method: "post",
        body: JSON.stringify({ postId: post._id, userId: user._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      console.log(data);
      if (data.likes) {
        const dataLikes = data.likes;
        let updatedPost = totalposts.map((postt) => {
          if (postt._id === post._id) {
            let userr = postt.likes;
            console.log(userr);
            return {
              ...postt,
              likes: [...userr, dataLikes[dataLikes.length - 1]], // add new user to existing users
            };
          } else {
            return postt;
          }
        });
        console.log(updatedPost);
        updateTotalPosts(updatedPost);
      } else {
        pullLike(post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <div className="center1">
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
      <div className="wave1"></div>
    </div>
  ) : (
    <div className="postt">
      {totalposts &&
        totalposts.map((post, index) => {
          const { title, desc, phot, _id, username } = post;
          return (
            <div className="post" key={index}>
              <Link className="link" to={`/post/${_id}`}>
                <img className="postImg" src={phot} alt="" />
              </Link>
              <div className="postInfo">
                <span className="postTitle">
                  <Link className="link" to={`/post/${_id}`}>
                    {title}
                  </Link>
                </span>
                <p>
                  <Link className="link" to={`/post/${_id}`}>
                    {username}
                  </Link>
                </p>
                <div className="likesAndComments"  >
                  <div className="likes" onClick={() => clickLikes(post)}><FcLike/><span className="likes-count">
                    {post?.likes?.length}
                  </span></div>
                  <div className="commentIcon" onClick={()=>setCommentsIcon(!commentsIcon)}>
                    <Link className="link" to={`/comment/${_id}`}><FaComment style={{color:"white"}}/></Link>
                   <span className="likes-count">{post?.comments?.length}</span>
                  </div>
                </div>
                <span className="postDate">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>
              <p className="postDesc">{desc}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Post;
