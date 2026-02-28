# Blog App 

A simple blog application built using **Node.js**, **Express**, and **EJS**.
This project demonstrates server-side rendering, routing, middleware usage, and file-based data persistence without using a database.

---

## Overview

This application allows users to:

* Create blog posts
* View recent posts on the homepage
* View all posts on a separate page
* Edit existing posts
* Delete posts

Blog data is stored in a local `posts.json` file, ensuring persistence across server restarts (in local environments).

---

## Tech Stack

* Node.js
* Express.js
* EJS (Templating Engine)
* Body-Parser
* File System (JSON-based storage)
* Render (Deployment)

---

## Project Structure

```
blog-app/
│
├── index.js
├── package.json
├── posts.json
│
├── views/
│   ├── index.ejs
│   ├── blogs.ejs
│   ├── edit.ejs
│   ├── about.ejs
│   └── contact.ejs
│
└── public/
    └── styles.css
```

---

## Installation & Setup

1. Clone the repository
2. Install dependencies:

```
npm install
```

3. Start the server:

```
npm start
```

4. Open in browser:

```
http://localhost:3000
```

---

## Deployment

This application is deployed on Render.

Live on:
[https://blog-app-xt3g.onrender.com/](https://blog-app-xt3g.onrender.com/)
