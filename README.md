# 🧠 BrainBit — Multicheck® ICT Study Suite

A comprehensive, unified study platform for preparing the **Multicheck® ICT exam** (Informatiker/in EFZ Applikationsentwicklung).

## Features

- ✅ **Unified Dashboard** — 6 study categories in one place
- ✅ **IA Integration** — Claude tutor + Hugging Face analysis
- ✅ **Real-time Search** — Internet lookup integrated
- ✅ **Authentication** — Secure login with password
- ✅ **Progress Sync** — Study on any device
- ✅ **AI Exercise Generation** — Infinite practice variations

## Tech Stack

### Frontend
- **Framework:** React 18 + TypeScript
- **State:** Zustand
- **Styling:** CSS + Tailwind (future)
- **Bundler:** Vite

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** Supabase (PostgreSQL)
- **Auth:** JWT + Supabase Auth
- **Deployment:** Railway / Render

### AI & External APIs
- **Chat Tutor:** Claude API
- **Analysis:** Hugging Face Embeddings
- **Search:** SerpAPI
- **Models:** Hugging Face Hub

## Project Structure

```
BrainBit/
├── frontend/              # React SPA
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── api/          # API client functions
│   │   ├── hooks/        # Custom React hooks
│   │   ├── utils/        # Utilities
│   │   └── styles/       # Global styles
│   └── index.html
│
├── backend/               # Express API
│   ├── routes/           # API endpoints
│   ├── models/           # Data models
│   ├── middleware/       # Express middleware
│   ├── utils/            # Helper functions
│   └── server.js         # Entry point
│
└── docs/                 # Documentation
    └── API.md           # API reference
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier works)
- Claude API key (free tier available for students)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd BrainBit
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your credentials
   npm run dev
   ```

3. **Frontend Setup** (new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Development Roadmap

### Phase 1: Scaffolding ✅
- [x] Project structure
- [x] Frontend + backend boilerplate
- [ ] Vercel + Railway setup

### Phase 2: Unification UI (in progress)
- [ ] Migrate 6 app components
- [ ] Unified navigation
- [ ] Design system

### Phase 3: Authentication
- [ ] Login/Register
- [ ] Session management
- [ ] Legacy data import

### Phase 4: AI Integration
- [ ] Chat tutor (Claude)
- [ ] Weakness analysis (HF embeddings)
- [ ] Exercise generation

### Phase 5: Search + Sync
- [ ] Internet search integration
- [ ] Real-time progress sync
- [ ] Cross-device support

## License

Private project for educational use.

---

**Made with 🧠 for the Multicheck® ICT exam**