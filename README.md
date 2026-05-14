# Resume Optimizer

A full-stack AI-powered resume optimizer that enhances your resume to be ATS-friendly.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **AI:** Groq (Llama 3.3 70B)

## Project Structure
resume-optimizer/

  ├── frontend/
  └── backend/

## Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Environment Variables

### Backend `.env`
| Variable | Description |
|---|---|
| PORT | Server port (default 5000) |
| MONGO_URI | MongoDB Atlas connection string |
| GROQ_API_KEY | Groq API key from console.groq.com |

### Frontend `.env`
| Variable | Description |
|---|---|
| VITE_API_BASE | Backend API URL |
