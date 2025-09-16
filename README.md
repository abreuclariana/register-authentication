# 🔒 Authentication System with Express, MongoDB, and Bcrypt

A modern, secure user authentication system built with **Node.js**, **Express**, **MongoDB Atlas**, and **Bcrypt** for secure password hashing. Features a beautiful, responsive UI and allows users to register, log in, and share secrets anonymously.

## 🌐 Live Demo

**🚀 Production URL**: https://register-authentication-2.onrender.com

## 🚀 Technologies Used

- **Node.js** - JavaScript runtime environment for backend development
- **Express** - Web framework for creating the server
- **MongoDB Atlas** - Cloud NoSQL database to store user data
- **Mongoose** - ODM library for MongoDB data modeling
- **Bcrypt** - Library for secure password hashing
- **EJS** - Template engine for rendering dynamic pages
- **Express-Session** - Session management for user authentication
- **Dotenv** - Environment variable management
- **Bootstrap** - Frontend framework for responsive design
- **FontAwesome** - Icons library

## 📂 Project Structure

```
📦 register-authentication
├── 📂 views/                 # EJS templates
│   ├── 📂 partials/          # Header and footer components
│   ├── 📄 home.ejs          # Landing page
│   ├── 📄 login.ejs         # Login page
│   ├── 📄 register.ejs      # Registration page
│   ├── 📄 secrets.ejs       # Protected secrets page
│   └── 📄 submit.ejs        # Submit secrets page
├── 📂 public/               # Static files
│   └── 📂 css/
│       └── 📄 styles.css    # Custom styles
├── 📜 app.js               # Main server code
├── 📜 package.json         # Project dependencies
├── 📜 .env                 # Environment variables (not tracked)
├── 📜 .gitignore          # Git ignore rules
└── 📜 README.md           # Project documentation
```

## 🔧 Setup and Installation

### 1️⃣ Clone the repository:

```bash
git clone https://github.com/abreuclariana/register-authentication
cd register-authentication
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Configure environment variables:

Create a `.env` file in the root directory:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/userDB

# Session Configuration
SESSION_SECRET=your-super-secret-session-key-change-this-in-production

# Server Configuration
PORT=4000
NODE_ENV=development
```

### 4️⃣ Start MongoDB locally:

```bash
# Create data directory
mkdir C:\data\db

# Start MongoDB
mongod --dbpath C:\data\db
```

### 5️⃣ Run the server:

```bash
npm start
# or
node app.js
```

The server will be running at **http://localhost:4000** 🚀

## 🌐 Production Deployment

### MongoDB Atlas Setup:

1. **Create MongoDB Atlas account**: https://cloud.mongodb.com/
2. **Create cluster**: Choose M0 Sandbox (free tier)
3. **Configure database access**: Create user with password
4. **Configure network access**: Allow access from anywhere (0.0.0.0/0)
5. **Get connection string**: Copy the MongoDB Atlas connection string

### Render Deployment:

1. **Connect GitHub repository** to Render
2. **Add environment variables**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/userDB?retryWrites=true&w=majority
   SESSION_SECRET=your-production-secret-key
   NODE_ENV=production
   ```
3. **Deploy**: Render will automatically build and deploy

## 🛠 Features

### ✅ Authentication Features:
- **User Registration** with email validation
- **Secure Login** with password verification
- **Session Management** with express-session
- **Password Hashing** with bcrypt (10 salt rounds)
- **Protected Routes** with authentication middleware

### ✅ User Interface:
- **Responsive Design** with Bootstrap
- **Modern UI** with gradients and animations
- **Error Handling** with user-friendly messages
- **Success Notifications** for user actions
- **Mobile-First** approach

### ✅ Database Features:
- **MongoDB Atlas** cloud database
- **User Collection** for storing credentials
- **Secrets Collection** for anonymous secrets
- **Data Validation** with Mongoose schemas

### ✅ Security Features:
- **Password Hashing** with bcrypt
- **Session Security** with secret keys
- **Environment Variables** for sensitive data
- **Input Validation** and sanitization

## 📌 Project Routes

| Method | Route       | Description                    | Authentication |
|--------|-------------|--------------------------------|----------------|
| `GET`  | `/`         | Home page with register/login  | ❌ Public      |
| `GET`  | `/login`    | Login page                     | ❌ Public      |
| `GET`  | `/register` | Registration page              | ❌ Public      |
| `POST` | `/register` | User registration              | ❌ Public      |
| `POST` | `/login`    | User authentication            | ❌ Public      |
| `GET`  | `/secrets`  | Protected secrets page         | ✅ Required    |
| `GET`  | `/submit`   | Submit secrets page            | ✅ Required    |
| `POST` | `/submit`   | Submit new secret              | ✅ Required    |
| `POST` | `/logout`   | User logout                    | ✅ Required    |

## 🎨 UI/UX Features

### Design Elements:
- **Glass Morphism** effects on home page
- **Gradient Backgrounds** for modern look
- **Floating Animations** for interactive elements
- **Responsive Cards** with shadows and borders
- **Icon Integration** with FontAwesome
- **Color-coded** buttons and alerts

### User Experience:
- **Intuitive Navigation** between pages
- **Clear Error Messages** in Portuguese/English
- **Success Feedback** for user actions
- **Loading States** and transitions
- **Mobile Optimization** for all devices

## 🔒 Security Considerations

- **Environment Variables**: Sensitive data stored in `.env`
- **Password Hashing**: Bcrypt with 10 salt rounds
- **Session Management**: Secure session configuration
- **Input Validation**: Server-side validation
- **HTTPS**: Production deployment with SSL
- **Database Security**: MongoDB Atlas with authentication

## 🚀 Performance Features

- **Efficient Database Queries** with Mongoose
- **Session Optimization** with proper configuration
- **Static File Serving** with Express
- **Error Handling** with proper HTTP status codes
- **Responsive Design** for all screen sizes

## 📱 Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Developer

**Developed with ❤️ by [Clariana Abreu](https://github.com/abreuclariana)**

---

## 📞 Support

If you have any questions or need help with the project, feel free to:

- **Open an issue** on GitHub
- **Contact the developer** via GitHub profile
- **Check the live demo** at https://register-authentication-2.onrender.com

---

**🎉 This README.md provides comprehensive documentation for the authentication system, including setup instructions, deployment guide, and feature overview!**