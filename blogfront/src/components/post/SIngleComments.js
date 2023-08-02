import React, { useEffect, useState } from "react";
import "./SingleComments.css";
import { AiOutlineSend } from "react-icons/ai";
import {MdDelete} from "react-icons/md";
import { UseGlobalContext } from "../context/Context";
import { useParams } from "react-router-dom";
import {socket} from "../socket/Socket";

const SIngleComments = () => {
    const {user,totalposts,comments,setcomments,updateTotalPosts} = UseGlobalContext();
    const [text, setText] = useState("");
    const [post, setPost] = useState("");
    const params = useParams();

    useEffect(() => {
      socket.emit("setup", user);
      socket.on('connected', () => {
        console.log('Connected event received from the server.');
      });
      return () => {
        socket.off('connected');
      };
    },[]);
    let posts = totalposts;

    useEffect(() => {
        const singlePost = async () => {
          let post = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/${params.postId}`, {
            method: "get",
          });
          post = await post.json();
          setPost(post);
          if(post.comments){
            setcomments(post.comments);
          }
        };
        singlePost();  
    }, [params]);

    const insideSendComments =async() => {
        if(text){
            setText("");
            let data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/comments`,{
                method:"post",
                body:JSON.stringify({userId:user?._id,postId:params.postId,text}),
                headers:{
                    "Content-Type":"application/json"
                },
            })
            data = await data.json();
            if(data.comments){
              socket.emit("new comment",data.comments);
              // setcomments(data.comments);
            }
        }else{
            console.log("enter somethings")
        }
    }

    useEffect(() => {
      if(posts.length >= 1 ){
        socket.on("comment received",(newComments)=>{
          setcomments(newComments);
          // only for display realtime comment length in home but it is not working.
          // let updatedPost = totalposts.map((postt) => {
          //   if(postt._id ==post._id){
          //     postt.comments = newComments
          //     return postt;
          //   }else{
          //     return postt;
          //   }
          // });
          // updateTotalPosts(updatedPost);
        })
      }

      socket.on("comment delete",(newComments) =>{
        setcomments(newComments);
      })
    })

    const commentHandler =async(event) => {
        if(event.key === "Enter" && text){
          insideSendComments();
        }else{
            return;
        }
    }

    const insideDelete = async(id) => {
      try {
        let data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/deleteComment`,{
          method:"post",
          body:JSON.stringify({userId:user?._id,postId:post._id,commentId:id}),
          headers:{
            "Content-Type":"application/json",
          }
        })
        data = await data.json();
        if(data.comments){
          socket.emit("new deleteComment",data.comments);
        }
       } catch (error) {
        console.log(error)
       }
    }
    const deleteComment = async(comment) => {
      const id = comment._id;
      if(post?.userId === user?._id || comment.postedBy._id === user?._id){
        insideDelete(id);
        console.log("your post or your comment");
        return;
    }else{
      console.log("Neither your post nor your comment.")
      return;
    }
    }
  return (
    <div>
      <div className="comments">
        <input
          className="inputComment"
          type="text"
          placeholder="enter a comments.."
          autoFocus={true}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={commentHandler}
        />
        <span
          style={{
            marginLeft: "10px",
            marginTop: "5px",
            color: "green",
            fontWeight: "bolder",
            fontSize: "larger",
          }}
          onClick={insideSendComments}
        >
          <AiOutlineSend />
        </span>
      </div>
      {comments.length<=0 && <div style={{display:"flex",alignItems:"center",justifyContent:"center",marginTop:"50px",fontSize:"larger",fontWeight:"bolder"}}>
        No comments yet.
        </div>}
      {comments && comments.length>=1 && <div >
        <div style={{width:"100%",display:"flex",justifyContent:"center"}}>Total comments: {comments.length}</div>
        {comments.map((comment,index) => {
            return(
            <div key={index} style={{display:"flex",flexDirection:"column",gap:"10px",padding:"10px"}}>
              <div  className="commentSection">
                <div className="commentUsername">By {comment?.postedBy?.username}</div>
                <div className="commentText">:{comment?.text} <span onClick={() => deleteComment(comment)} style={{color:"red",cursor:"pointer",fontSize:"large"}} className={(post?.userId === user?._id || comment.postedBy._id === user?._id)?"displayDelete":"displayNone"}><MdDelete/></span></div>
                
            </div>
            </div>
            )
        })}
        </div>}
      
    </div>
  );
};

export default SIngleComments;
