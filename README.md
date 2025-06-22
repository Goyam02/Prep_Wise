# 🎙️ Prep.AI – Voice-Driven AI Interview Generator

[![Built with React](https://img.shields.io/badge/Built%20with-React-61DAFB?logo=react)](https://reactjs.org/)
[![Powered by Firebase](https://img.shields.io/badge/Powered%20by-Firebase-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Hosted on Vercel](https://img.shields.io/badge/Hosted%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![AI by Gemini](https://img.shields.io/badge/AI%20Powered%20by-Gemini-4285F4?logo=google)](https://deepmind.google/technologies/gemini/)
[![Voice by Vapi](https://img.shields.io/badge/Voice%20Agent-Vapi%20AI-blueviolet)](https://vapi.ai)

[🚀 **Live Demo**](https://prep-ai-tan.vercel.app)

---

## 🧠 What is Prep.AI?

Prep.AI is an AI-powered platform to help users **simulate real interview experiences** through **interactive voice conversations**.

It uses:
- 🎤 **Vapi AI** for voice interaction,
- 🤖 **Gemini AI** to dynamically generate personalized interview questions,
- ☁️ **Firebase** to store sessions, answers, and feedback.

Whether you're preparing for your next tech job or just want to boost your communication skills, Prep.AI gives you hands-on practice with **realistic AI interviewers**.

---

## ✨ Features

- 🎙️ **Voice-Driven Interviews** with Vapi AI
- 🧠 **Dynamic Question Generation** via Gemini
- 📋 **Instant Interview Feedback**
- 📂 **View Previous Interview Reports**
- ☁️ **Firebase-Powered Database & Auth**
- 🚀 **Deployed Seamlessly with Vercel**
- 📱 Fully **responsive UI** with smooth UX

---

## 📸 Screenshots

> _Add screenshots of the voice interview in action, the feedback page, and UI here._

---

## 🧱 Tech Stack

| Technology       | Purpose                                 |
|------------------|------------------------------------------|
| Vapi AI          | Real-time voice agent for conversations |
| Gemini API       | Generates domain-specific questions     |
| Firebase         | Realtime database + Authentication      |
| React + Next.js  | Frontend UI and API routes              |
| Tailwind CSS     | Utility-first CSS for styling           |
| Vercel           | Deployment + Hosting                    |

---

## 📂 Folder Structure
```
Prep_Wise/
│
├── app/            # Application routes (Next.js App Router)
├── components/     # Reusable UI components (e.g., cards, layout)
├── constants/      # Static constants and config values
├── firebase/       # Firebase setup and helper functions
├── lib/            # Utility functions (e.g., Gemini, Vapi logic)
├── public/         # Static assets (icons, images, manifest)
├── types/          # TypeScript types and interfaces
│
├── .idea/          # IDE-specific settings (optional)
├── .gitignore      # Git ignored files
├── README.md       # Project documentation
├── package.json    # NPM dependencies and scripts
├── tsconfig.json   # TypeScript configuration
├── next.config.ts  # Next.js project configuration
├── postcss.config.mjs  # PostCSS config for Tailwind
├── eslint.config.mjs   # ESLint setup
```

---

## ⚙️ .env.local Example

Here’s a sample of the environment variables you might need to run the project:

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID="your_project_id"
FIREBASE_PRIVATE_KEY="your_private_key"
FIREBASE_CLIENT_EMAIL="your_client_email"

# Gemini (Google Generative AI)
GOOGLE_GENERATIVE_AI_API_KEY="your_gemini_api_key"

# Vapi AI (Voice Agent)
NEXT_PUBLIC_VAPI_WEB_TOKEN="your_vapi_web_token"
NEXT_PUBLIC_VAPI_WORKFLOW_ID="your_vapi_workflow_id"
```

---

## 🚀 Getting Started Locally

```
# 1. Clone the repository
https://github.com/Goyam02/Prep_Wise.git
cd Prep_Wise

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env.local
# Fill in your API keys and config

# 4. Start development server
npm run dev
```

---

## 🔮 Upcoming Features
	•	📊 Analytics Dashboard – visualize your improvement over time
	•	🧩 Topic-specific Interviews – e.g., DSA, system design, HR
	•	🔁 Re-attempt Previous Interviews
	•	📤 Export Feedback as PDF

---

## 🤝 Contributing

- Pull requests and feedback are welcome!
	1.	Fork the repository
	2.	Create your feature branch: git checkout -b feature/feature-name
	3.	Commit your changes: git commit -m 'Add some feature'
	4.	Push to the branch: git push origin feature/feature-name
	5.	Open a pull request

---

## 📬 Contact

Made with 💙 by [GOYAM JAIN](https://github.com/Goyam02/)
- 🌐 [LinkedIn](www.linkedin.com/in/goyam02)
- 📧 goyamjain02@gmail.com


## 🌟 Show Your Support
```
If you like this project:

⭐ Star the repository
🔁 Share with your network
🗣️ Give feedback or contribute!


