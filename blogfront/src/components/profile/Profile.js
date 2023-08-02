import React, { useEffect, useState } from 'react'
import './Profile.css'
import Sidebar from '../sidebar/Sidebar'
import { UseGlobalContext } from '../context/Context'
import { Link, useLocation } from 'react-router-dom'
const Profile = () => {
    const {user} = UseGlobalContext();
    const [loading, setLoading] = useState(false);
    const [postsOfUser, setPostsOfUser] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const getPosts = async () => {
          setLoading(true)
          if (user && user?._id) {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts/user/${user?._id}`);
            const posts = await response.json();
            setLoading(false);
            setPostsOfUser(posts);
          }
        };
        getPosts();
      }, [user]);
  
    console.log(postsOfUser);
  return (
    <div className='profile'>
      <Sidebar />
      <div className="contacct"><Link to="/contact" className={location.pathname==="/contact"?"active":"profileLink"}>
                  CONTACT ME
                </Link></div>
      <h1 className='nameofuser'>Your posts</h1>
      {loading?<div className="center2">
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
    </div>:<div className='postOfTheUser'>
      <div className="postt">
      {postsOfUser &&
        postsOfUser?.map((post, index) => {
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
      </div>}
    </div>
  )
}

export default Profile
