const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

//@route GET /api/admin/products
//@desc Get all products
//@access Private/Admin
router.get('/' , protect , admin , async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log('Error in fetching products : ', error);
        res.status(500).json({message : 'Server Error'});
    }
});

module.exports = router;