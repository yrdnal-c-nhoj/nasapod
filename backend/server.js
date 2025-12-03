
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// THIS LINE MUST BE HERE — THIS IS WHAT FIXES CORS
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Optional: see every request in terminal (helps debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

let cached = null;
let cachedDate = null;

app.get('/api/apod', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);

  if (cached && cachedDate === today) {
    return res.json(cached);
  }

  try {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    const { data } = await axios.get(url);

    const result = {
      date: data.date,
      title: data.title,
      explanation: data.explanation,
      url: data.url,
      hdurl: data.hdurl || data.url,
      media_type: data.media_type,
      copyright: data.copyright || null
    };

    cached = result;
    cachedDate = today;
    res.json(result);
  } catch (err) {
    console.error('NASA API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});

const PORT = 5009;
app.listen(PORT, () => {
  console.log(`nasapod backend RUNNING on http://localhost:${PORT}`);
  console.log(`CORS enabled for http://localhost:5173`);
});