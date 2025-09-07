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

## 🎨 Frontends

This repository contains two frontend applications to interact with the API:

1.  **`library-frontend_html-react`**:
    *   A lightweight, single-file frontend built with **HTML and embedded React** (via CDN scripts).
    *   This version is designed for quick, simple demonstrations and does not require a separate build step. You can open the `index.html` file directly in a browser.

2.  **`library-frontend_react`**:
    *   A modern, full-featured frontend built with **React and Vite**.
    *   This is the primary, recommended frontend, offering a better development experience, performance, and scalability.
    *   It requires a separate installation and build process.

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

---

## 🔐 How User Roles and Route Protection Work

The API uses middleware to control access based on user roles:

- **Adding a Book (Admin Only):**
    ```js
    router.post('/', protect, authorize('Admin'), addBook);
    ```
    - `protect`: Checks if the user is logged in (valid token).
    - `authorize('Admin')`: Checks if the logged-in user's role is 'Admin'.
    - **Result:** Only Admins can add books. Members get a 403 Forbidden error.

- **Getting All Books (Public):**
    ```js
    router.get('/', getAllBooks);
    ```
    - No authentication or role check. Anyone can access this endpoint.

- **Borrowing and Returning Books (Admin & Member):**
    ```js
    router.patch('/:id/borrow', protect, borrowBook);
    router.patch('/:id/return', protect, returnBook);
    ```
    - `protect`: Checks if the user is logged in, but does not check for a specific role.
    - **Result:** Any logged-in user (Admin or Member) can borrow or return books.

---

## 🧪 How to Test User Roles in Postman

1. **Create Two Users:**
     - **Admin:**
         ```json
         {
             "username": "adminuser",
             "password": "password123",
             "role": "Admin"
         }
         ```
     - **Member:**
         ```json
         {
             "username": "memberuser",
             "password": "password123"
         }
         ```

2. **Test Admin-Only Route:**
     - Log in as the Admin (`POST /api/auth/login`) and copy the JWT token.
     - Go to the Add New Book (`POST /api/books`) request. In the Authorization tab, select **Bearer Token** and paste the Admin's token.
     - Send the request. It should succeed (Status 201).

3. **Test Member Restriction:**
     - Log in as the Member and copy their JWT token.
     - Go back to the Add New Book request and replace the Admin's token with the Member's token.
     - Send the request. It should fail (Status 403 Forbidden). This proves your role-based security is working correctly.

4. **Test Shared Route (Borrow):**
     - Using the Member's token, go to the Borrow a Book request (`PATCH /api/books/:id/borrow`).
     - Replace `:id` in the URL with the ID of a book that the Admin created.
     - Send the request. It should succeed. This shows that Members can perform actions that don't require Admin privileges.
