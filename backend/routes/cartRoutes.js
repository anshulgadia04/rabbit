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
};


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



//@route PUT /api/cart
//@update the quantity of a product in the cart
//@access Public
router.put("/" , async (req,res) => {
    const {productId , quantity ,size , color , guestId , userId} = req.body;
    try {
        let cart = await getCart(userId , guestId);

        if(cart){
            const productIndex = cart.products.findIndex((p) => 
            p.productId.toString() === productId &&
            p.size === size && p.color === color
            );

            if(productIndex > -1){
                //update the quantity
                if(quantity > 1){
                    cart.products[productIndex].quantity = quantity;
                }
                else{
                    //remove the product from the cart
                    cart.products = cart.products.filter((p) => 
                    p.productId.toString() !== productId ||
                    p.size !== size || p.color !== color
                    );
                }   

            }
            else{
                return res.status(404).json({message : "Product not found in cart."});
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
            return res.status(404).json({message : "Cart not found."});
        }

    } catch (error) {
        console.log("Error in Cart else part : ",error);
        res.status(500).json({message : "Server Error"});
        
    }
});

//@route DELETE /api/cart
//@desc Delete a product from the cart
//@access Public
router.delete("/" , async (req,res) => {
    const {productId , size , color , guestId , userId} = req.body;
    try {
        let cart = await getCart(userId , guestId);

        if(cart){
            const productIndex = cart.products.findIndex((p) => 
            p.productId.toString() === productId &&
            p.size === size && p.color === color
            );

            if(productIndex > -1){
                //remove the product from the cart
               cart.products.splice(productIndex , 1);

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
                return res.status(404).json({message : "Product not found in cart."});
            }
        }
        else{
            return res.status(404).json({message : "Cart not found."});
        }

    } catch (error) {
        console.log("Error in Cart else part : ",error);
        res.status(500).json({message : "Server Error"});
        
    }
});


//@route GET /api/cart
//@desc Get the cart of a user or guest
//@access Public
router.get("/" , async (req,res) => {
    const {guestId , userId} = req.query;
    try {
        let cart = await getCart(userId , guestId);

        if(cart){
            return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({message : "Cart not found."});
        }

    } catch (error) {
        console.log("Error in Cart else part : ",error);
        res.status(500).json({message : "Server Error"});
        
    }
}); 

//@route POST /api/cart/merge
//@desc Merge the guest cart with the user cart
//@access Private
router.post("/merge" , protect , async (req,res) => {
    const {guestId} = req.body;
    try {
        const userCart = await Cart.findOne({user : req.user._id});
        const guestCart = await Cart.findOne({guestId});

       if(guestCart)
        {
            if(guestCart.products.length === 0){
                return res.status(400).json({message : "Guest cart is empty."});
            }
            if(userCart)
            {
                guestCart.products.forEach((guestItem) => {
                    const productIndex = userCart.products.findIndex((item) => item.productId.toString() === guestItem.productId.toString() && item.size === guestItem.size && item.color === guestItem.color);

                    //if the product is already exists update the quantity
                    if(productIndex > -1){
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }
                    else{
                        //not present add in the cart
                        userCart.products.push(guestItem);
                    }   
                });

                //calculate total price
                let total = 0;
                userCart.products.forEach(item => {
                    total += item.price * item.quantity;
                });

                await userCart.save();
                
                //remove the guest cart
                try {
                    await Cart.findByIdAndDelete({guestId});
                } catch (error) {
                    console.error("Error in deleting guest cart : ",error);
                }

                res.status(200).json(userCart);
            }

            else
            {
                //if the user cart does not exist
                guestCart.user = req.user._id;
                guestCart.guestId = undefined; 
                await guestCart.save();
                res.status(200).json(guestCart);
            }
        }
        else{
            if(userCart)
            {
                return res.status(200).json(userCart);
            }
            else{
                return res.status(404).json({message : "Cart not found."});
            }
        }


    } catch (error) {
        console.log("Error in Cart else part : ",error);
        res.status(500).json({message : "Server Error"});
        
    }
});


module.exports = router;