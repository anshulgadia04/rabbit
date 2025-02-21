const jwt = require('jsonwebtoken')
const User = require('../models/User');


//Middleware to protect routes
const protect = async(req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            req.user = await User.findById(decoded.user.id).select("-password") //exclude password
            // console.log("I am in Protect and the req.use is  : " , req.user);
            
            next();
        } catch (error) {
            console.log("Token Verification Failed : " , error);
            res.status(401).json({message : "Not Authorized, Token failed"})
            
        }
    }

    else{
        res.status(401).json({message  : "Not Authorized , No token provided"})
    }
};


// Middleware to check the user is an admin
const admin = (req , res , next) => {
    // console.log("I am in Admin and the req.use is  : " , req.user);

    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({message : "Not Authorizes as an Admin"});
    }
};



module.exports = {protect , admin};