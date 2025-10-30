# INTRO_To_Express_JS


**Author:** Yeasin Arafat  
**Email:** yeasinoncode98@gmail.com  
**GitHub:** [Yeasinoncode98](https://github.com/Yeasinoncode98)

---

## Overview

This is a simple **Express.js** project demonstrating the basics of setting up a web server, routing, and handling APIs. Express.js is a minimal and flexible **Node.js web application framework**.

---

## Features

- Lightweight and fast server setup
- Routing for GET and POST requests
- Middleware support
- Easy integration with databases (optional)

---

## Prerequisites

- Node.js installed (v14 or above recommended)
- npm or yarn package manager

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/Yeasinoncode98/your-repo-name.git
cd your-repo-name

2.Initialize Node.js project (if not already)

npm init -y

3.Install Express

npm install express


................................

1.Create an entry file (if not already present):

index.js

2.Basic Express server example (index.js):

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express.js!');
});

app.post('/data', (req, res) => {
  const userData = req.body;
  res.send({ message: 'Data received successfully', data: userData });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


3.Start the server

node index.js


4.Test the server

1.Open browser: http://localhost:3000

2.Use Postman or curl to test POST requests to /data

Note --> Use Nodemon and cors 

NodeMon Npm --> npm install -g nodemon

cors Npm -->npm install cors

..............................

Common Commands -->

Command	Description ------->

npm install	Install project dependencies
node index.js	Start the server
npm run dev	Start server with nodemon (if installed)
npm init -y	Initialize a new Node.js project

.......................................

Folder Structure (Recommended)

your-repo-name/
│
├── index.js         # Entry point
├── package.json
├── package-lock.json
├── routes/          # Optional: separate routes
├── controllers/     # Optional: route handlers
└── README.md


..............................

Notes -->

Always use express.json() middleware for parsing JSON in POST requests.

For development, you can install nodemon for auto-restart:

npm install -g nodemon
nodemon index.js

....................................


License

This project is open-source and free to use.

Happy coding! 🚀
