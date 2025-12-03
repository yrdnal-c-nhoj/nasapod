// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// ---------- CORS ----------
const allowedOrigins = [
  'http://localhost:5173',             // local dev
  'https://nasapod-five.vercel.app'   // your deployed frontend
];

app.use(cors({
  origin: (origin, callback) => {
    console.log('Incoming request origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked for origin: ${origin}`));
    }
  }
}));

// ---------- Request logging ----------
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ---------- APOD caching ----------
let cachedAPOD = null;
let cachedDate = null;

app.get('/api/apod', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  if (cachedAPOD && cachedDate === today) {
    return res.json(cachedAPOD);
  }

  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    const { data } = await axios.get(url);

    const apodData = {
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl || data.url,
      media_type: data.media_type,
      copyright: data.copyright || null
    };

    cachedAPOD = apodData;
    cachedDate = today;

    res.json(apodData);
  } catch (err) {
    console.error('NASA API fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch APOD data' });
  }
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5009;
app.listen(PORT, () => {
  console.log(`🚀 nasapod backend running on port ${PORT}`);
});
