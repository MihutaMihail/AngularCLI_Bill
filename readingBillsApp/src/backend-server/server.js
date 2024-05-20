const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

// Define the proxy middleware
const apiProxy = createProxyMiddleware('/api', {
  target: 'https://caas.itesoft.cloud/',
  changeOrigin: true,
  logLevel: 'debug'
});

// Import routes
const dataRoutes = require('./routes/dataRoutes');

// Use routes
server.use('/api', apiProxy);
server.use('/data', dataRoutes);

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
