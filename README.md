git clone <repository-url>
cd library-api


# 📚 Library Management System API

A simple REST API for a Library Management System, built with **Node.js**, **Express**, and **MongoDB**. It allows users to manage a collection of books and includes JWT-based authentication with user roles.

This project was created as part of a take-home assignment for a Full Stack Development internship.

---

## 🚀 Features
- User registration and login with JWT authentication
- Role-based access control (**Admin**, **Member**)
- **Admin:** Can add new books
- **Member / Admin:** Can borrow and return books
- Fetch a list of all books (publicly accessible)
- Filter and fetch only available books

---

## 🛠️ Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **API Testing:** Postman

---

## 📁 Project Structure
```
/library-api
│-- /controllers      # Logic for handling requests
│-- /middleware       # Auth middleware for protecting routes
│-- /models           # Mongoose schemas for database models
│-- /routes           # API route definitions
│-- .env              # Environment variables
│-- .gitignore        # Files to be ignored by Git
│-- package.json      # Project dependencies and scripts
│-- server.js         # Main server entry point
│-- README.md         # This file
│-- Library-Management-System.postman_collection.json # Postman collection
```

---

## ⚙️ Setup and Installation

### Prerequisites
- Node.js (v14 or later)
- npm (Node Package Manager)
- MongoDB (either a local instance or a cloud-based service like MongoDB Atlas)
- Postman (for API testing)

### Installation Steps
1. **Clone the repository:**
    ```sh
    git clone https://github.com/vedantdalavi14/Library_Management_API
    cd Library_Management_API
    ```
2. **Install dependencies:**
    ```sh
    npm install
    ```
3. **Create a `.env` file:**
    Create a file named `.env` in the root of your project and add the following content:
    ```env
    PORT=5000
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret_key>
    ```
    - Replace `<your_mongodb_connection_string>` with your actual MongoDB connection URI.
    - Replace `<your_jwt_secret_key>` with a long, random, secret string for signing tokens.
4. **Start the development server:**
    ```sh
    npm run dev
    ```
    The server should now be running at [http://localhost:5000](http://localhost:5000).

---

## 📚 API Endpoints

### Authentication (`/api/auth`)

| Method | Endpoint    | Description                        | Access  |
|--------|-------------|------------------------------------|---------|
| POST   | /register   | Register a new user (defaults to 'Member'). | Public  |
| POST   | /login      | Login to get a JWT.                | Public  |

### Books (`/api/books`)

| Method | Endpoint           | Description                      | Access         |
|--------|--------------------|----------------------------------|----------------|
| POST   | /                  | Add a new book                   | Admin          |
| GET    | /                  | Get a list of all books          | Public         |
| GET    | /?status=available | Get only available books         | Public         |
| PATCH  | /:id/borrow        | Borrow a book by its ID          | Member / Admin |
| PATCH  | /:id/return        | Return a book by its ID          | Member / Admin |

---

## 🧪 How to Test with Postman
1. **Import the Collection:** Import the `Library-Management-System.postman_collection.json` file into Postman.
2. **Register and Login:**
    - Use the `/api/auth/register` request to create a new user. To create an admin, include `"role": "Admin"` in the body.
    - Use the `/api/auth/login` request with your new user's credentials.
    - Copy the token from the login response body.
3. **Test a Protected Route:**
    - Select a protected request (e.g., `POST /api/books`).
    - Go to the Authorization tab.
    - Select Type: **Bearer Token**.
    - In the Token field, paste the token you copied.
    - Send the request. It should now be successful. If you try without the token, you will get a 401 Unauthorized error.