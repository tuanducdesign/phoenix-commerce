# Phoenix Store

> eCommerce platform built with the MERN stack.

![MDS](https://github.com/RahmanC/phoenix-commerce/blob/main/uploads/phoenix.PNG)

## Features

- Product reviews and ratings
- Product backorder
- Product categories
- Product filter and price filter
- Product search
- Product wishlist and cart
- Product pagination
- User list pagination
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout with PayPal Integration
- Database seeder (products & users)

## Usage

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'hdjge1'
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
