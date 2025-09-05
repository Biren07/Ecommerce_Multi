🛒 Ecommerce Multi_Vendor (Backend)
📌 Overview

This is the backend service for the Ecommerce Multi-Vendor application.
It provides APIs for authentication, user management, product management, role-based access control, and more.
The backend is built with Node.js, Express, and MongoDB.

📂 Project Structure
backend/
│── node_modules/
│── src/
│ ├── config/ # Configuration files
│ ├── constants/ # Global constants (roles, prompts, etc.)
│ ├── controllers/ # Route controllers (auth, product, user)
│ ├── middlewares/ # Custom middlewares (auth, logger, RBAC)
│ ├── models/ # Mongoose models (User, Product, etc.)
│ ├── routes/ # Express routes (auth, user, product)
│ ├── services/ # Business logic (auth, product, user)
│ ├── utils/ # Utility functions (email, file upload)
│ └── index.js # App entry point

🚀 Features

-User Authentication (JWT-based)
-Role-Based Access Control (Admin, Merchant, User)
-Product Management (CRUD for merchants)
-User Management (CRUD for admins)
-File Upload Support (product images, profile pictures)
-Validation & Error Handling
-Logging Middleware

⚙️ Tech Stack

->Node.js + Express.js (API framework)
->MongoDB + Mongoose (Database + ODM)
->JWT (Authentication)
->Multer / File utils (File uploads)

📦 Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/Ecommerce-Multi_Vendor.git
cd Ecommerce-Multi_Vendor/backend

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file inside backend/:

PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

4️⃣ Run the server
npm start

Server will run on 👉 http://localhost:2000

🔑 API Endpoints
#
Auth Routes

POST /api/auth/register → Register user
POST /api/auth/login → Login & get JWT

#User Routes
POST /api/users (Admin only) → Create new user
GET /api/users (Admin only) → Get all users

#Product Routes

POST /api/products (Merchant only) → Create product
GET /api/products → Get all products
GET /api/products/:id → Get product by ID
PUT /api/products/:id (Merchant/Admin) → Update product
DELETE /api/products/:id (Merchant/Admin) → Delete product

🔐 Role-Based Access

USER → Can browse products
MERCHANT → Can create and manage their own products
ADMIN → Full access (manage users, products, roles)

🧪 Testing with Postman

Register/Login to get a token.
Add Authorization: Bearer <your_token> in Postman.
Use JSON body or form-data depending on API.

✨ Future Improvements 

Payment gateway integration
Order management
Review & rating system
Admin dashboard
