const express = require('express');
const Product = require('../models/Product');
const {protect , admin} = require('../middleware/authMiddleware');
const {mongoose} = require('mongoose');



const router = express.Router();

//@route POST /api/products
//@desc create a new product in database
//@access PRIVATE/ADMIN
router.post('/' , protect , admin , async (req,res) => {
    try {
        const {name , description , price , discountPrice , countInStock , category , brand , sizes , colors, collections , material , gender , images , isFeatured , isPublished , tags , dimensions , weight , sku} = req.body;

        // console.log(req.body);
        
        const product = new Product(
            {name, 
            description , 
            price , 
            discountPrice , 
            countInStock , 
            category , 
            brand , 
            sizes , 
            colors, 
            collections ,
            material , 
            gender , 
            images , 
            isFeatured , 
            isPublished , 
            tags , 
            dimensions , 
            weight , 
            sku,
            user : req.user._id //Referece the user who created this product
        }
        );

        const createdProduct = await product.save();
        // console.log("Created Product is : " , createdProduct);
        
        res.status(201).json(createdProduct);

    } catch (error) {
        console.log("Error in Create Product " , error);
        res.status(500).send("Server Error");
    }
});

//@route PUT api/products/:id
//@desc Update an existing product ID
//@access Private/Admin
router.put("/:id" , protect , admin , async (req,res) => {
    try {
        const {name , description , price , discountPrice , countInStock , category , brand , sizes , colors, collections , material , gender , images , isFeatured , isPublished , tags , dimensions , weight , sku} = req.body;

        //find product by ID
        const product = await Product.findById(req.params.id);

        if(product){
            //update the details
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes
            product.colors = colors|| product.colors;
            product.collections = collections || product.collections;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished = isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;


            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }
        else{
            res.status(404).json({message : "Product not found"});
        }
        
    } catch (error) {
        console.log("Server Error in Update Product Route" , error);    
        res.status(500).send("Server Error");
    }
});


//@route DELETE /api/products/:id
//@desc Delete a product by ID
//@access PRIVATE/Admin
router.delete("/:id" , protect , admin , async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);

        if(product){
            await product.deleteOne();
            res.json({message : "Product Removes"});
        }
        else{
            res.json({message : "Product Not Found"});
        }
    } catch (error) {
        console.log("Error in Delete Product " , error);
        res.status(500).send("Server Error");
    }
});

//@route GET /api/products
//@desc Get all the products with optional query filters
//@access Public
router.get("/" , async (req,res) => {
    try {
        const {collection , size , color , gender , minPrice , maxPrice , sortBy , search , category , material , brand , limit} = req.query;

        let query = {};

        //filter logic
        if(collection && collection.toLocaleLowerCase() !== "all"){
            query.collections = collection;
        }

        if(category && category.toLocaleLowerCase() !== "all"){
            query.category = category;
        }

        if(material){
            query.material = {$in : material.split(",")};
        }

        if(brand){
            query.brand = {$in : brand.split(",")};
        }

        if(size){
            query.sizes = {$in : size.split(",")};
        }

        if(color){
            query.colors = {$in : color.split(",")}
        }

        if(gender){
            query.gender = gender;
        }

        if(minPrice || maxPrice){
            query.price = {};
            if(minPrice){
                query.price.$gte = Number(minPrice);
            }
            if(maxPrice){
                query.price.$lte = Number(maxPrice);
            }
        }

        if(search){
            query.$or = [
                {name : {$regex : search , $options : "i"}},
                {description : {$regex : search , $options : "i"}}
            ]
        }

        //sort login Ascending and Descending
        let sort = {};
        if(sort){
            switch(sortBy){
                case "priceAsc" : 
                    sort = {price : 1}
                    break;
                case "priceDesc" :
                    sort = {price : -1};
                    break;
                case "popularity" :
                    sort = {rating : -1};
                    break;
                default :
                    break;
                
            }
        }

        let products = await Product.find(query).sort(sort).limit(Number(limit) || 0);

        res.json(products);

    } catch (error) {
        console.log("Error in Filter Products : " , error);
        res.status(500).send("Server Error");
        
    }
});


//@route GET /api/products/best-seller
//@desc Retrive the products based on the ratings
//@access Public
router.get("/best-seller" , async (req,res) => {
    try {
        const sort = {rating : -1}
        const bestSellers = await Product.find().sort(sort);
        if(bestSellers){
            res.json(bestSellers[0]);
        }
        else{
            res.status(404).json({message : "No Seller Found"})
        }
    } catch (error) {
        console.log("Error in Best Seller" , error);
        res.status(500).send("Internal Server Error")
        
    }    
});



//@route GET /api/products/new-arrivals
//@desc Retrieve latest 8 products by Creation Date
//@access Public
router.get("/new-arrivals" , async (req,res) => {
    try {
        //fetch latest 8 products from DB
        const newArrivals = await Product.find().sort({createdAt : -1}).limit(8);
        if(newArrivals){
            res.json(newArrivals);
        }
        else{
            res.json({message : "No new arrivals available"});
        }
    } catch (error) {
        console.log("Error in new arrivals : ", error);
        res.status(500).send("Internal Server Error");
        
    }
})


//@route GET /api/products/:id
//@desc Get a Single Product by its Id
//access Public
router.get("/:id" , async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(product){
            res.status(201).json(product);
        }
        else{
            res.status(404).json({message : "Product Not Found"})
        }
    } catch (error) {
        console.log("Error in finding a Single Product : " , error);
        res.status(500).send("Internal Server Error");
        
    }
});


//@route GET /api/products/similar/:id
//@desc Get similar products based on cureent product gender and category
//@access Public
router.get("/similar/:id" , async (req,res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message : "Product not found."});
        }

        const similarProducts = await Product.find({
            _id : {$ne : new mongoose.Types.ObjectId(id)} , //exclude the current product id
            gender : product.gender,
            category : product.category
        }).limit(4);

        res.json(similarProducts);

    } catch (error) {
        console.log("Error in Similar Products : " , error);
        res.status(500).send("Server Error");
        
    }
});




module.exports = router;