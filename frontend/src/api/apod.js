// api/apod.js
import axios from 'axios';

// In-memory cache (resets on cold starts, but helps within same instance)
let cached = null;
let cachedDate = null;

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Or specify your domain
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const today = new Date().toISOString().slice(0, 10);

  // Return cached data if it's from today
  if (cached && cachedDate === today) {
    return res.status(200).json(cached);
  }

  try {
    // Use environment variable from Vercel
    const apiKey = process.env.NASA_API_KEY;
    
    if (!apiKey) {
      throw new Error('NASA_API_KEY not configured');
    }

    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
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

    // Cache the result
    cached = result;
    cachedDate = today;

    return res.status(200).json(result);
  } catch (err) {
    console.error('NASA API error:', err.message);
    return res.status(500).json({ error: 'Failed to fetch APOD' });
  }
}