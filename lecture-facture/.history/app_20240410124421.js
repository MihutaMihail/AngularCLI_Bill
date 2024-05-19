const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('cross-fetch');
const cors = require('cors');
const mimeTypes = require('mime-types');
const fs = require('fs');

const app = express();
const port = 3021;

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

app.get('/extractedData', (req, res) => {
  try {
    const extractedData = fs.existsSync('extractedData.json') ? JSON.parse(fs.readFileSync('extractedData.json')) : [];
    res.json(extractedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/extractedData/:id', (req, res) => {
  try {
    const id = req.params.id;
    const extractedData = fs.existsSync('extractedData.json') ? JSON.parse(fs.readFileSync('extractedData.json')) : [];
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

app.delete('/extractedData/:id', (req, res) => {
  try {
    const id = req.params.id;
    let extractedData = fs.existsSync('extractedData.json') ? JSON.parse(fs.readFileSync('extractedData.json')) : [];
    extractedData = extractedData.filter(item => item.id !== id);
    fs.writeFileSync('extractedData.json', JSON.stringify(extractedData, null, 2));
    res.json({ message: 'Data deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/extractedData/:id', (req, res) => {
  try {
    const id = req.params.id;
    const newData = req.body;

    let extractedData = fs.existsSync('extractedData.json') ? JSON.parse(fs.readFileSync('extractedData.json')) : [];
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
        id: generateId(),
        pageIdList: documentInfo.pageIdList,
        classes: documentInfo.classes.map(classInfo => classInfo.code),
        fieldValues,
      };
    });

    const existingData = fs.existsSync('extractedData.json') ? JSON.parse(fs.readFileSync('extractedData.json')) : [];
    const newDataWithIds = extractedData.map(item => ({
      ...item,
      id: generateId(),
    }));
    fs.writeFileSync('extractedData.json', JSON.stringify([...existingData, ...newDataWithIds], null, 2));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
