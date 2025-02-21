const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const productRoute = require('./routes/productRoutes.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

dotenv.config();

const PORT = process.env.PORT || 3000;

//connect db
connectDB();


app.get("/" , (req,res)=>{
    res.send("Welcome to Rabbit")
});

//API Routes
app.use("/api/users" , userRoutes);
app.use("/api/products" , productRoute)


app.listen(PORT , () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
    
})