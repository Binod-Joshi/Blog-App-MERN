const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

//update
router.put('/:id',async(req,res) => {
    console.log(req.body._id,req.params.id)
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password,salt);
        }
        try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },
        {new:true}
        );
        res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
})
//delete
router.delete('/:id',async(req,res) => {
        try {
            const user = await User.findById(req.params.id);
            console.log(user)
            try {
                await Post.deleteMany({username:user.username});
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json({resullt:"user has been sucessfully deleted."});
                } catch (error) {
                    res.status(500).json("error");
                }
        } catch (error) {
            res.status(404).json("user not found")
        }
})

//get user
router.get('/:id',async(req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password,...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports =router;