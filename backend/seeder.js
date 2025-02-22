const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');
const Cart = require('./models/Cart');
const products = require('./data/products');

dotenv.config();

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI);


//function to seed the data

const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        //create a default admin
        const createdUser = await User.create({
            name : "Admin User",
            email : "admin@example.com",
            password : "123456",
            role : "admin"
        });

        //assign a default userID to each product
        const userID = createdUser._id;
        const sampleProducts = products.map((product) => {
            return {...product , user : userID}
        });


        //inser all the products into the DB
        await Product.insertMany(sampleProducts);

        console.log("Product Data Seeded Succussfully");
        process.exit();
        

    } catch (error) {
        console.log("Error in seedData : " , error);
        process.exit(1);
    }
};

seedData();