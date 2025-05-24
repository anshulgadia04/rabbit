# 🛍️ Rabbit E-Commerce Platform

A full-stack e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js) offering a seamless shopping experience for clothing and accessories.

## ✨ Features

### Customer Features
- 🔐 User authentication (register/login)
- 🏪 Browse product collections by gender
- 🔍 Search and filter products
- 🛒 Shopping cart management
- 💳 Secure checkout process
- 📦 Order tracking and history
- 👤 User profile management

### Admin Features
- 📊 Dashboard for business overview
- 📝 Product management (CRUD operations)
- 📦 Order management
- 👥 User management
- 📈 Inventory tracking

## 🏗️ Tech Stack

### Frontend
- React
- Redux for state management
- Vite as build tool
- Modern responsive UI

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- RESTful API architecture

## 📁 Project Structure

```
├── frontend/                # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
│
└── backend/               # Node.js backend server
    ├── config/           # Database configuration
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/       # Custom middleware
    └── data/            # Seed data
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd rabbit
\`\`\`

2. Install backend dependencies:
\`\`\`bash
cd backend
npm install
\`\`\`

3. Install frontend dependencies:
\`\`\`bash
cd frontend
npm install
\`\`\`

4. Set up environment variables:
   - Create \`.env\` in backend directory
   - Create \`.env\` in frontend directory

### Running the Application

1. Start the backend server:
\`\`\`bash
cd backend
npm run dev
\`\`\`

2. Start the frontend development server:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

## 🔐 Environment Variables

### Backend
\`\`\`
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
\`\`\`

### Frontend
\`\`\`
VITE_API_URL=http://localhost:5000
\`\`\`

## 📝 API Endpoints

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get single product
- POST `/api/admin/products` - Create product (Admin)
- PUT `/api/admin/products/:id` - Update product (Admin)
- DELETE `/api/admin/products/:id` - Delete product (Admin)

### Users
- POST `/api/users/register` - Register user
- POST `/api/users/login` - Login user
- GET `/api/users/profile` - Get user profile
- PUT `/api/users/profile` - Update user profile

### Orders
- POST `/api/orders` - Create order
- GET `/api/orders/myorders` - Get user orders
- GET `/api/admin/orders` - Get all orders (Admin)

### Cart
- GET `/api/cart` - Get cart items
- POST `/api/cart` - Add to cart
- PUT `/api/cart/:id` - Update cart item
- DELETE `/api/cart/:id` - Remove from cart

## 🤝 Contributing

1. Fork the Project
2. Create your Feature Branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your Changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the Branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Thanks to all contributors who have helped shape Rabbit
- Built with modern web technologies and best practices
- Focused on providing a seamless shopping experience
