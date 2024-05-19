const fetch = require('cross-fetch');
const mimeTypes = require('mime-types');
const fs = require('fs');
const { readExtractedData, writeExtractedData } = require('../models/extractedDataModel');

const caasEndpoint = 'https://caas.itesoft.cloud/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
const apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

// Controller function to extract data using CaaS API
const extractData = async (req, res) => {
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

    let existingData = readExtractedData();

    const newExtractedData = data.documents.map(documentInfo => {
      const dataExtract = documentInfo.dataExtract;
      const fieldValues = {};

      // Extract specific fields
      for (const field of fieldsToExtract) {
        fieldValues[field.key] = extractFieldData(dataExtract, field.key);
      }

      return {
        id: generateId(existingData),
        pageIdList: documentInfo.pageIdList,
        classes: documentInfo.classes.map(classInfo => classInfo.code),
        fieldValues,
      };
    });

    writeExtractedData([...existingData, ...newExtractedData]);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  extractData,
};
