// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// Loading component
const Loading = () => (
  <div className="flex justify-center items-center bg-white p-4 min-h-screen text-gray-700 text-3xl sm:text-4xl">
    Loading NASA APOD...
  </div>
);

// Error component
const Error = () => (
  <div className="flex justify-center items-center bg-white p-4 min-h-screen">
    <div className="bg-red-50 shadow-lg p-8 border border-red-200 rounded-xl text-gray-800 text-left">
      <h1 className="font-bold text-3xl">Error Loading APOD Data</h1>
      <p className="mt-2 text-xl">Failed to fetch NASA data. Please try again later.</p>
    </div>
  </div>
);

// Media component
const MediaDisplay = ({ mediaType, url, hdurl, title }) => {
  const mediaClasses = "w-full max-w-full rounded-lg shadow-xl border border-gray-200";

  if (mediaType === "video") {
    return (
      <iframe
        src={url}
        title={title}
        className={`${mediaClasses} aspect-video`}
        allowFullScreen
      />
    );
  }

  return (
    <img
      src={hdurl || url}
      alt={title}
      className={`${mediaClasses} object-contain`}
      loading="lazy"
    />
  );
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.DEV
      ? "http://localhost:5009/api/apod"
      : "https://nasapod-1.onrender.com/api/apod";

    axios
      .get(apiUrl)
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <div className="flex justify-center bg-white px-4 sm:px-6 lg:px-8 py-6 min-h-screen font-body">
      <div className="w-full max-w-5xl">

        {/* Page Title */}
        <h1 className="mb-0 font-head font-medium text-gray-700 text-2xl sm:text-4xl text-left tracking-wide">
          Astronomy Picture of the Day
        </h1>

        {/* Logo + Date */}
        <div className="flex items-center gap-4 mb-4">
          <img src="/nasa.png" alt="NASA Logo" className="w-24 h-auto" />
          <p className="text-gray-700 text-2xl">{data.date}</p>
        </div>

        {/* Title */}
        <h2 className="mb-4 max-w-[50ch] font-head font-semibold text-gray-950 text-4xl sm:text-5xl leading-tight">
          {data.title}
        </h2>

        {/* Media */}
        <div className="mb-6 w-full">
          <MediaDisplay
            mediaType={data.media_type}
            url={data.url}
            hdurl={data.hdurl}
            title={data.title}
          />
        </div>

        {/* Explanation aligned with date on laptop, full width on mobile */}
        <div className="ml-0 md:ml-28 max-w-[40ch] font-sans text-gray-800 text-lg sm:text-xl leading-normal">
          <h3 className="mb-2 font-sans text-gray-500 text-3xl">Explanation</h3>
          <p className="text-lg leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Georgia, serif' }}>{data.explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
