import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors()); // Allows your React app to talk to this server

app.get('/api/apod', async (req, res) => {
  try {
    const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch from NASA' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));