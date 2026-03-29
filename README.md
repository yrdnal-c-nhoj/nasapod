# NASAPOD - NASA Picture of the Day Explorer

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack MERN application that allows users to explore NASA's Astronomy Picture of the Day (APOD) API.

## 🚀 Features
- **Daily Updates:** Fetches the latest astronomical imagery directly from NASA.
- **Search History:** Persistent storage of previously viewed dates.
- **Responsive Design:** Fully optimized for mobile and desktop viewing.
- **Secure:** Environment variable management for API keys.

## 🌌 Project Motivation
This project was built to bridge the gap between complex astronomical data and the average space enthusiast. By leveraging NASA's open APIs, NASAPOD provides a seamless UI for exploring the wonders of the universe, one day at a time.

## 📸 Preview
> *[Insert a link to a screenshot or GIF of your app here to make it visually appealing!]*

## 🛠️ Tech Stack
- **Frontend:** React, Axios, Autoprefixer (PostCSS)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Environment Management:** Dotenv

## 📋 Prerequisites
Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (Local or Atlas)
- A NASA API Key (Get one at [api.nasa.gov](https://api.nasa.gov/))

## ⚙️ Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/nasapod.git
   cd nasapod
   ```

2. **Setup the Backend:**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NASA_API_KEY=your_api_key_here
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

## 🏃 Running the Application

### Start the Whole App
It is recommended to run the backend first to ensure the API is available.

1. Open a terminal in `backend/` and run `npm run dev`.
2. Open a second terminal in `frontend/` and run `npm start`.

### Start the Server (Development Mode)
In the `backend` directory:
```bash
npm run dev
```
*Note: This project uses `nodemon` to automatically restart the server on file changes.*

### Start the Frontend
In the `frontend` directory:
```bash
npm start
```

## 📂 Project Structure
```text
nasapod/
├── frontend/     # React application
├── backend/      # Node.js/Express API
└── README.md
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📜 License
This project is MIT licensed.

---
*Made with ❤️ for space enthusiasts.*