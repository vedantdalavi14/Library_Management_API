Library Management System API
This is a simple REST API for a Library Management System, built with Node.js, Express, and MongoDB. It allows users to manage a collection of books.

This project was created as part of a take-home assignment for a Full Stack Development internship.

Features
Add new books to the library.

Fetch a list of all books.

Filter and fetch only available books.

Borrow a book (updates its status to unavailable).

Return a book (updates its status to available).

Technologies Used
Backend: Node.js, Express.js

Database: MongoDB with Mongoose ODM

API Testing: Postman

Project Structure
/library-api
|-- /controllers      # Logic for handling requests
|-- /models           # Mongoose schemas for database models
|-- /routes           # API route definitions
|-- .env              # Environment variables
|-- .gitignore        # Files to be ignored by Git
|-- package.json      # Project dependencies and scripts
|-- server.js         # Main server entry point
|-- README.md         # This file
|-- Library-Management-System.postman_collection.json # Postman collection

Setup and Installation
Prerequisites
Node.js (v14 or later)

npm (Node Package Manager)

MongoDB (either a local instance or a cloud-based service like MongoDB Atlas)

Postman (for API testing)

Installation Steps
Clone the repository:

git clone <repository-url>
cd library-api

Install dependencies:

npm install

Create a .env file:
Create a file named .env in the root of your project and add the following content.

PORT=5000
MONGO_URI=<your_mongodb_connection_string>

Replace <your_mongodb_connection_string> with your actual MongoDB connection URI.

Start the development server:
This command uses nodemon to automatically restart the server when you make changes.

npm run dev

The server should now be running at http://localhost:5000.

API Endpoints
The base URL for all endpoints is /api/books.

Method

Endpoint

Description

POST

/

Add a new book.

GET

/

Get a list of all books.

GET

/?status=available

Get a list of only available books.

PATCH

/:id/borrow

Borrow a book by its ID.

PATCH

/:id/return

Return a book by its ID.

1. Add a New Book
Method: POST

URL: /api/books

Body (raw, JSON):

{
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "isbn": "978-0618640157"
}

2. Get All Books
Method: GET

URL: /api/books

3. Get Available Books
Method: GET

URL: /api/books?status=available

4. Borrow a Book
Method: PATCH

URL: /api/books/:id/borrow

Replace :id with the actual ID of the book you want to borrow.

5. Return a Book
Method: PATCH

URL: /api/books/:id/return

Replace :id with the actual ID of the book you want to return.

How to Test with Postman
Open Postman.

Click on Import -> File -> Upload Files.

Select the Library-Management-System.postman_collection.json file from the project directory.

A new collection named "Library Management System" will appear. You can now use the pre-configured requests to test all the API endpoints.