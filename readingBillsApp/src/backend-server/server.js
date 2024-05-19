const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Define the proxy middleware
const apiProxy = createProxyMiddleware('/api', {
  target: 'https://caas.itesoft.cloud/',
  changeOrigin: true,
  logLevel: 'debug'
});

app.use('/api', apiProxy);

const dataRoutes = require('./routes/routes.js');
app.use('/json', dataRoutes);

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
