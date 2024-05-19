// finalList.js

// app.js
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');
const cors = require('cors');
const finalList = require('./finalList');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));

// ITESOFT CaaS API endpoint
const caasEndpoint = 'https://caas.itesoft.cloud/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';

// ITESOFT API Key
const apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

// Endpoint for document extraction
app.post('/extract', async (req, res) => {
  try {
    // Make a request to ITESOFT CaaS API
    const response = await fetch(caasEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/pdf',
        'X-Gravitee-Api-key': apiKey,
      },
      body: req.body,
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`CaaS API request failed with status ${response.status}`);
    }

    // Parse the response
    const data = await response.json();

    // Extract values based on finalList
    const extractedData = {};

    // Iterate over finalList and filter the extracted data
    finalList.forEach((section) => {
      section.fields.forEach((field) => {
        // Check if the key exists in the data before extracting
        if (field.key in data) {
          extractedData[field.name] = data[field.key];
        }
      });
    });

    // Send the extracted data as the response
    res.json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

