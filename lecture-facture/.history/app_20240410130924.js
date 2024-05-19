const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');
const cors = require('cors');
const mimeTypes = require('mime-types');
const fs = require('fs');

const app = express();
const port = 3030;

app.use(cors());
app.use(bodyParser.raw({ limit: '10mb', type: '*/*' }));

const caasEndpoint = 'https://caas.itesoft.cloud/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
const apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

const fieldsToExtract = [
  { name: 'Document Date', key: 'DOCUMENT_DATE' },
  { name: 'Full Name', key: 'FULL_NAME' },
  { name: 'Postal Address', key: 'POSTAL_ADDRESS' },
  { name: 'Street', key: 'STREET' },
  { name: 'Zip Code and Town', key: 'ZIPCODE_AND_TOWN' },
];

const extractFieldData = (dataExtract, fieldKey) => {
  const fieldData = dataExtract.find(extract => extract.code === fieldKey);
  return fieldData ? fieldData.value : null;
};

let idCounter = 0; // Initialize ID counter

const generateId = () => {
  idCounter++; // Increment the counter
  return idCounter; // Return the counter value as the ID
};

// Extract data and store in extractedData.json
app.post('/extract', async (req, res) => {
  try {
    const contentType = mimeTypes.lookup(req.body);

    const response = await fetch(caasEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'X-Gravitee-Api-key': apiKey,
      },
      body: req.body,
    });

    if (!response.ok) {
      throw new Error(`CaaS API request failed with status ${response.status}`);
    }

    const data = await response.json();

    const extractedData = data.documents.map(documentInfo => {
      const dataExtract = documentInfo.dataExtract;
      const fieldValues = fieldsToExtract.reduce((result, field) => {
        result[field.key] = extractFieldData(dataExtract, field.key);
        return result;
      }, {});

      return {
        id: generateId(), // Generate ID for the document
        pageIdList: documentInfo.pageIdList,
        classes: documentInfo.classes.map(classInfo => classInfo.code),
        fieldValues,
      };
    });

    let existingData = [];
    if (fs.existsSync('extractedData.json')) {
      try {
        const jsonData = fs.readFileSync('extractedData.json', 'utf8');
        if (jsonData.trim() !== '') {
          existingData = JSON.parse(jsonData);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
      }
    }

    fs.writeFileSync('extractedData.json', JSON.stringify([...existingData, ...extractedData], null, 2));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all extracted data
app.get('/extractedData', (req, res) => {
  try {
    const jsonData = fs.readFileSync('extractedData.json', 'utf8');
    const extractedData = JSON.parse(jsonData);
    res.json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get extracted data by ID
app.get('/extractedData/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const jsonData = fs.readFileSync('extractedData.json', 'utf8');
    const extractedData = JSON.parse(jsonData);
    const data = extractedData.find(item => item.id === id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update extracted data by ID
app.put('/extractedData/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const newData = req.body;

    let jsonData = fs.readFileSync('extractedData.json', 'utf8');
    let extractedData = JSON.parse(jsonData);
    const index = extractedData.findIndex(item => item.id === id);
    if (index !== -1) {
      extractedData[index] = { ...extractedData[index], ...newData };
      fs.writeFileSync('extractedData.json', JSON.stringify(extractedData, null, 2));
      res.json({ message: 'Data updated successfully' });
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete extracted data by ID
app.delete('/extractedData/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);

    let jsonData = fs.readFileSync('extractedData.json', 'utf8');
    let extractedData = JSON.parse(jsonData);
    extractedData = extractedData.filter(item => item.id !== id);
    fs.writeFileSync('extractedData.json', JSON.stringify(extractedData, null, 2));
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
