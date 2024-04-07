const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define the proxy middleware
const apiProxy = createProxyMiddleware('/api', {
  target: 'https://caas.itesoft.cloud/',
  changeOrigin: true,
  logLevel: 'debug'
});

// Log requests and target URLs
app.use('/api', (req, res, next) => {
  // // Skip logging for OPTIONS requests
  // if (req.method === 'OPTIONS') {
  //   next();
  //   return;
  // }

  console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
  if (apiProxy && apiProxy.options && apiProxy.options.target) {
    console.log(`Proxying to: ${apiProxy.options.target}`);
  } else {
    console.log('Proxy middleware is not properly initialized.');
  }
  next();
});

// Use the proxy middleware for requests to /api
app.use('/api', apiProxy);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
