const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

//@route POST /api/checkout
//@desc Create a new checkout session
//@access Private
router.post("/", protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  
    if (!checkoutItems || checkoutItems.length === 0) {
      return res.status(400).json({ message: "No items in the checkout." });
    }
  
    try {
      // Find an existing checkout for the user where it's not finalized
      let checkout = await Checkout.findOne({ user: req.user._id, isFinalized: false });
  
      if (checkout) {
        // Update the existing checkout instead of creating a new one
        checkout.checkoutItems = checkoutItems;
        checkout.shippingAddress = shippingAddress;
        checkout.paymentMethod = paymentMethod;
        checkout.totalPrice = totalPrice;
        checkout.paymentStatus = "pending";
        checkout.isPaid = false;
  
        await checkout.save();
        return res.status(200).json(checkout);
      } else {
        // Create a new checkout if none exists
        checkout = await Checkout.create({
          user: req.user._id,
          checkoutItems,
          shippingAddress,
          paymentMethod,
          totalPrice,
          paymentStatus: "pending",
          isPaid: false,
          isFinalized: false
        });
  
        return res.status(201).json(checkout);
      }
    } catch (error) {
      console.log("Error in Checkout creation: ", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

//@route PUT /api/checkout/:id/pay
//@desc update checkout to mark as paid afer succesfull payment
//@access Private

router.put("/:id/pay", protect, async (req, res) => {
   const {paymentStatus , paymentDetails} = req.body;
//    console.log(req.params , req.body);
   

   try {
    const checkout = await Checkout.findById(req.params.id);

    if(!checkout){
        return res.status(404).json({message : "Checkout not found."});
    }

    if(paymentStatus === "paid"){
        checkout.paymentStatus = paymentStatus;
        checkout.isPaid = true;
        checkout.paidAt = Date.now();
        checkout.paymentDetails = paymentDetails;

        await checkout.save();
        res.status(200).json(checkout);
    }
    else{
        return res.status(400).json({message : "Invalid Payment Status."});
    }

   } catch (error) {
        console.log("Error in Checkout payment : ", error);
        res.status(500).json({ message: "Server Error" });
   }

});


//@route POST /api/checkout/:id/finalize
//@desc Finalize the checkout and conver it to order after payment confirmation
//@access Private

router.post("/:id/finalize", protect, async (req, res) => {
    try {
        const checkout = await Checkout.findById(req.params.id);
        // console.log("I am in finalize : ", checkout);
        
        if(!checkout){
            return res.status(404).json({message : "Checkout not found."});
        }

        if(checkout.isPaid && !checkout.isFinalized){
            // Create final order
            const finalOrder = await Order.create({
                user : checkout.user,
                orderItems : checkout.checkoutItems,
                shippingAddress : checkout.shippingAddress,
                paymentMethod : checkout.paymentMethod,
                totalPrice : checkout.totalPrice,
                isPaid : checkout.isPaid,
                paidAt : checkout.paidAt,
                isDelivered : false,
                paymentStatus : "paid",
                paymentDetails : checkout.paymentDetails
            });

            checkout.isFinalized = true;
            checkout.finalizeAt = Date.now();

            // console.log("Final order is  : " , finalOrder);
            

            await checkout.save();

            //delete cart associated with the user
            await Cart.findOneAndDelete({user : checkout.user});

            res.status(200).json(finalOrder);
        }

        else if(checkout.isFinalized){
            return res.status(400).json({message : "Checkout is already finalized."});
        }
        else{
            return res.status(400).json({message : "Checkout is not paid."});
        }

    } catch (error) {
        console.log("Error in Checkout finalization : ", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;