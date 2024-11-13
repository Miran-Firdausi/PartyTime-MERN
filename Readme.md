Party Time 🎉

Party Time is an e-commerce website specializing in bulk product ordering with tracking features to find and order from the nearest stores. The platform includes intelligent pricing calculations based on product expiry dates to minimize resource waste, helping both customers and businesses reduce costs and prevent wastage.

Table of Contents
Demo
Features
Tech Stack
Installation
Usage
API Endpoints
Contributing
License
Demo
Link to live demo or screenshots (Add this if available).

Features
Bulk Product Ordering: Order products in bulk with ease.
Proximity-Based Tracking: Locate and track orders from the nearest stores for faster deliveries.
Dynamic Pricing: Product prices are adjusted based on expiry dates, reducing waste and saving costs.
User Dashboard: Track order history, manage profiles, and view purchase insights.
Admin Panel: Manage inventory, adjust pricing, and handle order tracking.
Tech Stack
Frontend: Next.js
Backend: Express.js, Node.js
Database: MongoDB
Installation
Prerequisites
Node.js and npm installed
MongoDB connection URI
Steps
Clone the Repository

git clone https://github.com/your-username/Party-Time.git
cd Party-Time
Install Dependencies

npm install
Environment Setup Create a .env file in the root directory and add the following variables:

MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=5000
Start the Server

npm run dev
The app will start on http://localhost:5000.

Usage
Running in Development
npm run dev
Building for Production
npm run build
npm start
Open http://localhost:5000 to view the app in your browser.

API Endpoints
Products
GET /api/products: Retrieve all products
GET /api/products/:id: Get a specific product by ID
POST /api/products: Add a new product (Admin only)
PUT /api/products/:id: Update product details (Admin only)
DELETE /api/products/:id: Delete a product (Admin only)
Orders
POST /api/orders: Place a new order
GET /api/orders: Retrieve all orders for a user
GET /api/orders/:id: Get details of a specific order
Pricing
GET /api/pricing: Calculate and retrieve prices based on expiry dates
POST /api/pricing/update: Adjust pricing model (Admin only)
Contributing
We welcome contributions! Please fork this repository, make your changes, and submit a pull request for review.



