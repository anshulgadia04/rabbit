const express = require('express');
const Order = require('../models/Order');
const {protect} = require('../middleware/authMiddleware')

const router = express.Router();

//@route GET /api/orders/my-orders
//@desc Get all orders of a user
//@access Private
router.get("/my-orders" , protect , async (req,res) => {
    try {
        const orders = await Order.find({user : req.user._id}).sort({createdAt : -1}); //
        res.status(200).json(orders);
    } catch (error) {
        console.log("Error in fetching orders : ", error);
        res.status(500).json({message : "Server Error"});
    }
});


//@route GET /api/orders/:id
//@desc Get a specific order by id
//@access Private
router.get("/:id" , protect , async (req,res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user" , "name email");
        
        if(order){
            res.status(200).json(order);
        }
        else{
            return res.status(404).json({message : "Order not found."});
        }

    } catch (error) {
        console.log("Error in fetching order : ", error);
        res.status(500).json({message : "Server Error"});
    }
});

module.exports = router;