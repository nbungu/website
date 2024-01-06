// /home/pi/website/server/server.js

// Generally, in order to run your React app with your Node Express API back-end on your localhost server, you would usually need to run commands like npm start for both the front-end and the back-end.
// localhost:3001 is pi.local:3001 (or IP of Raspberry)

const express = require("express");
const cors = require("cors");
const compression = require("compression"); // reducing the time required for the client to get and load the page
const helmet = require("helmet"); // Helmet to protect against well known vulnerabilities
const rateLimit = require("express-rate-limit"); // express-rate-limit: middleware package that can be used to limit repeated requests to APIs and endpoints
const path = require("path");

const MODE = process.env.NODE_ENV;
const PORT = process.env.PORT;

// Set up rate limiter: maximum of 500 requests per minute
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 500,
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
app.use(helmet.contentSecurityPolicy({ // Use helmet middleware with contentSecurityPolicy (CSP)
  directives: {
    defaultSrc: ["'self'", "*.google.com", "*.googleapis.com"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https:", "blob:", "code.jquery.com", "cdn.jsdelivr.net", "*.googleapis.com", "*.google.com"], // Adjust as needed
    connectSrc: ["'self'", "eisbuaba-adelberg.de"],
    imgSrc: ["'self'", "eisbuaba-adelberg.de", "data:"],
  },
}));

/* -----ROUTES----- */

// Creates endpoint for route localhost:3001/status and handles GET requests to that route
app.get("/status", (req, res) => {
  res.json({ message: status });
});

// express-rate-limit Test endpoints
app.get('/ip', (request, response) => response.send(request.ip))
app.get('/x-forwarded-for', (request, response) => response.send(request.headers['x-forwarded-for']))

// Catch all requests that don't match any route
// For deployment, The entire React application will serve through the entry point 'client/build/index.html'
app.get('/*', (req, res) => {
  const filePath = path.join(__dirname, '../client/build/index.html');
  res.sendFile(filePath);
});

/* -----LISTEN----- */

// if in production use the port 3000 for server otherwise 3001
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
  if (MODE === 'production') console.log(`Server runs in ${MODE} mode and serves static build-files from client folder`);
  else console.log(`Server running in ${MODE} mode. React frontend runs on separate Port (3000)`);
});

let status =
  {
    serverMode: MODE,
    serverPort: PORT,
    frontendBuildPath: path.join(__dirname, '../client/build/index.html'),
  };

// For dynamic Meta-Tags we need to change the default metadata before the page is rendered.
// Otherwise the initial values will always stay the same, even after frontend page change.
/*
React is a single-page app, which means the app will have only a single HTML file
and every route will be loaded into the same HTML file with the help of Javascript.
*/
