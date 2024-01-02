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
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "code.jquery.com", "cdn.jsdelivr.net"], // Adjust as needed
    connectSrc: ["'self'", 'eisbuaba-adelberg.de'],
    imgSrc: ["'self'", 'eisbuaba-adelberg.de'],
  },
}));

/* -----ROUTES----- */

// Server-Side-Rendering to update Meta Tags of index.html
app.get('/news', (req, res) => {
  const htmldata = createHtmlData(
      'News > Eisbuaba Adelberg',
      'Alle News und Updates der Eisbuaba Adelberg',
      '/share-image-news.webp',
      'https://eisbuaba-adelberg.de/news'
  );
  res.send(htmldata);
})

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
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
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

// For dynamic Meta-Tags. Changes the default metadata before the page is rendered.
// Otherwise the initial values will always stay the same, even after frontend page change.
/*
React is a single-page app, which means the app will have only a single HTML file
and every route will be loaded into the same HTML file with the help of Javascript.
*/
function createHtmlData(title, desc, imgPath, url) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="icon" href="%PUBLIC_URL%/favicon.ico"/>
      <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Homepage des Eishockey-Teams der Eisbuaba Adelberg"/>
      <meta name="keywords" content="Eishockey, Hockey, Adelberg, Eisbuaba, Eisbuaba Adelberg, Hockeyverein, Schorndorf, Schlichten, ASV Schlichten">
      <meta name="generator" content="Strapi CMS">
      <title>${title}</title>
      <meta property="og:title" content=${title}/>
      <meta property="og:description" content=${desc} />
      <meta property="og:url" content=${url}/>
      <meta property="og:type" content="website" />
      <meta property="og:image" content=${imgPath}/>
      <meta property="og:image:width" content="1024" /> 
      <meta property="og:image:height" content="512" />
      <meta property="og:site_name" content="Eisbuaba Adelberg" />
      <meta property="og:locale" content="de_DE" />
      <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root"></div>
    </body>
  </html>
`;
}