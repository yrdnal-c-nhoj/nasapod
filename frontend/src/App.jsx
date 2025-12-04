// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen p-4 text-3xl text-gray-700 bg-white sm:text-4xl">
    Loading NASA APOD...
  </div>
);

// Error component
const Error = () => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-white">
    <div className="p-8 text-left text-gray-800 border border-red-200 shadow-lg bg-red-50 rounded-xl">
      <h1 className="text-3xl font-bold">Error Loading APOD Data</h1>
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
      : "https://nasapod-wgk6.onrender.com/api/apod";

    axios
      .get(apiUrl)
      .then((res) => setData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <div className="flex justify-center min-h-screen px-4 py-6 bg-white sm:px-6 lg:px-8 font-body">
      <div className="w-full max-w-5xl">

        {/* Page Title */}
        <h1 className="mb-0 text-2xl font-medium tracking-wide text-left text-gray-700 sm:text-4xl font-head">
          Astronomy Picture of the Day
        </h1>

        {/* Logo + Date */}
        <div className="flex items-center gap-4 mb-4">
          <img src="/nasa.webp" alt="NASA Logo" className="w-24 h-auto" />
          <p className="text-2xl text-gray-700">{data.date}</p>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-4xl leading-tight text-gray-950 sm:text-5xl max-w-[50ch] font-semibold font-head">
          {data.title}
        </h2>

        {/* Media */}
        <div className="w-full mb-6">
          <MediaDisplay
            mediaType={data.media_type}
            url={data.url}
            hdurl={data.hdurl}
            title={data.title}
          />
        </div>

        {/* Explanation aligned with date on laptop, full width on mobile */}
        <div className="ml-0 md:ml-28 text-lg sm:text-xl leading-normal text-gray-800 max-w-[40ch] font-sans">
          <h3 className="mb-2 font-sans text-3xl text-gray-500">Explanation</h3>
          <p className="text-lg leading-relaxed whitespace-pre-line" style={{ fontFamily: 'Georgia, serif' }}>{data.explanation}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
