const fetch = require('cross-fetch');
const mimeTypes = require('mime-types');

const caasEndpoint = 'https://caas.itesoft.cloud/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
const apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

/**
 * Function to extract data using the CaaS API.
 * @param {Buffer} requestData The data to be sent to the CaaS API.
 * @returns {Promise<object>} A Promise that resolves to the extracted data.
 */
const extractData = async (requestData) => {
  try {
    const contentType = mimeTypes.lookup(requestData);

    const response = await fetch(caasEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': contentType || 'application/octet-stream',
        'X-Gravitee-Api-key': apiKey,
      },
      body: requestData,
    });

    if (!response.ok) {
      throw new Error(`CaaS API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`Error extracting data: ${error.message}`);
  }
};

module.exports = {
  extractData,
};
