# Course Selling App

A simple course selling platform built with **Node.js**, **Express**, and **MongoDB**. The project provides basic API routes for users, admins, and courses, and uses Mongoose models for storing users, admins, courses, and purchases.

## Features

- User signup and signin routes
- Admin authentication routes
- Course management routes
- Purchase tracking
- MongoDB data models with Mongoose

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Languages:** JavaScript, HTML, TypeScript, CSS

## Project Structure

- `server.js` — Starts the Express server
- `src/app.js` — Express app setup and route registration
- `src/db.js` — Mongoose schemas and models
- `routes/user.js` — User-related routes
- `routes/admin.js` — Admin-related routes
- `routes/course.js` — Course-related routes

## API Overview

### User Routes
- `POST /user/signin`
- `POST /user/signup`
- `GET /user/purchases`

### Admin Routes
- `POST /admin/signin`
- `POST /admin/signup`
- `POST /admin/course`

### Course Routes
- `GET /course`
- `POST /course/purchase`

## Data Models

### User
- `userId`
- `firstName`
- `lastName`
- `email`
- `password`

### Admin
- `adminId`
- `firstName`
- `lastName`
- `email`
- `password`

### Course
- `courseId`
- `title`
- `discription`
- `price`
- `imgUrl`
- `creatorUrl`

### Purchase
- `purchaseId`
- `userId`
- `courseId`

## Getting Started

### Prerequisites
- Node.js
- npm
- MongoDB

### Installation

```bash
git clone https://github.com/n1njaO7/Course-Selling-App.git
cd Course-Selling-App
npm install
```

### Environment Setup

If your project uses environment variables, create a `.env` file and configure your MongoDB connection string and any required secrets.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Run the App

```bash
node server.js
```

The server will start on port `3000`.

## Development Notes

- The current route handlers return placeholder JSON responses.
- Database models are already defined in `src/db.js`.
  
