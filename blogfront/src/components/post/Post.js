import React, { useEffect, useState } from "react";
import "./Post.css";
import { UseGlobalContext } from "../context/Context";
import { Link } from "react-router-dom";
import { GiSelfLove } from "react-icons/gi";
import { FaComment } from "react-icons/fa";
import {BsFillPencilFill} from "react-icons/bs";
import {socket} from "../socket/Socket";

const Post = () => {
  const { totalposts, isLoading, user, updateTotalPosts, getTotalPost} = UseGlobalContext();
  const [commentsIcon, setCommentsIcon] = useState(false);

  useEffect(()=>{
    getTotalPost();
  },[])

  useEffect(() => {
    socket.emit("setup", user?._id);
    socket.on('connected', () => {
      console.log('Connected event received from the server.');
    });
    return () => {
      socket.off('connected');
    };
  }, []);
  
  

  const pullLike = async (post) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/unlikes`, {
        method: "post",
        body: JSON.stringify({ postId: post?._id, userId: user?._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      if (result.likes) {
        socket.emit("new unlike",result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clickLikes = async (post) => {
    try {
      let data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/likes`, {
        method: "post",
        body: JSON.stringify({ postId: post?._id, userId: user?._id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      data = await data.json();
      if (data.likes) {
        socket.emit("new like",data);
      } else {
        pullLike(post);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    
    if(totalposts?.length>=1){
      socket.on("like received",(likeReceived) => {
        let dataLikes = likeReceived.likes;
           let updatedPost = totalposts?.map((postt) => {
             if (postt._id === likeReceived._id) {
               let userr = postt.likes;
               return {
                 ...postt,
                 likes: [...userr, dataLikes[dataLikes.length - 1]], // add new user to existing users
               };
             } else {
               return postt;
             }
           });
           updateTotalPosts(updatedPost);
       })
    }

  })

  useEffect(() =>{

   if(totalposts?.length>=1){
    socket.on("unlike received",(likeReceived) => {
      let updatedPost = totalposts.map((postt) => {
        if (postt._id === likeReceived._id) {
          return {
            ...likeReceived
          };
        } else {
          return postt;
        }
      });
      updateTotalPosts(updatedPost);
    })
   }
  });

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
                  <div className="likes" onClick={() => clickLikes(post)}><GiSelfLove className={post?.likes?.includes(user?._id) ? "GroundRed" : "GroundWhite"}/><span className="likes-count">
                    {post?.likes?.length}
                  </span></div>
                  <div className="commentIcon" onClick={()=>setCommentsIcon(!commentsIcon)}>
                    <Link className="link" to={`/comment/${_id}`}><FaComment style={{color:"white"}}/> <span className="likes-count"><BsFillPencilFill/></span></Link>
                   {/* <span className="likes-count">{post?.comments?.length}</span> */}
                   
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
