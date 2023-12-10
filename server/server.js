// /home/pi/website/server/server.js

// Generally, in order to run your React app with your Node Express API back-end on your localhost server, you would usually need to run commands like npm start for both the front-end and the back-end.
// localhost:3001 is pi.local:3001 (or IP of Raspberry)

const express = require("express");
const cors = require("cors");
const compression = require("compression"); // reducing the time required for the client to get and load the page
const helmet = require("helmet"); // Helmet to protect against well known vulnerabilities
const rateLimit = require("express-rate-limit"); // express-rate-limit: middleware package that can be used to limit repeated requests to APIs and endpoints
const path = require("path");

// Run server (backend) on Port 3001
//const PORT = process.env.PORT || 3000;

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT;

// Set up rate limiter: maximum of 60 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60,
});

// Create the Express application object
const app = express();

// set this when behind a rp proxy (for express-rate-limit to work properly)
app.set('trust proxy', 1)

/* -----MIDDLEWARES----- */

app.use(express.static(path.join(__dirname, '../client/build'))); // Serve static files from the 'build' directory inside the 'client' folder
app.use(limiter); // Apply rate limiter to all requests
app.use(cors());
app.use(compression()); // Compress all routes
app.use( 
  helmet.contentSecurityPolicy({
    directives: { "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"], },
  }),
);

/* -----ROUTES----- */

// Creates endpoint for route localhost:3001/api and handles GET requests to that route
app.get("/status", (req, res) => {
  res.json({ message: "Backend is ONLINE!" });
});

app.get("/mode", (req, res) => {
  res.json({ message: `${MODE}`});
});

// express-rate-limit Test endpoints
app.get('/ip', (request, response) => response.send(request.ip))
app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']))

// Catch all requests that don't match any route
// For deployment, The entire React application will serve through the entry point 'client/build/index.html'
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

/* -----LISTEN----- */

// if in production use the port 3000 for server
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  if (MODE === 'production') console.log(`Server runs in ${MODE} mode and serves static build-files from client folder`);
  else console.log(`Server running in ${MODE} mode. React frontend runs on separate Port (3000)`);
});


/* TEST Content from NODE server

Deprecated: Use Strapi.io as CMS to handle API endpoint requests and serve Content like below
Strapi has a UI and built in SQLiteDB to store the content

// Creates endpoint for route localhost:3001/api and handles GET requests to that route
app.get("/api/news", (req, res) => {
  res.json({ message: newsEntries });
});

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
*/