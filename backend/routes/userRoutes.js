const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// @route /api/users/register
// @desc Register a new User
// @access Public
router.post("/register" , async (req , res) => {
    const {name , email , password} = req.body;
    try {
        // registration logic
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message : "User Already Exists"});

        user = new User({name , email , password});
        await user.save();

        // create a jwt payload
        const payload = {user : {id : user._id , role : user.role}};

        // sign and return the token along with user data
        jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "40h"},(error , token) => {
            if(error) throw error;

            //send the token in response
            res.status(201).json({
                user : {
                    _id : user._id,
                    name : user.name,
                    email : user.email,
                    role : user.role
                },
                token
            })
        });

    } catch (error) {
        console.log("Error in userRoute.js in /register router : ",error);
        res.status(500).send("Server Error");        
    }
});


//@route POST "/api/users/login"
//@desc Authenticate User
//@access Login

router.post("/login" , async (req,res) => {
    const {email , password} = req.body;

    try {
        let user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "Invalid Credentials"});

        const isMatch = await user.matchPassword(password);
        if(!isMatch) return res.status(400).json({message : "Invalid Credentials"});

         // create a jwt payload
         const payload = {user : {id : user._id , role : user.role}};

         // sign and return the token along with user data
         jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "40h"},(error , token) => {
             if(error) throw error;
 
             //send the token in response
             res.json({
                 user : {
                     _id : user._id,
                     name : user.name,
                     email : user.email,
                     role : user.role
                 },
                 token
             })
         });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error");
        
    }
});





module.exports = router;


