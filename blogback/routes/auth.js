const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Register
router.post("/register", async(req,res) => {
    
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password,salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hashedPass,
        })
        const user = await newUser.save();
        res.status(200).json(user);
        
    } catch (error) {
        res.status(500).json(error)
    }
})

//Login
router.post("/login",async(req,res) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if(user){
            const validate = await bcrypt.compare(req.body.password,user.password);
            if(validate){
                const {password,...others} =user._doc;
                res.status(200).json(others);
            }else{
                res.status(404).json({result:"wrong password!"})
            }
        }else{
            res.status(404).json({result:"This username doesn't exit."})
        }        
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;