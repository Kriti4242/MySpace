🚀 MySpace – Personal Productivity SaaS

MySpace is a full-stack SaaS web application that helps users manage their study plans, job applications, personal notes, and daily tasks — all in one secure dashboard.

Live App:
🔗 https://my-space-eight-lake.vercel.app

Backend API:
🔗 https://myspace-fsp3.onrender.com

📌 Features
🔐 Authentication

User Registration & Login

Password Hashing (bcrypt)

JWT-based Authentication

Forgot Password with Secure Reset Token

📚 Study Planner

Add subjects, topics & deadlines

Mark tasks as Completed or Incomplete

Visual status indicators

Delete study plans

💼 Job Tracker

Track applied jobs (Company + Role)

Update status (Interviewed, Selected, Rejected)

Rejected jobs are automatically struck through

Delete job entries

📝 Notes

Create unlimited notes

Click to expand and read full content

Edit & delete notes

Search notes by title or content

✔ Checklist

Add daily tasks

Search tasks

Delete completed tasks

🔎 Search Everywhere

Search in Study Plans

Search Jobs

Search Notes

Search Checklist

📱 Mobile Friendly

Responsive layout

Mobile top-navigation

Touch-friendly UI

🛠 Tech Stack

Frontend

React.js

CSS (Responsive UI)

Axios

Backend

Node.js

Express.js

JWT Authentication

Bcrypt Password Hashing

MongoDB (Mongoose)

Cloud

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

🔐 Security

Passwords are hashed using bcrypt

JWT tokens protect all APIs

Each user can access only their own data

Secure password reset tokens with expiry

📦 Installation (Local)
1️⃣ Clone repository
git clone https://github.com/yourusername/MySpace.git

2️⃣ Backend
cd backend
npm install
npm start


Create .env

MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret

3️⃣ Frontend
cd frontend
npm install
npm start

🌍 Production Architecture
Vercel (Frontend)
        ↓
Render (Backend)
        ↓
MongoDB Atlas (Database)
