# VRV Security Backend

This is the backend for the VRV Security, built using MongoDB, Express.js and Node.js. It handles user authentication, authorization, product management, and order processing.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
  - [Auth Routes](#auth-routes)
  - [User Routes](#user-routes)
  - [Product Routes](#product-routes)
  - [Order Routes](#order-routes)
- [Middleware](#middleware)
- [Technologies Used](#technologies-used)

## Installation

1. Clone the repository:

``` bash
git clone https://github.com/RehanShaikh007/VRV_Backend.git
```

2. Navigate to the project directory:

``` bash
cd backend
```

3. Install the dependencies:

``` bash
npm install bcryptjs cookie-parser dotenv express jsonwebtoken mongoose nodemon
```
5. Start the server:

``` bash
npm start
```
## Environment Variables
- Create a .env file in the root directory and add the following:
``` bash
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```
## API Endpoints

### Auth Routes
These endpoints handle user authentication (signup, signin).

1. Sign Up User
   - URL: /api/auth/signup
   - Method: POST
   - Request Body:
   ``` bash
   {
   "username": "john_doe",
   "email": "john@example.com",
   "password": "yourpassword",
   "role": "user"
   }
   ```
   - Response:
     - Success: 200 OK
    ``` bash
    "User created Successfully!"
    ```
2. Sign In User
   - URL: /api/auth/signin
   - Method: POST
   - Request Body:
   ``` bash
   {
   "email": "john@example.com",
   "password": "yourpassword",
   }
   ```
   - Response:
     - Success: 200 OK
    ``` bash
    {
     "_id": "yourID",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "date,time",
    "updatedAt": "date,time"
    }
    ```
### User Routes

1. Get User
   - URL: /api/user/:id
   - Method: GET
   - Response:
     - Success: 200 OK
    ``` bash
    {
    "_id": "yourID",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "date,time",
    "updatedAt": "date,time"
    }
    ```

2. Update User
   - URL: /api/user/:id
   - Method: PUT
   - Request Body:
   ``` bash
   {
   "username": "john_doe",
   "email": "john@example.com",
   "password": "yourpassword",
   }
   ```
   - Response:
     - Success: 200 OK
    ``` bash
    {
     "_id": "yourID",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "date,time",
    "updatedAt": "date,time"
    }
    ```
### Product Routes

1. List All Products
   - URL: /api/products
   - Method: GET
   - Description: Fetches a list of all available products.
   - Response:
     - Success: 200 OK
    ``` bash
    [
      {
      "_id": "productID",
      "name": "product_name",
      "description": "this is product",
      "price": 500,
      "category": "Category1",
      "stock": 10,
      "imageUrl": "https://....com",
      "createdAt": "Date,Time"
      },
      {
       ...
      },
    ]
    ```

2. View SIngle Product
   - URL: /api/products/:id
   - Method: GET
   - Description: Fetches a single product by its ID.
   - Response:
     - Success: 200 OK
    ``` bash
      {
      "_id": "productID",
      "name": "product_name",
      "description": "this is product",
      "price": 500,
      "category": "Category1",
      "stock": 10,
      "imageUrl": "https://....com",
      "createdAt": "Date,Time"
      }
    ```

3. Add New Product (Admin Only)
   - URL: /api/products
   - Method: POST
   - Description: Adds a new product to the catalog. Only accessible by Admins.
   - Request Body:
   ``` bash
      {
      "name": "product_name",
      "description": "this is product",
      "price": 500,
      "category": "Category1",
      "stock": 10,
      "imageUrl": "https://....com",
      }
    ```
   - Response:
     - Success: 201 OK
    ``` bash
    {
      "message": "Product created Successfully!",
      "product": {
         "_id": "productID",
         "name": "product_name",
         "description": "this is product",
         "price": 500,
         "category": "Category1",
         "stock": 10,
         "imageUrl": "https://....com",
         "createdAt": "Date,Time"
      }
    }
    ```
    
4. Update Product (Admin Only)
   - URL: /api/products/:id
   - Method: PUT
   - Description: Updates a product's details. Only accessible by admins.
   - Request Body:
   ``` bash
      {
      "name": "product_name",
      "description": "this is product",
      "price": 500,
      "category": "Category1",
      "stock": 10,
      "imageUrl": "https://....com",
      }
    ```
   - Response:
     - Success: 200 OK
    ``` bash
    {
      "message": "Product Updated Successfully!",
      "product": {
         "_id": "productID",
         "name": "product_name",
         "description": "this is product",
         "price": 500,
         "category": "Category1",
         "stock": 10,
         "imageUrl": "https://....com",
         "createdAt": "Date,Time"
      }
    }
    ```

5. Delete Product (Admin Only)
   - URL: /api/products/:id
   - Method: DELETE
   - Description: Deletes a product from the catalog. Only accessible by admins.
   - Response:
     - Success: 200 OK
    ``` bash
    {
      "message": "Product Deleted Successfully!",
      "product": {
         "name": "product_name"
      },
    }
    ```
### Order Routes

1. Place Order 
   - URL: /api/orders
   - Method: POST
   - Description: Places a new order. Accessible by users.
   - Request Body:
   ``` bash
   {
   "userId": "userId",
   "products": [
    {
      "productId": "productId",
      "quantity": 2
    }
   ],
   "shippingAddress": "123 Main St",
   "paymentMethod": "Credit Card"
   }
    ```
   - Response:
     - Success: 201 Created
    ``` bash
    {
      "message": "Order Placed Successfully!",
    "newOrder":{
      "userId": "userId",
      "products":
     [
      {
      "productId": "productId",
      "quantity": 2
      }
     ],
    "totalPrice": 1000,
    "shippingAddress": "123 Main St",
    "paymentMethod": "Credit Card",
     "orderStatus": "Pending",
      "_id": "orderId",
      "createdAt": "Date,Time",
    }
    }
    ```
    
2. View Order History 
   - URL: /api/orders
   - Method: GET
   - Description: Fetches the order history for a user. Accessible by both users and admins.
   - Response:
     - Success: 201 Created
    ``` bash
    [
   {
    "_id": "orderId",
    "userId": "userId",
    "products": [...],
    "totalPrice": 200,
    "shippingAddress": "yourAddress",
    "paymentMethod": "Cash on Delivery",
    "orderStatus": "pending",
    "createdAt": "Date,Time"
   },
    {
   ...
    },
   ]
    ```
3. View Single Order 
   - URL: /api/orders/:id
   - Method: GET
   - Description: Fetches a single order by its ID.
   - Response:
     - Success: 201 Created
    ``` bash
   {
    "_id": "orderId",
    "userId": "userId",
    "products": [...],
    "totalPrice": 200,
    "shippingAddress": "yourAddress",
    "paymentMethod": "Cash on Delivery",
    "orderStatus": "pending",
    "createdAt": "Date,Time"
   }
    ```
    
4. Cancel Order 
   - URL: /api/orders/:id
   - Method: DELETE
   - Description: Cancels an order. Accessible by users (for their orders) and admins.
   - Response:
     - Success: 201 Created
    ``` bash
   {
    "message": "Order Cancelled Successfully!",
    "order": {
        "_id": "orderId",
        "userId": "yourId",
        "products": [...],
        "totalPrice": 1600,
        "shippingAddress": "yourAddress",
        "paymentMethod": "Cash on Delivery",
        "createdAt": "Date,Time"
    }
   }
    ```

## Middleware
- **Authentication Middleware** (verifyToken): Ensures the user is authenticated.
- **Admin Middleware** (verifyAdmin): Grants access to admin-only routes.

## Technologies Used
- **Node.js:** JavaScript runtime for server-side logic.
- **Express.js:** Web framework for building the backend.
- **MongoDB:** NoSQL database for storing user, product, and order data.
- **Mongoose:** ODM for MongoDB.
- **JWT (JSON Web Tokens):** Used for secure authentication.
- **bcryptjs:** For hashing user passwords.

