
# Scalable Notes Web Application

## Project Overview

This is a full-stack scalable web application featuring user authentication, a dashboard, and CRUD operations on notes. It demonstrates modern frontend and backend development with security and scalability best practices.

---

## Features

* **User Authentication:** Register, login, and logout using JWT tokens
* **Protected Routes:** Dashboard and notes management accessible only to authenticated users
* **Notes CRUD:** Create, read, update, delete, and search notes linked to individual users
* **Responsive UI:** Built with React.js and TailwindCSS for mobile and desktop
* **Secure Backend:** Node.js with Express, password hashing using bcrypt, JWT middleware for authentication
* **Database:** MongoDB with Mongoose for data persistence

---

## Tech Stack

* **Frontend:** React.js, TailwindCSS, Axios
* **Backend:** Node.js, Express, JWT, bcrypt
* **Database:** MongoDB

---

## Setup Instructions

1. Clone the repository:

```bash
git clone [repo-url]
cd [repo-folder]
```

2. Install dependencies:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Create a `.env` file inside the `backend` folder with:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. Start the servers:

```bash
# Backend
npm start

# Frontend
npm start
```

---

## Deployment

The live app is available at:
https://primetradeai-git-main-moksha-odlamaanis-projects.vercel.app/

---

## API Endpoints Summary

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user
* `GET /api/profile` – Get user profile (auth required)
* `PUT /api/profile` – Update user profile (auth required)
* `GET /api/notes` – Get all notes (auth required)
* `POST /api/notes` – Create a note (auth required)
* `PUT /api/notes/:id` – Update a note (auth required)
* `DELETE /api/notes/:id` – Delete a note (auth required)
* `GET /api/notes/search/:query` – Search notes (auth required)

---

## Security & Scalability

* Passwords hashed with bcrypt
* JWT token authentication with middleware
* Input validation and error handling
* Modular code structure for easy maintenance and scaling

---


