import React from "react";
import "./Post.css";
import { UseGlobalContext } from "../context/Context";
import { Link } from "react-router-dom";
const Post = () => {
  const { totalposts, isLoading } = UseGlobalContext();
  console.log(totalposts);
  console.log(isLoading);

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
                <hr />
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
