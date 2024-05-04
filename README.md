# Blog-App-MERN

## Live link
```bash
https://blogrightnoww.netlify.app/login
```
## About

The Blog App is a web-based application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack and Socket.io.

## Features

- #### User authentication:
  Sign up, Log in, Log out.

- #### Account management:
  Update account information, Delete account
- #### Blog post management:
  Create blog posts, Update blog posts, Delete blog posts.

- ### Real-time interaction:
  Real-time liking functionality for blog posts,  Real-time commenting feature for blog posts.

## Technologies Used

- Frontend: React.js,
- Backend: Node.js, Express.js
- Database: MongoDB
- Realtime: Socket.io

## Installation

```bash
git clone https://github.com/Binod-Joshi/Blog-App-MERN.git
```

Open 2 terminals in separate windows/tabs.

Terminal 1: Setting Up Backend

```bash
cd blogback
npm install
npm start
```

Create a file called .env in the backend folder. Inside it write this :

```bash
MONGO_URL = mongodb://127.0.0.1/blogapp
```
Instead of this link write your database link.

Terminal 2: Setting Up Frontend

```bash
cd blogfront
npm install
npm start
```
Now, navigate to localhost:3000 in your browser. The Backend API will be running at localhost:5000.

## Deployment
- Render - server side
- Netlify - client side
