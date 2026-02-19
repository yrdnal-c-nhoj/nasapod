// ping.js
setInterval(() => {
  fetch("https://portfolio-e5ed.onrender.com")
    .then(res => console.log(`Pinged! Status: ${res.status}`))
    .catch(err => console.error("Ping failed:", err));
}, 5 * 60 * 1000); // every 5 minutes

console.log("Ping service started — hitting https://portfolio-e5ed.onrender.com every 5 minutes");