import { useState, useEffect } from 'react';
import axios from 'axios';

const NasaPod = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use the full URL to your Render backend
      const response = await axios.get('https://nasapod-1.onrender.com/api/apod', {
        timeout: 60000 // Wait up to 60s for Render to wake up
      });
      setData(response.data);
    } catch (err) {
      console.error("Backend wake-up in progress...", err);
      setError("The cosmic engines are warming up (Render cold start). This usually takes 30-60 seconds...");
      
      // Automatic retry once after 5 seconds if it fails
      if (retryCount < 1) {
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchData();
        }, 5000);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. Loading State (With Tailwind Animation)
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
      <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      <p className="text-gray-600 animate-pulse">🚀 Waking up the star-gazer...</p>
    </div>
  );
  
  // 2. Error/Retry State
  if (error && !data) return (
    <div className="p-10 text-center border-2 border-gray-300 border-dashed rounded-xl">
      <p className="font-medium text-orange-600">{error}</p>
      <button 
        onClick={fetchData} 
        className="px-6 py-2 mt-4 text-white transition-all bg-blue-600 rounded-full hover:bg-blue-700"
      >
        Try Connection Again
      </button>
    </div>
  );

  // 3. Success State
  return (
    <div className="max-w-3xl p-6 mx-auto my-8 bg-white shadow-lg rounded-2xl">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">{data.title}</h1>
      
      {data.media_type === 'video' ? (
        <iframe src={data.url} className="w-full rounded-lg aspect-video" title={data.title} />
      ) : (
        <img 
          src={data.url} 
          alt={data.title} 
          className="w-full h-auto rounded-lg shadow-md mb-6 hover:scale-[1.01] transition-transform" 
        />
      )}
      
      <div className="p-4 rounded-lg bg-gray-50">
        <p className="mb-2 text-sm tracking-widest text-gray-500 uppercase">{data.date}</p>
        <p className="text-lg leading-relaxed text-gray-700">{data.explanation}</p>
        {data.copyright && (
          <p className="mt-4 text-xs italic text-gray-400">© {data.copyright}</p>
        )}
      </div>
    </div>
  );
};

export default NasaPod;