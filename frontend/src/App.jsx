// src/App.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// Loading component
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen p-4 text-3xl bg-blue-100 sm:text-4xl">
    Loading NASA APOD...
  </div>
);

// Error component
const Error = () => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-blue-100">
    <div className="p-8 text-left text-gray-800 border border-red-200 bg-red-50 rounded-xl">
      <h1 className="text-3xl font-bold">Error Loading APOD Data</h1>
      <p className="mt-2 text-xl">
        Failed to fetch NASA data. Please try again later.
      </p>
    </div>
  </div>
);

// Media component
const MediaDisplay = ({ mediaType, url, hdurl, title }) => {
  if (mediaType === "video") {
    return (
      <iframe
        src={url}
        title={title}
        className="w-full h-64 max-w-full rounded shadow-lg sm:h-80 md:h-96"
        allowFullScreen
      />
    );
  }

  return (
    <img
      src={hdurl}
      alt={title}
      className="object-contain max-w-full rounded shadow"
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
      ? "http://localhost:5009/api/apod" // Dev
      : "https://nasapod-wgk6.onrender.com/api/apod"; // Prod

    axios
      .get(apiUrl)
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Fetch Error:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error || !data) return <Error />;

  return (
    <div className="flex justify-center min-h-screen p-4 bg-blue-100">
      {/* Inner container width matches image */}
      <div className="flex flex-col items-start w-full max-w-[90vw]">
        {/* TITLE */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src="/nasa.webp"
            alt="NASA Logo"
            className="w-16 h-auto sm:w-20"
          />
          <div>
            <h1 className="text-4xl font-bold">NASA</h1>
            <h3 className="text-xl sm:text-2xl">Astronomy Picture of the Day</h3>
          </div>
        </div>

        {/* DATE */}
        <p className="mt-2 text-gray-700">{data.date}</p>

        {/* APOD TITLE */}
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">{data.title}</h2>

        {/* MEDIA */}
        <div className="flex justify-center w-full my-4">
          <MediaDisplay
            mediaType={data.media_type}
            url={data.url}
            hdurl={data.hdurl}
            title={data.title}
          />
        </div>

        {/* EXPLANATION */}
        <p className="mt-4 text-gray-800" style={{ maxWidth: "100%" }}>
          {data.explanation}
        </p>
      </div>
    </div>
  );
}

export default App;
