const fetch = require('cross-fetch');

const caasEndpoint = 'https://caas.itesoft.cloud/api/v2/classify/DOM/identify/strategy/LOT_DOM?classifyAndRead=true';
const apiKey = '552f9d7a-4517-45a3-a3de-5389228efbfd';

const fetchFromCaaS = async (requestData) => {
  try {
    const response = await fetch(caasEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Gravitee-Api-key': apiKey,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`CaaS API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    throw new Error(`CaaS API request failed: ${error.message}`);
  }
};

module.exports = { fetchFromCaaS };
