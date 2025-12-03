import axios from 'axios';

let cached = null;
let cachedDate = null;

export async function fetchApod() {
  const today = new Date().toISOString().slice(0, 10);

  if (cached && cachedDate === today) {
    return cached;
  }

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
  return result;
}
