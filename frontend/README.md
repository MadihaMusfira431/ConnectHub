# ConnectHub - Mini Social Media Application

## Overview

ConnectHub is a full-stack social media application built using the MERN stack. Users can create accounts, log in securely, create posts with text and images, view posts from other users, like posts, comment on posts, and manage their own content.

The project was developed as part of the 3W Full Stack Internship Assignment.

---

## Features

### Authentication

* User Signup
* User Login
* Secure password hashing using bcrypt

### Social Feed

* Public feed displaying all posts
* View posts from all registered users
* Responsive feed layout

### Create Posts

* Create text posts
* Create image posts using image URLs
* Create posts with both text and images

### Engagement

* Like posts
* Comment on posts
* View total likes and comments

### Post Management

* Delete own posts
* Real-time feed refresh after actions

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* React Icons
* CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* bcryptjs

---

## Project Structure

```bash
ConnectHub/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── Server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone <your-github-repository-url>
cd ConnectHub
```

---

## Backend Setup

```bash
cd backend

npm install
```

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start backend server:

```bash
node Server.js
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend

npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

#### Signup

```http
POST /api/auth/signup
```

#### Login

```http
POST /api/auth/login
```

---

### Posts

#### Create Post

```http
POST /api/posts/create
```

#### Get All Posts

```http
GET /api/posts
```

#### Like Post

```http
PUT /api/posts/like/:id
```

#### Comment On Post

```http
PUT /api/posts/comment/:id
```

#### Delete Post

```http
DELETE /api/posts/:id
```

---

## Database Collections

### Users Collection

```javascript
{
  username: String,
  email: String,
  password: String
}
```

### Posts Collection

```javascript
{
  username: String,
  text: String,
  image: String,
  likes: [],
  comments: []
}
```

---

## Future Improvements

* JWT Authentication
* User Profiles
* Profile Pictures
* Search Functionality
* Image Upload Support
* Dark Mode
* Pagination

---

## Author

**Madiha Musfira**

Frontend & MERN Stack Enthusiast

---

## Assignment

Developed for the **3W Full Stack Internship Assignment** using React, Node.js, Express, and MongoDB.
