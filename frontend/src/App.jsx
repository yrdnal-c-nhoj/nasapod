import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
useEffect(() => {
  const apiUrl = import.meta.env.DEV
    ? 'http://localhost:5009/api/apod'            // Dev
    : 'https://nasapod-wgk6.onrender.com/api/apod'; // Prod

  axios.get(apiUrl)
    .then(res => setData(res.data))
    .catch(err => {
      console.error("Fetch Error:", err);
      setError(true);
    })
    .finally(() => setLoading(false));
}, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-2 text-3xl bg-blue-900 sm:text-4xl">
        Loading nasapod...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen p-10 text-center bg-blue-100">
        <div className="p-8 text-gray-800 border border-red-200 bg-red-50 rounded-xl">
          <h1 className="text-3xl font-bold">Error Loading APOD Data</h1>
          <p className="mt-2 text-xl">
            Failed to fetch NASA APOD data. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="items-center min-h-screen">
      {/* MAIN TITLE */}
      <h1 className="px-0 mb-0">NASA</h1>
      <h1 className="px-0 mb-0">Picture of the Day</h1>

      {/* DATE */}
      <p className="px-0 mb-0">{data.date}</p>

      {/* APOD TITLE */}
      <h2 className="px-0 mb-0">{data.title}</h2>

      {/* MEDIA */}
      {data.media_type === 'video' ? (
        <div className="w-full max-w-full px-0 mx-0 mb-0 sm:max-w-3xl md:max-w-4xl sm:px-6">
          <iframe
            src={data.url}
            className="w-full h-64 rounded-none shadow-lg xs:h-72 sm:h-80 md:h-96"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="flex w-full max-w-full px-0 mx-auto mb-0 sm:max-w-3xl md:max-w-4xl sm:px-6">
          <img
            src={data.hdurl}
            alt={data.title}
            className="object-contain max-w-full max-h-[80vh] rounded-none shadow-none"
            style={{
              width: 'auto',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '70vh',
            }}
          />
        </div>
      )}

      {/* EXPLANATION */}
      <p className="px-0 mb-0">{data.explanation}</p>
    </div>
  );
}

export default App;