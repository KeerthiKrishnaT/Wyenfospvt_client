# Wyenfos - Professional Web Solutions

A modern React + Node.js website for Wyenfos, featuring Firebase integration, authentication, and a complete contact system.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- Firebase project
- Gmail account

### Installation

1. **Clone and setup**
   ```bash
   git clone <repository-url>
   cd wyenfos-react-app
   ```

2. **Frontend Setup**
   ```bash
   cd client
   npm install
   cp env.example .env
   # Add your Firebase config to .env
   ```

3. **Backend Setup**
   ```bash
   cd ../server
   npm install
   cp env.example .env
   # Add Firebase admin config and email settings
   ```

4. **Start Development**
   ```bash
   # Terminal 1 - Backend
   cd server && npm run dev

   # Terminal 2 - Frontend  
   cd client && npm start
   ```

## 🛠️ Tech Stack

**Frontend:** React 18, React Router, Firebase, CSS3
**Backend:** Node.js, Express, Firebase Admin, Nodemailer
**Database:** Firebase Firestore, Authentication, Storage

## 📁 Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   └── firebase/
└── server/          # Node.js backend
    ├── routes/
    ├── middleware/
    └── config/
```

## 🎯 Features

- ✅ Modern responsive design
- ✅ User authentication
- ✅ Contact form with email
- ✅ Project portfolio
- ✅ Admin dashboard
- ✅ Real-time data
- ✅ Email notifications

## 📝 Environment Setup

Copy `env.example` files and add your Firebase configuration and email settings.

## 🚀 Deployment

- **Frontend:** Deploy `client/build` to Netlify/Vercel
- **Backend:** Deploy `server` folder to Heroku/Railway
- **Database:** Configure Firebase production settings

## 📞 Support

Email: info@wyenfos.com
