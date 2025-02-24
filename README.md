# 🔒 Authentication System with Express, MongoDB, and Bcrypt

This is a user authentication project built with **Node.js**, **Express**, **MongoDB**, and **Bcrypt** for secure password hashing. The system allows users to register and log in securely.

## 🚀 Technologies Used

- **Node.js** - JavaScript runtime environment for backend development
- **Express** - Web framework for creating the server
- **MongoDB** - NoSQL database to store user data
- **Mongoose** - ODM library for MongoDB data modeling
- **Bcrypt** - Library for secure password hashing
- **EJS** - Template engine for rendering dynamic pages
- **Dotenv** - Environment variable management

## 📂 Project Structure

📦 backend ┣ 📂 views (EJS templates for rendering) ┣ 📂 public (Static files: CSS, JS, images) ┣ 📜 app.js (Main server code) ┣ 📜 .env (Environment variables) ┣ 📜 package.json (Project dependencies)


## 🔧 Setup and Installation

### 1️⃣ Clone the repository:

    ```sh
    git clone https://github.com/your-username/your-repository.git
    cd your-repository



2️⃣ Install dependencies:

    ```sh
    npm install


3️⃣ Configure the .env file:
Create a .env file in the root directory and add your configurations:

    S3_BUCKET=YOURS3BUCKET
    SECRET_KEY=YOURSECRETKEYGOESHERE

5️⃣ Run the server:

    npm start

The server will be running at http://127.0.0.1:4000 🚀

🛠 Features

✅ User registration with secure password hashing

✅ User login with password verification

✅ Dynamic rendering with EJS

✅ MongoDB database to store credentials


## 📌 Project Routes

| Method | Route       | Description             |
|--------|------------|-------------------------|
| `GET`  | `/`        | Home page               |
| `GET`  | `/login`   | Login page              |
| `GET`  | `/register` | Registration page      |
| `POST` | `/register` | User registration      |
| `POST` | `/login`   | User authentication     |


Developed with by Clariana Abreu

       
    This **README.md** is well-structured, easy to understand, and provides clear instructions for running the project. 🚀



