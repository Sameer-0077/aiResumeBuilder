# 📝 AiResumeBuilder

**AiResumeBuilder** is a full-stack AI-powered resume and cover letter generator that helps users create professional, personalized documents in minutes.  
It also offers automatic summaries, project highlights, and smart suggestions using the **Gemini API**.

🚀 **Live Demo:** [AiResumeBuilder](https://build-ai-resume.netlify.app/)

---

## 💻 Tech Stack

### **Frontend**

- **React.js** – Component-based UI
- **Tailwind CSS** – Utility-first CSS framework
- **React Router DOM** – Client-side routing
- **Zustand** – Lightweight state management
- **Framer Motion** – Animations & transitions

### **Backend**

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **JWT** – Authentication & authorization
- **bcrypt** – Password hashing
- **Mongoose** – MongoDB object modeling
- **Gemini API** – AI-powered content generation

### **Database**

- **MongoDB Atlas** – Cloud NoSQL database

---

## ✨ Features

- **Resume Creation** – AI-assisted, professional resumes
- **Cover Letter Creation** – Tailored cover letters
- **Automatic Summary Generation** – Based on skills & experience
- **Project Highlights** – AI-crafted impactful descriptions
- **User Experience Enhancements** – Suggestions using Gemini API
- **Authentication**
  - User Registration & Login
  - Password encryption with bcrypt
  - JWT-secured sessions
- **UI/UX**
  - Responsive Tailwind styling
  - Smooth animations (Framer Motion)
  - Zustand for predictable state
  - Easy navigation with React Router
- **Other**
  - PDF export
  - Secure DB connection via Mongoose
  - RESTful API structure

---

## 📂 Project Structure

```plaintext
AiResumeBuilder/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.js
│   │   └── index.js
├── server/          # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
└── README.md
```

---

## ⚙ Environment Variables

Create a `.env` file in the **server/** directory:

```env
PORT=8000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your-gemini-api-key
```

---

## 🛠 Installation & Setup

1. **Clone Repository**

```bash
git clone https://github.com/yourusername/AiResumeBuilder.git
cd AiResumeBuilder
```

2. **Install Dependencies**

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Run the Application**

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd ../client
npm run dev
```

---

## 🔄 How It Works

1. **User signs up / logs in**
   - Password hashed via bcrypt
   - JWT issued for secure sessions
2. **User inputs details**
   - Experience, education, skills, projects
3. **Gemini API processes data**
   - Generates resume summaries, project descriptions, and cover letters
4. **User previews and downloads PDF**

---

---

🚀 **Live Demo:** [AiResumeBuilder](https://your-live-link.com)
