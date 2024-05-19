const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');
const cors = require('cors');
const mimeTypes = require('mime-types');
const fs = require('fs'); // Import the 'fs' module

const app = express();
const port = 3027;

// Middleware
app.use(cors());
app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));

// ITESOFT CaaS API endpoint
const caasEndpoint = 'https://caas.itesoft.cloud/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';

// ITESOFT API Key
const apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

// Define the fields you want to extract
const fieldsToExtract = [
  { name: 'Document Date', key: 'DOCUMENT_DATE' },
  { name: 'Full Name', key: 'FULL_NAME' },
  { name: 'Postal Address', key: 'POSTAL_ADDRESS' },
  { name: 'Street', key: 'STREET' },
  { name: 'Zip Code and Town', key: 'ZIPCODE_AND_TOWN' },
];

// Function to extract data for specific fields
const extractFieldData = (dataExtract, fieldKey) => {
  const fieldData = dataExtract.find(extract => extract.code === fieldKey);
  return fieldData ? fieldData.value : null;
};







app.post('/extract', async (req, res) => {
  try {
    // Determine the content type using 'mime-types' library
    const contentType = mimeTypes.lookup(req.body);

    // Make a request to ITESOFT CaaS API
    const response = await fetch(caasEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
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

    // Log the entire data object for debugging
    console.log('Full Data:', data);

    // Extract data for specified fields from 'documents'
    const extractedData = data.documents.map(documentInfo => {
      const dataExtract = documentInfo.dataExtract;
      const fieldValues = fieldsToExtract.reduce((result, field) => {
        result[field.key] = extractFieldData(dataExtract, field.key);
        return result;
      }, {});

      return {
        pageIdList: documentInfo.pageIdList,
        classes: documentInfo.classes.map(classInfo => classInfo.code),
        fieldValues,
      };
    });

    // Log the extracted data for specified fields
    console.log('Extracted Data for Specified Fields:', extractedData);

    // Append the extracted data to extractedData.json file
    const existingData = fs.existsSync('extractedData.json') ? JSON.parse(fs.readFileSync('extractedData.json')) : [];
    fs.writeFileSync('extractedData.json', JSON.stringify([...existingData, ...extractedData], null, 2));

    // Send the entire data object as the response
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
