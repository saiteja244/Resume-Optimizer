# 🚀 Resume Optimizer

An AI-powered full-stack web application that analyzes and optimizes resumes to improve **ATS (Applicant Tracking System)** compatibility and increase chances of getting shortlisted.

---

## ✨ Features

- 📄 Upload resume files
- 🤖 AI-powered resume analysis and optimization
- 📊 ATS score improvement suggestions
- 🧠 Keyword enhancement for job descriptions
- 💾 Store optimized resumes and user data
- 🌐 Full-stack MERN architecture

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- CSS / Tailwind (if applicable)

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### AI Integration
- Groq API
- Llama 3.3 70B model

---

## 📁 Project Structure

```bash
resume-optimizer/
│
resume-optimizer/
├── frontend/                  ← React app (what user sees)
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadSection.jsx    ← file upload UI
│   │   │   ├── ResultsSection.jsx   ← shows optimized resume
│   │   │   └── SectionCard.jsx      ← each resume section
│   │   ├── services/
│   │   │   └── api.js               ← talks to backend
│   │   └── App.jsx                  ← main component
│   ├── .env                         ← frontend config
│   └── vite.config.js               ← Vite config
│
├── backend/                   ← Express server (logic)
│   ├── config/
│   │   └── db.js              ← MongoDB connection
│   ├── models/
│   │   └── Resume.js          ← database schema
│   ├── routes/
│   │   └── resume.js          ← API endpoints
│   ├── controllers/
│   │   └── resumeController.js ← business logic
│   ├── server.js              ← entry point
│   └── .env                   ← secrets
│
└── vercel.json                ← deployment config
```

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd resume-optimizer
```

---

## 🔧 Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create environment file:

```bash
cp .env.example .env
```

Add your environment variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

## 🎨 Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create frontend environment file:

```bash
cp .env.example .env
```

Add:

```env
VITE_API_BASE=http://localhost:5000
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 🔐 Environment Variables

### Backend `.env`

| Variable | Description |
|----------|-------------|
| PORT | Server port |
| MONGO_URI | MongoDB Atlas connection string |
| GROQ_API_KEY | API key from Groq |

---

### Frontend `.env`

| Variable | Description |
|----------|-------------|
| VITE_API_BASE | Backend API URL |

---

## 🧠 How It Works

1. User uploads resume  
2. Resume content is parsed and analyzed  
3. AI evaluates ATS compatibility  
4. Suggestions are generated for:
   - missing keywords
   - formatting issues
   - weak bullet points
   - ATS score improvements  

---

## 🚀 Future Improvements

- Authentication system
- Resume templates
- PDF export
- Job description matching
- Dashboard analytics

---

