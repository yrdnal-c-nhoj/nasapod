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
  'http://localhost:5174',             // local dev (alternative port)
  'http://localhost:5175',             // local dev (alternative port)
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
    if (!process.env.NASA_API_KEY) {
      console.error('NASA_API_KEY is missing from environment');
      return res.status(500).json({ error: 'NASA_API_KEY not configured on server' });
    }
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`;
    console.log('Fetching from NASA API...');
    const { data } = await axios.get(url, { 
      timeout: 10000, // Reduced timeout to 10 seconds
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'nasapod-app/1.0'
      }
    });

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
    if (err.response) {
      console.error('NASA API response status:', err.response.status);
      console.error('NASA API response data:', err.response.data);
    }
    
    // Return fallback data when NASA API is unavailable
    const fallbackData = {
      date: new Date().toISOString().slice(0, 10),
      title: "A Beautiful Nebula",
      explanation: "This is a fallback image since we couldn't connect to the NASA API. The actual app would show the Astronomy Picture of the Day here.",
      url: "https://apod.nasa.gov/apod/image/2208/STScI-01_WebbImage-FirstDeepField.png",
      hdurl: "https://apod.nasa.gov/apod/image/2208/STScI-01_WebbImage-FirstDeepField.png",
      media_type: "image",
      copyright: "NASA/ESA/CSA/STScI"
    };

    cachedAPOD = fallbackData;
    cachedDate = today;

    console.log('Returning fallback data due to NASA API unavailability');
    res.json(fallbackData);
  }
});

// ---------- Start server ----------
const PORT = process.env.PORT || 5009;
app.listen(PORT, () => {
  console.log(`🚀 nasapod backend running on port ${PORT}`);
});
