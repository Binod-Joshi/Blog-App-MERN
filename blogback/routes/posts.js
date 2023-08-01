const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

//create post
router.post("/", async (req, res) => {
  let newPost = new Post(req.body);
  try {
    newPost = await newPost.save();
    // console.log(newPost);
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.id) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can update your post only");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete post
router.delete("/:id", async (req, res) => {
  try {
     await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("your post has been successfully deleted..");
  } catch (error) {
    res.status(500).json(error);
  }
});
//get post
router.get("/:id", async (req, res) => {
  try {
    
    const post = await Post.findById(req.params.id).populate("comments.postedBy","_id username");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all post of current user
router.get("/user/:id",async(req,res) => {
  try {
    const posts = await Post.find({userId:req.params.id});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});  

//get allposts
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat; // here cat mean category.
  console.log(username,catName);
  try {
    let posts;
    if (username !== undefined && username !== null && username !== '') {
      posts = await Post.find({ username });
    }else if ( catName !== undefined && catName !== null && catName !== '') {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// for add likes in the post 
router.post("/likes",async(req,res) => {
  const {userId,postId} = req.body;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }

    if (post.likes.includes(userId)) {
      return res.status(200).send({ error: 'User already liked post' });
    }

    const updatedPost = await Post.findByIdAndUpdate(postId,{
      $push:{likes:userId}
    },
    { new: true }
    );
    res.status(200).json(updatedPost)
  }
   catch (error) {
    res.status(401).send(error)
  }
})


//for unlike in the post
router.post("/unlikes",async(req,res) => {
  const {userId,postId} = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ error: 'Post not found' });
    }
    if (!post.likes.includes(userId)) {
      return res.status(200).send({ error: 'User has not liked the post' });
    }
    const updatedPost = await Post.findByIdAndUpdate(postId,{
      $pull:{likes:userId}
    },
    { new:true }
    )
    res.status(200).json(updatedPost);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
})

// to add comment
router.post("/comments",async(req,res) => {
  const {userId,postId,text} = req.body;
  try {
    const comment ={
      text:text,
      postedBy:userId,
    }
    let updatedPost = await Post.findByIdAndUpdate(postId,{
      $push:{
        comments: {
          $each: [comment],
          $position: 0
        }
      },
    },
    { new:true }
    ).populate("comments.postedBy", "_id username");
    res.status(200).send(updatedPost);
  } catch (error) {
    console.status(400).log(error)
  }
})

// to delete comment
router.post("/deleteComment",async(req,res) => {
  const {postId,userId,commentId} = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(postId,{
      $pull:{
        comments:{ _id: commentId } 
      },
    },
    { new:true }
    ).populate("comments.postedBy", "_id username");
    res.status(200).send(updatedPost);
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;
