const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {protect} = require('../middleware/authMiddleware')


const router = express.Router();


//helper function to get a Cart by userId and GuestId
const getCart = async(userId , guestId) => {
    if(userId){
        return await Cart.findOne({user : userId});
    }
    else if(guestId){
        return await Cart.findOne({guestId});
    }
    else{
        return null;
    }    
}


//@route POST /api/cart
//@desc Add a product to the cart for a guest or logged in user
//@access Public
router.post("/" , async (req,res) => {
    const {productId , quantity ,size , color , guestId , userId} = req.body;
    try {
        const product =  await Product.findById(productId);

        if(!product) return res.status(404).json({message : "Product not found."})

        //determine if the user is logged in or guest
        let cart = await getCart(userId , guestId);

        // if the cart exists update it
        if(cart){
            const productIndex = cart.products.findIndex((p) => 
            p.productId.toString() === productId &&
            p.size === size && p.color === color
            );

            if(productIndex > -1){
                //if the product is already exists update the quantity
                cart.products[productIndex].quantity += quantity;
            }
            else{
                //not present add in the cart
                cart.products.push({
                    productId,
                    name : product.name,
                    image : product.images[0].url,
                    price : product.price,
                    size,
                    color,
                    quantity
                });
            }

            //calculate total price
            let total = 0;
            cart.products.forEach(item => {
                total += item.price * item.quantity;
            });
            cart.totalPrice = total;
            
            

            await cart.save();
            return res.status(200).json(cart);

        }

        else{
            // create a new cart for the guest or user
            const newCart = await Cart.create({
                user : userId ? userId : undefined,
                guestId : guestId ? guestId : "guest_" + new Date().getTime(),
                products : [
                  {  productId,
                    name : product.name,
                    image: product.images?.[0]?.url || "", 
                    price: product.price,
                    size,
                    color,
                    quantity,
                },
                ],
                totalPrice : product.price * quantity,
            });

            return res.status(201).json(newCart);
        }

    } catch (error) {
        console.log("Error in Cart else part : ",error);
        res.status(500).json({message : "Server Error"});
        
    }
});


module.exports = router;