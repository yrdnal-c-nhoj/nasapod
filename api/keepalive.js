// /api/keepalive.js
export default async function handler(req, res) {
  try {
    const response = await fetch('https://your-backend-url.vercel.app/api/apod');
    if (!response.ok) throw new Error('Failed to ping backend');
    res.status(200).json({ status: 'success', message: 'Keep-alive ping successful' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
