# Micro Marketplace Frontend

React frontend for the Micro Marketplace application.
Allows users to browse products, register/login, upload products, favorite items, and manage listings.

---

# Live Demo

Frontend URL:

```
https://your-frontend-url.onrender.com
```

Backend API:

```
https://your-backend-url.onrender.com
```

---

# Tech Stack

* React.js (Vite)
* React Router DOM
* Axios
* Framer Motion (animations)
* Context API (Auth & Favorites)
* Cloudinary image support
* Responsive Design

---

# Features

Authentication

* Register
* Login
* Logout
* Persistent login using JWT

Products

* View all products
* View product details
* Add new product
* Edit product
* Delete product

Image Upload

* Drag & Drop upload
* File upload
* OR image URL support
* Preview before upload

Favorites

* Add to favorites
* Remove from favorites
* Favorite badge count

Search & Pagination

* Search by title
* Search by price
* Pagination support

UI/UX

* Fully responsive
* Mobile friendly
* Animations using Framer Motion
* Professional UI design

---

# Folder Structure

```
frontend/
│
├── src/
│
│   ├── api/
│   │   └── axios.js
│
│   ├── components/
│   │   ├── Navbar.jsx
│   │   └── ProductCard.jsx
│
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── FavoritesContext.jsx
│
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   └── Favorites.jsx
│
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
└── package.json
```

---

# Installation (Local Setup)

Clone repository

```
git clone https://github.com/your-username/micro-marketplace.git
```

Go to frontend folder

```
cd frontend
```

Install dependencies

```
npm install
```

Run frontend

```
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

# Backend Connection

Update API base URL:

File:

```
src/api/axios.js
```

Example:

```js
const API = axios.create({

  baseURL: "https://your-backend-url.onrender.com"

});
```

---

# Authentication

JWT token stored in localStorage:

```
localStorage.setItem("token", token)
```

Automatically sent in headers:

```
Authorization: Bearer TOKEN
```

---

# Main Pages

Home

```
/
```

Products

```
/products
```

Product Detail

```
/products/:id
```

Add Product

```
/add-product
```

Edit Product

```
/edit-product/:id
```

Favorites

```
/favorites
```

Login

```
/login
```

Register

```
/register
```

---

# Deployment

Frontend deployed using Render.

Steps used:

* Push frontend to GitHub
* Connect Render to GitHub repo
* Set build command
* Set publish directory

Build Command:

```
npm install && npm run build
```

Publish directory:

```
dist
```

---

# Assignment Requirements Covered

* Authentication
* Product CRUD
* Favorites
* Search & pagination
* Image upload (file + URL)
* Responsive design
* Clean UI
* Animation
* Backend integration

---

# Author

Prince Raj
Full Stack Developer
