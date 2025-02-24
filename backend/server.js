const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const userRoutes = require('./routes/userRoutes.js');
const productRoute = require('./routes/productRoutes.js');
const cartRoute = require('./routes/cartRoutes.js');
const checkoutRoutes = require('./routes/checkoutRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const subscribeRoutes = require('./routes/subscribeRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const productAdminRoutes = require('./routes/productAdminRoutes.js');
const orderAdminRoutes = require('./routes/orderAdminRoutes.js');

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
app.use("/api/cart" , cartRoute)
app.use("/api/checkout" , checkoutRoutes)
app.use("/api/orders" , orderRoutes);
app.use("/api/upload" , uploadRoutes);
app.use("/api/subscribe" , subscribeRoutes);



//admin routes
app.use("/api/admin/users" , adminRoutes);
app.use("/api/admin/products" , productAdminRoutes);
app.use("/api/admin/orders" , orderAdminRoutes);


app.listen(PORT , () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
    
})