const express = require('express');
const Subscriber = require('../models/Subscriber');
const router = express.Router();


//@route POST /api/subscribe
//@desc Subscribe to newsletter
//@access Public

router.post("/" , async (req,res) => {
    const {email} = req.body;

    if(!email) {
        return res.status(400).json({message : "Email is required"});
    }

    try {
        let subscriber = await Subscriber.findOne({email});
        if(subscriber) {
            return res.status(400).json({message : "You are already subscribed to our newsletter"});
        }

        subscriber = new Subscriber({email});
        await subscriber.save();

        res.status(200).json({message : "Successfully subscribed to our newsletter"});

    } catch (error) {
        console.log("Error in subscribing : ", error);
        res.status(500).json({message : "Server Error"});
    }
});


module.exports = router;