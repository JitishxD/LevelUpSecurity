# 🛡️ LevelUpSecurity

> **Stop "Tick-the-Box" Security Training.**

Imagine a company giving the same car maintenance training to both a professional mechanic and a salesperson who just drives the car. The mechanic needs advanced technical details, while the salesperson just needs to know how to check the oil and tire pressure. Giving them the same generic course is a waste of time for both.

This is exactly what happens with most cybersecurity training. A person in marketing faces different online threats (like social media scams) than a system administrator (who deals with network attacks). Yet, they are both forced to sit through the same basic, generic training videos

**LevelUpSecurity** is a revolutionary cybersecurity education that solves this 

## 🚀 Live Demo

**Website:** [https://jitishxd.github.io/LevelUpSecurity/](https://jitishxd.github.io/LevelUpSecurity/)

## 🎯 Why LevelUpSecurity?

Generic, one-size-fits-all cybersecurity training fails to engage employees and often leads to security fatigue. LevelUpSecurity revolutionizes cybersecurity education by providing:

- **🎭 Role-Specific Learning Paths**: Tailored content for different job functions (Marketing, IT, HR, Finance, etc.)
- **🎮 Gamified & Interactive Modules**: Engaging simulations that make learning enjoyable
- **🎯 Real-World Scenarios**: Practical training based on actual threat scenarios
- **📊 Reduced Security Fatigue**: Smart, relevant content that employees actually care about
- **🛠️ Proactive Defense**: Transform employees from security weakness to security strength

## ✨ Key Features

### 🔐 **Authentication System**
- Secure user registration and login
- JWT-based authentication with HTTP-only cookies
- Protected routes for authenticated users
- Session management with automatic logout

### 🎓 **Personalized Learning**
- Role-based training modules
- Adaptive learning paths based on user profiles
- Progress tracking and completion certificates
- Interactive assessments and quizzes

### 🎮 **Engaging Content**
- Gamified learning experiences
- Real-world phishing simulations
- Interactive scenario-based training
- Multi-media rich content

### 📱 **Modern User Experience**
- Responsive design for all devices
- Clean, intuitive interface
- Fast loading with Vite build optimization
- Accessible and user-friendly navigation

## 🛠️ Tech Stack

### **Frontend**
- **React 19.1.1** - Modern UI framework
- **Vite 7.1.2** - Fast build tool and development server
- **Tailwind CSS 4.1.13** - Utility-first CSS framework
- **ESLint** - Code linting and quality

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js 5.1.0** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose 8.18.1** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-Origin Resource Sharing

### **Deployment & DevOps**
- **GitHub Pages** - Frontend hosting
- **Vercel** - Backend deployment
- **Git** - Version control
- **gh-pages** - Automated deployment

## 📁 Project Structure

```
LevelUpSecurity/
├── frontend/                   # React frontend application
│   ├── src/
│   │   ├── Components/         # React components
│   │   │   ├── AuthPage.jsx   # Authentication forms
│   │   │   ├── Home.jsx       # Dashboard/Home page
│   │   │   ├── LearnMore.jsx  # Information pages
│   │   │   ├── LevelUpSecurity.jsx  # Landing page
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── contexts/          # React contexts
│   │   ├── services/          # API service functions
│   │   ├── Utils/             # Utility functions
│   │   ├── assets/            # Static assets
│   │   └── App.jsx            # Main app component
│   ├── package.json           # Dependencies and scripts
│   └── vite.config.js         # Vite configuration
│
└── backend/                   # Node.js backend API
    ├── src/
    │   ├── middleware/        # Custom middleware
    │   ├── models/            # Database models
    │   ├── router/            # API routes
    │   │   ├── routes.js      # Route definitions
    │   │   └── authController.js  # Authentication logic
    │   ├── utils/             # Utility functions
    │   └── db.js              # Database connection
    ├── index.js               # Server entry point
    └── package.json           # Backend dependencies
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jitishxd/levelupsecurity.git
   cd levelupsecurity
   ```

2. **Set up the Backend**
   ```bash
   cd backend
   npm install
   
   # Create environment file
   cp .env.example .env
   # Edit .env with your configuration:
   # MONGODB_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # PORT=3000
   ```

3. **Set up the Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will open at `http://localhost:5173`

### Building for Production

**Frontend Build:**
```bash
cd frontend
npm run build
```

**Deploy to GitHub Pages:**
```bash
cd frontend
npm run deploy
```

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/signup` | Register new user |
| `POST` | `/api/v1/login` | User login |
| `POST` | `/api/v1/logout` | User logout |
| `GET` | `/api/v1/getAuthStatus` | Check authentication status |

### Example API Usage

**Sign Up:**
```javascript
POST /api/v1/signup
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "Jitish",
}
```

**Login:**
```javascript
POST /api/v1/login
Content-Type: application/json

{
  "email": "user@example.com", 
  "password": "securePassword123"
}
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/levelupsecurity

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key

# Server
PORT=3000
NODE_ENV=production

# CORS
FRONTEND_URL=https://jitishxd.github.io
```

### Frontend Configuration

Update `vite.config.js` for custom build settings:

```javascript
export default {
  base: '/LevelUpSecurity/',
  build: {
    outDir: 'dist'
  }
}
```


## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jitish**  
**Amrit Raj Rai**  
**Om Dixit**  
**Tanush**
- GitHub: [@jitishxd](https://github.com/jitishxd)
- Project: [LevelUpSecurity](https://github.com/jitishxd/levelupsecurity)


## 📈 Roadmap


- [ ] **Advanced Analytics** - Detailed learning progress tracking
- [ ] **Multi-language Support** - Internationalization for global reach
- [ ] **Mobile App** - Native mobile applications for iOS and Android
- [ ] **AI-Powered Recommendations** - Machine learning-based personalized learning paths
- [ ] **Enterprise Features** - Advanced admin dashboard and reporting tools

---

**🔒 Building a More Secure Digital World, One Employee at a Time.**

---

*Made with ❤️ for cybersecurity education and awareness*