// /home/pi/website/server/index.js

// How To Run React Front-end + Express Back-end Concurrently
//https://medium.com/technology-hits/how-to-run-react-front-end-express-back-end-concurrently-22b9922e5df7

// Generally, in order to run your React app with your Node Express API back-end on your localhost server, you would usually need to run commands like npm start for both the front-end and the back-end.

// localhost:3001 is pi.local:3001 (or IP of Raspberry)

const express = require("express");

// Run server (backend) on Port 3001
const PORT = process.env.PORT || 3001;

const app = express();

// Creates endpoint for route localhost:3001/api and handles GET requests to that route
app.get("/api", (req, res) => {
    res.json({ message: "Backend is ONLINE!" });
});

// Creates endpoint for route localhost:3001/api and handles GET requests to that route
app.get("/api/news", (req, res) => {
  res.json({ message: newsEntries });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

// TEST Content from NODE server
/*
Deprecated: Use Strapi.io as CMS to handle API endpoint requests and serve Content like below

Strapi has a UI and built in SQLiteDB to store the content

images under client/public/image.jpg

*/
let newsEntries = [
  {
    title: "Breaking News: Exciting Event",
    titleLink: "exciting-event",
    imagePath: "./images/DSC_0262-1.jpg",
    date: "01.02.2023",
    summary: "A major event is happening in the city, drawing crowds from all around.",
    fullText: "In a surprising turn of events, a spectacular festival is taking place in the heart of the city. The streets are filled with joyous celebrations, live performances, and a variety of activities for people of all ages."
  },
  {
    title: "New Scientific Discovery Unveiled",
    titleLink: "New-Scientific-Discovery-Unveiled",
    date: "01.02.2023",
    imagePath: "./images/DSC_0263-2.jpg",
    summary: "Scientists make groundbreaking discovery in the field of technology.",
    fullText: "In a recent breakthrough, scientists have unveiled a new technological advancement that promises to revolutionize the way we interact with machines. The discovery is expected to have far-reaching implications for various industries."
  },
  {
    title: "Local Sports Team Wins Championship",
    titleLink: "Local-Sports-Team-Wins-Championship",
    date: "01.02.2023",
    imagePath: "./images/DSC_0264-3.jpg",
    summary: "Celebrations ensue as the local sports team secures a historic championship victory.",
    fullText: "The local sports team has emerged victorious in a thrilling championship match. Fans are rejoicing as the team secured a historic win, marking a significant milestone in the city's sports history."
}];