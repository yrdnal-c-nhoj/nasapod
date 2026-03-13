import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

// --- ADD THIS SECTION ---
app.get('/healthcheck', (req, res) => {
  res.status(200).send('Server is alive and kicking!');
});
// ------------------------

app.get('/api/apod', async (req, res) => {
  try {
    const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    // Return mock data when NASA API fails
    const mockData = {
      date: "2024-03-12",
      title: "Mock APOD - Galaxy Cluster",
      explanation: "This is a mock image of a galaxy cluster. In reality, NASA's APOD service is currently experiencing rate limiting issues with the demo key. This allows you to test your frontend application while the NASA API is unavailable.",
      url: "https://picsum.photos/800/600",
      hdurl: "https://picsum.photos/1920/1080",
      media_type: "image",
      copyright: "Mock Data"
    };
    res.json(mockData);
  }
});

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));