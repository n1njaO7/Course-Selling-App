# Course Selling App

A simple course selling platform built with Node.js, Express and MongoDB. This repository provides a minimal backend API for user and admin authentication, course management and purchase tracking using Mongoose models.

> Note: This README was updated to reflect the current project structure, API endpoints, and setup steps.

Table of Contents

- Features
- Tech Stack
- Project Structure
- API Endpoints
  - User
  - Admin
  - Course
- Data Models
- Getting Started
  - Prerequisites
  - Installation
  - Environment
  - Run
- Example Requests
- Development Notes
- Contributing
- License


## Features

- User signup and signin
- Admin signup and signin
- Admin can create courses
- Users can view courses and purchase them
- Purchase tracking per user
- MongoDB models with Mongoose

## Tech Stack

- Backend: Node.js, Express
- Database: MongoDB
- ODM: Mongoose
- Languages: JavaScript

## Project structure

- `server.js` — application entry point (starts the Express server)
- `src/app.js` — Express app setup and route registration
- `src/db.js` — Mongoose schemas and models
- `routes/user.js` — user-related routes
- `routes/admin.js` — admin-related routes
- `routes/course.js` — course-related routes

(If any of these paths differ in your code, adjust them accordingly.)

## API Endpoints

Below is an overview of the API routes this project exposes. Routes are shown with the expected HTTP method and a short description.

Base URL (development): http://localhost:3000

User routes
- `POST /user/signup` — Create a new user
  - Body example: `{ "firstName": "Jane", "lastName": "Doe", "email": "jane@example.com", "password": "secret" }`
- `POST /user/signin` — Authenticate a user and receive a token (if implemented)
  - Body example: `{ "email": "jane@example.com", "password": "secret" }`
- `GET /user/purchases` — Get purchases for the authenticated user

Admin routes
- `POST /admin/signup` — Create a new admin
  - Body example: `{ "firstName": "Admin", "lastName": "User", "email": "admin@example.com", "password": "secret" }`
- `POST /admin/signin` — Authenticate admin
  - Body example: `{ "email": "admin@example.com", "password": "secret" }`
- `POST /admin/course` — Create a new course (admin only)
  - Body example: `{ "title": "My Course", "description": "Course description", "price": 49.99, "imgUrl": "http://...", "creatorUrl": "http://..." }`

Course routes
- `GET /course` — List all courses
- `POST /course/purchase` — Purchase a course for the authenticated user
  - Body example: `{ "userId": "...,", "courseId": "..." }`

Note: Authentication (JWT or session) is assumed in many endpoints — check your route implementations. If JWT is required, attach an Authorization header: `Authorization: Bearer <token>`.

## Data Models

These are the main fields used by the models in `src/db.js`. Field names in code may vary slightly — verify with the file if needed.

User
- userId (string / generated)
- firstName (string)
- lastName (string)
- email (string)
- password (string — hashed in production)

Admin
- adminId (string / generated)
- firstName (string)
- lastName (string)
- email (string)
- password (string — hashed in production)

Course
- courseId (string / generated)
- title (string)
- description (string)  // note: some code may use `discription` — consider renaming for consistency
- price (number)
- imgUrl (string)
- creatorUrl (string)

Purchase
- purchaseId (string / generated)
- userId (reference to User)
- courseId (reference to Course)

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm
- MongoDB (local or hosted like Atlas)

### Installation

```bash
git clone https://github.com/n1njaO7/Course-Selling-App.git
cd Course-Selling-App
npm install
```

### Environment

Create a `.env` file in the project root and add the following environment variables the project requires. If your project does not use `.env`, set the variables in your environment instead.

Example `.env`:

```
MONGODB_URI=mongodb://localhost:27017/course-selling-app
JWT_SECRET=your_jwt_secret_here
PORT=3000
```

Make sure the connection string points to your MongoDB instance. If you use MongoDB Atlas, use the connection string provided by Atlas and set the user/password and database name accordingly.

### Run the app

To start the server in production mode:

```bash
node server.js
```

If you want a development workflow with automatic restarts (if you have nodemon):

```bash
npx nodemon server.js
```

The server defaults to port 3000 (unless overridden by `PORT` environment variable).

## Example requests (curl)

Signup a user

```bash
curl -X POST http://localhost:3000/user/signup \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Jane","lastName":"Doe","email":"jane@example.com","password":"secret"}'
```

List courses

```bash
curl http://localhost:3000/course
```

Create a course (admin)

```bash
curl -X POST http://localhost:3000/admin/course \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <admin-token>" \
  -d '{"title":"New Course","description":"...","price":19.99}'
```

Purchase a course

```bash
curl -X POST http://localhost:3000/course/purchase \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <user-token>" \
  -d '{"userId":"<userId>","courseId":"<courseId>"}'
```

## Development notes

- Route handlers in this project currently return simple JSON responses (placeholders) — adapt them to your needs.
- If you plan to store passwords, always hash them (bcrypt) and never store plaintext passwords in production.
- Add input validation (e.g., using express-validator or Joi) and improve error handling before production use.
- If the code uses `discription` as a field name in the Course model, consider renaming it to `description` and migrating existing data.

## Contributing

Contributions are welcome. Open issues to report bugs or request features. Submit pull requests with clear descriptions and tests where applicable.

## License

This project does not include a license file. Add a LICENSE if you want to explicitly specify terms.


