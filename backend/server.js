import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes (to be imported)
// import authRoutes from './routes/auth.js';
// import progressRoutes from './routes/progress.js';
// import aiRoutes from './routes/ai.js';
// import searchRoutes from './routes/search.js';

// app.use('/api/auth', authRoutes);
// app.use('/api/progress', progressRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/search', searchRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ BrainBit backend running on http://localhost:${PORT}`);
});
