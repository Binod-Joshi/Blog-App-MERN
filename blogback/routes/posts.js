const router = require("express").Router();
const Post = require("../models/Post");

//create post
router.post("/", async (req, res) => {
  let newPost = new Post(req.body);
  try {
    newPost = await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
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
    
    const post = await Post.findById(req.params.id);
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
  try {
    let posts;
    if (username) {
      posts = await Post.find(username); //mean {username:username} but here both are same so.
    } else if (catName) {
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

module.exports = router;
