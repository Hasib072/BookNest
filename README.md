<p align="center">
  <img src="./frontend/src/assets/BookNestLogoW.png" alt="BookNest Logo" width="200" />
</p>

# BookNest

BookNest is a comprehensive book review platform where users can browse books, read and write reviews, and rate their favorite reads. Built with a React frontend and a Node.js backend using Express and MongoDB, BookNest offers a seamless experience for book enthusiasts to connect and share their literary passions.

## 🔗 Links

- **Live Demo:** [ha51b-booknest.netlify.app](ha51b-booknest.netlify.app)
- **Documentation:** [https://booknest-docs.com](https://booknest-docs.com)
- **GitHub Repository:** [https://github.com/Hasib072/BookNest](https://github.com/Hasib072/BookNest)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally on your machine.

### 📋 Prerequisites

- **Node.js:** Ensure you have Node.js installed. You can download it [here](https://nodejs.org/).
- **npm:** Package manager to install dependencies.
- **MongoDB:** Set up a MongoDB database. You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud-based solution.

### 🛠️ Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/booknest.git
cd booknest
npm install
```
#### 2. Create a ```.env``` file in the root directory and add the following variables:

```bash
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://hasibrahaman72:ljzeFj1AZN0wgG9U@cluster0.vjslh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=booknest_key

EMAIL_USER=cyclopsmailing@gmail.com
EMAIL_PASSWORD=`gmev bgvp tbno orsb`

CLOUDINARY_CLOUD_NAME=dljbqj5gc
CLOUDINARY_API_KEY=846629185997155
CLOUDINARY_API_SECRET=2X6QcO4MhyvuSSksW1e7--9vQrc


# FRONTEND_ORIGIN=https://ha51b-booknest.netlify.app
FRONTEND_ORIGIN=http://localhost:5173

# Frontend Environment Variables
# VITE_BACKEND_BASE_URI=https://booknest-yhqh.onrender.com
VITE_BACKEND_BASE_URI=http://localhost:5001

```

after that

```bash
npm run dev
```

#### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

#### 2. Create a ```.env``` file in the frontend directory and add the following variables:

```bash
# Frontend Environment Variables
# VITE_BACKEND_BASE_URI=https://booknest-yhqh.onrender.com
VITE_BACKEND_BASE_URI=http://localhost:5001
```

now run the frontend

```bash
npm run dev
```

## 📚 API Documentation

BookNest's backend is powered by a RESTful API built with Express.js and MongoDB. Below are the key endpoints and their functionalities.

### Authentication Routes

#### **Signup**

- **Endpoint:** `POST /api/auth/signup`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "success": true,
      "message": "User registered successfully.",
      "user": { /* user data */ }
    }
    ```
  - **Error (400):** Missing fields or user already exists.

#### **Login**

- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticate a user and provide a JWT token.
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "token": "jwt_token_here",
      "user": { /* user data */ }
    }
    ```
  - **Error (401):** Invalid credentials.

#### **Check Authentication**

- **Endpoint:** `GET /api/auth/check-auth`
- **Description:** Verify if the user is authenticated.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "user": { /* user data */ }
    }
    ```
  - **Error (401):** Unauthorized.

#### **Verify Email**

- **Endpoint:** `POST /api/auth/verify-email`
- **Description:** Verify user's email address.
- **Request Body:**
  ```json
  {
    "token": "verification_token_here"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "Email verified successfully."
    }
    ```
  - **Error (400):** Invalid or expired token.

#### **Resend Verification Email**

- **Endpoint:** `POST /api/auth/resend-verification`
- **Description:** Resend the email verification link.
- **Request Body:**
  ```json
  {
    "email": "johndoe@example.com"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "Verification email sent."
    }
    ```
  - **Error (400):** User already verified or email not found.

### Book Routes

#### **Get All Books**

- **Endpoint:** `GET /api/books`
- **Description:** Retrieve all books with pagination and optional search/filter.
- **Query Parameters:**
  - `page` (optional): Page number for pagination.
  - `limit` (optional): Number of books per page.
  - `search` (optional): Search term for book title or author.
  - `genre` (optional): Filter by genre.
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "books": [ /* array of books */ ],
      "pagination": {
        "total": 100,
        "page": 1,
        "limit": 10
      }
    }
    ```
  - **Error (500):** Server error.

#### **Get Book by ID**

- **Endpoint:** `GET /api/books/:id`
- **Description:** Retrieve a specific book by its ID.
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "book": { /* book data */ }
    }
    ```
  - **Error (404):** Book not found.

#### **Create a New Book**

- **Endpoint:** `POST /api/books`
- **Description:** Add a new book (Admin only).
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  - **Form Data:**
    - `title`: string
    - `author`: string
    - `rating`: number (0-5)
    - `description`: string
    - `tags`: string (comma-separated)
    - `isFeatured`: boolean
    - `genre`: string
    - `cover`: file (image)
- **Response:**
  - **Success (201):**
    ```json
    {
      "success": true,
      "message": "Book created successfully.",
      "book": { /* book data */ }
    }
    ```
  - **Error (400):** Validation errors.
  - **Error (401):** Unauthorized or not an admin.

### Review Routes

#### **Get Reviews**

- **Endpoint:** `GET /api/reviews`
- **Description:** Retrieve reviews for a specific book or user.
- **Query Parameters:**
  - `book` (optional): Book ID to get reviews for a specific book.
  - `user` (optional): User ID to get reviews written by a specific user.
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "reviews": [ /* array of reviews */ ]
    }
    ```
  - **Error (500):** Server error.

#### **Submit a New Review**

- **Endpoint:** `POST /api/reviews`
- **Description:** Submit a new review for a book.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  ```json
  {
    "bookId": "book_id_here",
    "rating": 4,
    "comment": "Great book!"
  }
  ```
- **Response:**
  - **Success (201):**
    ```json
    {
      "success": true,
      "message": "Review submitted successfully.",
      "review": { /* review data */ }
    }
    ```
  - **Error (400):** Validation errors.
  - **Error (401):** Unauthorized.

### User Routes

#### **Get User Profile**

- **Endpoint:** `GET /api/users/profile`
- **Description:** Retrieve the authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "user": { /* user data */ }
    }
    ```
  - **Error (401):** Unauthorized.

#### **Update User Profile**

- **Endpoint:** `PUT /api/users/profile`
- **Description:** Update the authenticated user's profile.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  ```json
  {
    "username": "newusername",
    "email": "newemail@example.com",
    "password": "newpassword" // Optional
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "success": true,
      "message": "Profile updated successfully.",
      "user": { /* updated user data */ }
    }
    ```
  - **Error (400):** Validation errors.
  - **Error (401):** Unauthorized.

## 📝 Project Structure

```
booknest/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── verifyToken.js
│   │   ├── rateLimiter.js
│   │   └── upload.js
│   ├── models/
│   │   ├── bookModel.js
│   │   ├── reviewModel.js
│   │   └── userModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── userRoutes.js
│   ├── uploads/
│   │   └── book_covers/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   ├── BookNestLogo.png
│   │   │   ├── BookNestLogoSW.png
│   │   │   └── booknestHero03.webp
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ExploreSection.jsx
│   │   │   ├── BookOverview.jsx
│   │   │   └── BookLoader.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Explore.jsx
│   │   │   ├── Authors.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   └── ... 
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── ... 
│   ├── .env
│   └── package.json
├── README.md
└── package.json
```