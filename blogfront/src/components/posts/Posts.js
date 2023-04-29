import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../post/Post'
import { UseGlobalContext } from '../context/Context'

const Posts = () => {
  const {getTotalPost} = UseGlobalContext();
  useEffect(()=>{
    getTotalPost();
  },[])
  return (
    <div className='posts'>
      <Post/>
    </div>
  )
}

export default Posts
