# 🧠 MeetingMind — AI Meeting Intelligence Platform

> Transform your meetings into actionable insights with AI-powered transcription, summarization, and task extraction.

[![Live Demo](https://img.shields.io/badge/Live-Demo-indigo?style=for-the-badge)](https://your-app.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-black?style=for-the-badge)](https://github.com/LakshayJangid9875/MeetingMind)

## 🚀 What is MeetingMind?

MeetingMind is a production-grade AI SaaS platform that automatically:
- 🎙️ **Transcribes** meeting audio using Whisper AI
- ✨ **Summarizes** discussions using Gemini AI
- ✅ **Extracts** action items, decisions, and deadlines
- 🔍 **Enables** semantic search across all meetings
- 📊 **Analyzes** meeting productivity with charts
- 🔗 **Integrates** with Notion and Jira

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Tailwind CSS, Recharts |
| Backend | FastAPI (Python) |
| Database | MongoDB Atlas |
| AI | Whisper AI, Gemini 1.5 Flash |
| Search | ChromaDB (Vector Embeddings) |
| Auth | JWT Tokens |
| Deployment | Vercel + Render |

## 📁 Project Structure

MeetingMind/
├── frontend/          # React application
│   ├── src/
│   │   ├── pages/     # Route-level pages
│   │   ├── components/# Reusable UI components
│   │   ├── context/   # Auth context
│   │   └── api/       # Axios API calls
└── backend/           # FastAPI application
├── routers/       # API endpoints
├── services/      # AI + business logic
├── utils/         # JWT helpers
└── models/        # Pydantic schemas

## ⚙️ Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB Atlas account
- Gemini API key
- ffmpeg installed

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
# Add your .env file (see .env.example)
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
# Add your .env file
npm start
```

## 🔑 Environment Variables

### Backend `.env`

MONGODB_URL=your-mongodb-atlas-url
SECRET_KEY=your-secret-key
ALGORITHM=HS256
GEMINI_API_KEY=your-gemini-api-key

### Frontend `.env`

## 🌐 Deployment

- **Frontend** → Vercel (connect GitHub repo)
- **Backend** → Render (connect GitHub repo)

## 👨‍💻 Built By

**Lakshay Jangid** — [@LakshayJangid9875](https://github.com/LakshayJangid9875)
